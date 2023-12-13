import { createSlice } from '@reduxjs/toolkit'
import { User } from 'models/User'

const initialState: User = {
	_id: '',
	login: '',
	avatarUrl: '',
	role: '',
	email: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: User, { payload: user }) => {
			state._id = user._id
			state.role = user.role
			state.login = user.login
			state.email = user.email
			state.avatarUrl = user.avatarUrl
		},
		logout: (state: User) => {
			state._id = initialState._id
			state.role = initialState.role
			state.login = initialState.login
			state.email = initialState.email
			state.avatarUrl = initialState.avatarUrl
			localStorage.removeItem('token')
		},
	},
})