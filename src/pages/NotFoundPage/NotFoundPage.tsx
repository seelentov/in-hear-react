import { Button } from 'components/ui/Button/Button';
import { HREF } from 'config/routing.config';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export interface INotFoundPageProps {

}

export const NotFoundPage: FC<INotFoundPageProps> = () => {
  return (
    <div className={styles.notFound}>
      <h3>
        404
      </h3>
      <p>Not Found</p>
      <Link to={HREF.HOME}>
        <Button>Home</Button>
      </Link>
    </div>
  );
}