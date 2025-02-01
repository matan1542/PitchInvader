import { Fragment } from 'react'
import { translate } from '../../i18n/translate.js'
import PositionOnPitch from '../../PositionOnPitch.js'
import CustomSelect from '../../CustomSelect.js'
import { ColorSettings, DISPLAY_SHIRT_ATTRIBUTES, Player, Position } from '../../../types/index.js'
import { HandleFormationChange, HandlePositionClick } from '../types/index.js'

interface RenderPositionsProps {
    playerPositions: Position[];
    selectedPlayers: Player[];
    selectedPlayerFromBench: Player | null;
    removePlayerFromPitch: (e: React.MouseEvent<SVGSVGElement>, index: number) => void;
    screenWidth: number;
    handlePositionClick: HandlePositionClick;
    shirtDisplayType: DISPLAY_SHIRT_ATTRIBUTES;
    colorSettings: ColorSettings;
    lang: string | null;
};

export function renderPositions({
    playerPositions, selectedPlayers, selectedPlayerFromBench,
    removePlayerFromPitch, screenWidth, handlePositionClick, shirtDisplayType, colorSettings, lang
}: RenderPositionsProps) {
    return (

        playerPositions.map((position, index) => { // mapping throught the positions
            const positionType = position.positionType // Getting the type of the position (attacker/midfielder/defender/goalkeeper)
            const addText = translate(`positionAdd.${positionType}`, lang) // Getting the translation of the add player label
            const playerOnPosition = selectedPlayers.find(player => player.positionOnPitch == index); // Getting the player that has been added to this position(if not yet it's undefined)
            return (
                <Fragment key={index}>
                    <div key={index} className="player-on-pitch absolute cursor-pointer"
                        style={{
                            bottom: `${screenWidth <= 1280 ? position.bottom["mobile"] : position.bottom["desktop"]}%`,
                            right: `${screenWidth <= 1280 ? position.right["mobile"] : position.right["desktop"]}%`,
                        }}
                        onClick={() => handlePositionClick(positionType, index)} >

                        <PositionOnPitch selectedPlayerFromBench={selectedPlayerFromBench} playerOnPosition={playerOnPosition as Player}
                            removePlayerFromPitch={removePlayerFromPitch} index={index} addText={addText} shirtDisplayType={shirtDisplayType}
                            colorSettings={colorSettings} position={position} />
                    </div>
                </Fragment>
            )
        })
    )
}

export function renderFormationSelector(handleFormationChange: HandleFormationChange, formationsData: string[]) { // rendering the formation selector when user can change the current formation
    return (
        <CustomSelect formationsData={formationsData} handleFormationChange={handleFormationChange}/>
    )
}