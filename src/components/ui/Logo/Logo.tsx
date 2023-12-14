import { FC } from 'react'
import styles from './Logo.module.scss'
import logo from '/svg/logo.svg'

export interface ILogoProps { }

export const Logo: FC<ILogoProps> = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt={'logo'}/>
      <h1>
        <span>in</span>Hear
      </h1>
    </div>
  )
}
