import { KeyConstant, Scancode } from 'love.keyboard';
import { directions } from './scripts/lib/utils';
import Player from './scripts/player';
import Level from 'maps/Level';
import IColor from 'definition/colors';
import { RGB } from 'love.math';
import { Canvas, newCanvas } from 'love.graphics';

import Level1 from './maps/1';
import Level2 from './maps/2';
import Level3 from './maps/3';
import Level4 from './maps/4';
import Level5 from './maps/5';
import Level6 from './maps/6';

enum States{
    DEFAULT,
    MENU,
    PLAYING,
    WAITING,
    END
}

const PLAYERCOLORS: RGB[] = [
    [89/255, 86/255, 169/255],
    [166/255, 169/255, 86/255]
]
const MAXDIST: Number = 2.8;
const LEVELS: Level[] = [
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6
];
const CANVASES: {[id: string] : Canvas} = {
    "game": love.graphics.newCanvas(595, 595), //game
    "UI": love.graphics.newCanvas(595, 595) //UI
}
const FONT = love.graphics.newFont("fonts/alagard.ttf", 16);

let actualLevel: number = 4;

let player1: Player;
let player2: Player;

let state: States;

love.load = () => {
    FONT.setFilter("nearest", "nearest", 0);

    state = States.PLAYING;

    LEVELS.forEach(l => {
        l.mapObj.SetMap(l.__map);
    });

    SetPlayers();
}

love.update = () => {
    switch (state) {
        case States.PLAYING:
            player1.Update(LEVELS[actualLevel].mapObj);
            player2.Update(LEVELS[actualLevel].mapObj);
            if (player1.getPoints() > MAXDIST) {
                BreakRope();
            }
            break;    
        default:
            break;
    }
}

love.draw = () => {
    love.graphics.setFont(FONT);
    love.graphics.setDefaultFilter("nearest", "nearest", 0);

    switch (state) {
        case States.PLAYING:
            // GAME
            love.graphics.setCanvas(CANVASES["game"]);
            love.graphics.clear(136/255, 195/255, 195/255, 1);
            LEVELS[actualLevel].mapObj.Draw();
        
            love.graphics.setColor(PLAYERCOLORS[0]);
            player1.Draw(LEVELS[actualLevel].mapObj);
            love.graphics.setColor(PLAYERCOLORS[1]);
            player2.Draw(LEVELS[actualLevel].mapObj);

            love.graphics.setColor(1, 1, 1);
            love.graphics.print(player1.getPoints().toString());
        
            love.graphics.setLineWidth(2.8/player1.getPoints());
            love.graphics.line(
                player1.position.x+LEVELS[actualLevel].mapObj.size/2, 
                player1.position.y+LEVELS[actualLevel].mapObj.size/2, 
                player2.position.x+LEVELS[actualLevel].mapObj.size/2, 
                player2.position.y+LEVELS[actualLevel].mapObj.size/2
            );
            love.graphics.setCanvas();

            love.graphics.draw(CANVASES["game"]);
            break;
        case States.WAITING:
            // GAME
            love.graphics.setCanvas(CANVASES["game"]);
            love.graphics.clear(136/255, 195/255, 195/255, 1);
            LEVELS[actualLevel].mapObj.Draw();
        
            love.graphics.setColor(PLAYERCOLORS[0]);
            player1.Draw(LEVELS[actualLevel].mapObj);
            love.graphics.setColor(PLAYERCOLORS[1]);
            player2.Draw(LEVELS[actualLevel].mapObj);

            love.graphics.setColor(1, 1, 1);
            love.graphics.print(player1.getPoints().toString());
        
            love.graphics.setLineWidth(2.8/player1.getPoints());
            love.graphics.setCanvas();

            //UI
            love.graphics.setCanvas(CANVASES["UI"]);
            love.graphics.setColor(1, 1, 1);
            love.graphics.clear(0, 0, 0, 0);
            
            love.graphics.setColor(0, 0, 0, .7);
            love.graphics.rectangle(
                "fill", 
                love.graphics.getWidth()/10-5, 
                love.graphics.getHeight()/4-5, 
                love.graphics.getWidth()-love.graphics.getWidth()/5,
                love.graphics.getHeight()-love.graphics.getHeight()/2
                )
            
            
            love.graphics.setColor(1, 1, 1);
            love.graphics.printf(
                "Level "+(actualLevel+1)+" finished!!!", 
                love.graphics.getWidth()/10-5, 
                love.graphics.getHeight()/4+40-5, 
                love.graphics.getWidth()-love.graphics.getWidth()/1.675,
                "center",
                0,
                2, 2
            );
            love.graphics.printf(
                "\"Sometimes you just need a water a meal and kiss\"", 
                love.graphics.getWidth()/4-5, 
                love.graphics.getHeight()-love.graphics.getHeight()/2-5, 
                love.graphics.getWidth()-love.graphics.getWidth()/2,
                "center",
                0,
                1, 1
            );
            love.graphics.setColor(78/255, 194/255, 78/255);
            love.graphics.printf(
                "Press space to continue", 
                love.graphics.getWidth()/10-5, 
                love.graphics.getHeight()-love.graphics.getHeight()/4-65, 
                love.graphics.getWidth()-love.graphics.getWidth()/5,
                "center",
                0,
                1, 1
            );
            love.graphics.setColor(194/255, 92/255, 78/255);
            love.graphics.printf(
                "Press r to restart", 
                love.graphics.getWidth()/10-5, 
                love.graphics.getHeight()-love.graphics.getHeight()/4-45, 
                love.graphics.getWidth()-love.graphics.getWidth()/5,
                "center",
                0,
                1, 1
            );

            love.graphics.setCanvas();
            
            love.graphics.setColor(1, 1, 1);
            love.graphics.draw(CANVASES["game"]);
            love.graphics.draw(CANVASES["UI"]);
            break;
        default:
            break;
    }
}

love.keypressed = (key: KeyConstant, scancode: Scancode, isrepeat: boolean) => {
    switch (state) {
        case States.PLAYING:
            switch (key) {
                case "up":
                case "w":
                    player1.Move(directions.UP, LEVELS[actualLevel].mapObj);            
                    player2.Move(directions.UP, LEVELS[actualLevel].mapObj);
                    break;
                case "right":
                case "d":
                    player1.Move(directions.RIGHT, LEVELS[actualLevel].mapObj);            
                    player2.Move(directions.RIGHT, LEVELS[actualLevel].mapObj);
                    break;
                case "down":
                case "s":
                    player1.Move(directions.DOWN, LEVELS[actualLevel].mapObj);            
                    player2.Move(directions.DOWN, LEVELS[actualLevel].mapObj);
                    break;
                case "left":
                case "a":
                    player1.Move(directions.LEFT, LEVELS[actualLevel].mapObj);            
                    player2.Move(directions.LEFT, LEVELS[actualLevel].mapObj);
                    break;
                case "r":
                    loadLevel(actualLevel);
                default:
                    break;
            }
            player1.FinishTheMoveFase();
            player2.FinishTheMoveFase();
            break;
        case States.WAITING:
            if (key == "r") {
                loadLevel(actualLevel);
            }
            loadLevel(actualLevel+1);
        default:
            break;
    }
}

function loadLevel(level: number): void {
    if (level >= LEVELS.length) {
        return
    }
    actualLevel = level;
    SetPlayers();
    state = States.PLAYING;
}

function BreakRope(): void {
    state = States.WAITING;
}

function SetPlayers() {
    player1 = new Player(LEVELS[actualLevel].mapObj.GetSpawnPoints()[0], Level1.mapObj);
    player2 = new Player(LEVELS[actualLevel].mapObj.GetSpawnPoints()[1], Level1.mapObj);

    player1.LinkPlayers(player2);
    player2.LinkPlayers(player1);
}

