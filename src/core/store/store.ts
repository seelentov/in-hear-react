import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { api } from './api/api'
import { libSlice } from './lib/lib.slice'
import { playerSlice } from './player/player.slice'
import { uiSlice } from './ui/ui.slice'
import { userSlice } from './user/user.slice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = createLogger({
	collapsed: true,
})

export const actions = {
	...userSlice.actions,
	...uiSlice.actions,
	...playerSlice.actions,
	...libSlice.actions,
}

export const reducers = combineReducers({
	user: userSlice.reducer,
	ui: uiSlice.reducer,
	player: playerSlice.reducer,
	lib: libSlice.reducer,
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false })
			.concat(api.middleware)
			.concat(logger),
})
