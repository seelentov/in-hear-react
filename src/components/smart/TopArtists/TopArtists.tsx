import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList'
import { FC } from 'react'
import { artists } from 'services/testdata/artists'
import styles from './TopArtists.module.scss'
import cn from 'classnames';

export interface ITopArtistsProps {
	grid?: boolean
}

export const TopArtists: FC<ITopArtistsProps> = ({ grid }) => {
	return (
		<div className={styles.topArtists}>
      <h2>Top artists</h2>
			<ArtistsList
				showLikes
				artists={artists}
				grid={grid}
				className={cn(grid && styles.list)}
			/>
		</div>
	)
}
