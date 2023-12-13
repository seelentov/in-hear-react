
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from 'firebase/auth'

export const API_URL = 'http://localhost:4444/api/'

export interface loginData {
	email: string
	password: string
}

export interface signUpData {
	email: string
	password: string
	login: string
	avatarUrl: string
}

const token = localStorage.getItem('token')

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['user', 'tracks', 'playlists', 'artists'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', token || '')
			headers.set('Content-Type', 'application/json')
			return headers
		}
	}),
	endpoints: builder => ({
    getMe: builder.query<User, void>({
			query: () => 'auth/me',
      providesTags: ['user']
		}),
		postAuth: builder.mutation<User, loginData>({
			query: body => ({
				url: 'auth/login/',
				method: 'POST',
				body: body,
				
			}),
      invalidatesTags: ['user']
		}),
		postSignUp: builder.mutation<User, signUpData>({
			query: body => ({
				url: 'auth/signup/',
				method: 'POST',
				body: body,
				
			}),
      invalidatesTags: ['user']
		}),
	}),
})
export const { usePostAuthMutation, usePostSignUpMutation, useGetMeQuery } = api