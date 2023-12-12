import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from 'firebase/auth'

export const API_URL = 'http://localhost:4444/api/'

export const onQueryStartedErrorToast = async (_: any, queryFulfilled: any) => {
	try {
		await queryFulfilled
	} catch (error: any) {
		const errorMessage: string = error.error.error
		alert(errorMessage)
		console.log(errorMessage)
	}
}

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

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['user', 'tracks', 'playlists', 'artists'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }: any) => {
			const token = getState().user.token
			headers.set('Authorization', token)
			headers.set('Content-Type', 'application/json')
			return headers
		},
	}),

	endpoints: builder => ({
		postAuth: builder.mutation<User, loginData>({
			query: body => ({
				url: 'auth/login/',
				method: 'POST',
				body: body,
				invalidatesTags: ['user'],
				onQueryStarted: onQueryStartedErrorToast,
			}),
		}),
		postSignUp: builder.mutation<User, signUpData>({
			query: body => ({
				url: 'auth/signup/',
				method: 'POST',
				body: body,
				invalidatesTags: ['user'],
				onQueryStarted: onQueryStartedErrorToast,
			}),
		}),
	}),
})
export const { usePostAuthMutation, usePostSignUpMutation } = api
