import { PositionType } from "../../../types";

export type HandlePositionClick = (positionType: PositionType, index:number)=> void;

export type HandleFormationChange = (newFormation:string) => void