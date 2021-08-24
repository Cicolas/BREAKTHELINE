import Map from '../scripts/map';
import Level from './Level';

const __map: number[] = [
    1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 1, 0, 1,
    1, 0, 2, 1, 2, 0, 1,
    1,41, 3, 1, 3,42, 1,
    1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1,
]

const mapObj: Map = new Map(7, 7, 80, 5);

const level = new Level(__map, mapObj);

export default level;

// export default {
//     mapObj,
//     __map
// };
