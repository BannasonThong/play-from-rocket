import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrackInfo = ({ track, isLiked, onToggleLike, className = "" }) => {
  if (!track) return null;

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Album Artwork */}
      <div className="relative group">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
          <Image
            src={track.artwork || "/assets/images/no_image.png"}
            alt={`${track.title} album artwork`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay for mobile */}
        <div className="md:hidden absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 music-transition flex items-center justify-center">
          <Icon name="Music" size={20} color="white" />
        </div>
      </div>

      {/* Track Details */}
      <div className="flex-1 min-w-0">
        <div className="space-y-1">
          <h3 className="font-body font-body-medium text-base md:text-lg text-foreground truncate">
            {track.title}
          </h3>
          <p className="font-caption text-sm text-muted-foreground truncate">
            {track.artist}
          </p>
          {track.album && (
            <p className="hidden md:block font-caption text-xs text-muted-foreground truncate">
              {track.album}
            </p>
          )}
        </div>

        {/* Additional metadata for desktop */}
        <div className="hidden lg:flex items-center space-x-4 mt-2">
          {track.year && (
            <span className="font-caption text-xs text-muted-foreground">
              {track.year}
            </span>
          )}
          {track.genre && (
            <span className="font-caption text-xs text-muted-foreground">
              {track.genre}
            </span>
          )}
          {track.bitrate && (
            <span className="font-caption text-xs text-muted-foreground">
              {track.bitrate} kbps
            </span>
          )}
        </div>
      </div>

      {/* Like Button */}
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleLike}
          className={`w-8 h-8 md:w-10 md:h-10 music-hover-scale ${
            isLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon 
            name={isLiked ? "Heart" : "Heart"} 
            size={18}
            className={isLiked ? 'fill-current' : ''}
          />
        </Button>
      </div>
    </div>
  );
};

export default TrackInfo;