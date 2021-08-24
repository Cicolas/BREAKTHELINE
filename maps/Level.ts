import Map from '../scripts/map';

export default class Level {
    /*NOTE:
        0: nothing
        1: border
        2: spawn
        3: wall
        41: portal 1 entrada
        42: portal 1 saida
        51: portal 2 entrada
        52: portal 2 saida
    */
    public __map: number[];
    public mapObj: Map;

    constructor(map: number[], obj: Map) {
        this.__map = map;
        this.mapObj = obj;
    }
}