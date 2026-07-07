import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    favorites: [],
  },

  reducers: {

    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },

    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (hostel) => hostel.id !== action.payload
      );
    },

  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;