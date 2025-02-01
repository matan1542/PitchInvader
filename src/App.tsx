import React from 'react'

import { playersMock } from './__mocks__/playersMock'
import './App.css'
import SquadBuilder from './components/SquadBuilder'

const App = () => {
  return (
    <SquadBuilder players={playersMock} defaultJerseyColor={"rgb(0,0,0)"} defaultJerseyTextColor={"#FFFF00"} formationTextColor="#FF0000"/>
  )
}
export default App
