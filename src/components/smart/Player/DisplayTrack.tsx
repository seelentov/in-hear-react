import { Track } from 'models/Track'
import { FC } from 'react'
import styles from './Player.module.scss'

export interface IDisplayTrackProps {
  currentTrack: Track
  audioRef: React.MutableRefObject<HTMLAudioElement>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  progressBarRef: React.MutableRefObject<HTMLInputElement>
  handleNext: () => void
}

export const DisplayTrack: FC<IDisplayTrackProps> = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef?.current?.duration
    setDuration(seconds)
    progressBarRef.current.max = seconds.toString()
  }
  return (
    <div>
      <audio
        src={currentTrack?.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className={styles.info}>
        <p>{currentTrack?.name}</p>
        <p className='text-desc'>{currentTrack?.artist}</p>
      </div>
    </div>
  )
}
