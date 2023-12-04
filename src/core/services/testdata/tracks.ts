import { Track } from 'models/Track'

export const tracks = [
  new Track({
		id: 'askdjaskdjwjjdjwjd',
		name: 'Вкус яда',
		artist: 'GONE.Fludd',
		src: '/src/assets/test/GONEFludd_IROH_-_VKUS_YADA.mp3',
		time: 19_500,
	}),
	new Track({
		id: 'asdhjkashdjashkdsa',
		name: 'Сахарный человек',
		artist: 'GONE.Fludd',
		src: '/src/assets/test/GONEFludd_-_SAKHARNYJJ_CHELOVEK.mp3',
		time: 16_500,
	}),
	new Track({
		id: 'jsakdjaskldjlkasad',
		name: 'Вторник',
		artist: 'GONE.Fludd',
		src: '/src/assets/test/GONEFludd_-_VTORNIK.mp3',
		time: 11_200,
	}),
	
]


export const myTracks = [
	new Track({
		id: 'asdhjkashdjashkdsa',
		name: 'Сахарный человек',
		artist: 'GONE.Fludd',
		src: '/src/assets/test/GONEFludd_-_SAKHARNYJJ_CHELOVEK.mp3',
		time: 16_500,
	}),
	new Track({
		id: 'jsakdjaskldjlkasad',
		name: 'Вторник',
		artist: 'GONE.Fludd',
		src: '/src/assets/test/GONEFludd_-_VTORNIK.mp3',
		time: 11_200,
	}),
	
]

export const track = tracks[0]
