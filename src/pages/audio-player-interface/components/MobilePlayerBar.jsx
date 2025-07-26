import React from 'react';
import TrackInfo from './TrackInfo';
import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';

const MobilePlayerBar = ({
  track,
  isPlaying,
  currentTime,
  duration,
  isLiked,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onToggleLike,
  onExpandPlayer
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-music-lg z-40">
      {/* Progress Bar */}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
        showTime={false}
        className="px-0"
      />

      {/* Main Content */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div 
            className="flex-1 min-w-0 cursor-pointer"
            onClick={onExpandPlayer}
          >
            <TrackInfo
              track={track}
              isLiked={isLiked}
              onToggleLike={onToggleLike}
              className="space-x-3"
            />
          </div>

          {/* Compact Controls */}
          <div className="flex items-center space-x-1 ml-4">
            <PlaybackControls
              isPlaying={isPlaying}
              onPlayPause={onPlayPause}
              onPrevious={onPrevious}
              onNext={onNext}
              className="space-x-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayerBar;