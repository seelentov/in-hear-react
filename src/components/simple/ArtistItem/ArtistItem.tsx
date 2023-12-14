import { HREF } from 'config/routing.config'
import { Artist } from 'models/Artist'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './ArtistItem.module.scss'

export interface IArtistItemProps {
  artist: Artist
  showLikes?: boolean
}

export const ArtistItem: FC<IArtistItemProps> = ({
  artist: { name, imageUrl, likes, _id },
  showLikes,
}) => {
  return (
    <Link to={HREF.ARTISTS + _id}>
      <article className={styles.artist}>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        {showLikes && <p className='text-desc'>{likes} likes</p>}
      </article>
    </Link>
  )
}
