import { FC } from 'react';
import styles from './UploadTracks.module.scss';
import { Button } from 'components/ui/Button/Button';

export interface IUploadTracksProps {

}

export const UploadTracks: FC<IUploadTracksProps> = () => {
  return (
    <div className={styles.uploadTracks}>
      <div className={styles.list}>
        
      </div>
      <Button>Upload</Button>
    </div>
  );
}
