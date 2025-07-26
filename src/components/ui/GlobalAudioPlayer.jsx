import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [isLoading, setIsLoading] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const audioRef = useRef(null);

  // Mock current track data - enhanced to support URLs and YouTube
  const currentTrack = {
    title: "Bohemian Rhapsody",
    artist: "Queen", 
    album: "A Night at the Opera",
    artwork: "/assets/images/no_image.png",
    duration: 355, // 5:55 in seconds
    url: "/assets/audio/sample.mp3", // Can be YouTube URL or direct audio URL
    source: "file", // 'file', 'url', 'youtube'
    isUrl: false
  };

  const isYouTubeTrack = currentTrack?.source === 'youtube';
  const isUrlTrack = currentTrack?.source === 'url' || currentTrack?.isUrl;

  useEffect(() => {
    if (!isYouTubeTrack && !isUrlTrack) {
      // Traditional audio element handling
      const audio = audioRef.current;
      if (!audio) return;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleTrackEnd);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleTrackEnd);
      };
    }
  }, [isYouTubeTrack, isUrlTrack]);

  const handlePlayPause = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isYouTubeTrack || isUrlTrack) {
        // Handle ReactPlayer
        if (isPlaying) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      } else {
        // Handle traditional audio element
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackEnd = async () => {
    setIsPlaying(false);

    if (repeatMode === 'one') {
      if (isYouTubeTrack || isUrlTrack) {
        playerRef.current?.seekTo(0);
        setIsPlaying(true);
      } else {
        audioRef.current.currentTime = 0;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-repeat playback error:', error);
        }
      }
    } else if (repeatMode === 'all') {
      // In a real app, this would skip to next track
      if (isYouTubeTrack || isUrlTrack) {
        playerRef.current?.seekTo(0);
        setIsPlaying(true);
      } else {
        audioRef.current.currentTime = 0;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-repeat playbook error:', error);
        }
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (isYouTubeTrack || isUrlTrack) {
      playerRef.current?.seekTo(newTime, 'seconds');
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ReactPlayer event handlers
  const handlePlayerReady = () => {
    setPlayerReady(true);
    setIsLoading(false);
  };

  const handlePlayerProgress = ({ played, playedSeconds }) => {
    setCurrentTime(playedSeconds);
  };

  const handlePlayerDuration = (duration) => {
    setDuration(duration);
  };

  const handlePlayerEnded = () => {
    handleTrackEnd();
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-music-lg z-40">
      {/* Hidden ReactPlayer for YouTube/URL tracks */}
      {(isYouTubeTrack || isUrlTrack) && (
        <div style={{ display: 'none' }}>
          <ReactPlayer
            ref={playerRef}
            url={currentTrack?.url}
            playing={isPlaying}
            volume={isMuted ? 0 : volume}
            onReady={handlePlayerReady}
            onProgress={handlePlayerProgress}
            onDuration={handlePlayerDuration}
            onEnded={handlePlayerEnded}
            onError={(error) => {
              console.error('ReactPlayer error:', error);
              setIsLoading(false);
              setIsPlaying(false);
            }}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0
                }
              }
            }}
          />
        </div>
      )}

      {/* Traditional audio element for file-based tracks */}
      {!isYouTubeTrack && !isUrlTrack && (
        <audio ref={audioRef} preload="metadata">
          <source src={currentTrack?.url || "/assets/audio/sample.mp3"} type="audio/mpeg" />
        </audio>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        {/* Track Info */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {currentTrack?.artwork ? (
              <img 
                src={currentTrack.artwork} 
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Music" size={20} className="text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-body font-body-medium text-sm text-foreground truncate">
              {currentTrack?.title || "No track selected"}
            </h4>
            <p className="font-caption text-xs text-muted-foreground truncate">
              {currentTrack?.artist || "Unknown artist"}
            </p>
            {(isYouTubeTrack || isUrlTrack) && (
              <div className="flex items-center mt-1">
                <Icon 
                  name={isYouTubeTrack ? "Youtube" : "Link"} 
                  size={10} 
                  className="text-muted-foreground mr-1" 
                />
                <span className="text-xs text-muted-foreground">
                  {isYouTubeTrack ? "YouTube" : "External URL"}
                </span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShuffle}
              className={`w-8 h-8 ${isShuffled ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name="Shuffle" size={16} />
            </Button>
            
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Icon name="SkipBack" size={16} />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 music-hover-scale"
            >
              {isLoading ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Icon name="SkipForward" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRepeat}
              className={`w-8 h-8 ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon name={repeatMode === 'one' ? "Repeat1" : "Repeat"} size={16} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="font-mono text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 h-1 bg-muted rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full relative music-transition"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 music-transition" />
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="w-8 h-8">
            <Icon 
              name={isMuted ? "VolumeX" : volume > 0.5 ? "Volume2" : "Volume1"} 
              size={16} 
            />
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) 100%)`
            }}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-3">
        {/* Progress Bar */}
        <div 
          className="h-1 bg-muted rounded-full cursor-pointer mb-3"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-primary rounded-full music-transition"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              {currentTrack?.artwork ? (
                <img 
                  src={currentTrack.artwork} 
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Icon name="Music" size={16} className="text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-body font-body-medium text-sm text-foreground truncate">
                {currentTrack?.title || "No track selected"}
              </h4>
              <div className="flex items-center space-x-2">
                <p className="font-caption text-xs text-muted-foreground truncate">
                  {currentTrack?.artist || "Unknown artist"}
                </p>
                {(isYouTubeTrack || isUrlTrack) && (
                  <Icon 
                    name={isYouTubeTrack ? "Youtube" : "Link"} 
                    size={10} 
                    className="text-muted-foreground" 
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Icon name="SkipBack" size={16} />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 music-hover-scale"
            >
              {isLoading ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Icon name="SkipForward" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;