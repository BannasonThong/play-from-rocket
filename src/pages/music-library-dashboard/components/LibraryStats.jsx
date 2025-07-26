import React from 'react';
import Icon from '../../../components/AppIcon';

const LibraryStats = ({ totalTracks, totalDuration, totalArtists, totalAlbums }) => {
  const formatTotalDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const stats = [
    {
      icon: 'Music',
      label: 'Tracks',
      value: totalTracks.toLocaleString(),
      color: 'text-primary'
    },
    {
      icon: 'Clock',
      label: 'Total Time',
      value: formatTotalDuration(totalDuration),
      color: 'text-accent'
    },
    {
      icon: 'User',
      label: 'Artists',
      value: totalArtists.toLocaleString(),
      color: 'text-success'
    },
    {
      icon: 'Disc',
      label: 'Albums',
      value: totalAlbums.toLocaleString(),
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-lg p-4 text-center music-transition hover:shadow-music-md"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted mb-2`}>
            <Icon name={stat.icon} size={20} className={stat.color} />
          </div>
          <div className="space-y-1">
            <p className="font-heading font-heading-bold text-lg text-foreground">
              {stat.value}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryStats;