import axios from 'axios'
import cn from 'classnames'
import { Aside } from 'components/smart/Aside/Aside'
import { Header } from 'components/smart/Header/Header'
import { Player } from 'components/smart/Player/Player'
import { useActions } from 'hooks/useActions'
import { useResize } from 'hooks/useResize'
import { useStoreBy } from 'hooks/useStoreBy'
import { FC, PropsWithChildren, useEffect } from 'react'
import { API_URL } from 'store/api/api'
import { fetchLib } from 'store/lib/lib.slice'
import styles from './Layout.module.scss'
import { useDispatch } from 'react-redux'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { setUser, setToken } = useActions()
  const dispatch = useDispatch()

	const token = localStorage.getItem('token')
	useEffect(() => {
		try {
			if (token) {
				setToken(token)
				axios
					.get(API_URL + 'auth/me/', {
						headers: {
							Authorization: token,
						},
					})
					.then(res => {
						setUser(res.data)
						
					})
          dispatch(fetchLib() as any)
			}
		} catch (error) {
			alert(error)
		}
	}, [])

	const { isMenuOpen } = useStoreBy('ui')
	const { isScreenLg } = useResize()
	return (
		<div className={cn(styles.body, 'theme--white')}>
			<Aside />
			<div
				className={cn(
					styles.wrapper,
					(isMenuOpen || isScreenLg) && styles.wrapperTranslation
				)}
			>
				<Header />
				<div className={styles.main}>{children}</div>
				<Player />
			</div>
		</div>
	)
}
