import { useStoreBy } from './useStoreBy'

export const useIsAuth = () => {
	const { _id } = useStoreBy('user')

	return !!_id
}
