import { Artist } from "./Artist"
import { Playlist } from "./Playlist"
import { Track } from "./Track"

export interface Lib {
	_id: string
	tracks: Track[]
	playlists: Playlist[]
	artists: Artist[]
  userId: string
}
