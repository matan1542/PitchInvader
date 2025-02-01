import { Button, Modal } from 'flowbite-react';
import { translate } from './i18n/translate'
import PlayerCard from './PlayerCard'
import { Fragment } from 'react';
import { isSelected } from './utils';
import { Player } from '../types';
import React from 'react'

interface PlayerSelectModalProps {
    playerSelectModalOpen: boolean;
    setPlayerSelectModalOpen: (open: boolean) => void;
    currentPositionType: string;
    availablePlayers: Player[];
    addPlayerToPitch: (player: Player) => void;
    selectedPlayers: Player[];
    lang: string | null;
}
export default function PlayerSelectModal({ playerSelectModalOpen, setPlayerSelectModalOpen, currentPositionType, availablePlayers, addPlayerToPitch, selectedPlayers, lang }: PlayerSelectModalProps) {
    let suitablePlayers = availablePlayers.filter((player) => (player.positionType === currentPositionType ||
        player["alternativePositions"].split(/[,;\/\s]+/).includes(currentPositionType)) &&
        isSelected(selectedPlayers, player) === false);
    return (
        <>
            <Modal className="squad-builder-tailwind" show={playerSelectModalOpen} onClose={() => setPlayerSelectModalOpen(false)}>
                <Modal.Header><span className="modal-title">{translate(`positionPlural.${currentPositionType}`, lang)}</span></Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {suitablePlayers.length > 0 ?
                            <div className="player-block grid grid-cols-2 md:grid-cols-3 gap-4">
                                {suitablePlayers.map((player, id) => {
                                    return (
                                        <Fragment key={id}>
                                            <PlayerCard player={player} id={id} lang={lang} onClickFunc={() => { setPlayerSelectModalOpen(false); addPlayerToPitch(player) }} />
                                        </Fragment>
                                    )
                                })

                                }
                            </div>
                            :
                            <div className="text-center text-2xl">
                                <p>{translate("playerSelectModal.noMore", lang)}</p>
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4
                     focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-0.5
                    text-center me-2 mb-2" onClick={() => setPlayerSelectModalOpen(false)}>{translate("playerSelectModal.closeModal", lang)}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}