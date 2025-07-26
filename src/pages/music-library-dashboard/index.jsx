import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import GlobalAudioPlayer from '../../components/ui/GlobalAudioPlayer';
import ViewToggle from './components/ViewToggle';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import MusicCard from './components/MusicCard';
import MusicListView from './components/MusicListView';
import LibraryStats from './components/LibraryStats';
import QuickFilters from './components/QuickFilters';
import EmptyState from './components/EmptyState';

const MusicLibraryDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock music library data
  const musicLibrary = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: 355,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      dateAdded: "2025-01-20",
      playCount: 127,
      isFavorite: true
    },
    {
      id: 2,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: 391,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      dateAdded: "2025-01-18",
      playCount: 89,
      isFavorite: false
    },
    {
      id: 3,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: 294,
      genre: "Pop",
      artwork: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      dateAdded: "2025-01-15",
      playCount: 203,
      isFavorite: true
    },
    {
      id: 4,
      title: "Sweet Child O\' Mine",
      artist: "Guns N\' Roses",
      album: "Appetite for Destruction",
      duration: 356,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      dateAdded: "2025-01-12",
      playCount: 156,
      isFavorite: true
    },
    {
      id: 5,
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      duration: 233,
      genre: "Pop",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      dateAdded: "2025-01-10",
      playCount: 78,
      isFavorite: false
    },
    {
      id: 6,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: 482,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      dateAdded: "2025-01-08",
      playCount: 234,
      isFavorite: true
    },
    {
      id: 7,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: 200,
      genre: "Pop",
      artwork: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop",
      dateAdded: "2025-01-05",
      playCount: 145,
      isFavorite: false
    },
    {
      id: 8,
      title: "Thunderstruck",
      artist: "AC/DC",
      album: "The Razors Edge",
      duration: 292,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      dateAdded: "2025-01-03",
      playCount: 98,
      isFavorite: true
    },
    {
      id: 9,
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      duration: 194,
      genre: "Pop",
      artwork: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      dateAdded: "2025-01-01",
      playCount: 167,
      isFavorite: false
    },
    {
      id: 10,
      title: "Don\'t Stop Believin'",
      artist: "Journey",
      album: "Escape",
      duration: 251,
      genre: "Rock",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      dateAdded: "2024-12-28",
      playCount: 189,
      isFavorite: true
    }
  ];

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('musiczone-library-view');
    if (savedView && ['grid', 'list'].includes(savedView)) {
      setCurrentView(savedView);
    }
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Save view preference
  useEffect(() => {
    localStorage.setItem('musiczone-library-view', currentView);
  }, [currentView]);

  // Filter and search logic
  const filteredTracks = useMemo(() => {
    let filtered = [...musicLibrary];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query)
      );
    }

    // Apply quick filters
    switch (activeQuickFilter) {
      case 'recent':
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 7);
        filtered = filtered.filter(track => new Date(track.dateAdded) >= recentDate);
        break;
      case 'favorites':
        filtered = filtered.filter(track => track.isFavorite);
        break;
      case 'most-played':
        filtered = filtered.filter(track => track.playCount > 100);
        break;
      case 'rock':
        filtered = filtered.filter(track => track.genre === 'Rock');
        break;
      case 'pop':
        filtered = filtered.filter(track => track.genre === 'Pop');
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, activeQuickFilter, musicLibrary]);

  // Calculate library statistics
  const libraryStats = useMemo(() => {
    const totalDuration = musicLibrary.reduce((sum, track) => sum + track.duration, 0);
    const uniqueArtists = new Set(musicLibrary.map(track => track.artist)).size;
    const uniqueAlbums = new Set(musicLibrary.map(track => track.album)).size;

    return {
      totalTracks: musicLibrary.length,
      totalDuration,
      totalArtists: uniqueArtists,
      totalAlbums: uniqueAlbums
    };
  }, [musicLibrary]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleQuickFilterSelect = (filterId) => {
    setActiveQuickFilter(filterId);
    
    // Add to active filters if not 'all'
    if (filterId !== 'all') {
      const filterLabels = {
        recent: 'Recently Added',
        favorites: 'Favorites',
        'most-played': 'Most Played',
        rock: 'Genre',
        pop: 'Genre'
      };
      
      const filterValues = {
        recent: 'Last 7 days',
        favorites: 'Liked tracks',
        'most-played': '100+ plays',
        rock: 'Rock',
        pop: 'Pop'
      };

      const newFilter = {
        id: filterId,
        label: filterLabels[filterId],
        value: filterValues[filterId]
      };

      setActiveFilters(prev => {
        const existing = prev.find(f => f.id === filterId);
        if (existing) return prev;
        return [...prev.filter(f => f.label !== newFilter.label), newFilter];
      });
    } else {
      setActiveFilters([]);
    }
  };

  const handleFilterRemove = (filterId) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
    if (filterId === activeQuickFilter) {
      setActiveQuickFilter('all');
    }
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setActiveQuickFilter('all');
    setSearchQuery('');
  };

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track.title);
    // Integration with GlobalAudioPlayer would happen here
  };

  const handleAddToQueue = (track) => {
    console.log('Adding to queue:', track.title);
    // Queue management logic would be implemented here
  };

  const handleShowTrackDetails = (track) => {
    console.log('Showing details for:', track.title);
    // Navigate to track details or open modal
  };

  const handleUploadMusic = () => {
    navigate('/music-upload-interface');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto music-pulse">
                <div className="w-6 h-6 bg-primary-foreground rounded-full"></div>
              </div>
              <p className="font-body text-muted-foreground">Loading your music library...</p>
            </div>
          </div>
        </main>
        <GlobalAudioPlayer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="font-heading font-heading-bold text-2xl md:text-3xl text-foreground mb-2">
                  Music Library
                </h1>
                <p className="font-body text-muted-foreground">
                  Discover and play your personal music collection
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <ViewToggle 
                  currentView={currentView} 
                  onViewChange={handleViewChange} 
                />
              </div>
            </div>

            {/* Library Statistics */}
            <LibraryStats {...libraryStats} />
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>

          {/* Quick Filters */}
          <QuickFilters 
            onFilterSelect={handleQuickFilterSelect}
            activeQuickFilter={activeQuickFilter}
          />

          {/* Active Filters */}
          <FilterChips 
            activeFilters={activeFilters}
            onFilterRemove={handleFilterRemove}
            onClearAll={handleClearAllFilters}
          />

          {/* Music Content */}
          {filteredTracks.length === 0 ? (
            <EmptyState 
              type={searchQuery ? 'search' : activeFilters.length > 0 ? 'filter' : 'library'}
              onAction={searchQuery || activeFilters.length > 0 ? handleClearAllFilters : handleUploadMusic}
            />
          ) : (
            <div className="animate-fade-in">
              {currentView === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                  {filteredTracks.map((track) => (
                    <MusicCard
                      key={track.id}
                      track={track}
                      onPlay={handlePlayTrack}
                      onAddToQueue={handleAddToQueue}
                      onShowDetails={handleShowTrackDetails}
                    />
                  ))}
                </div>
              ) : (
                <MusicListView
                  tracks={filteredTracks}
                  onPlay={handlePlayTrack}
                  onAddToQueue={handleAddToQueue}
                  onShowDetails={handleShowTrackDetails}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <GlobalAudioPlayer />
    </div>
  );
};

export default MusicLibraryDashboard;