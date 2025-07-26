import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import GlobalAudioPlayer from '../../components/ui/GlobalAudioPlayer';
import SearchHeader from './components/SearchHeader';
import SearchFilters from './components/SearchFilters';
import SearchResultsSection from './components/SearchResultsSection';
import EmptySearchState from './components/EmptySearchState';
import LoadingState from './components/LoadingState';

const SearchResultsDisplay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    tracks: true,
    artists: true,
    albums: true
  });
  const [filters, setFilters] = useState({
    genres: [],
    durations: [],
    dateAdded: null
  });

  // Mock search results data
  const mockResults = {
    tracks: [
      {
        id: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        duration: 355,
        genre: "Rock",
        dateAdded: "2025-01-20"
      },
      {
        id: 2,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        duration: 482,
        genre: "Rock",
        dateAdded: "2025-01-19"
      },
      {
        id: 3,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        duration: 391,
        genre: "Rock",
        dateAdded: "2025-01-18"
      },
      {
        id: 4,
        title: "Imagine",
        artist: "John Lennon",
        album: "Imagine",
        duration: 183,
        genre: "Pop",
        dateAdded: "2025-01-17"
      },
      {
        id: 5,
        title: "Sweet Child O\' Mine",
        artist: "Guns N\' Roses",
        album: "Appetite for Destruction",
        duration: 356,
        genre: "Rock",
        dateAdded: "2025-01-16"
      },
      {
        id: 6,
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        duration: 294,
        genre: "Pop",
        dateAdded: "2025-01-15"
      }
    ],
    artists: [
      {
        id: 1,
        name: "Queen",
        trackCount: 24,
        genre: "Rock"
      },
      {
        id: 2,
        name: "Led Zeppelin",
        trackCount: 18,
        genre: "Rock"
      },
      {
        id: 3,
        name: "Eagles",
        trackCount: 12,
        genre: "Rock"
      },
      {
        id: 4,
        name: "Michael Jackson",
        trackCount: 15,
        genre: "Pop"
      }
    ],
    albums: [
      {
        id: 1,
        title: "A Night at the Opera",
        artist: "Queen",
        year: 1975,
        trackCount: 12,
        genre: "Rock"
      },
      {
        id: 2,
        title: "Led Zeppelin IV",
        artist: "Led Zeppelin",
        year: 1971,
        trackCount: 8,
        genre: "Rock"
      },
      {
        id: 3,
        title: "Hotel California",
        artist: "Eagles",
        year: 1976,
        trackCount: 9,
        genre: "Rock"
      },
      {
        id: 4,
        title: "Thriller",
        artist: "Michael Jackson",
        year: 1982,
        trackCount: 9,
        genre: "Pop"
      }
    ]
  };

  // Filter and search logic
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { tracks: [], artists: [], albums: [] };
    }

    const query = searchQuery.toLowerCase();
    
    const filterBySearch = (items, searchFields) => {
      return items.filter(item => 
        searchFields.some(field => 
          item[field]?.toLowerCase().includes(query)
        )
      );
    };

    const applyFilters = (items, type) => {
      return items.filter(item => {
        // Genre filter
        if (filters.genres.length > 0 && !filters.genres.includes(item.genre)) {
          return false;
        }

        // Duration filter (only for tracks)
        if (type === 'tracks' && filters.durations.length > 0) {
          const duration = item.duration;
          const matchesDuration = filters.durations.some(filter => {
            switch (filter) {
              case 'short': return duration < 180;
              case 'medium': return duration >= 180 && duration <= 300;
              case 'long': return duration > 300;
              default: return true;
            }
          });
          if (!matchesDuration) return false;
        }

        // Date filter (only for tracks)
        if (type === 'tracks' && filters.dateAdded) {
          const itemDate = new Date(item.dateAdded);
          const now = new Date();
          const daysDiff = Math.floor((now - itemDate) / (1000 * 60 * 60 * 24));
          
          switch (filters.dateAdded) {
            case 'today': return daysDiff === 0;
            case 'week': return daysDiff <= 7;
            case 'month': return daysDiff <= 30;
            case 'year': return daysDiff <= 365;
            default: return true;
          }
        }

        return true;
      });
    };

    const searchedTracks = filterBySearch(mockResults.tracks, ['title', 'artist', 'album']);
    const searchedArtists = filterBySearch(mockResults.artists, ['name']);
    const searchedAlbums = filterBySearch(mockResults.albums, ['title', 'artist']);

    return {
      tracks: applyFilters(searchedTracks, 'tracks'),
      artists: applyFilters(searchedArtists, 'artists'),
      albums: applyFilters(searchedAlbums, 'albums')
    };
  }, [searchQuery, filters]);

  const totalResults = filteredResults.tracks.length + 
                      filteredResults.artists.length + 
                      filteredResults.albums.length;

  // Search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilters({
      genres: [],
      durations: [],
      dateAdded: null
    });
    setIsFilterOpen(false);
  };

  const hasResults = totalResults > 0;
  const showResults = searchQuery.trim() && !isLoading && hasResults;
  const showEmptyState = searchQuery.trim() && !isLoading && !hasResults;
  const showInitialState = !searchQuery.trim() && !isLoading;
  const showLoadingState = isLoading && searchQuery.trim();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Search Results - MusicZone</title>
        <meta name="description" content="Search and discover your favorite music tracks, artists, and albums in your personal music library." />
      </Helmet>

      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pb-24">
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterToggle={handleFilterToggle}
            isFilterOpen={isFilterOpen}
            resultCount={totalResults}
          />

          <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
            <SearchFilters
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {showLoadingState && (
              <LoadingState searchQuery={searchQuery} />
            )}

            {showInitialState && (
              <EmptySearchState 
                searchQuery=""
                onClearSearch={handleClearSearch}
              />
            )}

            {showEmptyState && (
              <EmptySearchState 
                searchQuery={searchQuery}
                onClearSearch={handleClearSearch}
              />
            )}

            {showResults && (
              <div className="space-y-6">
                <SearchResultsSection
                  title="Tracks"
                  results={filteredResults.tracks}
                  type="tracks"
                  isExpanded={expandedSections.tracks}
                  onToggle={() => handleSectionToggle('tracks')}
                />

                <SearchResultsSection
                  title="Artists"
                  results={filteredResults.artists}
                  type="artists"
                  isExpanded={expandedSections.artists}
                  onToggle={() => handleSectionToggle('artists')}
                />

                <SearchResultsSection
                  title="Albums"
                  results={filteredResults.albums}
                  type="albums"
                  isExpanded={expandedSections.albums}
                  onToggle={() => handleSectionToggle('albums')}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <GlobalAudioPlayer />
    </div>
  );
};

export default SearchResultsDisplay;