import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList'
import { FC } from 'react'
import { playlists } from 'services/testdata/playlists'
import styles from './TopPlaylists.module.scss'

export interface ITopPlaylistsProps {
	grid?: boolean
}

export const TopPlaylists: FC<ITopPlaylistsProps> = ({ grid }) => {
	return (
		<div className={styles.topPlaylists}>
			<h2>Top playlists</h2>
			<PlaylistsList
				playlists={playlists}
				grid={grid}
				className={styles.list}
				showLikes
			/>
		</div>
	)
}
