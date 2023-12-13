import { MyArtists } from 'components/smart/MyArtists/MyArtists'
import { MyPlaylists } from 'components/smart/MyPlaylists/MyPlaylists'
import { MyTracks } from 'components/smart/MyTracks/MyTracks'
import { HREF } from 'config/routing.config'
import { useIsAuth } from 'hooks/useIsAuth'
import { useStoreBy } from 'hooks/useStoreBy'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FavoritePage.module.scss'

export type IIsOpenState = {
	[key: string]: boolean
	playlists: boolean
	tracks: boolean
	artists: boolean
}

export const FavoritePage = () => {
	const isAuth = useIsAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (!isAuth) {
			navigate(HREF.HOME)
		}
	}, [isAuth, navigate])

	const { data } = useStoreBy('lib')

	return (
		<div className={styles.page}>
			<MyPlaylists playlists={data.playlists || []} />
			<MyTracks tracks={data.tracks || []} />
			<MyArtists artists={data.artists || []} />
		</div>
	)
}
