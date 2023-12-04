import { PATH } from 'config/path.config'
import { getTimeFromMilliseconds } from 'utils/time/getTimeFromMillisec'

export type NewTrack = {
	name: string
	artist: string
	src: string
	time: number
	img?: string
	id: string
}

export class Track {
	public id: string
	public name: string
	public likes: number
	public artist: string
	public src: string
	public img: string
	public time: {
		seconds: number
		date: string
	}

	constructor(dt: NewTrack) {
		this.id = dt.id
		this.name = dt.name
		this.likes = 0
		this.artist = dt.artist
		this.src = dt.src
		this.time = {
			seconds: dt.time,
			date: getTimeFromMilliseconds(dt.time),
		}
		this.img = dt.img || PATH.DEFAULT.TRACK
	}
}
