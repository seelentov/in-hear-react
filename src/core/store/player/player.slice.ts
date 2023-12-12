import { createSlice } from '@reduxjs/toolkit'
import { Track } from 'models/Track'

export interface Player {
	currentId: string
	currentTrack: number
	playlist: Track[]
	play: boolean
}

const initialState: Player = {
	currentId: '',
	currentTrack: 0,
	playlist: [],
	play: false,
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		nextTrack: state => {
			if (state.currentTrack < state.playlist.length - 1) {
				state.currentTrack++
				state.currentId = state.playlist[state.currentTrack]._id
				state.play = true
			} else {
				state.currentTrack = 0
				state.currentId = state.playlist[state.currentTrack]._id
				state.play = true
			}
		},
		prevTrack: state => {
			if (state.currentTrack === 0) {
				state.currentTrack = state.playlist.length - 1
				state.currentId = state.playlist[state.currentTrack]._id
				state.play = true
			} else {
				state.currentTrack--
				state.currentId = state.playlist[state.currentTrack]._id
				state.play = true
			}
		},
		playTracks: (state, { payload: {tracks, currentTrack} }) => {
			state.currentId = currentTrack
      state.currentTrack = tracks.findIndex((track: Track) => track._id === currentTrack)
      state.playlist = tracks
			state.play = true
		},
    playPlaylist: (state, { payload: tracks }) => {
			state.currentId = tracks[0]._id
      state.currentTrack = 0
      state.playlist = tracks
			state.play = true
		},
		toggleTrack: state => {
			state.play = !state.play
		},
	},
})
