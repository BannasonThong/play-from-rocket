import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'library', onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: 'Search',
          title: 'No tracks found',
          description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
          actionLabel: 'Clear Search',
          actionIcon: 'X'
        };
      case 'filter':
        return {
          icon: 'Filter',
          title: 'No tracks match your filters',
          description: 'Try removing some filters or selecting different criteria.',
          actionLabel: 'Clear Filters',
          actionIcon: 'X'
        };
      default:
        return {
          icon: 'Music',
          title: 'Your music library is empty',
          description: 'Start building your collection by uploading your favorite tracks.',
          actionLabel: 'Upload Music',
          actionIcon: 'Upload'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content.icon} size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="font-heading font-heading-bold text-xl text-foreground mb-2">
        {content.title}
      </h3>
      
      <p className="font-body text-muted-foreground mb-8 max-w-md">
        {content.description}
      </p>
      
      {onAction && (
        <Button
          variant="default"
          onClick={onAction}
          iconName={content.actionIcon}
          iconPosition="left"
        >
          {content.actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;