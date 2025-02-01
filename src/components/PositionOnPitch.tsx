import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShirt, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { DISPLAY_SHIRT_ATTRIBUTES } from '../types'
import { Player, Position, ColorSettings } from '../types'

interface PositionOnPitchProps {
    selectedPlayerFromBench: Player | null;
    playerOnPosition: Player;
    removePlayerFromPitch: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => void;
    index: number;
    addText: string;
    shirtDisplayType: string;
    colorSettings: ColorSettings;
    position: Position;
}

export default function PositionOnPitch({ selectedPlayerFromBench, playerOnPosition, removePlayerFromPitch, index, addText, shirtDisplayType, colorSettings, position }: PositionOnPitchProps) {
    if (playerOnPosition === undefined) { // If player hasn't added to the position yet
        return (
            <>
                <FontAwesomeIcon icon={faPlus} className="text-2xl xl:text-4xl text-white absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                {
                    selectedPlayerFromBench === null ? // Selected Player is not null when user want to add a player from the bench to the squad
                        <>
                            <FontAwesomeIcon icon={faShirt} className="text-6xl xl:text-7xl text-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            {
                                addText.length <= 20 ?
                                    <span className="player-name bg-purple-100 text-purple-800 text-xs xl:text-base xl:leading-5 leading-4 font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[52px] xl:top-[62px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        dangerouslySetInnerHTML={{ __html: addText }}>
                                    </span>
                                    :
                                    <span className="player-name bg-purple-100 text-purple-800 text-xs xl:text-base xl:leading-5 leading-4 font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[52px] xl:top-[62px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        dangerouslySetInnerHTML={{ __html: addText }}>
                                    </span>
                            }
                        </>
                        :
                        <FontAwesomeIcon icon={faShirt} className="text-6xl xl:text-7xl text-blue-600 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                }
            </>
        )
    }
    let toDisplayOnShirt = null

    if(shirtDisplayType == DISPLAY_SHIRT_ATTRIBUTES.DISPLAY_NUMBER) {
        toDisplayOnShirt = (<span className="player-number text-2xl xl:text-3xl absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2" style={{color: colorSettings["shirtTextColor"]}}>{playerOnPosition["shirtNumber"]}</span>)
    } else if(shirtDisplayType === DISPLAY_SHIRT_ATTRIBUTES.DISPLAY_POSITION) {
        toDisplayOnShirt = (<span className="player-number text-xl xl:text-2xl absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2" style={{color: colorSettings["shirtTextColor"]}}>{position["positionName"]}</span>)
    }
    return (
        <>
            {
                selectedPlayerFromBench === null ? // Selected Player is not null when user want to add a player from the bench to the squad
                <>
                    <FontAwesomeIcon icon={faShirt} className="player-shirt text-6xl xl:text-7xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                     style={{color: colorSettings["starterShirtColor"]}}/>
                    <FontAwesomeIcon onClick={(e) => (removePlayerFromPitch(e, index))} icon={faCircleXmark} className="remove-btn text-2xl xl:text-2xl text-red-600 absolute z-20
                    top-1/4 pb-16 xl:pb-20 ml-8 xl:ml-10 transform -translate-y-1/2" />
                </>
                :
                <FontAwesomeIcon icon={faShirt} className="text-6xl xl:text-7xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                style={{color: colorSettings["starterShirtColor"]}}/>
            }

            {toDisplayOnShirt}
            
            {
                playerOnPosition["name"].length <= 20 ?
                <span className="player-name bg-purple-100 text-purple-800 text-xs xl:text-base xl:leading-5 leading-4 font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[51px] xl:top-[61px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    dangerouslySetInnerHTML={{ __html: playerOnPosition["name"] }}>
                </span>
                :
                <span className="player-name bg-purple-100 text-purple-800 text-xs xl:text-base xl:leading-5 leading-4 font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[51px] xl:top-[62px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    dangerouslySetInnerHTML={{ __html: playerOnPosition["name"] }}>
                </span>
            }
        </>
    )
}