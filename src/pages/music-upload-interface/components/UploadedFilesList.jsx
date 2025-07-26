import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadedFilesList = ({ uploadedFiles, onRemoveFile, onRetryUpload }) => {
  if (!uploadedFiles || uploadedFiles.length === 0) {
    return null;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedFiles = uploadedFiles.filter(file => file.status === 'completed');
  const failedFiles = uploadedFiles.filter(file => file.status === 'error');

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-heading-bold text-lg text-foreground">
          Successfully Added ({uploadedFiles.length})
        </h3>
        <Button variant="outline" size="sm">
          <Icon name="FolderOpen" size={14} className="mr-2" />
          View in Library
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uploadedFiles.map((file) => (
          <div
            key={file.id}
            className="bg-background border border-border rounded-lg p-4 music-hover-lift group"
          >
            {/* Thumbnail */}
            <div className="w-full aspect-square bg-muted rounded-lg mb-4 overflow-hidden relative">
              {file.isUrl && file.metadata?.artwork ? (
                <img 
                  src={file.metadata.artwork} 
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {file.isUrl ? (
                    file.metadata?.source === 'youtube' ? (
                      <Icon name="Youtube" size={32} className="text-red-500" />
                    ) : (
                      <Icon name="Link" size={32} className="text-blue-500" />
                    )
                  ) : (
                    <Icon name="Music" size={32} className="text-primary" />
                  )}
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 music-transition">
                <Button variant="default" size="icon" className="w-12 h-12">
                  <Icon name="Play" size={20} />
                </Button>
              </div>

              {/* Source Badge */}
              {file.isUrl && (
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${
                    file.metadata?.source === 'youtube' ?'bg-red-500' :'bg-blue-500'
                  }`}>
                    {file.metadata?.source === 'youtube' ? 'YT' : 'URL'}
                  </span>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="space-y-2">
              <h4 className="font-body font-body-medium text-sm text-foreground truncate">
                {file.name}
              </h4>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {file.isUrl 
                    ? `${file.metadata?.source === 'youtube' ? 'YouTube' : 'External'} • ${formatDuration(file.duration)}`
                    : `${formatFileSize(file.size)} • ${formatDuration(file.duration)}`
                  }
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Icon name="MoreVertical" size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Icon name="Play" size={14} className="mr-2" />
                      Play Now
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="Plus" size={14} className="mr-2" />
                      Add to Playlist
                    </DropdownMenuItem>
                    {file.isUrl && (
                      <DropdownMenuItem>
                        <Icon name="ExternalLink" size={14} className="mr-2" />
                        Open Source
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-error"
                      onClick={() => onRemoveFile(file.id)}
                    >
                      <Icon name="Trash2" size={14} className="mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Play" size={12} className="mr-1" />
                  Play
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Icon name="Heart" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-heading font-heading-bold text-foreground">
              {uploadedFiles.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Total Files
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-heading-bold text-foreground">
              {uploadedFiles.filter(f => !f.isUrl).length}
            </div>
            <div className="text-xs text-muted-foreground">
              Local Files
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-heading-bold text-blue-500">
              {uploadedFiles.filter(f => f.isUrl && f.metadata?.source !== 'youtube').length}
            </div>
            <div className="text-xs text-muted-foreground">
              From URLs
            </div>
          </div>
          <div>
            <div className="text-lg font-heading font-heading-bold text-red-500">
              {uploadedFiles.filter(f => f.metadata?.source === 'youtube').length}
            </div>
            <div className="text-xs text-muted-foreground">
              From YouTube
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedFilesList;