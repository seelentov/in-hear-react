import { InputRange } from 'components/ui/InputRange/InputRange'
import { FC, useEffect, useState } from 'react'
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io'
import styles from './Player.module.scss'

export interface IVolumeProps {
	audioRef: React.MutableRefObject<HTMLAudioElement>
}

export const Volume: FC<IVolumeProps> = ({ audioRef }) => {
	const [volume, setVolume] = useState(30)
	const [muteVolume, setMuteVolume] = useState(false)

	useEffect(() => {
		if (audioRef) {
			audioRef.current.volume = volume / 100
			audioRef.current.muted = muteVolume
		}
	}, [volume, audioRef, muteVolume])

	return (
		<div className={styles.volume}>
			<button onClick={() => setMuteVolume(prev => !prev)}>
				{muteVolume || volume < 5 ? (
					<IoMdVolumeOff />
				) : volume < 40 ? (
					<IoMdVolumeLow />
				) : (
					<IoMdVolumeHigh />
				)}
			</button>
			<InputRange
				min={0}
				max={100}
				value={volume}
				onChange={e => setVolume(parseInt(e.target.value))}
				style={{
					background: `linear-gradient(to right, var(--color-primary) ${volume}%, #ccc ${volume}%)`,
				}}
			/>
		</div>
	)
}
