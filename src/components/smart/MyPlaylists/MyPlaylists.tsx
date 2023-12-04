import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList'
import { FC, useState } from 'react'
import { playlists } from 'services/testdata/playlists'
import styles from './MyPlaylists.module.scss'

export interface IMyTracksProps {}

export const MyPlaylists: FC<IMyTracksProps> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className={styles.myPlaylists}>
			<div className={styles.header}>
				<h2>Playlists</h2>
				<button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'HIDE' : 'MORE'}</button>
			</div>
			<PlaylistsList
				className={styles.playlists}
				playlists={playlists}
				grid={isOpen}
			/>
		</div>
	)
}
