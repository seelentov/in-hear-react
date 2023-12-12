/* eslint-disable react-refresh/only-export-components */
import { TopArtistsPage } from 'pages/TopArtistsPage/TopArtistsPage'
import { FavoritePage } from 'pages/FavoritePage/FavoritePage'
import { HomePage } from 'pages/HomePage/HomePage'
import { TopPlaylistsPage } from 'pages/TopPlaylistsPage/TopPlaylistsPage'
import { TopChartPage } from 'pages/TopChartPage/TopChartPage'
import { PlaylistPage } from 'pages/PlaylistPage/PlaylistPage'
import { ArtistPage } from 'pages/ArtistsPage/ArtistPage'
import { LoginPage } from 'pages/LoginPage/LoginPage'

export const HOST = '/'

export const HREF = {
	EMPTY: '*',
	HOME: HOST,
	ARTISTS: HOST + 'artists/',
	FAVORITE: HOST + 'favorite/',
	PLAYLISTS: HOST + 'playlists/',
	TRACKS: HOST + 'tracks/',
	RECEIT: HOST + 'receit/',
	LOGIN: HOST + 'login/',
} as const

export type HREF = (typeof HREF)[keyof typeof HREF]

export const ROUTING = [
	{ href: HREF.HOME, component: <HomePage />, name: 'Home' },
	{ href: HREF.ARTISTS, component: <TopArtistsPage />, name: 'Artists' },
  { href: HREF.ARTISTS + ':id', component: <ArtistPage />, name: 'Artists' },
	{ href: HREF.FAVORITE, component: <FavoritePage />, name: 'Favorite' },
	{ href: HREF.PLAYLISTS , component: <TopPlaylistsPage />, name: 'Playlists' },
	{ href: HREF.TRACKS, component: <TopChartPage />, name: 'Tracks' },
  { href: HREF.PLAYLISTS + ':id', component: <PlaylistPage />, name: 'Tracks' },
  { href: HREF.LOGIN, component: <LoginPage />, name: 'Login' },
]

export type ROUTING = (typeof ROUTING)[keyof typeof ROUTING]
