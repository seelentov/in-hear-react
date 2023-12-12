import { Lib } from 'models/Lib.js'
import { api, onQueryStartedErrorToast } from './api.js'

export const libApi = api.injectEndpoints({
	endpoints: builder => ({
		patchLib: builder.mutation<Lib, any>({
			query: body => ({
				url: 'lib/',
				method: 'PATCH',
				body: body,
				onQueryStarted: onQueryStartedErrorToast,
			}),
		}),
    patchDelLib: builder.mutation<Lib, any>({
			query: body => ({
				url: 'lib/?action=del',
				method: 'PATCH',
				body: body,
				onQueryStarted: onQueryStartedErrorToast,
			}),
		}),
	}),
})

export const { usePatchLibMutation } = libApi
export const { usePatchDelLibMutation } = libApi
