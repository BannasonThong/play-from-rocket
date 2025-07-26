import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaybackControls = ({ 
  isPlaying, 
  isLoading = false,
  onPlayPause, 
  onPrevious, 
  onNext,
  isShuffled,
  onToggleShuffle,
  repeatMode,
  onToggleRepeat,
  className = ""
}) => {
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return 'Repeat1';
      case 'all':
        return 'Repeat';
      default:
        return 'Repeat';
    }
  };

  const getRepeatColor = () => {
    return repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground';
  };

  return (
    <div className={`flex items-center justify-center space-x-2 md:space-x-4 ${className}`}>
      {/* Shuffle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleShuffle}
        className={`w-8 h-8 md:w-10 md:h-10 music-hover-scale ${
          isShuffled ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon name="Shuffle" size={16} />
      </Button>

      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground hover:text-foreground music-hover-scale"
      >
        <Icon name="SkipBack" size={18} />
      </Button>

      {/* Play/Pause Button */}
      <Button
        variant="default"
        size="icon"
        onClick={onPlayPause}
        disabled={isLoading}
        className="w-12 h-12 md:w-14 md:h-14 music-hover-scale shadow-music-md"
      >
        {isLoading ? (
          <Icon 
            name="Loader2" 
            size={24}
            className="text-primary-foreground animate-spin"
          />
        ) : (
          <Icon 
            name={isPlaying ? "Pause" : "Play"} 
            size={24}
            className="text-primary-foreground"
          />
        )}
      </Button>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground hover:text-foreground music-hover-scale"
      >
        <Icon name="SkipForward" size={18} />
      </Button>

      {/* Repeat Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleRepeat}
        className={`w-8 h-8 md:w-10 md:h-10 music-hover-scale ${getRepeatColor()}`}
      >
        <Icon name={getRepeatIcon()} size={16} />
      </Button>
    </div>
  );
};

export default PlaybackControls;