
import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList'
import { FC } from 'react'
import { useGetTopArtistsQuery } from 'store/api/artists.api'
import styles from './TopArtists.module.scss'

export interface ITopArtistsProps {
	grid?: boolean
}

export const TopArtists: FC<ITopArtistsProps> = ({ grid }) => {
	const { data, isLoading } = useGetTopArtistsQuery()

	return (
		<div className={styles.topArtists}>
			<h2>Top artists</h2>
			<ArtistsList
				loading={isLoading}
				showLikes
				artists={data ? data : []}
				grid={grid}
			/>
		</div>
	)
}
