import cn from 'classnames'
import { TrackItem } from 'components/simple/TrackItem/TrackItem'
import { UploadTracks } from 'components/smart/UploadTracks/UploadTracks'
import { TrackLoading } from 'components/ui/TrackLoading/TrackLoading'
import { useActions } from 'hooks/useActions'
import { useStoreBy } from 'hooks/useStoreBy'
import { Track } from 'models/Track'
import { ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, HTMLAttributes, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import styles from './TracksList.module.scss'
export interface ITracksListProps extends HTMLAttributes<HTMLOListElement> {
  tracks?: Track[]
  grid?: boolean
  showLikes?: boolean
  className?: string
  canLike?: boolean
  loading?: boolean
  canUpload?: boolean
  hidePlayBtn?: boolean
}

export const TracksList: FC<ITracksListProps> = ({
  tracks,
  grid,
  showLikes,
  className,
  canLike,
  loading,
  canUpload,
  hidePlayBtn,
  ...rest
}) => {
  const { playTracks, toggleTrack, addTrack, removeTrack } = useActions()


  const { currentId, play } = useStoreBy('player')
  const { data: userTracks } = useStoreBy('lib')
  const { openModal } = useContext(ModalContext)


  const handlePlay = (isActive: boolean, currentTrack: string) => {
    if (isActive) {
      toggleTrack()
    } else {
      playTracks({ tracks, currentTrack })
    }
  }

  const handleUpload = (e: any) => {
    const files = Array.from(e.target.files)
    if (!e.target.files) return
    if (files.some((file: any) => !file.type.includes('audio'))) return alert('This is not an music!')
    openModal(<UploadTracks uploads={files as File[]} />)
  }


  if (!loading && tracks?.length === 0 && !canUpload) {
    return (
      <section
        className={cn(
          className,
          grid ? styles.tracksListGrid : styles.tracksListColumn,
          styles.loading
        )}
        {...rest}
      >
        <p>Tracks not found</p>
      </section>
    )
  }


  if (loading) {
    return (
      <section className={cn(
        className,
        grid ? styles.tracksListGrid : styles.tracksListColumn,
        styles.loading
      )}
        {...rest}>
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
      {canUpload && <label className={styles.upload}>
        <FaPlus size={16} />
        <input type="file" hidden multiple onChange={handleUpload} />
      </label>}
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
              hidePlayBtn
            }}
          />
        )
      })}

    </section>
  )
}
