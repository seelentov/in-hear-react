import { Track } from 'models/Track.js'
import { api, onQueryStartedErrorToast } from './api.js'

export const tracksApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopChart: builder.query<Track[], void>({
			query: () => 'tracks/?order=likes&limit=8',
			providesTags: ['tracks'],
			onQueryStarted: onQueryStartedErrorToast,
		}),
		getArtistTracks: builder.query<Track[], string>({
			query: artist => `tracks/?artist=${artist}`,
			providesTags: ['tracks'],
			onQueryStarted: onQueryStartedErrorToast,
		}),
	}),
})

export const { useGetTopChartQuery, useGetArtistTracksQuery } = tracksApi
