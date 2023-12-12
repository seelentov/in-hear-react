import { FC } from 'react'
import styles from './TrackLoading.module.scss'

export interface ITrackLoadingProps {

}

export const TrackLoading: FC<ITrackLoadingProps> = () => {
  return (
    <div className={styles.trackLoading}>
    </div>
  );
}