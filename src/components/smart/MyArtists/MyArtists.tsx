import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList'
import { useIsAdmin } from 'hooks/useIsAdmin'
import { Artist } from 'models/Artist'
import { FC, useState } from 'react'
import styles from './MyArtists.module.scss'

export interface IMyTracksProps {
  artists?: Artist[]
  loading?: boolean
}

export const MyArtists: FC<IMyTracksProps> = ({ loading, artists }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isAdmin = useIsAdmin()
  const showArtists = isOpen ? artists : artists?.slice(0, 5)

  const lessSix = artists && artists?.length < 6

  return (
    <div className={styles.myArtists}>
      <div className={styles.header}>
        <h2>Artists</h2>
        {!lessSix && <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'HIDE' : 'MORE'}
        </button>}
      </div>
      <ArtistsList
        canUpload={isAdmin}
        loading={loading}
        className={styles.artists}
        artists={showArtists || []}
        grid={isOpen}
      />
    </div>
  )
}
