import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { playerSlice } from './player/player.slice'
import { uiSlice } from './ui/ui.slice'
import { userSlice } from './user/user.slice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reduxLoger = createLogger({
	collapsed: true,
})

export const actions = {
	...userSlice.actions,
	...uiSlice.actions,
	...playerSlice.actions,
}

const reducers = combineReducers({
	user: userSlice.reducer,
	ui: uiSlice.reducer,
	player: playerSlice.reducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
})
