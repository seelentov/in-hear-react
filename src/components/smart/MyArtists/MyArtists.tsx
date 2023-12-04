import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList'
import { FC, useState } from 'react'
import { artists } from 'services/testdata/artists'
import styles from './MyArtists.module.scss'

export interface IMyTracksProps {}

export const MyArtists: FC<IMyTracksProps> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className={styles.myArtists}>
			<div className={styles.header}>
				<h2>Artists</h2>
				<button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'HIDE' : 'MORE'}</button>
			</div>
			<ArtistsList className={styles.artists} artists={artists} grid={isOpen} />
		</div>
	)
}
