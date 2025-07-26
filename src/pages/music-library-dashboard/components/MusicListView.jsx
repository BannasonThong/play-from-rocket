import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MusicListView = ({ tracks, onPlay, onAddToQueue, onShowDetails }) => {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTracks = [...tracks].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-body font-body-medium text-sm text-muted-foreground hover:text-foreground music-transition"
    >
      <span>{children}</span>
      {sortField === field && (
        <Icon 
          name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
        />
      )}
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/50">
        <div className="col-span-1"></div>
        <div className="col-span-4 md:col-span-3">
          <SortButton field="title">Title</SortButton>
        </div>
        <div className="hidden md:block md:col-span-3">
          <SortButton field="artist">Artist</SortButton>
        </div>
        <div className="hidden lg:block lg:col-span-2">
          <SortButton field="album">Album</SortButton>
        </div>
        <div className="col-span-2 md:col-span-1">
          <SortButton field="duration">Duration</SortButton>
        </div>
        <div className="col-span-5 md:col-span-2 lg:col-span-1"></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {sortedTracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 music-transition group cursor-pointer"
            onClick={() => onShowDetails(track)}
          >
            {/* Album Artwork */}
            <div className="col-span-1">
              <div className="relative w-10 h-10 rounded overflow-hidden">
                <Image
                  src={track.artwork}
                  alt={`${track.title} by ${track.artist}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 music-transition">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(track);
                    }}
                    className="w-6 h-6 text-white hover:text-white"
                  >
                    <Icon name="Play" size={12} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="col-span-4 md:col-span-3 flex items-center">
              <div className="min-w-0">
                <h3 className="font-body font-body-medium text-sm text-foreground truncate">
                  {track.title}
                </h3>
                <p className="md:hidden font-caption text-xs text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Artist */}
            <div className="hidden md:block md:col-span-3 flex items-center">
              <span className="font-caption text-sm text-muted-foreground truncate">
                {track.artist}
              </span>
            </div>

            {/* Album */}
            <div className="hidden lg:block lg:col-span-2 flex items-center">
              <span className="font-caption text-sm text-muted-foreground truncate">
                {track.album}
              </span>
            </div>

            {/* Duration */}
            <div className="col-span-2 md:col-span-1 flex items-center">
              <span className="font-mono text-sm text-muted-foreground">
                {formatDuration(track.duration)}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-5 md:col-span-2 lg:col-span-1 flex items-center justify-end space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToQueue(track);
                }}
                className="w-6 h-6 opacity-0 group-hover:opacity-100 music-transition"
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
                className="w-6 h-6 opacity-0 group-hover:opacity-100 music-transition"
              >
                <Icon name="Heart" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  // More options menu
                }}
                className="w-6 h-6 opacity-0 group-hover:opacity-100 music-transition"
              >
                <Icon name="MoreHorizontal" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicListView;