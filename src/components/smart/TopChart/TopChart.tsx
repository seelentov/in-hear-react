import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { FC } from 'react'
import { tracks } from 'services/testdata/tracks'
import styles from './TopChart.module.scss'

export interface ITopChartProps {
	grid?: boolean
}

export const TopChart: FC<ITopChartProps> = ({ grid }) => {
	return (
		<div className={styles.topChart}>
			<h2>Top chart</h2>
			<TracksList tracks={tracks} showLikes grid={grid} canLike action='add' />
		</div>
	)
}
