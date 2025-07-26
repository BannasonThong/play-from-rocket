import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="px-3 py-1.5"
      >
        <Icon name="Grid3X3" size={16} />
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="px-3 py-1.5"
      >
        <Icon name="List" size={16} />
      </Button>
    </div>
  );
};

export default ViewToggle;