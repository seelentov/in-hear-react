import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList'
import { Artist } from 'models/Artist'
import { FC, useState } from 'react'
import styles from './MyArtists.module.scss'

export interface IMyTracksProps {
  artists?: Artist[]
  loading?: boolean
}

export const MyArtists: FC<IMyTracksProps> = ({ loading, artists }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const showArtists = isOpen ? artists : artists?.slice(0, 6)

  const isEmpty = artists?.length === 0
  
  return (
    <div className={styles.myArtists}>
      <div className={styles.header}>
        <h2>Artists</h2>
        {!isEmpty && <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'HIDE' : 'MORE'}
        </button>}
      </div>
      <ArtistsList
        loading={loading}
        className={styles.artists}
        artists={showArtists || []}
        grid={isOpen}
      />
    </div>
  )
}
