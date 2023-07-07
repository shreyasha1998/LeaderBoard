import GameComponent from '../components/Game';
import React, { useState } from 'react';
import PlayerComponent from '../components/Player';
import styles from './ConfigurationScreen.module.css';
import coffeeCupImage from "../images/coffee-is-love.gif";

const ConfigurationScreen = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [showGame, setShowGame] = useState(false);
    const [availablePlayers, setAvailablePlayers] = useState([]);

    const handleSelectGame = (game) => {
        setSelectedGame(game);
        console.log('Selected game:', selectedGame);
    };
    const handleSelectPlayers = (players) => {
        setAvailablePlayers(players);
        console.log('Available:', availablePlayers);
    }

    const handleNext = (value) => {
        setShowGame(value);
        console.log('Show:', value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.segment}>
                <img src={coffeeCupImage} alt="Coffee Cup" />
                {!showGame && <PlayerComponent onSelectPlayers={handleSelectPlayers} onGoNext={handleNext} />}
                {showGame && <GameComponent onSelectGame={handleSelectGame} />}
            </div>
        </div>
    );
};

export default ConfigurationScreen;
