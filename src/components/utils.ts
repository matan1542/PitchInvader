import { Player } from "../types"

export function isSelected(selectedPlayers:Player[], player:Player) {
    return selectedPlayers.find(selectedPlayer => {
        return selectedPlayer.id === player.id
    }) !== undefined
}