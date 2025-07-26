import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ searchQuery, onSearchChange, onFilterToggle, isFilterOpen, resultCount }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search for tracks, artists, albums..."
            value={localQuery}
            onChange={handleInputChange}
            className="pl-10 pr-12 h-12 text-base"
          />
          {localQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>

        {/* Search Stats and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {searchQuery && (
              <p className="font-body text-sm text-muted-foreground">
                {resultCount > 0 ? (
                  <>
                    <span className="font-body-medium text-foreground">{resultCount}</span> results for "{searchQuery}"
                  </>
                ) : (
                  `No results for "${searchQuery}"`
                )}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            iconName="Filter"
            iconPosition="left"
            className={isFilterOpen ? 'bg-primary text-primary-foreground' : ''}
          >
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;