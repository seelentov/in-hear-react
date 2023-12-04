import { PATH } from 'config/path.config'

export class Artist {
	public id: string
	public name: string
	public img: string
	public likes: number

	constructor(id: string, name: string) {
		this.id = id
		this.name = name
		this.img = PATH.DEFAULT.PLAYLIST
		this.likes = 0
	}
}
