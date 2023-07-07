import GameComponent from '../components/Game';
import React, { useState } from 'react';
import PlayerComponent from '../components/Player';
import styles from './ConfigurationScreen.module.css';
import coffeeCupImage from "../images/coffee-is-love.gif";

const ConfigurationScreen = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [availablePlayers, setAvailablePlayers] = useState([]);

    const handleSelectGame = (game) => {
        setSelectedGame(game);
        // Handle the selected game data as needed
        console.log('Selected game:', selectedGame);
    };
    const handleSelectPlayers = (players) => {
        setAvailablePlayers(players);
        console.log('Available:', availablePlayers);
    }

    return (
        <div className={styles.container}>
            {/* <div className={styles.segment1}>
                <GameComponent onSelectGame={handleSelectGame} />
            </div> */}
            <div className={styles.segment2}>
                <img src={coffeeCupImage} alt="Coffee Cup" />
                <PlayerComponent onSelectPlayers={handleSelectPlayers} gameState={selectedGame !== null} />
            </div>
        </div>
    );
};

export default ConfigurationScreen;
