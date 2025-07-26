import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import MobilePlayerBar from './components/MobilePlayerBar';
import DesktopPlayer from './components/DesktopPlayer';
import ExpandedMobilePlayer from './components/ExpandedMobilePlayer';

const AudioPlayerInterface = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const playPromiseRef = useRef(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [isLiked, setIsLiked] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock current track data
  const currentTrack = {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    duration: 355, // 5:55 in seconds
    year: 1975,
    genre: "Rock",
    bitrate: 320
  };

  // Load saved preferences
  useEffect(() => {
    const savedPreferences = localStorage.getItem('musiczone-player-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setVolume(preferences.volume || 0.8);
        setIsShuffled(preferences.isShuffled || false);
        setRepeatMode(preferences.repeatMode || 'off');
        setShowWaveform(preferences.showWaveform || false);
      } catch (error) {
        console.error('Failed to load player preferences:', error);
      }
    }

    const savedPosition = localStorage.getItem('musiczone-playback-position');
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition);
        if (position.trackId === currentTrack.id) {
          setCurrentTime(position.currentTime || 0);
        }
      } catch (error) {
        console.error('Failed to load playback position:', error);
      }
    }
  }, []);

  // Save preferences
  useEffect(() => {
    const preferences = {
      volume,
      isShuffled,
      repeatMode,
      showWaveform
    };
    localStorage.setItem('musiczone-player-preferences', JSON.stringify(preferences));
  }, [volume, isShuffled, repeatMode, showWaveform]);

  // Save playback position
  useEffect(() => {
    const position = {
      trackId: currentTrack.id,
      currentTime
    };
    localStorage.setItem('musiczone-playback-position', JSON.stringify(position));
  }, [currentTime, currentTrack.id]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = async () => {
      setIsPlaying(false);
      playPromiseRef.current = null;

      if (repeatMode === 'one') {
        audio.currentTime = 0;
        try {
          playPromiseRef.current = audio.play();
          await playPromiseRef.current;
          playPromiseRef.current = null;
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-repeat playback error:', error);
          playPromiseRef.current = null;
        }
      } else if (repeatMode === 'all') {
        // In a real app, this would skip to next track
        audio.currentTime = 0;
        try {
          playPromiseRef.current = audio.play();
          await playPromiseRef.current;
          playPromiseRef.current = null;
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-repeat playback error:', error);
          playPromiseRef.current = null;
        }
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, volume]);

  // Player control handlers
  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    setIsLoading(true);

    try {
      if (isPlaying) {
        // If there's a pending play promise, wait for it to resolve/reject first
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
          playPromiseRef.current = null;
        }
        audio.pause();
        setIsPlaying(false);
      } else {
        // Start playing
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      // Reset state on error
      setIsPlaying(false);
      playPromiseRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    // In a real app, this would skip to previous track
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
    }
  };

  const handleNext = () => {
    // In a real app, this would skip to next track
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
    }
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleToggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handleToggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleWaveform = () => {
    setShowWaveform(!showWaveform);
  };

  const handleExpandPlayer = () => {
    setIsExpanded(true);
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata">
        <source src="/assets/audio/sample.mp3" type="audio/mpeg" />
      </audio>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-heading-bold text-3xl md:text-4xl text-foreground mb-2">
              Audio Player
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Comprehensive playback controls and track information
            </p>
          </div>

          {/* Desktop Player */}
          <div className="max-w-4xl mx-auto">
            <DesktopPlayer
              track={currentTrack}
              isLoading={isLoading}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              isShuffled={isShuffled}
              repeatMode={repeatMode}
              isLiked={isLiked}
              showWaveform={showWaveform}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
              onToggleMute={handleToggleMute}
              onToggleShuffle={handleToggleShuffle}
              onToggleRepeat={handleToggleRepeat}
              onToggleLike={handleToggleLike}
              onToggleWaveform={handleToggleWaveform}
            />
          </div>

          {/* Navigation Links */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading font-heading-bold text-lg text-foreground mb-4">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/music-library-dashboard')}
                  className="p-4 bg-muted rounded-lg text-left hover:bg-muted/80 music-transition"
                >
                  <h4 className="font-body font-body-medium text-foreground mb-1">
                    Music Library
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground">
                    Browse your collection
                  </p>
                </button>
                
                <button
                  onClick={() => navigate('/search-results-display')}
                  className="p-4 bg-muted rounded-lg text-left hover:bg-muted/80 music-transition"
                >
                  <h4 className="font-body font-body-medium text-foreground mb-1">
                    Search Music
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground">
                    Find tracks and artists
                  </p>
                </button>
                
                <button
                  onClick={() => navigate('/music-upload-interface')}
                  className="p-4 bg-muted rounded-lg text-left hover:bg-muted/80 music-transition"
                >
                  <h4 className="font-body font-body-medium text-foreground mb-1">
                    Upload Music
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground">
                    Add new tracks
                  </p>
                </button>
                
                <button
                  onClick={() => navigate('/settings-and-preferences')}
                  className="p-4 bg-muted rounded-lg text-left hover:bg-muted/80 music-transition"
                >
                  <h4 className="font-body font-body-medium text-foreground mb-1">
                    Settings
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground">
                    Customize experience
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Player Bar */}
      <MobilePlayerBar
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        isLiked={isLiked}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={handleSeek}
        onToggleLike={handleToggleLike}
        onExpandPlayer={handleExpandPlayer}
      />

      {/* Expanded Mobile Player */}
      {isExpanded && (
        <ExpandedMobilePlayer
          track={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          isShuffled={isShuffled}
          repeatMode={repeatMode}
          isLiked={isLiked}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onToggleShuffle={handleToggleShuffle}
          onToggleRepeat={handleToggleRepeat}
          onToggleLike={handleToggleLike}
          onClose={handleCloseExpanded}
        />
      )}
    </div>
  );
};

export default AudioPlayerInterface;