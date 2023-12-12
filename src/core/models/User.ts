export interface User {
	_id: string
	avatarUrl: string
	login: string
	email: string
	role: 'user' | 'admin' | ''
  token?: string
}
