import {
  addUseragent,
  randomBahnhofLiveUseragent,
  randomDBNavigatorUseragent,
} from '@/external/randomUseragent';
import { Cache, CacheDatabase } from '@/server/cache';
import { format } from 'date-fns';
import { isWithin20Hours } from '@/external/coachSequence';
import { mapInformation } from '@/server/coachSequence/DB/DBMapping';
import { UpstreamApiRequestMetric } from '@/server/admin';
import { utcToZonedTime } from 'date-fns-tz';
import Axios from 'axios';
import type { CoachSequenceInformation } from '@/types/coachSequence';
import type { Wagenreihung } from '@/types/reihung';

const dbCoachSequenceUrls = {
  apps: 'https://www.apps-bahn.de/wr/wagenreihung/1.0',
  noncd: 'https://ist-wr.noncd.db.de/wagenreihung/1.0',
  newApps: 'https://www.apps-bahn.de/wgr/wr',
};

type DBSourceType = 'apps' | 'noncd' | 'newApps';

const dbCoachSequenceTimeout =
  process.env.NODE_ENV === 'production' ? 4500 : 10000;

export const getDBCoachSequenceUrl = (
  trainNumber: string,
  date: Date,
  plannedStartDate?: Date,
  trainCategory?: string,
  stopEva?: string,
  administration?: string,
  type: DBSourceType = 'noncd',
): [string, DBSourceType] => {
  if (
    plannedStartDate &&
    trainCategory &&
    stopEva &&
    administration &&
    type === 'newApps'
  ) {
    return [
      `${dbCoachSequenceUrls[type]}/${administration}/${formatPlannedDate(
        plannedStartDate,
      )}/${trainCategory}/${trainNumber}/${stopEva}/${formatDate(date)}`,
      'newApps',
    ];
  }
  return [
    `${dbCoachSequenceUrls[type]}/${trainNumber}/${formatDate(date)}`,
    type,
  ];
};

const formatDate = (date?: Date) =>
  date
    ? format(utcToZonedTime(date, 'Europe/Berlin'), 'yyyyMMddHHmm')
    : undefined;
const formatPlannedDate = (date?: Date) =>
  date ? format(utcToZonedTime(date, 'Europe/Berlin'), 'yyyyMMdd') : undefined;

const coachSequenceCache = new Cache<[Wagenreihung, DBSourceType]>(
  CacheDatabase.CoachSequenceFound,
);

const blockedCategories = new Set(['TRAM', 'STR', 'BUS', 'BSV', 'FLUG']);

const navigatorAxios = Axios.create({
  timeout: dbCoachSequenceTimeout,
});
navigatorAxios.interceptors.request.use(
  addUseragent.bind(undefined, randomDBNavigatorUseragent),
);
const bahnhofLiveAxios = Axios.create({
  timeout: dbCoachSequenceTimeout,
});
bahnhofLiveAxios.interceptors.request.use(
  addUseragent.bind(undefined, randomBahnhofLiveUseragent),
);
async function coachSequence(
  trainNumber: string,
  date: Date,
  plannedStartDate?: Date,
  trainCategory?: string,
  stopEva?: string,
  administration?: string,
): Promise<[Wagenreihung, DBSourceType] | undefined> {
  if (trainCategory && blockedCategories.has(trainCategory)) {
    return undefined;
  }
  if (!isWithin20Hours(date)) {
    return undefined;
  }
  const cacheKey = `${trainNumber}-${formatDate(date)}-${formatPlannedDate(
    plannedStartDate,
  )}-${trainCategory}-${stopEva}`;
  const cached = await coachSequenceCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  try {
    const [url, type] = getDBCoachSequenceUrl(trainNumber, date);
    UpstreamApiRequestMetric.inc({
      api: `coachSequence-${type}`,
    });
    const info = (await bahnhofLiveAxios.get<Wagenreihung>(url)).data;
    void coachSequenceCache.set(cacheKey, [info, type]);
    return [info, type];
  } catch {
    // we just ignore it and try the next one
  }
  if (plannedStartDate && trainCategory && stopEva && administration) {
    try {
      const [url, type] = getDBCoachSequenceUrl(
        trainNumber,
        date,
        plannedStartDate,
        trainCategory,
        stopEva,
        administration,
        'newApps',
      );
      UpstreamApiRequestMetric.inc({
        api: `coachSequence-${type}`,
      });
      const info = (await navigatorAxios.get<Wagenreihung>(url)).data;
      void coachSequenceCache.set(cacheKey, [info, type]);
      return [info, type];
    } catch {
      // we just ignore it and try the next one
    }
  }
}

export async function DBCoachSequence(
  trainNumber: string,
  date: Date,
  plannedStartDate?: Date,
  trainCategory?: string,
  stopEva?: string,
  administration?: string,
): Promise<CoachSequenceInformation | undefined> {
  const sequence = await coachSequence(
    trainNumber,
    date,
    plannedStartDate,
    trainCategory,
    stopEva,
    administration,
  );
  if (!sequence) return undefined;

  const mapped = mapInformation(sequence[0]);
  if (mapped) {
    mapped.source = `DB-${sequence[1]}`;
  }
  return mapped;
}

export async function getCacheKeysForTZ(tzn: string): Promise<string[]> {
  const allEntries = await coachSequenceCache.getAll();
  const relevantEntries = allEntries.filter(([_, [sequence]]) =>
    sequence.data.istformation.allFahrzeuggruppe.some((g) =>
      g.fahrzeuggruppebezeichnung.includes(tzn),
    ),
  );

  return relevantEntries.map(([key]) => key);
}
