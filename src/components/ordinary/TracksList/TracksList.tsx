import cn from 'classnames'
import { TrackItem } from 'components/simple/TrackItem/TrackItem'
import { TrackLoading } from 'components/ui/TrackLoading/TrackLoading'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Track } from 'models/Track'
import { FC, HTMLAttributes } from 'react'
import styles from './TracksList.module.scss'
import { FaPlus } from 'react-icons/fa'
export interface ITracksListProps extends HTMLAttributes<HTMLOListElement> {
  tracks?: Track[]
  grid?: boolean
  showLikes?: boolean
  className?: string
  canLike?: boolean
  loading?: boolean
  canUpload?: boolean
}

export const TracksList: FC<ITracksListProps> = ({
  tracks,
  grid,
  showLikes,
  className,
  canLike,
  loading,
  canUpload,
  ...rest
}) => {
  const { playTracks, toggleTrack, addTrack, removeTrack } = useActions()


  const { currentId, play } = useStoreBy('player')
  const { data: userTracks } = useStoreBy('lib')

  const handlePlay = (isActive: boolean, currentTrack: string) => {
    if (isActive) {
      toggleTrack()
    } else {
      playTracks({ tracks, currentTrack })
    }
  }

  if (loading) {
    return (
      <section
        className={cn(
          className,
          grid ? styles.tracksListGrid : styles.tracksListColumn,
          styles.loading
        )}
        {...rest}
      >
        {[...Array(4)].map(key => (
          <TrackLoading key={key} />
        ))}
      </section>
    )
  }

  return (
    <section
      className={cn(
        className,
        grid ? styles.tracksListGrid : styles.tracksListColumn
      )}
      {...rest}
    >
      {canUpload && <div className={styles.upload}>
        <FaPlus size={16} />
      </div>}
      {tracks?.map(track => {
        const isActive = currentId === track._id

        return (
          <TrackItem
            onClick={() => handlePlay(isActive, track._id)}
            key={track._id}
            {...{
              track,
              showLikes,
              canLike,
              currentId,
              play,
              userTracks,
              addTrack,
              removeTrack,
            }}
          />
        )
      })}
      
    </section>
  )
}
