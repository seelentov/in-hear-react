import { useActions } from 'hooks/useActions'
import { useIsAuth } from 'hooks/useIsAuth'
import { Artist } from 'models/Artist'
import { Playlist } from 'models/Playlist'
import { FC } from 'react'
import { FaPlay } from 'react-icons/fa'
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { BeatLoader } from 'react-spinners'
import { usePatchDelLibMutation, usePatchLibMutation } from 'store/api/lib.api'
import styles from './PlaylistControls.module.scss'

export interface IPlaylistControlsProps {
  handlePlay: () => void
  liked: boolean
  info?: Playlist | Artist
  type: 'artists' | 'playlists'
}

export const PlaylistControls: FC<IPlaylistControlsProps> = ({
  handlePlay,
  liked,
  info,
  type
}) => {
  const isAuth = useIsAuth()

  const [patchLib, { isLoading }] = usePatchLibMutation()
  const [patchDelLib, { isLoading: isLoadingDel }] = usePatchDelLibMutation()

  const { removePlaylist, addPlaylist, removeArtist, addArtist } = useActions()

  const handleToggleLib = () => {
    if (!info || isLoading || isLoadingDel) return

    try {
      if (liked) {
        patchDelLib({
          [type]: [info._id],
        }).then(() =>
          type === 'playlists' ? removePlaylist(info) : removeArtist(info)
        )
      } else {
        patchLib({
          [type]: [info._id],
        }).then(() =>
          type === 'playlists' ? addPlaylist(info) : addArtist(info)
        )
      }
    } catch (error) {
      alert(error)
    }
  }

  const ToggleLibBtn = () => <>
    {(isAuth && <button className={styles.icon} onClick={handleToggleLib}>
      {(isLoading || isLoadingDel) ? (
        <BeatLoader size={5} color={'white'} />
      ) :
        liked ? (
          <RiHeart2Fill size={16} color={'var(--color-background)'} />
        ) : (
          <RiHeart2Line size={16} color={'var(--color-background)'} />
        )}
    </button>)}
  </>

  return (
    <div className={styles.controls}>
      <button className={styles.icon} onClick={handlePlay}>
        <FaPlay size={16} color={'var(--color-background)'} />
      </button>
      <ToggleLibBtn />
    </div>
  )
}
