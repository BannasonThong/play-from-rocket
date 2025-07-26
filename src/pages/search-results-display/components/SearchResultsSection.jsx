import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultsSection = ({ title, results, type, isExpanded, onToggle }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track) => {
    console.log('Playing track:', track.title);
    // In a real app, this would trigger the global audio player
  };

  const handleAddToQueue = (track) => {
    console.log('Adding to queue:', track.title);
    // In a real app, this would add to the playback queue
  };

  const renderTrackResult = (track) => (
    <div
      key={track.id}
      className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-muted music-transition cursor-pointer"
      onMouseEnter={() => setHoveredItem(track.id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Artwork */}
      <div className="relative w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <Icon name="Music" size={20} className="text-primary" />
        </div>
        {hoveredItem === track.id && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePlayTrack(track)}
              className="w-8 h-8 text-white hover:text-white hover:bg-white/20"
            >
              <Icon name="Play" size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-body-medium text-sm text-foreground truncate">
          {track.title}
        </h4>
        <p className="font-caption text-xs text-muted-foreground truncate">
          {track.artist} • {track.album}
        </p>
      </div>

      {/* Duration */}
      <div className="hidden sm:block">
        <span className="font-mono text-xs text-muted-foreground">
          {formatDuration(track.duration)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 music-transition">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleAddToQueue(track)}
          className="w-8 h-8"
        >
          <Icon name="Plus" size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
        >
          <Icon name="Heart" size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
        >
          <Icon name="MoreHorizontal" size={14} />
        </Button>
      </div>
    </div>
  );

  const renderArtistResult = (artist) => (
    <div
      key={artist.id}
      className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-muted music-transition cursor-pointer"
    >
      {/* Artist Avatar */}
      <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary" />
        </div>
      </div>

      {/* Artist Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-body-medium text-sm text-foreground truncate">
          {artist.name}
        </h4>
        <p className="font-caption text-xs text-muted-foreground">
          {artist.trackCount} tracks
        </p>
      </div>

      {/* Follow Button */}
      <Button
        variant="outline"
        size="sm"
        className="opacity-0 group-hover:opacity-100 music-transition"
      >
        Follow
      </Button>
    </div>
  );

  const renderAlbumResult = (album) => (
    <div
      key={album.id}
      className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-muted music-transition cursor-pointer"
    >
      {/* Album Artwork */}
      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <Icon name="Disc" size={20} className="text-primary" />
        </div>
      </div>

      {/* Album Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-body font-body-medium text-sm text-foreground truncate">
          {album.title}
        </h4>
        <p className="font-caption text-xs text-muted-foreground truncate">
          {album.artist} • {album.year} • {album.trackCount} tracks
        </p>
      </div>

      {/* Play Album Button */}
      <Button
        variant="default"
        size="sm"
        iconName="Play"
        iconPosition="left"
        className="opacity-0 group-hover:opacity-100 music-transition"
      >
        Play
      </Button>
    </div>
  );

  const renderResult = (item) => {
    switch (type) {
      case 'tracks':
        return renderTrackResult(item);
      case 'artists':
        return renderArtistResult(item);
      case 'albums':
        return renderAlbumResult(item);
      default:
        return null;
    }
  };

  if (!results || results.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      {/* Section Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted music-transition"
      >
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="font-heading font-heading-bold text-lg text-foreground">
            {title}
          </h3>
          <span className="font-caption text-sm text-muted-foreground">
            ({results.length})
          </span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground"
        />
      </button>

      {/* Results List */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="max-h-96 overflow-y-auto">
            {results.slice(0, 10).map(renderResult)}
          </div>
          {results.length > 10 && (
            <div className="p-4 border-t border-border text-center">
              <Button variant="outline" size="sm">
                Show {results.length - 10} more {type}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsSection;