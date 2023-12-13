/* eslint-disable react-refresh/only-export-components */
import { ArtistPage } from 'pages/ArtistsPage/ArtistPage'
import { FavoritePage } from 'pages/FavoritePage/FavoritePage'
import { HomePage } from 'pages/HomePage/HomePage'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { PlaylistPage } from 'pages/PlaylistPage/PlaylistPage'
import { SearchPage } from 'pages/SearchPage/SearchPage'
import { TopArtistsPage } from 'pages/TopArtistsPage/TopArtistsPage'
import { TopChartPage } from 'pages/TopChartPage/TopChartPage'
import { TopPlaylistsPage } from 'pages/TopPlaylistsPage/TopPlaylistsPage'

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
  SEARCH: HOST + 'search/'
} as const

export type HREF = (typeof HREF)[keyof typeof HREF]

export const ROUTING = [
  { href: HREF.HOME, component: <HomePage />, name: 'Home' },
  { href: HREF.ARTISTS, component: <TopArtistsPage />, name: 'Top Artists' },
  { href: HREF.ARTISTS + ':id', component: <ArtistPage />, name: 'Artists' },
  { href: HREF.FAVORITE, component: <FavoritePage />, name: 'Favorite' },
  { href: HREF.PLAYLISTS, component: <TopPlaylistsPage />, name: 'Top Playlists' },
  { href: HREF.TRACKS, component: <TopChartPage />, name: 'Tracks' },
  { href: HREF.PLAYLISTS + ':id', component: <PlaylistPage />, name: 'Playlists' },
  { href: HREF.LOGIN, component: <LoginPage />, name: 'Login' },
  { href: HREF.SEARCH, component: <SearchPage />, name: 'Search' },
]

export type ROUTING = (typeof ROUTING)[keyof typeof ROUTING]
