import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ searchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4">
      <div className="space-y-6">
        {/* Loading Animation */}
        <div className="w-16 h-16 mx-auto">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="font-heading font-heading-bold text-xl text-foreground">
            Searching...
          </h2>
          <p className="font-body text-muted-foreground">
            Finding results for "{searchQuery}"
          </p>
        </div>

        {/* Loading Skeleton */}
        <div className="space-y-4 max-w-md mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-4 p-3 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="w-12 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Search Tips */}
        <div className="bg-card border border-border rounded-lg p-4 text-left max-w-md mx-auto">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-body font-body-medium text-sm text-foreground mb-1">
                Search Tip
              </h3>
              <p className="font-caption text-xs text-muted-foreground">
                Use specific keywords for better results. Try artist names, song titles, or album names.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;