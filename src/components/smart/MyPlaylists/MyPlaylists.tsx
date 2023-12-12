import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList'
import { FC, useState } from 'react'

import { Playlist } from 'models/Playlist'
import styles from './MyPlaylists.module.scss'

export interface IMyTracksProps {
  playlists?: Playlist[]
  loading?: boolean
}

export const MyPlaylists: FC<IMyTracksProps> = ({ playlists, loading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const showPlaylists = isOpen ? playlists : playlists?.slice(0, 6)

  const isEmpty = playlists?.length === 0


  return (
    <div className={styles.myPlaylists}>
      <div className={styles.header}>
        <h2>Playlists</h2>
        {!isEmpty && <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'HIDE' : 'MORE'}
        </button>}
      </div>
      <PlaylistsList
        loading={loading}
        className={styles.playlists}
        playlists={showPlaylists || []}
        grid={isOpen}
      />
    </div>
  )
}
