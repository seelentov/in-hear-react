import cn from 'classnames'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Track as ITrack } from 'models/Track'
import { FC, useCallback, useMemo } from 'react'
import { FaMinus, FaPause, FaPlay, FaPlus } from 'react-icons/fa'
import styles from './TrackItem.module.scss'

export interface ITrackItemProps {
	track: ITrack
	showLikes?: boolean
	canLike?: boolean
	action?: 'add' | 'change'
	index: number
}

export const TrackItem: FC<ITrackItemProps> = ({
	track,
	showLikes,
	canLike,
	index,
	action = 'add',
}) => {
	const { addToPlaylist, toggleTrack, changeTrack } = useActions()
	const { currentId, play } = useStoreBy('player')

	const active = useMemo(() => {
		return currentId === track.id
	}, [currentId])

	const handleClick = useCallback(() => {
		if (active) {
			toggleTrack()
		} else {
			if (action === 'add') {
				addToPlaylist(track)
			} else {
				changeTrack({ id: track.id, index })
			}
		}
	}, [active, action])

	const liked = false

	return (
		<article
			className={cn(styles.track, active && styles.active)}
			onClick={handleClick}
		>
			{active ? (
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
				(liked ? (
					<FaMinus size={16} color={'var(--color-text)'} />
				) : (
					<FaPlus size={16} color={'var(--color-text)'} />
				))}
		</article>
	)
}
