import React from 'react';
import TrackInfo from './TrackInfo';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import WaveformVisualizer from './WaveformVisualizer';

const DesktopPlayer = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffled,
  repeatMode,
  isLiked,
  showWaveform,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  onToggleWaveform
}) => {
  return (
    <div className="hidden md:block bg-card border border-border rounded-lg shadow-music-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-heading-bold text-xl text-foreground">
          Now Playing
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleWaveform}
            className={`
              px-3 py-1 rounded-md text-sm font-body font-body-medium music-transition
              ${showWaveform 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:text-foreground'
              }
            `}
          >
            Waveform
          </button>
        </div>
      </div>

      {/* Track Information */}
      <TrackInfo
        track={track}
        isLiked={isLiked}
        onToggleLike={onToggleLike}
        className="mb-6"
      />

      {/* Waveform or Progress Bar */}
      <div className="mb-6">
        {showWaveform ? (
          <WaveformVisualizer
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
          />
        ) : (
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            showTime={true}
          />
        )}
      </div>

      {/* Controls Section */}
      <div className="flex items-center justify-between">
        {/* Playback Controls */}
        <div className="flex-1">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
            isShuffled={isShuffled}
            onToggleShuffle={onToggleShuffle}
            repeatMode={repeatMode}
            onToggleRepeat={onToggleRepeat}
          />
        </div>

        {/* Volume Control */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
          className="flex-shrink-0"
        />
      </div>

      {/* Additional Track Info */}
      {track && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {track.duration && (
              <div>
                <span className="font-caption text-muted-foreground">Duration</span>
                <p className="font-body font-body-medium text-foreground">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </p>
              </div>
            )}
            {track.genre && (
              <div>
                <span className="font-caption text-muted-foreground">Genre</span>
                <p className="font-body font-body-medium text-foreground">{track.genre}</p>
              </div>
            )}
            {track.year && (
              <div>
                <span className="font-caption text-muted-foreground">Year</span>
                <p className="font-body font-body-medium text-foreground">{track.year}</p>
              </div>
            )}
            {track.bitrate && (
              <div>
                <span className="font-caption text-muted-foreground">Quality</span>
                <p className="font-body font-body-medium text-foreground">{track.bitrate} kbps</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopPlayer;