import React, { useState, useEffect } from 'react';
import styles from './Player.module.css';
import buttonImage from '../images/next.png';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../store/game-slice';
import { uiActions } from '../store/ui-slice';

const PlayerComponent = ({ onGoNext }) => {
  const [players, setPlayers] = useState([]);
  // const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groupMode, setGroupMode] = useState(false);
  const [groupSize, setGroupSize] = useState(1);
  // const [groups, setGroups] = useState([]); /*Payers in groups */
  // const [finalizedPlayers, setFinalizedPlayers] = useState([]); /*Players individual */
  const [isFinalized, setIsFinalized] = useState(false);
  const [canStart, setCanStart] = useState(false)
  const selectedPlayers = useSelector((state) => state.game.availablePlayers);
  const groups = useSelector((state) => state.game.groups);
  const finalizedPlayers = useSelector((state) => state.game.individualPlayers);
  const dispatch = useDispatch();

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
      player.id === playerId ? { ...player, available: !player.available } : player
    );
    setPlayers(updatedPlayers);
    // const selectedPlayers = updatedPlayers
    //   .filter((player) => player.available)
    //   .map((player) => player.name);
    // setSelectedPlayers(selectedPlayers);
    dispatch(gameActions.updateAvailablePlayers(updatedPlayers));
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setGroupMode(mode === 'groups');
  };

  const moveToNext = () => {
    console.log("GoNext");
    // onGoNext(true);
    dispatch(uiActions.next(true));
  };

  const handleGroupSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setGroupSize(size);
  };

  const submitFinalAvailable = (e) => {
    setIsFinalized(true);
    // onSelectPlayers(selectedPlayers);
  };

  const handleFinalizeClick = () => {
    if (groupMode) {
      // const shuffledPlayers = shuffleArray(selectedPlayers);
      // const numGroups = Math.ceil(selectedPlayers.length / groupSize);
      // const groupNames = generateGroupNames(numGroups);
      // const groupedPlayers = [];

      // for (let i = 0; i < numGroups; i++) {
      //   const groupName = groupNames[i];
      //   const groupPlayers = shuffledPlayers.slice(i * groupSize, (i + 1) * groupSize);
      //   groupedPlayers.push({ groupName, players: groupPlayers });
      // }
      // setGroups(groupedPlayers);
      dispatch(gameActions.updateGroups({ selectedPlayers, groupSize }));
    }
    else {
      // setFinalizedPlayers(selectedPlayers);
      dispatch(gameActions.updateIndividualPlayers(selectedPlayers));
    }
    setCanStart(true);
  };


  return (
    <div className={styles.container}>
      <div className={styles.encloser1}>
        {!isFinalized && <div className={styles.buttons}>
          <h2>Select Players</h2>
          <div className={styles['button-container']}>
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
        {!canStart && selectedPlayers.length > 0 && <div className={styles.players}>
          <h3>Available Players:</h3>
          <ul className={styles.list}>
            {selectedPlayers.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </div>}
        {isFinalized && <div>
          <div className={styles.mode}>
            <h3>Mode:</h3>
            <div className={styles.radio}>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="individual"
                  checked={!groupMode}
                  onChange={handleModeChange}
                  disabled={canStart}
                />
                Individual
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="groups"
                  checked={groupMode}
                  onChange={handleModeChange}
                  disabled={canStart}
                />
                Groups
              </label>
            </div>
          </div>

          {groupMode && (
            <div className={styles.group}>
              <label>
                Group Size:
                <input type="number" value={groupSize} onChange={handleGroupSizeChange} disabled={canStart} />
              </label>
            </div>
          )}
          <button onClick={handleFinalizeClick} disabled={canStart}>
            Finalize
          </button>
          {groupMode && canStart && (
            <div className={styles.previewlist}>
              <h3>Groups:</h3>
              <div className={styles.columnContainer}>
                {groups.map((group) => (
                  <div key={group.groupName} className={styles.column}>
                    <h4>
                      <span
                        className={styles.colorBox}
                        style={{ backgroundColor: group.groupName.toLowerCase() }}
                      ></span>
                      {group.groupName} Group:
                    </h4>
                    <ul>
                      {group.players.map((player) => (
                        <li key={player}>{player}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>}
        {!groupMode && finalizedPlayers.length > 0 && (
          <div className={styles.preview}>
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
        <button className={styles.buttonImg}>
          <img src={buttonImage} alt="Button" className={styles.buttonImage} onClick={moveToNext} />
        </button>
      </div>}
    </div>
  );
};

export default PlayerComponent;
