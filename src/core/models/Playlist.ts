import { Track } from "./Track"

export interface Playlist {
	_id: string
	name: string
	imageUrl: string
	likes: number
	tracks: Track[]
	desc: string
	author: string
}
