import { dungeonPath } from './dungeonPath';
import { evilKing } from './evilKing';
import { forest } from './forest';
import { forest2 } from './forest2';
import { forest3 } from './forest3';
import { forest3Melted } from './forest3Melted';
import { forest4 } from './forest4';
import { forest4Melted } from './forest4Melted';
import { house1 } from './house1';
import { house2 } from './house2';
import { house3 } from './house3';
import { MapMatrix } from './mapData';
import { piscesTown } from './piscesTown';
import { piscesTown2 } from './piscesTown2';
import { piscesTown2Melted } from './piscesTown2Melted';
import { piscesTown3 } from './piscesTown3';
import { piscesTown3Melted } from './piscesTown3Melted';
import { piscesTownMelted } from './piscesTownMelted';
import { sky } from './sky';
import { skyBroken } from './skyBroken';
import { underwater } from './underwater';
import { underwater2 } from './underwater2';
import { underwater3 } from './underwater3';
import { underwater4 } from './underwater4';
import { wellInner } from './wellInner';

export interface LayersInterface {
    forest: MapMatrix;
    forest2: MapMatrix;
    forest3: MapMatrix;
    forest3Melted: MapMatrix;
    forest4: MapMatrix;
    forest4Melted: MapMatrix;
    piscesTown: MapMatrix;
    piscesTownMelted: MapMatrix;
    piscesTown2: MapMatrix;
    piscesTown2Melted: MapMatrix;
    piscesTown3: MapMatrix;
    piscesTown3Melted: MapMatrix;
    house1: MapMatrix;
    house2: MapMatrix;
    house3: MapMatrix;
    evilKing: MapMatrix;
    dungeonPath: MapMatrix;
    sky: MapMatrix;
    skyBroken: MapMatrix;
    wellInner: MapMatrix;
    underwater: MapMatrix;
    underwater2: MapMatrix;
    underwater3: MapMatrix;
    underwater4: MapMatrix;
}

export const LAYERS: LayersInterface = {
    forest,
    forest2,
    forest3,
    forest3Melted,
    forest4,
    forest4Melted,
    piscesTown,
    piscesTownMelted,
    piscesTown2,
    piscesTown2Melted,
    piscesTown3,
    piscesTown3Melted,
    house1,
    house2,
    house3,
    evilKing,
    dungeonPath,
    sky,
    skyBroken,
    wellInner,
    underwater,
    underwater2,
    underwater3,
    underwater4,
};

export const SOLID_TILES = [
    '5',
    '15',
    '25',
    '26',
    '35',
    '36',
    '63',
    '104',
    '114',
    '81',
    '82',
    '91',
    '92',
    '88',
    '131',
    '132',
    '1311',
    '133',
    '1341',
    '134',
    '141',
    '142',
    '1431',
    '143',
    '1441',
    '144',
    '76',
    '124',
    '83',
    '420',
    '310',
    '320',
    '330',
    '410',
    '430',
    '440',
    '510',
    '520',
    '530',
    '610',
    '620',
    '630',
    '1760',
    '1770',
    '1780',
    '1860',
    '1880',
    '1510',
    '1520',
    '1530',
    '1540',
    '1610',
    '1620',
    '1630',
    '1640',
    '260',
    '3500',
    '390',
    '3100',
    '490',
    '4100',
    's22',
    's61',
    's62',
    's63',
    's71',
    's72',
    's73',
    's67',
    's121',
    's122',
    's123',
    's131',
    's132',
    's133',
    's141',
    's122',
    's123',
    's151',
    's152',
    's153',
    's161',
    's162',
    's163',
    's15',
    's23',
    'sn181',
    'sn182',
    'sn197',
    'sn224',
    'sn225',
    'sn226',
    'sn227',
    'sn240',
    'sn241',
    'sn242',
    'sn243',
    'sn183',
    'sn199',
    'sn196',
    'sn198',
    'p036',
    'p045',
    'p046',
    'p047',
    'p061',
    'p062',
    'p063',
    'p077',
    'p078',
    'p079',
    'p091',
    'p092',
    'p093',
    'p235',
    'p251',
    'p192',
    'p156',
    'p160',
    'p144',
    'p096',
    'p097',
    'p099',
    'p115',
    'p141',
    'p230',
    'p231',
    'p147',
    'p161',
    'p216',
    'p217',
    'p218',
    'p232',
    'p233',
    'p234',
    'p248',
    'p123',
    'p124',
    'p125',
    'p110',
    'p111',
    'p034',
    'm149',
    'm150',
    'm151',
    'm165',
    'm166',
    'm167',
    'm181',
    'm182',
    'm183',
    'm197',
    'm198',
    'm096',
    'm113',
    'm099',
    'm115',
    'm117',
    'm125',
    'm071',
    'm196',
    '31',
    '32',
    '22',
    '21',
    '23',
    '25',
    't21',
    '14',
    '13',
    'f012',
    'm071',
    'm147',
    'm85',
    'm064',
    'm144',
    'm034',
    'm065',
    'intWall_tile_tile098',
    'intWall_tile_tile083_black',
    'intWall_tile_tile083LeftBottom',
    'intWall_tile_tile083LeftTop',
    'intWall_tile_tile083RightBottom',
    'intWall_tile_tile083RightTop',
    'intWall_tile_tile098Left',
    'intWall_tile_tile099Top',
    'intWall_tile_tile099',
    'intWall_tile_tile114Bottom',
    'intWall_tile_tile114',
    'intWall_tile_tile115Right',
    'intWall_tile_tile115',
    'intWall_tile_tile157',
    'intWall_tile_tile156',
    'intWall_tile_tile141',
    'intWall_tile_tile140',
    'intWall_tile_tile153',
    'intWall_tile_tile152',
    'intWall_tile_tile137',
    'intWall_tile_tile136',
    'int_tile005',
    'int_tile006',
    'int_tile007',
    'int_tile008',
    'int_tile009',
    'int_tile010',
    'int_tile011',
    'int_tile012',
    'int_tile013',
    'int_tile014',
    'int_tile015',
    'int_tile017',
    'int_tile018',
    'int_tile019',
    'int_tile021',
    'int_tile022',
    'int_tile023',
    'int_tile024',
    'int_tile025',
    'int_tile026',
    'int_tile027',
    'int_tile028',
    'int_tile029',
    'int_tile030',
    'int_tile036',
    'int_tile037',
    'int_tile038',
    'int_tile039',
    'int_tile040',
    'int_tile056',
    'int_tile043',
    'int_tile042',
    'int_tile041',
    'int_tile057',
    'int_tile058',
    'int_tile059',
    'int_tile072',
    'int_tile073',
    'int_tile074',
    'int_tile075',
    'int_tile080',
    'int_tile079',
    'int_tile063',
    'int_tile123',
    'int_tile125',
    'int_tile096',
    'int_tile112',
    'int_tile172',
    'int_tile171',
    'int_tile187',
    'int_tile188',
    'int_tile203',
    'int_tile204',
    'int_tile175',
    'int_tile167',
    'int_tile166',
    'int_tile182',
    'int_tile183',
    'int_tile137',
    'int_tile153',
    'int_tile136',
    'int_tile152',
    'int_tile241',
    'int_tile242',
    'int_tile240',
    'int_tile211',
    'int_tile227',
    'int_tile243',
    'int_tile234',
    'int_tile235',
    'int_tile232',
    'int_tile233',
    'int_tile246',
    'int_tile230',
    'int_tile247',
    'int_tile250',
    'int_tile253',
    'int_tile252',
    'int_tile248',
    'int_tile249',
    'int_tile217',
    'int_tile236',
    'int_tile154',
    'int_tile138',
    'int_tile060',
    'int_tile061',
    'int_tile139',
    'int_tile093',
    'int_tile132',
    'int_tile133',
    'int_tile149',
    'int_tile199',
    'int_tile215',
    'int_tile213',
    'int_tile245',
    'int_tile226',
    'int_tile225',
    'int_tile224',
    'int_tile209',
    'int_tile210',
    'int_tile208',
    'int_tile155',
    'well_tile018',
    'well_tile017',
    'well_tile016',
    'well_tile024',
    'well_tile025',
    'well_tile026',
    'well_tile032',
    'well_tile033',
    'well_tile034',
    'well_tile019',
    'well_tile020',
    'well_tile027',
    'well_tile028',
    'well_tile004',
    'well_tile012',
    'well_tile003',
    'well_tile002',
    'well_tile040',
    'well_tile041',
    'well_tile042',
    'well_tile048',
    'well_tile049',
    'well_tile050',
    'well_tile051',
    'well_tile052',
    'well_tile064',
    'well_tile065',
    'well_tile066',
    'well_tile056',
    'well_tile057',
    'well_tile058',
    'well_tile072',
    'well_tile073',
    'well_tile074',
    'well_tile216',
    'underwater_tile008',
    'underwater_tile009',
    'underwater_tile010',
    'underwater_tile011',
    'underwater_tile013',
    'underwater_tile014',
    'underwater_tile015',
    'underwater_tile024',
    'underwater_tile026',
    'underwater_tile027',
    'underwater_tile028',
    'underwater_tile031',
    'underwater_tile032',
    'underwater_tile017',
    'underwater_tile018',
    'underwater_tile034',
    'underwater_tile043',
    'underwater_tile059',
    'underwater_tile044',
    'underwater_tile046',
    'underwater_tile047',
    'underwater_tile063',
    'underwater_tile062',
    'underwater_tile045',
    'underwater_tile056',
    'underwater_tile057',
    'underwater_tile058',
    'underwater_tile073',
    'underwater_tile074',
    'underwater_tile072',
    'underwater_tile088',
    'underwater_tile089',
    'underwater_tile090',
    'underwater_tile076',
    'underwater_tile077',
    'underwater_tile078',
    'underwater_tile079',
    'underwater_tile104',
    'underwater_tile105',
    'underwater_tile098',
    'underwater_tile097',
    'underwater_tile114',
    'underwater_tile113',
    'underwater_tile131',
    'underwater_tile147',
    'underwater_tile148',
    'underwater_tile149',
    'underwater_tile154',
    'underwater_tile159',
    'underwater_tile158',
    'underwater_tile172',
    'underwater_tile188',
    'underwater_tile171',
    'underwater_tile187',
    'underwater_tile173',
    'underwater_tile189',
    'underwater_tile200',
    'underwater_tile216',
    'underwater_tile217',
    'underwater_tile221',
    'underwater_tile220',
    'underwater_tile219',
    'underwater_tile239',
    'underwater_tile255',
    'underwater_tile254',
    'underwater_tile238',
    'underwater_tile222',
    'underwater_tile223',
    'int_tile191',
    'int_tile190',
    'underwater_tile008',
    'underwater_tile009',
    'underwater_tile010',
    'underwater_tile011',
    'underwater_tile013',
    'underwater_tile014',
    'underwater_tile015',
    'underwater_tile024',
    'underwater_tile026',
    'underwater_tile027',
    'underwater_tile028',
    'underwater_tile031',
    'underwater_tile032',
    'underwater_tile017',
    'underwater_tile018',
    'underwater_tile034',
    'underwater_tile043',
    'underwater_tile059',
    'underwater_tile044',
    'underwater_tile046',
    'underwater_tile047',
    'underwater_tile063',
    'underwater_tile062',
    'underwater_tile045',
    'underwater_tile056',
    'underwater_tile057',
    'underwater_tile058',
    'underwater_tile073',
    'underwater_tile074',
    'underwater_tile072',
    'underwater_tile088',
    'underwater_tile089',
    'underwater_tile090',
    'underwater_tile076',
    'underwater_tile077',
    'underwater_tile078',
    'underwater_tile079',
    'underwater_tile104',
    'underwater_tile105',
    'underwater_tile098',
    'underwater_tile097',
    'underwater_tile114',
    'underwater_tile113',
    'underwater_tile131',
    'underwater_tile147',
    'underwater_tile148',
    'underwater_tile149',
    'underwater_tile154',
    'underwater_tile159',
    'underwater_tile158',
    'underwater_tile172',
    'underwater_tile188',
    'underwater_tile171',
    'underwater_tile187',
    'underwater_tile173',
    'underwater_tile189',
    'underwater_tile200',
    'underwater_tile216',
    'underwater_tile217',
    'underwater_tile221',
    'underwater_tile220',
    'underwater_tile219',
    'underwater_tile239',
    'underwater_tile255',
    'underwater_tile254',
    'underwater_tile238',
    'underwater_tile222',
    'underwater_tile223',
    'int_tile191',
    'int_tile190',
    'underwater_tile050',
    'underwater_tile066',
    'underwater_tile065',
    'underwater_tile064',
    'underwater_tile067',
    'underwater_tile083',
    'underwater_tile106',
    'underwater_tile099',
    'underwater_tile156',
    'underwater_tile155',
    'underwater_tile181',
    'underwater_tile165',
    'underwater_tile146',
    'underwater_tile138',
    'underwater_tile122',
    'underwater_tile085',
    'underwater_tile084',
    'underwater_tile092',
    'underwater_tile093',
    'underwater_tile094',
    'underwater_tile095',
    'underwater_tile076',
    'underwater_tile077',
    'underwater_tile078',
    'underwater_tile079',
    'underwater_tile108',
    'underwater_tile109',
    'underwater_tile110',
    'underwater_tile111',
    'underwater_tile080',
    'underwater_tile081',
    'underwater_tile082',
    'underwater_tile083',
    'underwater_tile206',
    'underwater_tile207',
    'underwater_tile190',
    'underwater_tile191',
    'underwater_tile061',
    'underwater_tile060',
    'underwater_tile060',
    'underwater_tile061',
    'underwater_tile166',
    'underwater_tile167',
    'underwater_tile182',
    'underwater_tile183',
    'underwater_tile090',
    'underwater_tile089',
    'underwater_tile074',
    'underwater_tile104',
    'underwater_tile068',
    'underwater_tile052',
    'underwater_tile071',
    'underwater_tile055',
    'underwater_tile038',
    'underwater_tile102',
    'underwater_tile086',
    'underwater_tile032',
    'underwater_tile016',
];
