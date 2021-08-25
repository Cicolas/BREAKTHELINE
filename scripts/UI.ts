import { RGB } from "love.math";
import { IVector } from "./lib/utils";

const PLAYERCOLORS: RGB[] = [
    [89/255, 86/255, 169/255],
    [166/255, 169/255, 86/255]
]

export default class UI{
    private static player1Pos: IVector = {x: 200, y: love.graphics.getHeight()/2-40};
    private static player2Pos: IVector = {x: 100, y: love.graphics.getHeight()/2-40};

    public static update(dt){
        this.player1Pos.x += dt*60;
        this.player2Pos.x += dt*60;

        if (this.player2Pos.x >= love.graphics.getWidth()+20) {
            this.player1Pos.x = -100;
            this.player2Pos.x = -200;
        }

        this.player1Pos.y = love.graphics.getHeight()/2-40+CalculatePos(this.player1Pos.x+40, 10, 25);
        this.player2Pos.y = love.graphics.getHeight()/2-40+CalculatePos(this.player2Pos.x+40, 10, 25);
    }

    public static draw(boxSize: number){
        love.graphics.setColor(0, 0, 0);
        love.graphics.printf(
            "-BREAKTHELINE-",
            0, 20,
            love.graphics.getWidth(),
            "center"
        )

        love.graphics.setColor(PLAYERCOLORS[0]);
        love.graphics.rectangle("fill", this.player1Pos.x, this.player1Pos.y, boxSize, boxSize, 10);
        love.graphics.setColor(PLAYERCOLORS[1]);        
        love.graphics.rectangle("fill", this.player2Pos.x, this.player2Pos.y, boxSize, boxSize, 10);

        love.graphics.setColor(1, 1, 1);
        love.graphics.setLineWidth(3);
        love.graphics.line(DrawLine(
            {x: this.player2Pos.x+boxSize/2, y: this.player2Pos.y+boxSize/2},
            {x: this.player1Pos.x+boxSize/2, y: this.player1Pos.y+boxSize/2},
        ))
        // love.graphics.line(DrawLine(
        //     {x: 0, y: this.player2Pos.y+boxSize/2},
        //     {x: love.graphics.getWidth(), y: this.player1Pos.y+boxSize/2},
        // ))
    }

    static drawEnd() {
        love.graphics.setColor(1, 1, 1);
        love.graphics.printf(
            "The End",
            0, 20,
            love.graphics.getWidth(),
            "center"
        )
    }
}

function CalculatePos(x: number, amplitude: number, period: number): number{
    return Math.sin(x*2/period)*amplitude;
}

function DrawLine(a: IVector, b: IVector): number[]{
    let c: number[] = [];
    let d: number = (b.x-a.x)/10;

    for (let i = 0; i <= 10; i++) {
        const coeficient: number = a.x+(d*i);
        
        let v: IVector = {
            x: coeficient,
            y: CalculatePos(coeficient, 10, 25),
        };

        c.push(v.x);
        c.push(v.y+love.graphics.getHeight()/2);
    };

    return c;
}