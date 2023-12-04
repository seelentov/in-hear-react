import { useStoreBy } from './useStoreBy'

export const useIsAuth = () => {
	const { id } = useStoreBy('user')

	return !!id
}
