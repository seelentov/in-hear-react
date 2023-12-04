import cn from 'classnames'
import { TrackItem } from 'components/simple/TrackItem/TrackItem'
import { Track } from 'models/Track'
import { FC, HTMLAttributes, useCallback } from 'react'
import styles from './TracksList.module.scss'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'

export interface ITracksListProps extends HTMLAttributes<HTMLOListElement> {
	tracks: Track[]
	grid?: boolean
	showLikes?: boolean
	className?: string
	canLike?: boolean
}

export const TracksList: FC<ITracksListProps> = ({
	tracks,
	grid,
	showLikes,
	className,
	canLike,
	...rest
}) => {
	const { addToPlaylist, toggleTrack } = useActions()
	const { currentId, play } = useStoreBy('player')
	const { tracks: userTracks } = useStoreBy('user')

	const handleClick = useCallback((isActive: boolean, track: Track) => {
		if (isActive) {
			toggleTrack()
		} else {
			addToPlaylist(track)
		}
	}, [])

	return (
		<section
			className={cn(
				className,
				grid ? styles.tracksListGrid : styles.tracksListColumn
			)}
			{...rest}
		>
			{tracks.map((track) => (
				<TrackItem
					key={track.id}
          {...{track, showLikes, canLike, currentId, play, userTracks, handleClick}}
				/>
			))}
		</section>
	)
}
