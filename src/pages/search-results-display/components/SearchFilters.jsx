import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const genres = [
    'Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 
    'Country', 'R&B', 'Indie', 'Alternative', 'Folk', 'Blues'
  ];

  const durations = [
    { label: 'Under 3 minutes', value: 'short' },
    { label: '3-5 minutes', value: 'medium' },
    { label: 'Over 5 minutes', value: 'long' }
  ];

  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'week' },
    { label: 'This month', value: 'month' },
    { label: 'This year', value: 'year' }
  ];

  const handleGenreChange = (genre, checked) => {
    const updatedGenres = checked 
      ? [...localFilters.genres, genre]
      : localFilters.genres.filter(g => g !== genre);
    
    const newFilters = { ...localFilters, genres: updatedGenres };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDurationChange = (duration, checked) => {
    const updatedDurations = checked
      ? [...localFilters.durations, duration]
      : localFilters.durations.filter(d => d !== duration);
    
    const newFilters = { ...localFilters, durations: updatedDurations };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (dateRange, checked) => {
    const newFilters = { 
      ...localFilters, 
      dateAdded: checked ? dateRange : null 
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      genres: [],
      durations: [],
      dateAdded: null
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = localFilters.genres.length > 0 || 
                          localFilters.durations.length > 0 || 
                          localFilters.dateAdded;

  if (!isOpen) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-heading-bold text-lg text-foreground">
          Filter Results
        </h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:text-primary"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Genres */}
        <div>
          <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
            Genres
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {genres.map((genre) => (
              <Checkbox
                key={genre}
                label={genre}
                checked={localFilters.genres.includes(genre)}
                onChange={(e) => handleGenreChange(genre, e.target.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
            Duration
          </h4>
          <div className="space-y-2">
            {durations.map((duration) => (
              <Checkbox
                key={duration.value}
                label={duration.label}
                checked={localFilters.durations.includes(duration.value)}
                onChange={(e) => handleDurationChange(duration.value, e.target.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Date Added */}
        <div>
          <h4 className="font-body font-body-medium text-sm text-foreground mb-3">
            Date Added
          </h4>
          <div className="space-y-2">
            {dateRanges.map((range) => (
              <Checkbox
                key={range.value}
                label={range.label}
                checked={localFilters.dateAdded === range.value}
                onChange={(e) => handleDateChange(range.value, e.target.checked)}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;