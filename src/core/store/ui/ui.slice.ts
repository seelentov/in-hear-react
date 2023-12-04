import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isMenuOpen: false,
	isPlayerOpen: true,
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleMenu: state => {
			state.isMenuOpen = !state.isMenuOpen
		},
		togglePlayer: state => {
			state.isPlayerOpen = !state.isPlayerOpen
		},
	},
})
