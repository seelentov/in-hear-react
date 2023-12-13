import cn from 'classnames'
import { ArtistItem } from 'components/simple/ArtistItem/ArtistItem'
import { EditArtist } from 'components/smart/EditArtist/EditArtist'
import { ArtistLoading } from 'components/ui/ArtistLoading/ArtistLoading'
import { Artist } from 'models/Artist'
import { ModalContext } from 'providers/ModalProvider/ModalProvider'
import { FC, HTMLAttributes, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ArtistsList.module.scss'

export interface IArtistsListProps extends HTMLAttributes<HTMLDivElement> {
  artists: Artist[]
  grid?: boolean
  showLikes?: boolean
  className?: string
  loading?: boolean
  canUpload?: boolean
}

export const ArtistsList: FC<IArtistsListProps> = ({
  grid,
  artists,
  className,
  showLikes,
  loading,
  canUpload,
  ...rest
}) => {

  const { openModal } = useContext(ModalContext)

  const swiperConfig = {
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

  if (!loading && artists?.length === 0 && !canUpload) {
    return (
      <section className={cn(className, styles.artistsGrid)} {...rest}>
        <p>Artists not found</p>
      </section>
    )
  }

  if (loading) {
    if (grid) {
      return (
        <section className={cn(className, styles.artistsGrid)} {...rest}>
          {[...Array(5)].map(key => (
            <ArtistLoading key={key} />
          ))}
        </section>
      )
    }
    return (
      <section>
        <Swiper {...swiperConfig} className={cn(className)}>

          {[...Array(9)].map(key => (
            <SwiperSlide key={key}>
              <ArtistLoading />
            </SwiperSlide>

          ))}
        </Swiper>
      </section>
    )
  }

  if (grid) {
    return (
      <section className={cn(className, styles.artistsGrid)} {...rest}>
        {artists.map(artist => (
          <ArtistItem artist={artist} key={artist._id} showLikes={showLikes} />
        ))}
      </section>
    )
  }
  return (
    <section>
      <Swiper {...swiperConfig} className={cn(className)}>

        {canUpload && <SwiperSlide>
          <div className={styles.upload} onClick={() => openModal(<EditArtist action='create' />)}>
          <FaPlus size={32} />
        </div>
        </SwiperSlide>}

        {artists.map(artist => (
          <SwiperSlide key={artist._id}>
            <ArtistItem artist={artist} showLikes={showLikes} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
