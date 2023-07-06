import React, { useState, useEffect } from 'react';
import styles from './Player.module.css';

const PlayerComponent = ({ onSelectPlayers, gameState }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groupMode, setGroupMode] = useState(false);
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);
  const [finalizedPlayers, setFinalizedPlayers] = useState([]);
  const [isFinalized, setIsFinalized] = useState(false);
  const [canStart, setCanStart] = useState(false)

  useEffect(() => {
    fetch('/data/players.json')
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.players);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePlayerClick = (playerId) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, selected: !player.selected } : player
    );
    setPlayers(updatedPlayers);
    const selectedPlayers = updatedPlayers
      .filter((player) => player.selected)
      .map((player) => player.name);
    setSelectedPlayers(selectedPlayers);
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setGroupMode(mode === 'groups');
  };

  const handleGroupSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setGroupSize(size);
  };

  const submitFinalAvailable = (e) => {
    setIsFinalized(true);
    onSelectPlayers(selectedPlayers);
  };

  const startPlaying = () => {
    console.log("Lets Start");
  };

  const handleFinalizeClick = () => {
    if (groupMode) {
      const shuffledPlayers = shuffleArray(selectedPlayers);
      const numGroups = Math.ceil(selectedPlayers.length / groupSize);
      const groupNames = generateGroupNames(numGroups);
      const groupedPlayers = [];

      for (let i = 0; i < numGroups; i++) {
        const groupName = groupNames[i];
        const groupPlayers = shuffledPlayers.slice(i * groupSize, (i + 1) * groupSize);
        groupedPlayers.push({ groupName, players: groupPlayers });
      }

      setGroups(groupedPlayers);
    }
    else {
      setFinalizedPlayers(selectedPlayers);
    }
    if (gameState) {
      setCanStart(true);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const generateGroupNames = (numGroups) => {
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown'];
    const groupNames = [];
    for (let i = 0; i < numGroups; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const groupName = colors.splice(randomIndex, 1)[0];
      groupNames.push(groupName);
    }
    return groupNames;
  };

  return (
    <div className={styles.container}>
      <div className={styles.encloser1}>
        {!isFinalized && <div>
          <h2>Select Players</h2>
          <div>
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => handlePlayerClick(player.id)}
              >
                {player.name}
              </button>
            ))}
          </div>
          <button disabled={selectedPlayers.length === 0} onClick={submitFinalAvailable}>Ok</button>
        </div>}
        {selectedPlayers.length > 0 && <div>
          <h3>Available Players:</h3>
          <ul>
            {selectedPlayers.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </div>}
        {isFinalized && <div>
          <div>
            <label>
              Mode:
              <select onChange={handleModeChange}>
                <option value="individual">Individual</option>
                <option value="groups">Groups</option>
              </select>
            </label>
          </div>
          {groupMode && (
            <div>
              <label>
                Group Size:
                <input type="number" value={groupSize} onChange={handleGroupSizeChange} />
              </label>
            </div>
          )}
          <button onClick={handleFinalizeClick} disabled={selectedPlayers.length === 0}>
            Finalize
          </button>
          {groupMode && (
            <div>
              <h3>Groups:</h3>
              {groups.map((group) => (
                <div key={group.groupName}>
                  <h4>{group.groupName} Group:</h4>
                  <ul>
                    {group.players.map((player) => (
                      <li key={player}>{player}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}</div>}
        {!groupMode && finalizedPlayers.length > 0 && (
          <div>
            <h3>Finalized Players:</h3>
            {finalizedPlayers.length > 0 ? (
              <ul>
                {finalizedPlayers.map((player) => (
                  <li key={player}>{player}</li>
                ))}
              </ul>
            ) : (
              <p>No players finalized.</p>
            )}
          </div>
        )}
      </div>
      {canStart && <div className={styles.encloser2}>
        <button disabled={!canStart} onClick={startPlaying}>Start Game</button>
      </div>}
    </div>
  );
};

export default PlayerComponent;
