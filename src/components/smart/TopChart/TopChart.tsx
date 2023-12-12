import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { FC } from 'react'
import { useGetTopChartQuery } from 'store/api/tracks.api'
import styles from './TopChart.module.scss'

export interface ITopChartProps {
	grid?: boolean
}

export const TopChart: FC<ITopChartProps> = ({ grid }) => {
	const { data, isLoading } = useGetTopChartQuery()
	return (
		<div className={styles.topChart}>
			<h2>Top chart</h2>
			<TracksList
				loading={isLoading}
				tracks={data ? data : []}
				showLikes
				grid={grid}
				canLike
			/>
		</div>
	)
}
