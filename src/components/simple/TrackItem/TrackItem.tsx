import cn from 'classnames'
import { Track as ITrack, Track } from 'models/Track'
import { FC, useMemo } from 'react'
import { FaMinus, FaPause, FaPlay, FaPlus } from 'react-icons/fa'
import styles from './TrackItem.module.scss'

export interface ITrackItemProps {
	track: ITrack
	showLikes?: boolean
	canLike?: boolean
	currentId: string
	play: boolean
	userTracks: string[]
	handleClick: (isActive: boolean, track: Track) => void
}

export const TrackItem: FC<ITrackItemProps> = ({
	track,
	showLikes,
	canLike,
	currentId,
	play,
	userTracks,
	handleClick,
}) => {
	const isActive = useMemo(() => {
		return currentId === track.id
	}, [currentId, track.id])

	const isLiked = useMemo(() => {
		return userTracks?.includes(track.id)
	}, [userTracks, track.id])

	return (
		<article
			className={cn(styles.track, isActive && styles.active)}
			onClick={() => handleClick(isActive, track)}
		>
			{isActive ? (
				play ? (
					<FaPause size={16} color={'var(--color-primary)'} />
				) : (
					<FaPlay size={16} color={'var(--color-primary)'} />
				)
			) : (
				<FaPlay size={16} color={'var(--color-text)'} />
			)}

			<div className={styles.name}>
				<h3>{track.name}</h3>
				<p className='text-desc'>
					{track.artist} - {track.time.date}
					{showLikes && ` - ${track.likes} likes`}
				</p>
			</div>
			{canLike &&
				(isLiked ? (
					<FaMinus size={16} color={'var(--color-text)'} />
				) : (
					<FaPlus size={16} color={'var(--color-text)'} />
				))}
		</article>
	)
}
