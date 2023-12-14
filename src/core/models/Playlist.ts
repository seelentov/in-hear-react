
import { Track } from "./Track"
import { User } from "./User"

export interface Playlist {
	_id: string
	name: string
	imageUrl: string
	likes: number
	tracks: Track[]
	desc: string
	author: User
}
