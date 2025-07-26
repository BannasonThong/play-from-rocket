import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VolumeControl = ({ 
  volume, 
  isMuted, 
  onVolumeChange, 
  onToggleMute,
  className = "" 
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'VolumeX';
    if (volume > 0.5) return 'Volume2';
    return 'Volume1';
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Volume Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleMute}
        onMouseEnter={() => setShowSlider(true)}
        className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground hover:text-foreground music-hover-scale"
      >
        <Icon name={getVolumeIcon()} size={18} />
      </Button>

      {/* Volume Slider - Desktop */}
      <div 
        className="hidden md:block relative"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <div className={`
          flex items-center space-x-2 music-transition
          ${showSlider ? 'opacity-100 w-24' : 'opacity-0 w-0 overflow-hidden'}
        `}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) 100%)`
            }}
          />
        </div>
      </div>

      {/* Volume Percentage - Desktop */}
      {showSlider && (
        <span className="hidden lg:block font-mono text-xs text-muted-foreground w-8">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      )}
    </div>
  );
};

export default VolumeControl;