import { PATH } from 'config/path.config'
import { Artist } from 'models/Artist'
import { generateId } from 'utils/data/generateId'

export const artists: Artist[] = [
	{
		id: generateId(),
		name: 'Test Artist',
		img: PATH.DEFAULT.USER,
		likes: 1,
	},
	{
		id: generateId(),
		name: 'Test Artist 1',
		img: PATH.DEFAULT.USER,
		likes: 2,
	},
	{
		id: generateId(),
		name: 'Test Artist 2',
		img: PATH.DEFAULT.USER,
		likes: 3,
	},
	{
		id: generateId(),
		name: 'Test Artist 3',
		img: PATH.DEFAULT.USER,
		likes: 4,
	},
	{
		id: generateId(),
		name: 'Test Artist 4',
		img: PATH.DEFAULT.USER,
		likes: 5,
	},
]
export const artist = artists[0]
