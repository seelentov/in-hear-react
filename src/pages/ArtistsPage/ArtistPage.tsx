import { PlaylistMore } from 'components/smart/PlaylistMore/PlaylistMore'
import { HREF } from 'config/routing.config'
import { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetArtistQuery } from 'store/api/artists.api'
import { useGetArtistTracksQuery } from 'store/api/tracks.api'

export interface IPlaylistPageProps {}

export const ArtistPage: FC<IPlaylistPageProps> = () => {
	const { id } = useParams()

	const { data: info, isLoading: infoLoading } = useGetArtistQuery(id as string)

	const { data: tracks, isLoading: tracksLoading } = useGetArtistTracksQuery(
		info?.name as string
	)

	if (!id) {
		return <Navigate to={HREF.HOME} />
	}

	return <PlaylistMore type="artists" {...{ infoLoading, tracksLoading, tracks, info }} />
}
