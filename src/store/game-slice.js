import { createSlice } from '@reduxjs/toolkit';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const generateGroupNames = (numGroups) => {
    const colors = [
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Orange',
        'Purple',
        'Pink',
        'Cyan',
        'Magenta',
        'Lime',
        'Teal',
        'Gold',
        'Silver',
        'Brown',
        'Gray',
        'Indigo',
    ];
    const groupNames = [];
    for (let i = 0; i < numGroups; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const groupName = colors.splice(randomIndex, 1)[0];
        groupNames.push(groupName);
    }
    return groupNames;
};

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        selectedGame: { name: null, id: null },
        availablePlayers: [],
        groups: [],
        individualPlayers: []
    },
    reducers: {
        selectGame(state, action) {
            const gameName = action.payload.gameName;
            const id = action.payload.gameId;
            if (state.selectedGame.id === id) {
                state.selectedGame.id = null;
                state.selectedGame.name = null;
            }
            else {
                state.selectedGame.id = id;
                state.selectedGame.name = gameName;
            }
            console.log(state.selectedGame.name);
        },
        updateAvailablePlayers(state, action) {
            const updatedPlayers = action.payload;
            const selectedPlayers = updatedPlayers
                .filter((player) => player.available)
                .map((player) => player.name);
            state.availablePlayers = selectedPlayers;
        },
        updateGroups(state, action) {
            const selectedPlayers = action.payload.selectedPlayers;
            const groupSize = action.payload.groupSize;
            const shuffledPlayers = shuffleArray(selectedPlayers);
            const numGroups = Math.ceil(selectedPlayers.length / groupSize);
            const groupNames = generateGroupNames(numGroups);
            const groupedPlayers = [];

            for (let i = 0; i < numGroups; i++) {
                const groupName = groupNames[i];
                const groupPlayers = shuffledPlayers.slice(i * groupSize, (i + 1) * groupSize);
                groupedPlayers.push({ groupName, players: groupPlayers });
            }
            state.groups = groupedPlayers;
        },
        updateIndividualPlayers(state, action) {
            state.individualPlayers = action.payload;
        }
    },
});

export const gameActions = gameSlice.actions;

export default gameSlice;