import { EditArtist } from 'components/smart/EditArtist/EditArtist'
import { EditPlaylist } from 'components/smart/EditPlaylist/EditPlaylist'
import { useActions } from 'hooks/useActions'
import { useIsAdmin } from 'hooks/useIsAdmin'
import { useIsAuth } from 'hooks/useIsAuth'
import { useStoreBy } from 'hooks/useStoreBy'
import { Artist } from 'models/Artist'
import { Playlist } from 'models/Playlist'
import { ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, useContext } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdEdit } from "react-icons/md"
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
  const isAdmin = useIsAdmin()
  const { _id: userId } = useStoreBy('user')
  const [patchLib, { isLoading }] = usePatchLibMutation()
  const [patchDelLib, { isLoading: isLoadingDel }] = usePatchDelLibMutation()

  const { removePlaylist, addPlaylist, removeArtist, addArtist } = useActions()

  const { openModal } = useContext(ModalContext)

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

  const EditButton = () => {

    if (type === 'artists' && isAdmin) {
      return (<button className={styles.icon} onClick={() => openModal(<EditArtist action='edit' artist={info as Artist} />)}>
        <MdEdit size={16} color={'var(--color-background)'} />
      </button>)
    }
    else if (type === 'playlists' && info?.author?._id === userId) {
      return (<button className={styles.icon} onClick={() => openModal(<EditPlaylist action='edit' playlist={info as Playlist} />)}>
        <MdEdit size={16} color={'var(--color-background)'} />
      </button>)
    }
  }

  return (
    <div className={styles.controls}>
      <button className={styles.icon} onClick={handlePlay}>
        <FaPlay size={16} color={'var(--color-background)'} />
      </button>
      <ToggleLibBtn />
      <EditButton />
    </div>
  )
}
