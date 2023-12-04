import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { FC, useState } from 'react'
import { tracks } from 'services/testdata/tracks'
import styles from './MyTracks.module.scss'

export interface IMyTracksProps {}

export const MyTracks: FC<IMyTracksProps> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className={styles.myTracks}>
			<div className={styles.header}>
				<h2>Tracks</h2>
				<button onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? 'HIDE' : 'MORE'}
				</button>
			</div>
			<TracksList
				tracks={tracks}
				className={styles.tracks}
				grid={!isOpen}
				canLike
			/>
		</div>
	)
}
