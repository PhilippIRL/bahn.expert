/* tslint:disable */
/* eslint-disable */
/**
 * RIS :: Stations
 * ## Info * member of the **[RIS-API](https://db.de/ris-api)** family * powered by [DB Systel BusinessHub - doServices](https://user-portal.hub.ose.db.de/) * powered by [T.R Reisendeninformation](https://db-planet.deutschebahn.com/pages/reisendeninformation/apps/content/willkommen) * implements model: *1.0.201-SNAPSHOT*  ## Capabilities  ### Stations *stay tuned*  ### Travel Centers *stay tuned*  ### Stop Places Information on a huge amount of stop-places [Haltestellen] coming from different source like EFZ [Europäisches Fahrplanzentrum] and DB Station & Service. The service offers therefore all stop-place that are part or that were part of the official sales time table for germany including foreign stop-places for transpors driving into germany / leaving germany and connecting journeys in foreign countries that are part of the railteam alliance. OEPNV stop-places are returned as well.  Brief information for particular stop-place like * language dependent short, long, speech and symbol names from different sources [EFZ or BHW] * metropolis information [Metropole] * parent station [Bahnhof] * geo coordinates, country and timezone * transport types [Verkehrsmittel / Produkart] that depart / arrive * foreign key mappings [Fremdschluessel] like EVA, RL100 / DS100, EPA, IBNR, DHID / IFOPT, STADA and UIC * validity ranges [Gueltigkeitsbereiche]  Different query options for stop-places like * by name query with fuzzy-search [fehlertolerante Suche] and order by relevance [gewichtete Suche] * by geo-coordinate and radius ordered by distance * by foreign key  Multiple groups a stop-place may belong to like * Station [selber Bahnhof] * Sales [vertrieblicher Umsteigebereich inkl. OEPNV]  * Metropolitan Area [Stadtgebiet]  ### Platforms General information on platforms [Gleise, Bussteige, Plattformen etc.] for a particular stop-place like: * name, start and end in meters, linked platforms [selber Bahnsteig], parent platform [fuer Teilgleise]  * sectors with name, start and end in meters, cube position [Wuerfelposition] and information ob cube signage [Beschilderung] * accessibility information [Barrierefreier Zugang] like audible signals, automatic doors, stair markings and a lot more * informaton on operational platforms [Betriebsgleise], optics [Optiken], reference points [Refeenzpunkte] and orientations [Orientierung gemaess Nullpunkt]  ### Connecting-Times Connecting-times [Umsteigezeiten / Anschlusszeiten] for a stop-place [Haltestelle] and all members of stop-place group [Umsteigebereich] including foreign stop-places [Auslandshalte gemaess Railteam-Flag etc.]: * for different kind of stop-place groups    * Station [selber Bahnhof]   * Sales [vertrieblicher Umsteigebereich inkl. OEPNV]   * All [alle Umsteigebereiche] supported * and different personae, if available   * Occasional Traveller [Gelegenheitsreisender]   * Frequent Traveller [Pendler]   * Handicapped Traveller [Mobilitaetseingeschraenkter Reisender] * from various sources   * RIL420 [Konzernrichtlinie]   * EFZ [Europäisches Fahrplanzentrum inkl. OEPNV & Auslandshalte]   * IndoorRouting [Indoor Routing RIS-Maps] available  ## Limitations * *[backlog]* support active and inactive versions of stop-places/stations (differing date ranges) * *[backlog]* support foreign keys EPA & IBNR * *[backlog]* raise stop-place change events with RIS::Events in case stop-place data changes * *[backlog]* enable query of all stop-places that have been changed since a certain datetime * *[backlog]* include Station & Service Bahnhofswissen with it\'s fully functional API starting from ~Q1/Q2 2021  ## Getting Started * get to know the vision behind [RIS-API](https://db.de/ris-api) * visit our [Coding Dojo](https://ris.gitpages.tech.rz.db.de/risapi/documentation/) and learn how to get started  ## Licenses * The usage of the station data of DB Station & Services is subject to the Creative Commons Attribution 4.0 International (CC BY 4.0) license
 *
 * The version of the OpenAPI document: 1.0
 * Contact: BusinessHub.doServices.Titan.Team@deutschebahn.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export interface ConfigurationParameters {
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>);
  username?: string;
  password?: string;
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((name?: string, scopes?: string[]) => Promise<string>);
  basePath?: string;
  baseOptions?: any;
  formDataCtor?: new () => any;
}

export class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>);
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  username?: string;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  password?: string;
  /**
   * parameter for oauth2 security
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof Configuration
   */
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((name?: string, scopes?: string[]) => Promise<string>);
  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string;
  /**
   * base options for axios calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions?: any;
  /**
   * The FormData constructor that will be used to create multipart form data
   * requests. You can inject this here so that execution environments that
   * do not support the FormData class can still run the generated client.
   *
   * @type {new () => FormData}
   */
  formDataCtor?: new () => any;

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp(
      '^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$',
      'i',
    );
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === 'application/json-patch+json')
    );
  }
}