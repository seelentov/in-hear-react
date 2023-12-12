import { FC } from 'react'
import styles from './ArtistLoading.module.scss'

export interface IArtistLoadingProps {}

export const ArtistLoading: FC<IArtistLoadingProps> = () => {
	return <div className={styles.artistLoading}></div>
}
