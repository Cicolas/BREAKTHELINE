import { KeyConstant, Scancode } from 'love.keyboard';
import { directions, IVector } from './scripts/lib/utils';
import Player from './scripts/player';
import Level from 'maps/Level';
import { RGB } from 'love.math';
import { Canvas, print } from 'love.graphics';

import Level1 from './maps/1';
import Level2 from './maps/2';
import Level3 from './maps/3';
import Level4 from './maps/4';
import Level5 from './maps/5';
import Level6 from './maps/6';
import Level7 from './maps/7';
import Level8 from './maps/8';
import Level9 from './maps/9';
import UI from 'scripts/UI';
import GetQuote from 'scripts/quotes';
import { Source } from 'love.audio';

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
    Level6,
    Level7,
    Level8,
    Level9
];
const CANVASES: {[id: string] : Canvas} = {
    "game": love.graphics.newCanvas(595, 595, {msaa: 0}), //game
    "UI": love.graphics.newCanvas(595, 595, {msaa: 0}) //UI
}
const FONT = love.graphics.newFont("fonts/alagard.ttf", 16);
const MENUFONT = love.graphics.newFont("fonts/Pixeland.ttf", 64);
const ENDFONT = love.graphics.newFont("fonts/Daydream.ttf", 32);
const BGSOUND = love.audio.newSource("audio/water.wav", "stream");
const MOVESOUND = love.audio.newSource("audio/move.wav", "static");

let actualLevel: number = 0;

let player1: Player;
let player2: Player;

let state: States;

let quote: string = GetQuote();

let canvasScale: number = 1;
let offset: IVector = {x: 0, y: 0};

love.load = () => {
    FONT.setFilter("nearest", "nearest", 0);
    MENUFONT.setFilter("nearest", "nearest", 0);
    ENDFONT.setFilter("nearest", "nearest", 0);

    state = States.MENU;

    LEVELS.forEach(l => {
        l.mapObj.SetMap(l.__map);
    });

    SetPlayers();

    MOVESOUND.setVolume(.7);

    BGSOUND.setLooping(true);
    BGSOUND.setVolumeLimits(0, .5);
    love.audio.play(BGSOUND);
}

love.update = (dt) => {
    switch (state) {
        case States.MENU:
            UI.update(dt);
            break;
        case States.PLAYING:
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
    love.graphics.setBackgroundColor(136/255, 195/255, 195/255, 1);

    switch (state) {
        case States.MENU:
            love.graphics.setCanvas(CANVASES["UI"]);
            love.graphics.clear(136/255, 195/255, 195/255, 1);
            love.graphics.setFont(MENUFONT);
            UI.draw(80);

            love.graphics.setFont(FONT);
            love.graphics.setColor(1, 1, 1);
            love.graphics.printf(
                "Press space to start", 
                0, 
                love.graphics.getHeight()-70, 
                love.graphics.getWidth(),
                "center",
                0,
                1, 1
            );
            love.graphics.setCanvas();
            
            love.graphics.setColor(1, 1, 1);
            love.graphics.draw(CANVASES["UI"]);
            break;
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
            love.graphics.setLineWidth(2.8/player1.getPoints());
            love.graphics.line(
                player1.position.x+LEVELS[actualLevel].mapObj.size/2, 
                player1.position.y+LEVELS[actualLevel].mapObj.size/2, 
                player2.position.x+LEVELS[actualLevel].mapObj.size/2, 
                player2.position.y+LEVELS[actualLevel].mapObj.size/2
            );
            love.graphics.setCanvas();

            love.graphics.setColor(1, 1, 1);
            love.graphics.draw(CANVASES["game"], offset.x, offset.y, 0, canvasScale, canvasScale);
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
            love.graphics.setLineWidth(2.8/player1.getPoints());
            love.graphics.setCanvas();

            //UI
            love.graphics.setCanvas(CANVASES["UI"]);
            love.graphics.setColor(1, 1, 1);
            love.graphics.clear(0, 0, 0, 0);
            
            love.graphics.setColor(0, 0, 0, .7);
            love.graphics.rectangle(
                "fill", 
                love.graphics.getWidth()/5-5, 
                love.graphics.getHeight()/4-5, 
                love.graphics.getWidth()-love.graphics.getWidth()/2.5,
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
                quote, 
                love.graphics.getWidth()/4-5, 
                love.graphics.getHeight()-love.graphics.getHeight()/2-30, 
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
            love.graphics.draw(CANVASES["game"], offset.x, offset.y, 0, canvasScale, canvasScale);
            love.graphics.draw(CANVASES["UI"]);
            break;
        case States.END:
            love.graphics.setCanvas(CANVASES["UI"]);
            love.graphics.clear(136/255, 195/255, 195/255, 1);
            love.graphics.setFont(ENDFONT);
            UI.drawEnd();

            love.graphics.setFont(FONT);
            love.graphics.setColor(0, 0, 0);
            love.graphics.printf(
                "Thank you for playing",
                0, 90,
                love.graphics.getWidth()/1.5,
                "center",
                0, 
                1.5, 1.5
            )
            love.graphics.setColor(1, 1, 1);
            love.graphics.printf(
                "Progammer: @Cicolas_\nArt: @Cicolas_\nGame Design: @Cicolas_\n\nMy GitHub: @Cicolas\nMy Twitter: @Cicolas_ (PT/EN/ES)",
                0, 
                love.graphics.getHeight()/2-42,
                love.graphics.getWidth(),
                "center",
                0, 
                1, 1
            )
            love.graphics.setColor(0, 0, 0);
            love.graphics.printf(
                "Press space to finish", 
                0, 
                love.graphics.getHeight()-70, 
                love.graphics.getWidth(),
                "center",
                0,
                1, 1
            );
            love.graphics.setCanvas();
            
            love.graphics.setColor(1, 1, 1);
            love.graphics.draw(CANVASES["UI"]);
        default:
            break;
    }

}

love.keypressed = (key: KeyConstant, scancode: Scancode, isrepeat: boolean) => {
    switch (state) {
        case States.MENU:
            switch (key) {
                case "space":
                    loadLevel(actualLevel);
                    break;
                default:
                    break;
            }
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
                    break;
                default:
                    break;
            }
            if (player1.canBeMoved || player2.canBeMoved) {
                let audio: Source = MOVESOUND.clone();
                love.audio.play(audio);
            }
            player1.FinishTheMoveFase();
            player2.FinishTheMoveFase();
            break;
        case States.WAITING:
            switch (key) {
                case "r":
                    loadLevel(actualLevel);
                    break;
                case "space":
                    loadLevel(actualLevel+1);
                    break;
                default:
                    break;
            }
            break;
        case States.END:
            switch (key) {
                case "space":
                    Reset();
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}

love.resize = (w: number, h: number) => {
    CANVASES["UI"] = love.graphics.newCanvas(w, h);

    canvasScale = Math.min(w/595, h/595);

    offset.x = (w - (595 * canvasScale))/2;
    offset.y = (h - (595 * canvasScale))/2;
}

function loadLevel(level: number): void {
    if (level >= LEVELS.length) {
        state = States.END;
        return;
    }
    actualLevel = level;
    SetPlayers();
    state = States.PLAYING;
    quote = GetQuote();
}

function Reset(): void {
    actualLevel = 0;
    state = States.MENU;
}

function BreakRope(): void {
    state = States.WAITING;
}

function SetPlayers() {
    player1 = new Player(LEVELS[actualLevel].mapObj.GetSpawnPoints()[0], LEVELS[actualLevel].mapObj);
    player2 = new Player(LEVELS[actualLevel].mapObj.GetSpawnPoints()[1], LEVELS[actualLevel].mapObj);

    player1.LinkPlayers(player2);
    player2.LinkPlayers(player1);
}

