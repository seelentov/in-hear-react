import { MyArtists } from 'components/smart/MyArtists/MyArtists'
import { MyPlaylists } from 'components/smart/MyPlaylists/MyPlaylists'
import { MyTracks } from 'components/smart/MyTracks/MyTracks'
import styles from './FavoritePage.module.scss'

export type IIsOpenState = {
	[key: string]: boolean
	playlists: boolean
	tracks: boolean
	artists: boolean
}

export const FavoritePage = () => {
	return (
		<div className={styles.page}>
			<MyPlaylists />
			<MyTracks />
			<MyArtists />
		</div>
	)
}
