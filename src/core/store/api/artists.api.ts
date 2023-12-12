import { Artist } from 'models/Artist.js'
import { api, onQueryStartedErrorToast } from './api.js'
export const artistsApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopArtists: builder.query<Artist[], void>({
			query: () => 'artists/?order=likes&limit=6',
			providesTags: ['artists'],
      onQueryStarted: onQueryStartedErrorToast
		}),
		getArtist: builder.query<Artist, string>({
			query: id => `artists/${id}`,
			providesTags: ['artists'],
      onQueryStarted: onQueryStartedErrorToast
		}),
		editArtist: builder.mutation<Artist, Partial<Artist>>({
			query: ({ _id, ...patch }) => ({
				url: `artists/${_id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: ['artists'],
		}),
	}),
})

export const { useGetTopArtistsQuery } = artistsApi
export const { useGetArtistQuery } = artistsApi
export const { useEditArtistMutation } = artistsApi
