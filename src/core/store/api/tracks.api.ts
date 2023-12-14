import { Track } from 'models/Track.js'
import { api } from './api.js'

export interface IUploadTrack {
  name: string,
  artist: string,
  src: string,
  duration: number
}

export const tracksApi = api.injectEndpoints({
	endpoints: builder => ({
		getTopChart: builder.query<Track[], void>({
			query: () => 'tracks/?order=likes&limit=8',
			providesTags: ['tracks'],
		}),
		getArtistTracks: builder.query<Track[], string>({
			query: artist => `tracks/?artist=${artist}&order=likes`,
			providesTags: ['tracks'],
      
		}),
    getFilterTracks: builder.query<Track[], string>({
			query: filter => `tracks/?filter=${filter}`,
			providesTags: ['tracks'],
		}),
    postTrack: builder.mutation<Track, IUploadTrack>({
			query: body => ({
				url: 'tracks/',
				method: 'POST',
				body: body,
			}),
      invalidatesTags: ['tracks'],
		}),
    deleteTrack: builder.mutation<Track, string>({
			query: (id) => ({
				url: `tracks/${id}`,
				method: 'DELETE',
			}),
      invalidatesTags: ['tracks'],
		}),
	}),
})

export const { useGetTopChartQuery, useGetArtistTracksQuery, usePostTrackMutation, useGetFilterTracksQuery, useDeleteTrackMutation } = tracksApi
