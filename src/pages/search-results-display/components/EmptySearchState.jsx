import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptySearchState = ({ searchQuery, onClearSearch }) => {
  const searchSuggestions = [
    "Try searching for artist names",
    "Search by song titles",
    "Look for album names",
    "Use genre keywords like \'rock\' or \'jazz'",
    "Check your spelling"
  ];

  const popularSearches = [
    "Queen", "The Beatles", "Led Zeppelin", "Pink Floyd", 
    "Michael Jackson", "Bob Dylan", "Radiohead", "Nirvana"
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4">
      {searchQuery ? (
        // No Results State
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="SearchX" size={40} className="text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-heading font-heading-bold text-2xl text-foreground">
              No results found
            </h2>
            <p className="font-body text-muted-foreground">
              We couldn't find anything matching "{searchQuery}"
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-left">
            <h3 className="font-body font-body-medium text-sm text-foreground mb-3">
              Search suggestions:
            </h3>
            <ul className="space-y-2">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-caption text-sm text-muted-foreground">
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClearSearch}
              iconName="X"
              iconPosition="left"
            >
              Clear Search
            </Button>
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
            >
              Upload Music
            </Button>
          </div>
        </div>
      ) : (
        // Initial Search State
        <div className="space-y-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
            <Icon name="Search" size={48} className="text-primary" />
          </div>
          
          <div className="space-y-3">
            <h2 className="font-heading font-heading-bold text-3xl text-foreground">
              Search Your Music
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
              Find your favorite tracks, artists, and albums instantly
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-body font-body-medium text-sm text-foreground mb-4">
              Popular searches:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-caption music-transition"
                  onClick={() => {
                    // In a real app, this would trigger a search
                    console.log('Searching for:', search);
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Music" size={24} className="text-primary" />
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                Search tracks
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                Find artists
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Disc" size={24} className="text-primary" />
              </div>
              <p className="font-caption text-xs text-muted-foreground">
                Browse albums
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptySearchState;