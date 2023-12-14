import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import cn from 'classnames'
import { useIsAdmin } from 'hooks/useIsAdmin'
import { useIsAuth } from 'hooks/useIsAuth'
import { Lib } from 'models/Lib'
import { Track as ITrack, Track } from 'models/Track'
import { FC, HTMLAttributes } from 'react'
import { FaMinus, FaPause, FaPlay, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { BeatLoader } from 'react-spinners'
import { usePatchDelLibMutation, usePatchLibMutation } from 'store/api/lib.api'
import { useDeleteTrackMutation } from 'store/api/tracks.api'
import { getTimeFromMilliseconds } from 'utils/time/getTimeFromMillisec'
import styles from './TrackItem.module.scss'

export interface ITrackItemProps extends HTMLAttributes<HTMLDivElement> {
  track: ITrack
  showLikes?: boolean
  canLike?: boolean
  currentId?: string
  play?: boolean
  userTracks?: Lib
  addTrack?: ActionCreatorWithPayload<any, 'lib/addTrack'>
  removeTrack?: ActionCreatorWithPayload<any, 'lib/removeTrack'>
  hidePlayBtn?: boolean
}

export const TrackItem: FC<ITrackItemProps> = ({
  track,
  showLikes,
  canLike,
  currentId,
  play,
  userTracks,
  addTrack,
  removeTrack,
  hidePlayBtn,
  ...rest
}) => {
  const isActive = currentId === track._id

  const isLiked = userTracks?.tracks.some((tr: Track) => tr._id === track._id)

  const isAuth = useIsAuth()

  const [patchLib, { isLoading }] = usePatchLibMutation()
  const [patchDelLib, { isLoading: isLoadingDel }] = usePatchDelLibMutation()

  const isAdmin = useIsAdmin()

  const [delTrack, { isLoading: isLoadingDeleteMutation }] = useDeleteTrackMutation()

  const handleToggleLib = (e: any) => {
    e.stopPropagation()
    if (isLoading || isLoadingDel || !addTrack || !removeTrack) return
    try {
      if (isLiked) {
        patchDelLib({
          tracks: [track._id],
        }).then(() => removeTrack(track))
      } else {
        patchLib({
          tracks: [track._id],
        }).then(() => addTrack(track))
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    delTrack(track._id)
  }

  return (
    <article className={cn(styles.track, isActive && styles.active)} {...rest}>
      {!hidePlayBtn && <>{isActive ? (
        play ? (
          <FaPause size={16} color={'var(--color-primary)'} />
        ) : (
          <FaPlay size={16} color={'var(--color-primary)'} />
        )
      ) : (
        <FaPlay size={16} color={'var(--color-text)'} />
      )}</>}
      <div className={styles.name}>
        <h3>{track.name}</h3>
        <p className='text-desc'>
          <span>{track.artist}</span><span>{getTimeFromMilliseconds(track.duration)}{showLikes && ` - ${track.likes ? track.likes : 0} likes`}
          </span>
        </p>
      </div>
      {canLike && isAuth && (
        <button onClick={handleToggleLib}>
          {(isLoading || isLoadingDel) ? (

            <BeatLoader size={3} color={'white'} />
          ) :
            isLiked ? (
              <FaMinus size={16} />
            ) : (
              <FaPlus size={16} />
            )}
        </button>
      )}
      {isAdmin && (
        <button onClick={handleDelete}>
          {isLoadingDeleteMutation ? <BeatLoader size={3} color={'white'} /> : <MdDeleteForever size={16} />}
        </button>
      )}
    </article>
  )
}
