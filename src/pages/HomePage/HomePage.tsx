import { TopArtists } from 'components/smart/TopArtists/TopArtists'
import { TopChart } from 'components/smart/TopChart/TopChart'
import { TopPlaylists } from 'components/smart/TopPlaylists/TopPlaylists'
import styles from './HomePage.module.scss'

export const HomePage = () => {
	return (
		<div className={styles.page}>
			<TopPlaylists />
			<TopChart grid />
			<TopArtists />
		</div>
	)
}
