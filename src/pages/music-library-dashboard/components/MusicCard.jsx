import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MusicCard = ({ track, onPlay, onAddToQueue, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 music-hover-scale music-transition group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onShowDetails(track)}
    >
      {/* Album Artwork */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <Image
          src={track.artwork}
          alt={`${track.title} by ${track.artist}`}
          className="w-full aspect-square object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className={`
          absolute inset-0 bg-black/50 flex items-center justify-center
          music-transition ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button
            variant="default"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(track);
            }}
            className="w-12 h-12 music-hover-scale"
          >
            <Icon name="Play" size={24} />
          </Button>
        </div>
      </div>

      {/* Track Info */}
      <div className="space-y-1 mb-3">
        <h3 className="font-body font-body-medium text-sm text-foreground truncate">
          {track.title}
        </h3>
        <p className="font-caption text-xs text-muted-foreground truncate">
          {track.artist}
        </p>
        <p className="font-caption text-xs text-muted-foreground truncate">
          {track.album}
        </p>
      </div>

      {/* Duration and Actions */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">
          {formatDuration(track.duration)}
        </span>
        
        <div className={`
          flex items-center space-x-1 music-transition
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onAddToQueue(track);
            }}
            className="w-6 h-6"
          >
            <Icon name="Plus" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorite functionality
            }}
            className="w-6 h-6"
          >
            <Icon name="Heart" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;