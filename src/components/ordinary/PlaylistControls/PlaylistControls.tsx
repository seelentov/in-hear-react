import { EditArtist } from 'components/smart/EditArtist/EditArtist'
import { EditPlaylist } from 'components/smart/EditPlaylist/EditPlaylist'
import { LoadingGlobal } from 'components/ui/LoadingGlobal/LoadingGlobal'
import { HREF } from 'config/routing.config'
import { useActions } from 'hooks/useActions'
import { useIsAdmin } from 'hooks/useIsAdmin'
import { useIsAuth } from 'hooks/useIsAuth'
import { useStoreBy } from 'hooks/useStoreBy'
import { Artist } from 'models/Artist'
import { Playlist } from 'models/Playlist'
import { ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, useContext } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { useDeleteArtistMutation } from 'store/api/artists.api'
import { usePatchDelLibMutation, usePatchLibMutation } from 'store/api/lib.api'
import { useDeletePlaylistMutation } from 'store/api/playlist.api'
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


  const [deletePlaylist, { isLoading: isLoadingDelPlaylist }] = useDeletePlaylistMutation()

  const [deleteArtist, { isLoading: isLoadingDelArtist }] = useDeleteArtistMutation()

  const { openModal } = useContext(ModalContext)

  const navigate = useNavigate()

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

  const handleDelete = () => {
    try {
      if (type === 'playlists' && info) {
        deletePlaylist(info._id)
          .then(() => alert(`Delete successfully: ${info.name}`))
          .then(() => navigate(HREF.HOME))
      } else if (type === 'artists' && info) {
        deleteArtist(info._id)
          .then(() => alert(`Delete successfully: ${info.name}`))
          .then(() => navigate(HREF.HOME))
      }
    } catch (error) {
      alert(error)
    }
  }


  const DeleteButton = () => {
    if (type === 'artists' && isAdmin) {
      return (<button className={styles.icon} onClick={() => handleDelete()}>
        <MdDeleteForever size={16} color={'var(--color-background)'} />
      </button>)
    }
    else if (type === 'playlists') {
      const playlist = info as Playlist
      const playlistId = playlist?.author?._id
      if (playlistId === userId || isAdmin) {
        return (<button className={styles.icon} onClick={() => handleDelete()}>
          <MdDeleteForever size={16} color={'var(--color-background)'} />
        </button>)
      }

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
    else if (type === 'playlists') {
      const playlist = info as Playlist
      const playlistId = playlist?.author?._id
      if (playlistId === userId || isAdmin) {
        return (<button className={styles.icon} onClick={() => openModal(<EditPlaylist action='edit' playlist={info as Playlist} />)}>
          <MdEdit size={16} color={'var(--color-background)'} />
        </button>)
      }

    }
  }

  const PlayBytton = () => <button className={styles.icon} onClick={handlePlay}>
    <FaPlay size={16} color={'var(--color-background)'} />
  </button>

  return (
    <>
      {isLoadingDelPlaylist || isLoadingDelArtist && <LoadingGlobal />}
      <div className={styles.controls}>
        <PlayBytton />
        <ToggleLibBtn />
        <EditButton />
        <DeleteButton />
      </div>
    </>
  )
}
