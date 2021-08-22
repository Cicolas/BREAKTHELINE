export interface IVector{
    x: number,
    y: number
}

export interface IBody extends IVector{
    vel: IVector;
}

export enum directions{
    UP,
    RIGHT,
    DOWN,
    LEFT
}