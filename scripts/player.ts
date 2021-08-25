import { math } from "love";
import { play } from "love.audio";
import { print } from "love.graphics";
import {IVector, directions} from "./lib/utils";
import Map from './map';

//TODO: IMPLEMNTS A PLAYER CONTROL TO AVOID BUGS RELATED TO THE COLLISION BETWEEN THE LINKEDBODIES

export default class Player {
    public position: IVector;
    public gridPosition: IVector;
        
    public linkedPlayer: Player;
    public moved: boolean;

    private teleported: boolean;

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
        let cell: number = this.VerifyCollision(direction, map);

        switch (direction) {
            case directions.UP:
                if (cell == 0 || cell == 3 || cell == 4) {
                    this.gridPosition.y--;
                }
                break;
            case directions.RIGHT:
                if (cell == 0 || cell == 3 || cell == 4) {
                    this.gridPosition.x++;
                }                
                break;
            case directions.DOWN:
                if (cell == 0 || cell == 3 || cell == 4) {
                    this.gridPosition.y++;
                }                
                break;
            case directions.LEFT:
                if (cell == 0 || cell == 3 || cell == 4) {
                    this.gridPosition.x--;
                }               
                break;
            default:
                break;
        }
        if (
            cell == 3 &&
            (
                (
                    !this.linkedPlayer.moved &&
                    this.linkedPlayer.VerifyCollision(direction, map) != 3
                ) ||
                (
                    this.linkedPlayer.moved &&
                    this.linkedPlayer.VerifyCollision(directions.NOTHING, map) != 3
                )
            )
        ){
            this.gridPosition = (map.GetCell(this.gridPosition.x, this.gridPosition.y) == 41)?map.getCellPositions(42)[0]:map.getCellPositions(41)[0];
        }
        if (
            cell == 4 &&
            (
                (
                    !this.linkedPlayer.moved &&
                    this.linkedPlayer.VerifyCollision(direction, map) != 4
                ) ||
                (
                    this.linkedPlayer.moved &&
                    this.linkedPlayer.VerifyCollision(directions.NOTHING, map) != 4
                )
            )
        ) {
            this.gridPosition = (map.GetCell(this.gridPosition.x, this.gridPosition.y) == 51)?map.getCellPositions(52)[0]:map.getCellPositions(51)[0];
        }
        
        this.moved = true;
        this.MoveInGrid(this.gridPosition, map);
    }

    public FinishTheMoveFase(){
        this.moved = false;
    }

    public VerifyCollision(direction: directions, map: Map): number{
        let pretendingPosition: IVector = {x: this.gridPosition.x, y: this.gridPosition.y};
        let pretendingCell: number;

        switch (direction) {
            case directions.UP:
                pretendingPosition.y--;
                break;
            case directions.RIGHT:
                pretendingPosition.x++;
                break;
            case directions.DOWN:
                pretendingPosition.y++;
                break;
            case directions.LEFT:
                pretendingPosition.x--;
                break;
            default:
                break;
        }
        pretendingCell = map.GetCell(pretendingPosition.x, pretendingPosition.y);

        if (pretendingCell == 1 || pretendingCell == 3) {
            return 1;
        }

        if (this.linkedPlayer.gridPosition.x == pretendingPosition.x &&
            this.linkedPlayer.gridPosition.y == pretendingPosition.y) {
            if (this.linkedPlayer.VerifyCollision(direction, map) == 0) {
                return 0;
            }
            return 2;
        }
        
        if (pretendingCell == 41 || 
            pretendingCell == 42) {
            return 3;
        }
        if (pretendingCell == 51 || 
            pretendingCell == 52) {
            return 4;
        }

        return 0;
    }

    public getPoints(): number{
        let a: IVector = {x: 0, y: 0};
        a.x = (this.linkedPlayer.gridPosition.x-this.gridPosition.x);
        a.y = (this.linkedPlayer.gridPosition.y-this.gridPosition.y);
        let b: number = Math.sqrt((a.x*a.x)+(a.y*a.y));

        if (b == 3) {
            b--;
        }
        
        return b;
    }
}