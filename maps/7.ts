import Map from '../scripts/map';
import Level from './Level';

const __map: number[] = [
    1, 1, 1, 1, 1, 1, 1,
    1, 3, 3,41, 3, 3, 1,
    1, 3, 3, 2, 3, 3, 1,
    1, 1, 3, 2, 3, 1, 1,
    1, 1, 0,42, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
]

const mapObj: Map = new Map(7, 7, 80, 5);

const level = new Level(__map, mapObj);

export default level;

// export default {
//     mapObj,
//     __map
// };
