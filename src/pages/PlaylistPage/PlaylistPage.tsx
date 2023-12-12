import { PlaylistMore } from 'components/smart/PlaylistMore/PlaylistMore'
import { HREF } from 'config/routing.config'
import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetPlaylistQuery } from 'store/api/playlist.api'

export interface IPlaylistPageProps {}

export const PlaylistPage: FC<IPlaylistPageProps> = () => {
	const { id } = useParams()

	const { data: playlist, isLoading } = useGetPlaylistQuery(id)

	if (!id) {
		return <Navigate to={HREF.HOME} />
	}

	return (
		<PlaylistMore
    type="playlists"
			{...{
				infoLoading: isLoading,
				tracksLoading: isLoading,
				tracks: playlist?.tracks,
				info: playlist,
			}}
		/>
	)
}
