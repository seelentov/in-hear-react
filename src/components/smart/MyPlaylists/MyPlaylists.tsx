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

  const showPlaylists = isOpen ? playlists : playlists?.slice(0, 5)

  const lessSix = playlists && playlists?.length < 6


  return (
    <div className={styles.myPlaylists}>
      <div className={styles.header}>
        <h2>Playlists</h2>
        {!lessSix && <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'HIDE' : 'MORE'}
        </button>}
      </div>
      <PlaylistsList
        canUpload
        loading={loading}
        playlists={showPlaylists || []}
        grid={isOpen}
      />
    </div>
  )
}
