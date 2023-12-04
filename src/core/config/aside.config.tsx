import { HREF } from './routing.config'

export const ASIDE_ITEMS = [
	{ href: HREF.HOME, icon: <p></p>, name: 'Home' },
	{ href: HREF.ARTISTS, icon: <p></p>, name: 'Artists' },
	{ href: HREF.FAVORITE, icon: <p></p>, name: 'Favorite' },
	{ href: HREF.PLAYLISTS, icon: <p></p>, name: 'Playlists' },
	{ href: HREF.TRACKS, icon: <p></p>, name: 'Tracks' },
]

export type ASIDE_ITEMS = (typeof ASIDE_ITEMS)[keyof typeof ASIDE_ITEMS]
