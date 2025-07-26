import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ onFilterSelect, activeQuickFilter }) => {
  const quickFilters = [
    {
      id: 'all',
      label: 'All Music',
      icon: 'Music',
      count: null
    },
    {
      id: 'recent',
      label: 'Recently Added',
      icon: 'Clock',
      count: 24
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'Heart',
      count: 156
    },
    {
      id: 'most-played',
      label: 'Most Played',
      icon: 'TrendingUp',
      count: 89
    },
    {
      id: 'rock',
      label: 'Rock',
      icon: 'Zap',
      count: 342
    },
    {
      id: 'pop',
      label: 'Pop',
      icon: 'Star',
      count: 278
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {quickFilters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeQuickFilter === filter.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterSelect(filter.id)}
          className="flex items-center space-x-2"
        >
          <Icon name={filter.icon} size={14} />
          <span>{filter.label}</span>
          {filter.count && (
            <span className={`
              px-1.5 py-0.5 rounded-full text-xs font-body font-body-medium
              ${activeQuickFilter === filter.id 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {filter.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default QuickFilters;