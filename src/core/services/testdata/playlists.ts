import { PATH } from 'config/path.config'
import { Playlist } from 'models/Playlist'
import { generateId } from 'utils/data/generateId'

export const playlists: Playlist[] = [
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
	{
		id: generateId(),
		name: 'Test playlist 1',
		img: PATH.DEFAULT.PLAYLIST,
		likes: 10,
		tracks: [generateId(), generateId(), generateId()],
		desc: 'Test playlist 1: description - description - description - description - description - description - description - description',
		author: 'Name',
	},
]

export const playlist = playlists[0]
