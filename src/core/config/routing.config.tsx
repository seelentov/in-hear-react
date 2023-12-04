/* eslint-disable react-refresh/only-export-components */
import { TopArtistsPage } from 'pages/ArtistsPage/TopArtistsPage'
import { FavoritePage } from 'pages/FavoritePage/FavoritePage'
import { HomePage } from 'pages/HomePage/HomePage'
import { TopPlaylistsPage } from 'pages/PlaylistsPage/TopPlaylistsPage'
import { TopChartPage } from 'pages/TopChartPage/TopChartPage'

export const HOST = '/'

export const HREF = {
	EMPTY: '*',
	HOME: HOST,
	ARTISTS: HOST + 'artists/',
	FAVORITE: HOST + 'favorite/',
	PLAYLISTS: HOST + 'playlists/',
	TRACKS: HOST + 'tracks/',
	RECEIT: HOST + 'receit/',
} as const

export type HREF = (typeof HREF)[keyof typeof HREF]

export const ROUTING = [
	{ href: HREF.HOME, component: <HomePage />, name: 'Home' },
	{ href: HREF.ARTISTS, component: <TopArtistsPage />, name: 'Artists' },
	{ href: HREF.FAVORITE, component: <FavoritePage />, name: 'Favorite' },
	{ href: HREF.PLAYLISTS, component: <TopPlaylistsPage />, name: 'Playlists' },
	{ href: HREF.TRACKS, component: <TopChartPage />, name: 'Tracks' },
]

export type ROUTING = (typeof ROUTING)[keyof typeof ROUTING]
