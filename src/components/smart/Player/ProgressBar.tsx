import { InputRange } from 'components/ui/InputRange/InputRange'
import { FC } from 'react'
import { getTimeFromMilliseconds } from 'utils/time/getTimeFromMillisec'
import styles from './Player.module.scss'

export interface IProgressBarProps {
	progressBarRef: React.MutableRefObject<HTMLInputElement>
	audioRef: React.MutableRefObject<HTMLAudioElement>
	timeProgress: number
	duration: number
}

export const ProgressBar: FC<IProgressBarProps> = ({
	progressBarRef,
	audioRef,
	timeProgress,
	duration,
}) => {
	const handleProgressChange = () => {
		audioRef.current.currentTime = parseInt(progressBarRef.current.value)
	}

	return (
		<>
			<div className={styles.progress}>
				<span>{getTimeFromMilliseconds(timeProgress * 100)}</span>

				<InputRange
					reference={progressBarRef}
					defaultValue='0'
					onChange={handleProgressChange}
				/>
				<span>{getTimeFromMilliseconds(duration * 100)}</span>
			</div>
		</>
	)
}
