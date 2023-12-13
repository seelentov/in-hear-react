import { Lib } from 'models/Lib.js'
import { api } from './api.js'

export const libApi = api.injectEndpoints({
	endpoints: builder => ({
    getLib: builder.query<Lib, void>({
			query: () => 'lib/',
		}),
		patchLib: builder.mutation<Lib, any>({
			query: body => ({
				url: 'lib/',
				method: 'PATCH',
				body: body,	
			}),
		}),
    patchDelLib: builder.mutation<Lib, any>({
			query: body => ({
				url: 'lib/?action=del',
				method: 'PATCH',
				body: body,
			}),
		}),
	}),
})

export const { usePatchLibMutation } = libApi
export const { usePatchDelLibMutation } = libApi
export const { useGetLibQuery } = libApi
