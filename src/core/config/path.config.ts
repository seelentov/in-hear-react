export const FOLDER = {
	IMAGES: '/images/',
	TRACKS: '/tracks/',
	PLAYLISTS: '/playlists/',
	ARTISTS: '/artists/',
	USERS: '/users/',
	AUDIO: '/audio/',
	DEFAULT: '/src/assets/default/',
}

export type FOLDER = (typeof FOLDER)[keyof typeof FOLDER]

export const PATH = {
	AUDIO: FOLDER.AUDIO,
	IMAGE: {
		USERS: FOLDER.IMAGES + FOLDER.USERS,
		TRACKS: FOLDER.IMAGES + FOLDER.TRACKS,
		PLAYLISTS: FOLDER.IMAGES + FOLDER.PLAYLISTS,
		ARTISTS: FOLDER.IMAGES + FOLDER.ARTISTS,
	},
	DEFAULT: {
		USER: FOLDER.DEFAULT + 'user.png',
		PLAYLIST: FOLDER.DEFAULT + 'playlist.jpg',
		TRACK: FOLDER.DEFAULT + 'track.png',
	},
}

export type PATH = (typeof PATH)[keyof typeof PATH]
