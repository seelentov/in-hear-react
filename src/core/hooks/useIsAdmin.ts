import { useStoreBy } from './useStoreBy'

export const useIsAdmin = () => {
	const { role } = useStoreBy('user')

	return role === 'admin'
}
