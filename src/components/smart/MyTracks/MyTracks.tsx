import { TracksList } from 'components/ordinary/TracksList/TracksList'
import { Track } from 'models/Track'
import { FC, useState } from 'react'
import styles from './MyTracks.module.scss'

export interface IMyTracksProps {
  tracks?: Track[]
  loading?: boolean
}

export const MyTracks: FC<IMyTracksProps> = ({ tracks, loading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const lessSix = tracks && tracks?.length < 6

  const showTracks = isOpen ? tracks : tracks?.slice(0, 5)

  return (
    <div className={styles.myTracks}>
      <div className={styles.header}>
        <h2>Tracks</h2>
        {!lessSix && <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'HIDE' : 'MORE'}
        </button>}
      </div>
      <TracksList
        canUpload
        loading={loading}
        tracks={showTracks || []}
        className={styles.tracks}
        grid={!isOpen}
        canLike
      />
    </div>
  )
}
