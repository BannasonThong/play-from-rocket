import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StorageManagement = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock storage data
  const storageData = {
    totalLibrary: 2847,
    totalSize: '12.4 GB',
    cacheSize: '847 MB',
    metadataSize: '23 MB',
    artworkSize: '156 MB',
    breakdown: [
      { type: 'Audio Files', size: '11.2 GB', percentage: 90, color: 'bg-primary' },
      { type: 'Cache', size: '847 MB', percentage: 7, color: 'bg-accent' },
      { type: 'Artwork', size: '156 MB', percentage: 2, color: 'bg-success' },
      { type: 'Metadata', size: '23 MB', percentage: 1, color: 'bg-warning' }
    ]
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    
    // Simulate cache clearing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsClearing(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="HardDrive" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-heading-bold text-lg text-foreground">
            Storage Management
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Monitor and manage your music library storage
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Music" size={24} className="text-primary" />
            </div>
            <div className="font-heading font-heading-bold text-2xl text-foreground">
              {storageData.totalLibrary.toLocaleString()}
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Total Tracks
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Database" size={24} className="text-accent" />
            </div>
            <div className="font-heading font-heading-bold text-2xl text-foreground">
              {storageData.totalSize}
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Total Size
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Archive" size={24} className="text-warning" />
            </div>
            <div className="font-heading font-heading-bold text-2xl text-foreground">
              {storageData.cacheSize}
            </div>
            <div className="font-caption text-sm text-muted-foreground">
              Cache Size
            </div>
          </div>
        </div>

        {/* Storage Breakdown */}
        <div>
          <h4 className="font-body font-body-medium text-sm text-foreground mb-4">
            Storage Breakdown
          </h4>
          <div className="space-y-3">
            {storageData.breakdown.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-body text-sm text-foreground">
                      {item.type}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {item.size}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full music-transition ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Actions */}
        <div className="border-t border-border pt-6">
          <h4 className="font-body font-body-medium text-sm text-foreground mb-4">
            Storage Actions
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="font-body text-sm text-foreground">
                  Clear Cache
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Remove temporary files and cached data
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCache}
                loading={isClearing}
                iconName={isClearing ? "Loader2" : "Trash2"}
                iconPosition="left"
              >
                {isClearing ? 'Clearing...' : 'Clear Cache'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="font-body text-sm text-foreground">
                  Optimize Library
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Remove duplicate files and optimize storage
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Zap"
                iconPosition="left"
              >
                Optimize
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="font-body text-sm text-foreground">
                  Export Library Data
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Download your music library information
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="flex items-center space-x-2 p-4 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="font-body text-sm text-success">
              Cache cleared successfully! Freed up 847 MB of storage.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageManagement;