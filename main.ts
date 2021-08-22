import { KeyConstant, Scancode } from 'love.keyboard';
import { directions } from './scripts/lib/utils';
import Map from './scripts/map';
import Player from './scripts/player';

let map: Map;
let player1: Player;
let player2: Player;

love.load = () => {
    map = new Map(5, 5, 100, 5);
    player1 = new Player({x: 1, y: 1}, map);
    player2 = new Player({x: 1, y: 3}, map);

    player1.LinkPlayers(player2);
    player2.LinkPlayers(player1);
}

love.update = () => {

}

love.draw = () => {
    love.graphics.setColor(.9, .9, .8);
    map.Draw();

    love.graphics.setColor(1, 0, 0);
    player1.Draw(map);
    love.graphics.setColor(0, 1, 0);
    player2.Draw(map);

    love.graphics.setColor(1, 1, 1);
    love.graphics.setLineWidth(10);
    love.graphics.line(player1.position.x+map.size/2, player1.position.y+map.size/2, player2.position.x+map.size/2, player2.position.y+map.size/2);
}

love.keypressed = (key: KeyConstant, scancode: Scancode, isrepeat: boolean) => {
    switch (key) {
        case "w":
            player1.Move(directions.UP, map);            
            player2.Move(directions.UP, map);
            break;
        case "d":
            player1.Move(directions.RIGHT, map);            
            player2.Move(directions.RIGHT, map);
            break;
        case "s":
            player1.Move(directions.DOWN, map);            
            player2.Move(directions.DOWN, map);
            break;
        case "a":
            player1.Move(directions.LEFT, map);            
            player2.Move(directions.LEFT, map);
            break;
    
        default:
            break;
    }
}