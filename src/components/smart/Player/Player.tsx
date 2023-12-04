import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC, useEffect, useRef, useState } from 'react'
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { Controls } from './Controls'
import { DisplayTrack } from './DisplayTrack'
import styles from './Player.module.scss'
import { Playlist } from './Playlist'
import { ProgressBar } from './ProgressBar'
import { Volume } from './Volume'

export interface IPlayerProps {}

export const Player: FC<IPlayerProps> = () => {
	const {
		playlist: tracks,
		currentTrack: trackIndex,
		play,
	} = useStoreBy('player')
	const { nextTrack, prevTrack, togglePlayer } = useActions()
	const { isPlayerOpen } = useStoreBy('ui')

	const [timeProgress, setTimeProgress] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)

	const audioRef = useRef() as React.MutableRefObject<HTMLAudioElement>
	const progressBarRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const handleNext = () => {
		nextTrack()
	}

	useEffect(() => {
		if (play) {
			audioRef.current.play().catch(() => {
				audioRef.current.play()
			})
		} else {
			audioRef.current.pause()
		}
	}, [play, trackIndex])

	return (
		<>
			<div className={styles.player}>
				<button className={styles.toggleButton} onClick={() => togglePlayer()}>
					{isPlayerOpen ? (
						<MdOutlineKeyboardArrowDown />
					) : (
						<MdOutlineKeyboardArrowUp />
					)}
				</button>
				<div className={styles.inner}>
					<DisplayTrack
						{...{
							currentTrack: tracks[trackIndex],
							audioRef,
							setDuration,
							progressBarRef,
							handleNext,
						}}
					/>
					<div className={styles.center}>
						<Controls
							{...{
								audioRef,
								progressBarRef,
								duration,
								setTimeProgress,
								tracks,
								trackIndex,
								handleNext,
								prevTrack,
							}}
						/>
						<ProgressBar
							{...{ progressBarRef, audioRef, timeProgress, duration }}
						/>
					</div>
					<Volume {...{ audioRef }} />
				</div>
				<Playlist />
			</div>
		</>
	)
}
