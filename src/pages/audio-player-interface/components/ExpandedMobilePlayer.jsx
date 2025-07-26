import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import PlaybackControls from './PlaybackControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

const ExpandedMobilePlayer = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffled,
  repeatMode,
  isLiked,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLike,
  onClose
}) => {
  return (
    <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-10 h-10"
        >
          <Icon name="ChevronDown" size={24} />
        </Button>
        
        <h2 className="font-heading font-heading-bold text-lg text-foreground">
          Now Playing
        </h2>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10"
        >
          <Icon name="MoreHorizontal" size={24} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Large Album Artwork */}
        <div className="flex justify-center mb-8">
          <div className="w-80 h-80 max-w-[80vw] max-h-[80vw] rounded-2xl overflow-hidden bg-muted shadow-music-lg">
            <img
              src={track?.artwork || "/assets/images/no_image.png"}
              alt={`${track?.title} album artwork`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/assets/images/no_image.png";
              }}
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-8">
          <h3 className="font-heading font-heading-bold text-2xl text-foreground mb-2">
            {track?.title || "Unknown Track"}
          </h3>
          <p className="font-body text-lg text-muted-foreground mb-4">
            {track?.artist || "Unknown Artist"}
          </p>
          {track?.album && (
            <p className="font-caption text-sm text-muted-foreground">
              {track.album}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            showTime={true}
          />
        </div>

        {/* Playback Controls */}
        <div className="mb-6">
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
            isShuffled={isShuffled}
            onToggleShuffle={onToggleShuffle}
            repeatMode={repeatMode}
            onToggleRepeat={onToggleRepeat}
            className="justify-center space-x-6"
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleLike}
            className={`w-12 h-12 ${
              isLiked ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon 
              name="Heart" 
              size={24}
              className={isLiked ? 'fill-current' : ''}
            />
          </Button>

          {/* Volume Control */}
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />

          {/* Share Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 text-muted-foreground"
          >
            <Icon name="Share" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedMobilePlayer;