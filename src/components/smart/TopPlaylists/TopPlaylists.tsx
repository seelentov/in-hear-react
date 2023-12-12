import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList'
import { FC } from 'react'
import { useGetTopPlaylistsQuery } from 'store/api/playlist.api'
import styles from './TopPlaylists.module.scss'

export interface ITopPlaylistsProps {
	grid?: boolean
}

export const TopPlaylists: FC<ITopPlaylistsProps> = ({ grid }) => {
	const { data, isLoading } = useGetTopPlaylistsQuery()

	return (
		<div className={styles.topPlaylists}>
			<h2>Top playlists</h2>
			<PlaylistsList
				loading={isLoading}
				playlists={data ? data : []}
				grid={grid}
				className={styles.list}
				showLikes
			/>
		</div>
	)
}
