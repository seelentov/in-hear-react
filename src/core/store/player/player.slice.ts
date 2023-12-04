import { createSlice } from '@reduxjs/toolkit'
import { Track } from 'models/Track'
import { myTracks } from 'services/testdata/tracks'

export interface Player {
	currentId: string
	currentTrack: number
	playlist: Track[]
	play: boolean
}

const initialState: Player = {
	currentId: 'asdhjkashdjashkdsa',
	currentTrack: 0,
	playlist: myTracks,
	play: false,
}

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		nextTrack: state => {
			if (state.currentTrack < state.playlist.length - 1) {
				state.currentTrack++
				state.currentId = state.playlist[state.currentTrack].id
				state.play = true
			} else {
				state.currentTrack = 0
				state.currentId = state.playlist[state.currentTrack].id
				state.play = true
			}
		},
		prevTrack: state => {
			if (state.currentTrack === 0) {
				state.currentTrack = state.playlist.length - 1
				state.currentId = state.playlist[state.currentTrack].id
				state.play = true
			} else {
				state.currentTrack--
				state.currentId = state.playlist[state.currentTrack].id
				state.play = true
			}
		},
		addToPlaylist: (state, { payload: track }) => {
			state.currentId = track.id
			if (state.playlist.includes(track)) {
				state.currentTrack = state.playlist.findIndex(
					thisTrack => thisTrack.id === track.id
				)
			} else {
				state.playlist.push(track)
				state.currentTrack = state.playlist.length - 1
			}
			state.play = true
		},
		changeTrack: (state, { payload }) => {
			state.currentTrack = payload.index
			state.currentId = payload.id
			state.play = true
		},
		changePlaylist: (state, { payload: tracks }) => {
			state.currentTrack = 0
			state.currentId = tracks[0].id
			state.playlist = tracks
			state.play = true
		},
		toggleTrack: state => {
			state.play = !state.play
		},
	},
})
