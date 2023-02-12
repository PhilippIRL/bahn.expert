// List from https://de.wikipedia.org/wiki/Liste_nach_Gemeinden_und_Regionen_benannter_IC/ICE-Fahrzeuge#Namensgebung_ICE-Triebz%C3%BCge_nach_Gemeinden

const naming: {
  [key: number]: string;
} = {
  // ICE 1 - BR 401
  101: 'Gießen',
  102: 'Jever',
  103: 'Neu-Isenburg',
  104: 'Fulda',
  105: 'Offenbach am Main',
  106: 'Itzehoe',
  107: 'Plattling',
  108: 'Lichtenfels',
  110: 'Gelsenkirchen',
  112: 'Memmingen',
  113: 'Frankenthal/Pfalz',
  114: 'Friedrichshafen',
  115: 'Regensburg',
  116: 'Pforzheim',
  117: 'Hof',
  118: 'Gelnhausen',
  119: 'Osnabrück',
  120: 'Lüneburg',
  152: 'Hanau',
  153: 'Neumünster',
  154: 'Flensburg',
  155: 'Rosenheim',
  156: 'Heppenheim/Bergstraße',
  157: 'Landshut',
  158: 'Gütersloh',
  159: 'Bad Oldesloe',
  160: 'Mülheim an der Ruhr',
  161: 'Bebra',
  162: 'Geisenheim/Rheingau',
  166: 'Gelnhausen',
  167: 'Garmisch-Partenkirchen',
  168: 'Crailsheim',
  169: 'Worms',
  171: 'Heusenstamm',
  172: 'Aschaffenburg',
  173: 'Basel',
  174: 'Zürich',
  175: 'Nürnberg',
  176: 'Bremen',
  177: 'Rendsburg',
  178: 'Bremerhaven',
  180: 'Castrop-Rauxel',
  181: 'Interlaken',
  182: 'Rüdesheim am Rhein',
  183: 'Timmendorfer Strand',
  184: 'Bruchsal',
  185: 'Freilassing',
  186: 'Chur',
  187: 'Mühldorf a. Inn',
  188: 'Hildesheim',
  190: 'Ludwigshafen am Rhein',
  //
  // ICE 2 - BR 402
  201: 'Rheinsberg',
  202: 'Wuppertal',
  203: 'Cottbus/Chóśebuz',
  204: 'Bielefeld',
  205: 'Zwickau',
  206: 'Magdeburg',
  207: 'Stendal',
  208: 'Bonn',
  209: 'Riesa',
  210: 'Fontanestadt Neuruppin',
  211: 'Uelzen',
  212: 'Potsdam',
  213: 'Nauen',
  214: 'Hamm (Westf.)',
  215: 'Bitterfeld-Wolfen',
  216: 'Dessau',
  217: 'Bergen auf Rügen',
  218: 'Braunschweig',
  219: 'Hagen',
  220: 'Meiningen',
  221: 'Lübbenau/Spreewald',
  222: 'Eberswalde',
  223: 'Schwerin',
  224: 'Saalfeld (Saale)',
  225: 'Oldenburg (Oldb)',
  226: 'Lutherstadt Wittenberg',
  227: 'Ludwigslust',
  228: 'Altenburg',
  229: 'Templin',
  230: 'Delitzsch',
  231: 'Brandenburg an der Havel',
  232: 'Frankfurt (Oder)',
  233: 'Ulm',
  234: 'Minden',
  235: 'Görlitz',
  236: 'Jüterbog',
  237: 'Neustrelitz',
  238: 'Saarbrücken',
  239: 'Essen',
  240: 'Bochum',
  241: 'Bad Hersfeld',
  242: 'Quedlinburg',
  243: 'Bautzen/Budyšin',
  244: 'Koblenz',
  //
  // ICE 3 - BR 403
  301: 'Freiburg im Breisgau',
  302: 'Hansestadt Lübeck',
  303: 'Dortmund',
  304: 'München',
  305: 'Baden-Baden',
  306: 'Nördlingen',
  307: 'Oberhausen',
  308: 'Murnau am Staffelsee',
  309: 'Aalen',
  310: 'Wolfsburg',
  311: 'Wiesbaden',
  312: 'Montabaur',
  313: 'Treuchtlingen',
  314: 'Bergisch Gladbach',
  315: 'Singen (Hohentwiel)',
  316: 'Siegburg',
  317: 'Recklinghausen',
  318: 'Münster (Westf.)',
  319: 'Duisburg',
  320: 'Weil am Rhein',
  321: 'Krefeld',
  322: 'Solingen',
  323: 'Schaffhausen',
  324: 'Fürth',
  325: 'Ravensburg',
  326: 'Neunkirchen',
  327: 'Siegen',
  328: 'Aachen',
  330: 'Göttingen',
  331: 'Westerland/Sylt',
  332: 'Augsburg',
  333: 'Goslar',
  334: 'Offenburg',
  335: 'Konstanz',
  336: 'Ingolstadt',
  337: 'Stuttgart',
  351: 'Herford',
  352: 'Mönchengladbach',
  353: 'Neu-Ulm',
  354: 'Mittenwald',
  355: 'Tuttlingen',
  357: 'Esslingen am Neckar',
  358: 'St. Ingbert',
  359: 'Leverkusen',
  360: 'Linz am Rhein',
  361: 'Celle',
  362: 'Schwerte (Ruhr)',
  363: 'Weilheim i. OB',
  //
  // ICE T - BR 411
  1101: 'Neustadt an der Weinstraße',
  1102: 'Neubrandenburg',
  1103: 'Paderborn',
  1104: 'Erfurt',
  1105: 'Dresden',
  1107: 'Pirna',
  1108: 'Berlin',
  1109: 'Güstrow',
  1110: 'Naumburg (Saale)',
  1111: 'Hansestadt Wismar',
  1112: 'Freie und Hansestadt Hamburg',
  1113: 'Hansestadt Stralsund',
  1117: 'Erlangen',
  1118: 'Plauen/Vogtland',
  1119: 'Meißen',
  1125: 'Arnstadt',
  1126: 'Leipzig',
  1127: 'Weimar',
  1128: 'Reutlingen',
  1129: 'Kiel',
  1130: 'Jena',
  1131: 'Trier',
  1132: 'Wittenberge',
  1151: 'Elsterwerda',
  1152: 'Travemünde',
  1153: 'Ilmenau',
  1154: 'Sonneberg',
  1155: 'Mühlhausen/Thüringen',
  1156: 'Waren (Müritz)',
  1157: 'Innsbruck',
  1158: 'Falkenberg/Elster',
  1159: 'Passau',
  1160: 'Markt Holzkirchen',
  1161: 'Andernach',
  1162: 'Vaihingen an der Enz',
  1163: 'Ostseebad Binz',
  1164: 'Rödental',
  1165: 'Bad Oeynhausen',
  1166: 'Bingen am Rhein',
  1167: 'Traunstein',
  1168: 'Ellwangen',
  1169: 'Tutzing',
  1170: 'Prenzlau',
  1171: 'Oschatz',
  1172: 'Bamberg',
  1173: 'Halle (Saale)',
  1174: 'Hansestadt Warburg',
  1175: 'Villingen-Schwenningen',
  1176: 'Coburg',
  1177: 'Rathenow',
  1178: 'Ostseebad Warnemünde',
  1180: 'Darmstadt',
  1181: 'Horb am Neckar',
  1182: 'Mainz',
  1183: 'Oberursel (Taunus)',
  1184: 'Kaiserslautern',
  1190: 'Wien',
  1191: 'Salzburg',
  1192: 'Linz',
  //
  // ICE T - BR 415
  1501: 'Eisenach',
  1502: 'Karlsruhe',
  1503: 'Altenbeken',
  1504: 'Heidelberg',
  1505: 'Marburg/Lahn',
  1506: 'Kassel',
  1520: 'Gotha',
  1521: 'Homburg/Saar',
  1522: 'Torgau',
  1523: 'Hansestadt Greifswald',
  1524: 'Hansestadt Rostock',
  //
  // Intercity2
  2853: 'Nationalpark Sächsische Schweiz',
  2865: 'Remstal',
  2868: 'Nationalpark Niedersächsisches Wattenmeer',
  2871: 'Leipziger Neuseenland',
  2874: 'Oberer Neckar',
  2875: 'Magdeburger Börde',
  //
  // Intercity2 KISS - BR 4110
  4103: 'Allgäu',
  4111: 'Gäu',
  4114: 'Dresden Elbland',
  4117: 'Mecklenburgische Ostseeküste',
  //
  // ICE 3 - BR 406
  4601: 'Europa/Europe',
  4602: 'Euregio Maas-Rhein',
  4603: 'Mannheim',
  4604: 'Brussel/Bruxelles',
  4607: 'Hannover',
  4610: 'Frankfurt am Main',
  4611: 'Düsseldorf',
  4651: 'Amsterdam',
  4652: 'Arnhem',
  4680: 'Würzburg',
  4682: 'Köln',
  4683: 'Limburg an der Lahn',
  4684: 'Forbach-Lorraine',
  4685: 'Schwäbisch Hall',
  //
  // ICE 3 - BR 407
  4712: 'Dillingen a.d. Donau',
  4710: 'Ansbach',
  4717: 'Paris',
  // ICE 3neo - BR 408
  8007: 'Rheinland',
  //
  // ICE 4 - BR 412
  9006: 'Martin Luther',
  9018: 'Freistaat Bayern',
  9025: 'Nordrhein-Westfalen',
  9026: 'Zürichsee',
  9028: 'Freistaat Sachsen',
  9041: 'Baden-Württemberg',
  9046: 'Female ICE',
  9050: 'Metropole Ruhr',
  9202: 'Schleswig-Holstein',
  9457: 'Bundesrepublik Deutschland',
  9481: 'Rheinland-Pfalz',
};

export default (tzn?: string): string | undefined => {
  if (tzn) return naming[Number.parseInt(tzn, 10)];
};
