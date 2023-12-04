import { PATH } from "config/path.config"

export type NewUser ={
  id: string
  name: string
  login: string
  email: string
}

export class User{
  public id: string
  public name: string
  public img: string
  public login: string
  public email: string
  public tracks: string[] | []
  public playlists: string[] | []
  public role: 'user' | 'admin'

  constructor(dt: NewUser){
    this.id = dt.id
    this.name = dt.name
    this.img = PATH.DEFAULT.USER
    this.role = 'admin'
    this.login = dt.login
    this.email = dt.email
    this.tracks = []
    this.playlists = []
}

}