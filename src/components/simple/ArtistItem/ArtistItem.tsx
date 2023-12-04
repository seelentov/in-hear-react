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
	artist: { name, img, likes, id },
	showLikes,
}) => {
	return (
		<Link to={HREF.ARTISTS + id}>
			<article className={styles.artist}>
				<img src={img} alt={name} />
				<h3>{name}</h3>
				{showLikes && <p className='text-desc'>{likes} likes</p>}
			</article>
		</Link>
	)
}
