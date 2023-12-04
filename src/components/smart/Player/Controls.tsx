import { FC, useCallback, useEffect, useRef, useState } from 'react'

// icons
import {
	IoPauseSharp,
	IoPlayBackSharp,
	IoPlayForwardSharp,
	IoPlaySharp,
	IoPlaySkipBackSharp,
	IoPlaySkipForwardSharp,
} from 'react-icons/io5'

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Track } from 'models/Track'
import styles from './Player.module.scss'

export interface IControlsProps {
	audioRef: React.MutableRefObject<HTMLAudioElement>
	progressBarRef: React.MutableRefObject<HTMLInputElement>
	duration: number
	setTimeProgress: React.Dispatch<React.SetStateAction<number>>
	tracks: Track[]
	trackIndex: number
	handleNext: () => void
	prevTrack: ActionCreatorWithoutPayload<'player/prevTrack'>
}

export const Controls: FC<IControlsProps> = ({
	audioRef,
	progressBarRef,
	duration,
	setTimeProgress,
	handleNext,
	prevTrack,
}) => {
	const [isPlaying, setIsPlaying] = useState(false)

	const { play } = useStoreBy('player')
	const { toggleTrack } = useActions()

	const togglePlayPause = () => {
		toggleTrack()
    setIsPlaying(play)
	}

	const playAnimationRef = useRef()

	const repeat = useCallback(() => {
		const currentTime = audioRef.current.currentTime
		setTimeProgress(currentTime)
		progressBarRef.current.value = currentTime.toString()
		progressBarRef.current.style.setProperty(
			'--range-progress',
			`${(parseInt(progressBarRef.current.value) / duration) * 100}%`
		)

		playAnimationRef.current = requestAnimationFrame(repeat) as any
	}, [audioRef, duration, progressBarRef, setTimeProgress])

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play()
		} else {
			audioRef.current.pause()
		}
		playAnimationRef.current = requestAnimationFrame(repeat) as any
	}, [isPlaying, audioRef, repeat])

	const skipForward = () => {
		audioRef.current.currentTime += 15
	}

	const skipBackward = () => {
		audioRef.current.currentTime -= 15
	}

	const handlePrevious = () => {
		prevTrack()
	}

	return (
		<div className={styles.controls}>
			<button onClick={handlePrevious}>
				<IoPlaySkipBackSharp />
			</button>
			<button onClick={skipBackward}>
				<IoPlayBackSharp />
			</button>

			<button onClick={togglePlayPause}>
				{play ? <IoPauseSharp /> : <IoPlaySharp />}
			</button>
			<button onClick={skipForward}>
				<IoPlayForwardSharp />
			</button>
			<button onClick={handleNext}>
				<IoPlaySkipForwardSharp />
			</button>
		</div>
	)
}
