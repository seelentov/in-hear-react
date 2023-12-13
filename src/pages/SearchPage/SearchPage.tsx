import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList';
import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList';
import { TracksList } from 'components/ordinary/TracksList/TracksList';
import { HREF } from 'config/routing.config';
import { useDebounce } from 'hooks/useDebounce';
import { useStoreBy } from 'hooks/useStoreBy';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFilterArtistQuery } from 'store/api/artists.api';
import { useGetFilterPlaylistQuery } from 'store/api/playlist.api';
import { useGetFilterTracksQuery } from 'store/api/tracks.api';

export interface ISearchPageProps {

}

export const SearchPage: FC<ISearchPageProps> = () => {

  const navigate = useNavigate()

  const { filter } = useStoreBy('ui')

  const filterDebounce = useDebounce(filter, 1000)

  const { data: tracks, isLoading: isLoadingTracks } = useGetFilterTracksQuery(filterDebounce)
  const { data: artists, isLoading: isLoadingArtists } = useGetFilterArtistQuery(filterDebounce)
  const { data: playlists, isLoading: isLoadingPlaylists } = useGetFilterPlaylistQuery(filterDebounce)

  useEffect(() => {
    if (filter.length === 0) {
      navigate(HREF.HOME)
    }

  }, [filterDebounce])

  return (
    <div>
      <h2>Playlists</h2>
      <PlaylistsList
        loading={isLoadingPlaylists}
        playlists={playlists || []}
      />
      <h2>Artists</h2>
      <ArtistsList
        loading={isLoadingArtists}
        showLikes
        artists={artists || []}
      />
      <h2>Tracks</h2>
      <TracksList
        loading={isLoadingTracks}
        tracks={tracks || []}
        showLikes
        canLike
      />
    </div>
  );
}