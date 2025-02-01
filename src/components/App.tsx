import React, { useState, useEffect } from 'react'
import Pitch from './Pitch/Pitch.js'
import PlayerSelectModal from './PlayerSelectModal.js'
import { renderPositions, renderFormationSelector } from './Pitch/utils/renderers.js'
import InformationModal from './InformationModal.js'
import SettingsModal from './SettingsModal.js'
import { availableFormations } from './Data/formations.js'
import { ColorSettings, DISPLAY_SHIRT_ATTRIBUTES, FormationsData, Player, Position, PositionType } from '../types/index.js'

interface AppProps {
    players: Player[];
    defaultJerseyColor: string;
    defaultJerseyTextColor: string;
    formationTextColor: string;
    lang: string | null;
}
function App({ players, defaultJerseyColor, defaultJerseyTextColor, formationTextColor, lang, }: AppProps) {
    const [_selectedFormation, setSelectedFormation] = useState<string>("") // The current selected formation
    const [formationsData, setFormationsData] = useState<FormationsData | null>(null) // The available formations and their data
    const [playerPositions, setPlayerPositions] = useState<Position[]>([]) // The positions of the palyers on the pitch (For example which position to render the GK to)
    const [playerSelectModalOpen, setPlayerSelectModalOpen] = useState(false) // Is modal open to pick player (Activate by clicking a position on the starting XI)

    const [informationModalOpen, setInformationModalOpen] = useState(false) // Storing wheter the modal showing information open or closed (For example it pops up when user tries to add a GK to any other position)
    const [settingsModalOpen, setSettingsModalOpen] = useState(false) // Is the "settings" modal open

    const [informationModalType, setInformationModalType] = useState("info") // Information modal can be info or wrong_position
    const [informationModalMessage, setInformationModalMessage] = useState("") // Allowing to set modal's message dynamically (this state stores it)

    const [currentPositionType, setCurrentPositionType] = useState("attacker") // The position type the user is picking to add (attacker/midfielder/defender/goalkeeper)
    const [availablePlayers, _setAvailablePlayers] = useState(players) // All of the available players that user can add

    const [selectedPosition, setSelectedPosition] = useState<number | null>(null) // The current position the user is picking (from the modal) which player to add
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]) // Keeping track of the selected player by the user (a.k.a. members of the starting XI)
    const [selectedPlayerFromBench, setSelectedPlayerFromBench] = useState<Player | null>(null) // The player the user selected from the bench to add to the squad
    const [isToastOpen, setIsToastOpen] = useState(false) // Toast that showing the player that we want add from the bench to the startign XI (selected player)
    const [shirtDisplayType, setShirtDisplayType] = useState<DISPLAY_SHIRT_ATTRIBUTES>(DISPLAY_SHIRT_ATTRIBUTES.DISPLAY_NUMBER) // State to store what to display on the shirt (shirt Number like "11" or Postition like "ST")

    const [colorSettings, setColorSettings] = useState<ColorSettings>({ starterShirtColor: defaultJerseyColor, shirtTextColor: defaultJerseyTextColor }) // Keep track of the jersey's colors settings

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [_screenHeight, setScreenHeight] = useState(window.innerHeight)

    const updateDimensions = () => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
    }

    const handleFormationChange = (newFormation: string) => {
        setSelectedFormation(newFormation) // Chaning to formation
        setPlayerPositions(formationsData ? formationsData[newFormation]["positions"] : []) // Loading the position data
    }

    const addPlayerToPitch = (player: Player) => { //Adding a player to the pitch
        let oldSelectedPlayers = selectedPlayers;
        oldSelectedPlayers = oldSelectedPlayers.filter(selectedPlayer => selectedPlayer["positionOnPitch"] !== selectedPosition); // Checking if player has been alreay added to this position, if yes filter it out
        player["positionOnPitch"] = selectedPosition ?? 0; // Adding to the correct position
        setSelectedPlayers([...oldSelectedPlayers, player]) // Adding to the starting XI
        setSelectedPosition(null) // Resetting the current selected position to null (Player added successfully to pitch)
    }

    const handlePositionClick = (positionType: PositionType, index: number) => { // Handle clicking on a player position on the pitch
        if (selectedPlayerFromBench === null) // If user want to add player from the the modal (not from the bench)
        {
            setCurrentPositionType(positionType); // Setting the type of the position
            setSelectedPosition(index); // Setting the id(the exact position) to know where to add
            setPlayerSelectModalOpen(true); // Opening the modal
        }
        else // If user  want to add/swap player from the bench into the squad
        {
            addPlayerFromBenchToSquad(index, positionType)
        }
    }

    const addPlayerFromBenchToSquad = (index: number, positionType: PositionType) => { // swap Player from bench and starting XI or adding from the bench to the starting XI
        setIsToastOpen(false) // Closing the toast indicating whic player we slected from the bench
        if (selectedPlayerFromBench && selectedPlayerFromBench["positionType"] !== positionType &&
            !selectedPlayerFromBench["alternativePositions"].split(/[,;\/\s]+/).includes(positionType)) { // If the selected player's position is not compatible with the position we want to put him in
            setSelectedPlayerFromBench(null) // Setting the player selected from the bench back to null
            setInformationModalOpen(true) // Open the information modal
            setInformationModalType("wrong_position")
            setInformationModalMessage(`${selectedPlayerFromBench["name"]},${selectedPlayerFromBench["positionType"]},${positionType}`)
            return
        }
        let oldSelectedPlayers = selectedPlayers;
        oldSelectedPlayers = oldSelectedPlayers.filter(selectedPlayer => selectedPlayer.positionOnPitch !== index); // Filter out the player on the selected position

        const currenctSelectedPlayerPositionOnPitch = {
            ...(selectedPlayerFromBench ?? {}),
            positionOnPitch: index ?? 0
        } as Player;
        
        setSelectedPlayers([...oldSelectedPlayers, currenctSelectedPlayerPositionOnPitch]) // Adding player to the starting XI
        setSelectedPlayerFromBench(null) // Setting the player selected from the bench back to null
    }

    const removePlayerFromPitch = (e: React.MouseEvent<SVGSVGElement>, index: number) => { // Removing player from the starting XI
        e.stopPropagation(); // Stopping the PlayerSelectModal from opening
        let oldSelectedPlayers = selectedPlayers
        setSelectedPlayers(oldSelectedPlayers.filter(player => player.positionOnPitch !== index)) // Filter out the player from the selected players(starting XI) that on the position we want to clear
    }

    useEffect(() => { // loading the formations and setting some default values
        try {
            let jsonData = Object.entries(availableFormations); setFormationsData(availableFormations); setPlayerPositions(jsonData[0][1]["positions"]); setSelectedFormation(jsonData[0][0])
        } catch (error) {
            console.error('Error loading formations:', error)
        }
        //We need to determine the screen size in order to show the correct pitch on desktop and mobile(mobile one is different)
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    return (
        <div id="squad-builder">
            <Pitch renderPositions={() => renderPositions({
                playerPositions, selectedPlayers, selectedPlayerFromBench, removePlayerFromPitch, screenWidth,
                handlePositionClick, shirtDisplayType, colorSettings, lang
            })}
                renderFormationSelector={() => renderFormationSelector(handleFormationChange, Object.keys(formationsData ?? {}))}
                availablePlayers={availablePlayers} selectedPlayers={selectedPlayers} selectedPlayerFromBench={selectedPlayerFromBench} formationTextColor={formationTextColor}
                lang={lang} setSelectedPlayerFromBench={setSelectedPlayerFromBench} isToastOpen={isToastOpen} setIsToastOpen={setIsToastOpen} setSettingsModalOpen={setSettingsModalOpen} />
            <PlayerSelectModal playerSelectModalOpen={playerSelectModalOpen} setPlayerSelectModalOpen={setPlayerSelectModalOpen} currentPositionType={currentPositionType}
                availablePlayers={availablePlayers} addPlayerToPitch={addPlayerToPitch} selectedPlayers={selectedPlayers} lang={lang} />
            <InformationModal informationModalOpen={informationModalOpen} setInformationModalOpen={setInformationModalOpen}
                informationModalType={informationModalType} informationModalMessage={informationModalMessage} lang={lang} />
            <SettingsModal settingsModalOpen={settingsModalOpen} setSettingsModalOpen={setSettingsModalOpen}
                shirtDisplayType={shirtDisplayType} setShirtDisplayType={setShirtDisplayType} colorSettings={colorSettings} setColorSettings={setColorSettings} lang={lang} />
        </div>
    )
}

export default App
