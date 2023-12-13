import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isMenuOpen: false,
	isPlayerOpen: false,
  filter: ''
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleMenu: state => {
			state.isMenuOpen = !state.isMenuOpen
      state.filter = ''
		},
		togglePlayer: state => {
			state.isPlayerOpen = !state.isPlayerOpen
		},
    setFilter: (state, {payload}) =>{
      state.filter = payload
    }
	},
})
