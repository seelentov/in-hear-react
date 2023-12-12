import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Lib } from 'models/Lib'
import { API_URL } from 'store/api/api'

export const fetchLib = createAsyncThunk('lib/fetchLib', async () => {
	const token = localStorage.getItem('token')

	const { data } = await axios.get(API_URL + 'lib', {
		headers: {
			Authorization: token,
		},
	})
	return data
})

export type LibRedux = { status: 'loading' | 'loaded' | 'error'; data: Lib }

const initialState: LibRedux = {
	data: {
		_id: '',
		tracks: [],
		playlists: [],
		artists: [],
		userId: '',
	},
	status: 'loading',
}

export const libSlice = createSlice({
	name: 'lib',
	initialState,
	reducers: {
		addTrack: (state, { payload }) => {
			state.data.tracks.push(payload)
		},
		removeTrack: (state, { payload }) => {
			state.data.tracks = state.data.tracks.filter(
				track => track._id !== payload._id
			)
		},
    addPlaylist: (state, { payload }) => {
			state.data.playlists.push(payload)
		},
		removePlaylist: (state, { payload }) => {
			state.data.playlists = state.data.playlists.filter(
				playlist => playlist._id !== payload._id
			)
		},
    addArtist: (state, { payload }) => {
			state.data.artists.push(payload)
		},
		removeArtist: (state, { payload }) => {
			state.data.artists = state.data.artists.filter(
				artist => artist._id !== payload._id
			)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchLib.pending, state => {
				state.status = 'loading'
				state.data = initialState.data
			})
			.addCase(fetchLib.fulfilled, (state, { payload }) => {
				state.status = 'loaded'
				if (payload) {
					state.data = payload
				}
			})
			.addCase(fetchLib.rejected, state => {
				state.status = 'error'
				state.data = initialState.data
			})
	},
})
