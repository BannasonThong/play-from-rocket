import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onFilterRemove, onClearAll }) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground font-body font-body-medium">
        Active filters:
      </span>
      {activeFilters.map((filter) => (
        <div
          key={filter.id}
          className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-body font-body-medium"
        >
          <span>{filter.label}: {filter.value}</span>
          <button
            onClick={() => onFilterRemove(filter.id)}
            className="hover:bg-primary/20 rounded-full p-0.5 music-transition"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;