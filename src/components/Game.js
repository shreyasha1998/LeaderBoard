import React, { useState, useEffect, useCallback } from 'react';
import styles from './Game.module.css';
import { useNavigate } from 'react-router-dom';

const GameComponent = ({ onSelectGame }) => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [newGameInput, setNewGameInput] = useState('');
    const [showNewGameForm, setShowNewGameForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedGames = localStorage.getItem('games');
        if (storedGames) {
            setGames(JSON.parse(storedGames));
        } else {
            fetch('/data/games.json')
                .then((response) => response.json())
                .then((data) => {
                    setGames(data.games);
                    localStorage.setItem('games', JSON.stringify(data.games));
                })
                .catch((error) => console.log(error));
        }

    }, []);

    const handleGameClick = useCallback((gameId, gameName) => {
        setSelectedGame((prevSelectedGame) =>
            prevSelectedGame === gameName ? null : gameName
        );
    }, []);

    useEffect(() => {
        onSelectGame(selectedGame);
    }, [onSelectGame, selectedGame]);

    const handleNewGameClick = () => {
        setShowNewGameForm(true);
    };

    const handleStartPlaying = () => {
        console.log("Game Started");
        navigate('/playground');
    };

    const handleNewGameSubmit = (e) => {
        e.preventDefault();
        if (newGameInput) {
            const newGame = {
                id: Date.now().toString(),
                name: newGameInput,
            };

            // Update the games state with the new game
            setGames(prevGames => [...prevGames, newGame]);
            localStorage.setItem('games', JSON.stringify([...games, newGame]));

            // Reset the new game input and hide the form
            setNewGameInput('');
            setShowNewGameForm(false);

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.encloser1}>
                <h2>Select a Game</h2>
                <div className={styles['button-container']}>
                    {games.map((game) => (
                        <button
                            key={game.id}
                            onClick={() => handleGameClick(game.id, game.name)}
                            className={selectedGame && game.name === selectedGame ? styles.selected : ''}
                        >
                            {game.name}
                        </button>
                    ))}
                </div>
                <hr />
                <div className={styles.special}>
                    <button onClick={handleNewGameClick} className={styles.special}>Add New Game</button>
                    {showNewGameForm && (
                        <form onSubmit={handleNewGameSubmit} className={styles['new-game-form']}>
                            <input
                                type="text"
                                value={newGameInput}
                                onChange={(e) => setNewGameInput(e.target.value)}
                                placeholder="Enter new game name"
                            />
                            <button type="submit" disabled={!newGameInput}>
                                Submit
                            </button>
                        </form>
                    )}
                </div>
                {selectedGame && (
                    <><div className={styles.preview}>
                        <h3>Current Game:</h3>
                        <p>{selectedGame}</p>
                    </div>
                        <div className={styles.start}>
                            <button onClick={handleStartPlaying}>Start Playing</button>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default GameComponent;
