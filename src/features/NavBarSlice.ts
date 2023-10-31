import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type IProps = {
  showMobileNavBar: boolean;
};

const initialState: IProps = {
  showMobileNavBar: false,
};

export const NavBar = createSlice({
  name: "NavBar",
  initialState,
  reducers: {
    showNavMobile: (state, action) => {
      const handleShowScroll = () =>
        state.showMobileNavBar === true
          ? document.body.classList.add(`overflow-hidden`)
          : document.body.classList.remove(`overflow-hidden`);
      if (action.payload === "toggle") {
        state.showMobileNavBar = !state.showMobileNavBar;
        handleShowScroll();
      } else {
        state.showMobileNavBar = action.payload;
        handleShowScroll();
      }
    },
  },
});

export const { showNavMobile } = NavBar.actions;
export const selectShowNavMobile = (state: RootState) =>
  state.NavBar.showMobileNavBar;
