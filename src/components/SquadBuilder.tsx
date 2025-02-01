import App from './App'
import './index.css'
import { Player } from '../types'
import React from 'react'

interface SquadBuilderProps {
  players: Player[];
  defaultJerseyColor?: string;
  defaultJerseyTextColor?: string;
  formationTextColor?: string;
  lang?: string | null;
}

export default function SquadBuilder({
  players,
  defaultJerseyColor = "#9B1C1C",
  defaultJerseyTextColor = "#FFFFFF",
  formationTextColor = "#000000",
  lang = null
}: SquadBuilderProps): JSX.Element {
  return (
    <div className="squad-builder-tailwind">
      <App 
        players={players}
        defaultJerseyColor={defaultJerseyColor}
        defaultJerseyTextColor={defaultJerseyTextColor}
        formationTextColor={formationTextColor}
        lang={lang}
      />
    </div>
  )
}