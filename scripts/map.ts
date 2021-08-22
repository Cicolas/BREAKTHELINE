export default class Map {
    private map: number[] = [];

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
                    case 0:
                        love.graphics.rectangle("fill", (x*this.size)+(this.gap*x), (y*this.size)+(this.gap*y), this.size, this.size);
                        break;
                
                    default:
                        break;
                }
                i++;
            }
        }
    }
}