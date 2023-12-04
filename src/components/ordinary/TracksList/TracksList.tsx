import cn from 'classnames'
import { TrackItem } from 'components/simple/TrackItem/TrackItem'
import { Track } from 'models/Track'
import { FC, HTMLAttributes } from 'react'
import styles from './TracksList.module.scss'

export interface ITracksListProps extends HTMLAttributes<HTMLOListElement> {
	tracks: Track[]
	grid?: boolean
	showLikes?: boolean
	className?: string
	canLike?: boolean
	action?: 'add' | 'change'
}

export const TracksList: FC<ITracksListProps> = ({
	tracks,
	grid,
	showLikes,
	className,
	canLike,
	action = 'add',
	...rest
}) => {
	return (
		<section
			className={cn(
				className,
				grid ? styles.tracksListGrid : styles.tracksListColumn
			)}
			{...rest}
		>
			{tracks.map((track, index) => (
				<TrackItem
					index={index}
					action={action}
					track={track}
					key={track.id}
					showLikes={showLikes}
					canLike={canLike}
				/>
			))}
		</section>
	)
}
