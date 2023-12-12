import { FC } from 'react'
import styles from './PlaylistLoading.module.scss'

export interface IPlaylistLoadingProps {

}

export const PlaylistLoading: FC<IPlaylistLoadingProps> = () => {
  return (
    <div className={styles.playlistLoading}>
      
    </div>
  );
}