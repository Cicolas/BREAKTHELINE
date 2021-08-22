import { play } from "love.audio";
import { print } from "love.graphics";
import {IVector, directions} from "./lib/utils";
import Map from './map';

//TODO: IMPLEMNTS A PLAYER CONTROL TO AVOID BUGS RELATED TO THE COLLISION BETWEEN THE LINKEDBODIES

export default class Player {
    public position: IVector;
    private gridPosition: IVector;
    
    public linkedPlayer: Player;

    constructor(position: IVector, map: Map) {
        this.MoveInGrid(position, map);
        this.gridPosition = position;
    }

    public LinkPlayers(player: Player){
        this.linkedPlayer = player;
    }

    public MoveInGrid(position: IVector, map: Map){
        this.gridPosition = position;
        this.position = map.GetPosition(position.x, position.y);
    }

    public Draw(map: Map){
        love.graphics.rectangle("fill", this.position.x, this.position.y, map.size, map.size);
    }

    public Move(direction: directions, map: Map){
        switch (direction) {
            case directions.UP:
                if (this.gridPosition.y > 0 && !this.VerifyCollision(direction)) {
                    this.gridPosition.y--;
                }
                break;
            case directions.RIGHT:
                if (this.gridPosition.x < map.width-1 && !this.VerifyCollision(direction)) {
                    this.gridPosition.x++;
                }                
                break;
            case directions.DOWN:
                if (this.gridPosition.y < map.height-1 && !this.VerifyCollision(direction)) {
                    this.gridPosition.y++;
                }                
                break;
            case directions.LEFT:
                if (this.gridPosition.x > 0 && !this.VerifyCollision(direction)) {
                    this.gridPosition.x--;
                }               
                break;
            default:
                break;
        }
        
        this.MoveInGrid(this.gridPosition, map);
    }

    public VerifyCollision(direction: directions): boolean{
        let pretendingPosition: IVector = {x: 0, y: 0};
        pretendingPosition.x = this.gridPosition.x;
        pretendingPosition.y = this.gridPosition.y;
        switch (direction) {
            case directions.UP:
                pretendingPosition.y--;
                if (this.linkedPlayer.gridPosition.y == pretendingPosition.y && this.linkedPlayer.gridPosition.x == pretendingPosition.x) {
                    return true;
                }
                break;
            case directions.RIGHT:
                pretendingPosition.x++;
                if (this.linkedPlayer.gridPosition.y == pretendingPosition.y && this.linkedPlayer.gridPosition.x == pretendingPosition.x) {
                    return true;
                }    
                break;
            case directions.DOWN:
                pretendingPosition.y++;
                if (this.linkedPlayer.gridPosition.y == pretendingPosition.y && this.linkedPlayer.gridPosition.x == pretendingPosition.x) {
                    return true;
                }   
                break;
            case directions.LEFT:
                pretendingPosition.x--;
                if (this.linkedPlayer.gridPosition.y == pretendingPosition.y && this.linkedPlayer.gridPosition.x == pretendingPosition.x) {
                    return true;
                }  
                break;
            default:
                return false;
                break;
        }
    }
}