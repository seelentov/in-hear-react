import { ReactNode } from 'react'
import {
	RiFileMusicLine,
	RiHeart3Fill,
	RiHome2Fill,
	RiMusic2Fill,
	RiPolaroid2Fill,
	RiTimer2Fill,
} from 'react-icons/ri'
import { HREF } from './routing.config'

export const MENU = [
	{
		name: 'Discover',
		links: [
			{
				name: 'Home',
				icon: <RiHome2Fill />,
				href: HREF.HOME,
			},
			{
				name: 'Top artists',
				icon: <RiPolaroid2Fill />,
				href: HREF.ARTISTS,
			},
			{
				name: 'Top chart',
				icon: <RiMusic2Fill />,
				href: HREF.TRACKS,
			},
			{
				name: 'Top playlists',
				icon: <RiFileMusicLine />,
				href: HREF.PLAYLISTS,
			},
		],
	},
	{
		name: 'Library',
		links: [
			{
				name: 'Recent',
				icon: <RiTimer2Fill />,
				href: HREF.RECEIT,
			},
			{
				name: 'Favorite',
				icon: <RiHeart3Fill />,
				href: HREF.FAVORITE,
			},
		],
	},
]

export type MENU = {
	name: string
	links: MenuLink[]
}[]

export type MenuLink = {
	name: string
	icon: ReactNode
	href: HREF
}
