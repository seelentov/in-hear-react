import { ArtistsList } from 'components/ordinary/ArtistsList/ArtistsList';
import { PlaylistsList } from 'components/ordinary/PlaylistsList/PlaylistsList';
import { TracksList } from 'components/ordinary/TracksList/TracksList';
import { useDebounce } from 'hooks/useDebounce';
import { useStoreBy } from 'hooks/useStoreBy';
import { FC } from 'react';
import { useGetFilterArtistQuery } from 'store/api/artists.api';
import { useGetFilterPlaylistQuery } from 'store/api/playlist.api';
import { useGetFilterTracksQuery } from 'store/api/tracks.api';

export interface ISearchPageProps {

}

export const SearchPage: FC<ISearchPageProps> = () => {

  const { filter } = useStoreBy('ui')

  const filterDebounce = useDebounce(filter, 1000)

  const { data: tracks, isLoading: isLoadingTracks } = useGetFilterTracksQuery(filterDebounce)
  const { data: artists, isLoading: isLoadingArtists } = useGetFilterArtistQuery(filterDebounce)
  const { data: playlists, isLoading: isLoadingPlaylists } = useGetFilterPlaylistQuery(filterDebounce)

  return (
    <div>

      {
        isLoadingPlaylists || (playlists && playlists?.length > 0) &&
        <><h2>Playlists</h2>
          <PlaylistsList
            loading={isLoadingPlaylists}
            playlists={playlists || []}
          />
        </>
      }

      {
        isLoadingArtists || (artists && artists.length > 0) &&
        <>
          <h2>Artists</h2>
          <ArtistsList
            loading={isLoadingArtists}
            showLikes
            artists={artists || []}
          />
        </>
      }
      {
        isLoadingTracks || (tracks && tracks.length > 0) &&
        <>
          <h2>Tracks</h2>
          <TracksList
            loading={isLoadingTracks}
            tracks={tracks || []}
            showLikes
            canLike
          />
        </>
      }
      {
        (tracks && tracks.length === 0) && (playlists && playlists.length === 0) && (artists && artists.length === 0) && <p>Not found..</p>
      }
    </div>
  );
}