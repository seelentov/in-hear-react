import { FC } from 'react';
import { BounceLoader } from 'react-spinners';
import { ILoadingProps } from '../Loading/Loading';
import styles from './LoadingGlobal.module.scss';
import { Logo } from '../Logo/Logo';

export interface ILoadingGlobalProps {

}

export const LoadingGlobal: FC<ILoadingProps> = () => {
  return (
    <div className={styles.loadingGlobal}>
      <Logo />
      <BounceLoader color={'var(--color-primary)'} />
    </div>
  );
}