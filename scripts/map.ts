export default class Map {
    private map: number[] = [];
    private mapString: string;

    public width: number;
    public height: number;
    public size: number;
    private gap: number
    
    constructor(width: number, height: number, size: number, gap?: number) {
        this.width = width;
        this.height = height;

        this.size = size;
        this.gap = (gap)?gap:1;

        this.Generate();
    }

    private Generate(){
        let i = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.height; x++) {
                this.map[i] = 0;
                i++;
            }
        }
    }

    public SetMap(map: number[]){
        let i = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.height; x++) {
                this.map[i] = map[i];                
                i++;
            }
        }
    }

    public GetPosition(x: number, y: number): {x: number, y: number}{
        return {x: (x*this.size)+(this.gap*x), y: (y*this.size)+(this.gap*y)};
    }
    public GetMapPosition(x: number, y: number): {x: number, y: number}{
        return {x: (x/this.size)-(this.gap/x), y: (y/this.size)-(this.gap/y)};
    }

    public Draw(){
        let i = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.height; x++) {
                switch (this.map[i]) {
                    case 2:
                    case 0:
                        love.graphics.setColor(.9, .9, .8);
                        love.graphics.rectangle("fill", (x*this.size)+(this.gap*x), (y*this.size)+(this.gap*y), this.size, this.size, 10);
                        break;
                    case 3:
                        love.graphics.setColor(.27, .27, .2);
                        love.graphics.rectangle("fill", (x*this.size)+(this.gap*x), (y*this.size)+(this.gap*y), this.size, this.size, 10);
                        break;
                    case 42:
                    case 41:
                        love.graphics.setColor(195/255, 136/255, 195/255);
                        love.graphics.rectangle("fill", (x*this.size)+(this.gap*x), (y*this.size)+(this.gap*y), this.size, this.size, 10);
                        break;
                    case 52:
                    case 51:
                        love.graphics.setColor(91/255, 133/255, 133/255);
                        love.graphics.rectangle("fill", (x*this.size)+(this.gap*x), (y*this.size)+(this.gap*y), this.size, this.size, 10);
                        break;
                    default:
                        break;
                }
                i++;
            }
        }
    }

    public GetIndexByPosition(x: number, y: number){
        return (y*this.width)+x;
    }

    public GetPositionByIndex(index: number): {x: number, y:number}{
        let a: {x: number, y: number};
        a.y = Math.floor(index/this.width);
        a.x = index-(a.y*this.width);
        return a;
    }

    public getCellPositions(num: number): {x: number, y:number}[]{
        let a = [];
        let i = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.height; x++) {
                switch (this.map[i]) {
                    case num:
                        a.push({x: x, y: y});
                        break;
                    default:
                        break;
                }
                i++;
            }
        }
        return a;
    }

    public GetCell(x: number, y: number): number{
        return (this.map[y*this.width+x] == 2)?0: this.map[y*this.width+x];
    }

    public GetSpawnPoints(){
        return this.getCellPositions(2);
    }
}