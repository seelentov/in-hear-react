import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import cn from 'classnames'
import { useIsAuth } from 'hooks/useIsAuth'
import { Lib } from 'models/Lib'
import { Track as ITrack, Track } from 'models/Track'
import { FC, HTMLAttributes } from 'react'
import { FaMinus, FaPause, FaPlay, FaPlus } from 'react-icons/fa'
import { BeatLoader } from 'react-spinners'
import { usePatchDelLibMutation, usePatchLibMutation } from 'store/api/lib.api'
import { getTimeFromMilliseconds } from 'utils/time/getTimeFromMillisec'
import styles from './TrackItem.module.scss'

export interface ITrackItemProps extends HTMLAttributes<HTMLDivElement> {
  track: ITrack
  showLikes?: boolean
  canLike?: boolean
  currentId: string
  play: boolean
  userTracks: Lib
  addTrack: ActionCreatorWithPayload<any, 'lib/addTrack'>
  removeTrack: ActionCreatorWithPayload<any, 'lib/removeTrack'>
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
  ...rest
}) => {
  const isActive = currentId === track._id

  const isLiked = userTracks.tracks.some((tr: Track) => tr._id === track._id)

  const isAuth = useIsAuth()

  const [patchLib, { isLoading }] = usePatchLibMutation()
  const [patchDelLib, { isLoading: isLoadingDel }] = usePatchDelLibMutation()

  const handleToggleLib = (e: any) => {
    e.stopPropagation()
    if (isLoading || isLoadingDel) return
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

  const ToggleLibBtn = () => <>
    {canLike && isAuth && (
      <button onClick={handleToggleLib}>
        {(isLoading || isLoadingDel) ? (

          <BeatLoader size={5} color={'white'} />
        ) :
          isLiked ? (
            <FaMinus size={16} />
          ) : (
            <FaPlus size={16} />
          )}
      </button>
    )}
  </>

  return (
    <article className={cn(styles.track, isActive && styles.active)} {...rest}>
      {isActive ? (
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
          {track.artist} - {getTimeFromMilliseconds(track.duration)}
          {showLikes && ` - ${track.likes ? track.likes : 0} likes`}
        </p>
      </div>
      <ToggleLibBtn />
    </article>
  )
}
