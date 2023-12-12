import { Playlist } from 'models/Playlist.js'
import { api, onQueryStartedErrorToast } from './api.js'

export const playlistsApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopPlaylists: builder.query<Playlist[], void>({
			query: () => 'playlists/?order=likes&limit=6',
			providesTags: ['playlists'],
			onQueryStarted: onQueryStartedErrorToast,
		}),
		getPlaylist: builder.query<Playlist, string | undefined>({
			query: id => `playlists/${id}?order=likes&limit=6`,
			providesTags: ['playlists'],
			onQueryStarted: onQueryStartedErrorToast,
		}),
	}),
})

export const { useGetTopPlaylistsQuery, useGetPlaylistQuery } = playlistsApi
