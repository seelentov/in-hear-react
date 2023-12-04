import cn from 'classnames'
import { ArtistItem } from 'components/simple/ArtistItem/ArtistItem'
import { Artist } from 'models/Artist'
import { FC, HTMLAttributes, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ArtistsList.module.scss'

export interface IArtistsListProps extends HTMLAttributes<HTMLDivElement> {
	artists: Artist[]
	grid?: boolean
	showLikes?: boolean
	className?: string
}

export const ArtistsList: FC<IArtistsListProps> = ({
	grid,
	artists,
	className,
	showLikes,
	...rest
}) => {
	const swiperConfig = useMemo(() => {
		return {
			spaceBetween: 30,
			slidesPerView: 1.5,
			breakpoints: {
				376: {
					slidesPerView: 2,
				},
				600: {
					slidesPerView: 3,
				},
				900: {
					slidesPerView: 4,
				},
				1376: {
					slidesPerView: 6,
				},
				1550: {
					slidesPerView: 7,
				},
				2200: {
					slidesPerView: 9,
				},
			},
		}
	}, [])
	if (grid) {
		return (
			<section className={cn(className, styles.artistsGrid)} {...rest}>
				{artists.map(artist => (
					<ArtistItem artist={artist} key={artist.id} showLikes={showLikes} />
				))}
			</section>
		)
	}
	return (
		<section>
			<Swiper {...swiperConfig} className={cn(className, styles.artistsGrid)}>
				{artists.map(artist => (
					<SwiperSlide key={artist.id}>
						<ArtistItem artist={artist} showLikes={showLikes} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
