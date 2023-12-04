import cn from 'classnames'
import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC } from 'react'
import styles from './Player.module.scss'

export interface IPlaylistProps {}

export const Playlist: FC<IPlaylistProps> = () => {
	const { playlist } = useStoreBy('player')
	const { isPlayerOpen } = useStoreBy('ui')
	return (
		<TracksList
			action='change'
			tracks={playlist}
			className={cn(isPlayerOpen && styles.active, styles.playlist)}
		/>
	)
}
