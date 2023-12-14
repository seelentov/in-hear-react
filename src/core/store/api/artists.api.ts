import { Artist } from 'models/Artist.js'
import { api } from './api.js'
export const artistsApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopArtists: builder.query<Artist[], void>({
			query: () => 'artists/?order=likes&limit=6',
			providesTags: ['artists'],
		}),
		getArtist: builder.query<Artist, string>({
			query: id => `artists/${id}?order=likes`,
			providesTags: ['artists'],
		}),
    getFilterArtist: builder.query<Artist[], string>({
			query: filter => `artists/?filter=${filter}`,
			providesTags: ['artists'],
		}),
		editArtist: builder.mutation<Artist, Partial<Artist>>({
			query: ({ _id, ...patch }) => ({
				url: `artists/${_id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: ['artists'],
		}),
    postArtist: builder.mutation<Artist, Partial<Artist>>({
			query: (post) => ({
				url: `artists/`,
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['artists'],
		}),
    deleteArtist: builder.mutation<Artist, string>({
			query: (id) => ({
				url: `artists/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['artists'],
		}),
	}),
})

export const { useGetTopArtistsQuery } = artistsApi
export const { useGetArtistQuery } = artistsApi
export const { useEditArtistMutation } = artistsApi
export const { usePostArtistMutation } = artistsApi
export const { useGetFilterArtistQuery } = artistsApi
export const { useDeleteArtistMutation } = artistsApi
