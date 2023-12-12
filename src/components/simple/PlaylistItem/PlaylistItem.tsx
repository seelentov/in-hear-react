import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import axios from 'axios'
import { HREF } from 'config/routing.config'
import { useIsAuth } from 'hooks/useIsAuth'
import { Lib } from 'models/Lib'
import { Playlist } from 'models/Playlist'
import { FC } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdMoreHoriz } from 'react-icons/md'
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { API_URL } from 'store/api/api'
import { usePatchDelLibMutation, usePatchLibMutation } from 'store/api/lib.api'
import styles from './PlaylistItem.module.scss'

export interface IPlaylistItemProps {
  playlist: Playlist
  showLikes?: boolean
  playPlaylist: ActionCreatorWithPayload<any, 'player/playPlaylist'>
  userPlaylists: Lib

  removePlaylist: ActionCreatorWithPayload<any, 'lib/removePlaylist'>
  addPlaylist: ActionCreatorWithPayload<any, 'lib/addPlaylist'>
}

export const PlaylistItem: FC<IPlaylistItemProps> = ({
  playlist,
  showLikes,
  playPlaylist,
  removePlaylist,
  addPlaylist,
  userPlaylists,
}) => {
  const isLiked = userPlaylists.playlists.some(
    (pl: Playlist) => pl._id === playlist._id
  )

  const isAuth = useIsAuth()

  const [patchLib, { isLoading }] = usePatchLibMutation()
  const [patchDelLib, { isLoading: isLoadingDel }] = usePatchDelLibMutation()

  const handlePlay = () => {
    axios
      .get(API_URL + 'playlists/' + playlist._id)
      .then(res => {
        playPlaylist(res.data.tracks)
      })
      .catch(err => alert(err))
  }

  const handleToggleLib = (e: any) => {
    if (isLoading || isLoadingDel) return
    e.stopPropagation()
    try {
      if (isLiked) {
        patchDelLib({
          playlists: [playlist._id],
        }).then(() => removePlaylist(playlist))
      } else {
        patchLib({
          playlists: [playlist._id],
        }).then(() => addPlaylist(playlist))
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
        isLiked ? (
          <RiHeart2Fill size={16} color={'var(--color-background)'} />
        ) : (
          <RiHeart2Line size={16} color={'var(--color-background)'} />
        )}
    </button>)}

  </>

  return (
    <article className={styles.playlistItem}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${playlist.imageUrl})`,
        }}
      >
        <button className={styles.icon} onClick={handlePlay}>
          <FaPlay size={16} color={'var(--color-background)'} />
        </button>

        <div className={styles.btns}>
          <ToggleLibBtn />
          <Link to={HREF.PLAYLISTS + playlist._id} className={styles.icon}>
            <MdMoreHoriz size={16} color={'var(--color-background)'} />
          </Link>
        </div>
      </div>
      <h3>{playlist.name}</h3>
      {showLikes && <p className='text-desc'>{playlist.likes} likes</p>}
    </article>
  )
}
