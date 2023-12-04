import { createSlice } from '@reduxjs/toolkit'
import { PATH } from 'config/path.config'
import { User } from 'models/User'

const initialState: User = {
	id: '',
	name: 'Master Master',
	img: PATH.DEFAULT.USER,
	role: 'admin',
	login: 'master',
	email: 'komkov222111@gmail.com',
	tracks: [
    'asdhjkashdjashkdsa', 'jsakdjaskldjlkasad'
  ],
	playlists: [

  ],
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: User, { payload: user }) => {
			state.id = user.id
			state.name = user.name
			state.img = user.img
			state.role = user.role
			state.login = user.login
			state.email = user.email
			state.tracks = user.tracks
			state.playlists = user.playlists
		},
		logout: (state: User) => {
			state.id = initialState.id
			state.name = initialState.name
			state.img = initialState.img
			state.role = initialState.role
			state.login = initialState.login
			state.email = initialState.email
			state.tracks = initialState.tracks
			state.playlists = initialState.playlists
		},
	},
})
