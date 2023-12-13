import { Playlist } from 'models/Playlist.js'
import { api } from './api.js'

export const playlistsApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopPlaylists: builder.query<Playlist[], void>({
			query: () => 'playlists/?order=likes&limit=6',
			providesTags: ['playlists'],
		}),
		getPlaylist: builder.query<Playlist, string | undefined>({
			query: id => `playlists/${id}?order=likes`,
			providesTags: ['playlists'],
		}),
    getFilterPlaylist: builder.query<Playlist[], string>({
			query: filter => `playlists/?filter=${filter}`,
			providesTags: ['playlists'],
		}),
    editPlaylist: builder.mutation<Playlist, Partial<Playlist>>({
			query: ({ _id, ...patch }) => ({
				url: `playlists/${_id}`,
				method: 'PATCH',
				body: patch,
			}),
			invalidatesTags: ['playlists'],
		}),
    postPlaylist: builder.mutation<Playlist, Partial<Playlist>>({
			query: (post) => ({
				url: `playlists/`,
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['playlists'],
		}),
	}),
})

export const { useGetTopPlaylistsQuery, useGetPlaylistQuery, useGetFilterPlaylistQuery, usePostPlaylistMutation, useEditPlaylistMutation } = playlistsApi
