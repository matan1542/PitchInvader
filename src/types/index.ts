export type PositionType = 'goalkeeper' | 'defender' | 'midfielder' | 'attacker';
export enum DISPLAY_SHIRT_ATTRIBUTES {
    DISPLAY_NUMBER = "number",
    DISPLAY_POSITION = "position",
    DISPLAY_NOTHING = "nothing"
}

export interface ColorSettings { starterShirtColor: string, shirtTextColor: string }
export interface Player {
    id: number;
    positionType: PositionType;
    alternativePositions: string;
    name: string;
    shirtNumber: number;
    positionOnPitch?: number;
}

export interface Position {
    positionType: PositionType;
    positionName: string;
    bottom: {
        mobile: number;
        desktop: number;
    };
    right: {
        mobile: number;
        desktop: number;
    };
}

export interface Formation {
    positions: Position[];
}

export interface FormationsData {
    [key: string]: Formation;
}

export interface ColorSettings {
    starterShirtColor: string;
    shirtTextColor: string;
} 