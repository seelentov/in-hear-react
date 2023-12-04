import { PATH } from 'config/path.config'

export class Playlist {
	public id: string
	public name: string
	public img: string
	public likes: number
	public tracks: string[] | []
	public desc: string
	public author: string

	constructor(id: string, name: string, author: string) {
		this.id = id
		this.name = name
		this.img = PATH.DEFAULT.PLAYLIST
		this.likes = 0
		this.tracks = []
		this.desc = ''
		this.author = author
	}
}
