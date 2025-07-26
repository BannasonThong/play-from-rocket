import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadProgress = ({ uploadQueue, onRemoveFile, onCancelUpload, hasActiveUploads, completedFiles, uploadingFiles, errorFiles }) => {
  if (!uploadQueue || uploadQueue.length === 0) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Icon name="Loader2" size={16} className="animate-spin text-primary" />;
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'validating':
        return <Icon name="Clock" size={16} className="text-warning" />;
      default:
        return <Icon name="Music" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'completed':
        return 'Upload Complete';
      case 'error':
        return 'Upload Failed';
      case 'validating':
        return 'Validating...';
      case 'queued':
        return 'Queued';
      default:
        return 'Pending';
    }
  };

  const overallProgress = uploadQueue.reduce((acc, file) => acc + (file.progress || 0), 0) / uploadQueue.length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-heading-bold text-lg text-foreground">
          Upload Progress ({uploadQueue.length})
        </h3>
        
        {hasActiveUploads &&
        <Button variant="outline" size="sm" onClick={onCancelUpload}>
            <Icon name="X" size={14} className="mr-2" />
            Cancel All
          </Button>
        }
      </div>

      <div className="space-y-4">
        {uploadQueue.map((file) =>
        <div key={file.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            {/* File Icon */}
            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
              {file.isUrl ?
            file.metadata?.source === 'youtube' ?
            <Icon name="Youtube" size={20} className="text-red-500" /> :

            <Icon name="Link" size={20} className="text-blue-500" /> :


            <Icon name="Music" size={20} className="text-primary" />
            }
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-body font-body-medium text-sm text-foreground truncate">
                  {file.name}
                </h4>
                <div className="flex items-center space-x-2">
                  {file.isUrl &&
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                      {file.metadata?.source === 'youtube' ? 'YouTube' : 'URL'}
                    </span>
                }
                  <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFile(file.id)}
                  className="w-6 h-6 text-muted-foreground hover:text-error">

                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>

              <p className="font-caption text-xs text-muted-foreground mb-2">
                {file.isUrl ?
              `${file.metadata?.source === 'youtube' ? 'YouTube video' : 'External audio'} • ${formatDuration(file.duration)}` :
              `${formatFileSize(file.size)} • ${formatDuration(file.duration)}`
              }
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-background rounded-full h-2 mb-2">
                <div
                className={`h-2 rounded-full music-transition ${
                file.status === 'completed' ?
                'bg-success' :
                file.status === 'error' ? 'bg-error' : 'bg-primary'}`
                }
                style={{ width: `${file.progress}%` }} />

              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' &&
                <>
                      <Icon name="Loader2" size={12} className="text-primary animate-spin" />
                      <span className="font-caption text-xs text-muted-foreground">
                        {file.isUrl ? 'Processing...' : 'Uploading...'} {Math.round(file.progress)}%
                      </span>
                    </>
                }
                  {file.status === 'completed' &&
                <>
                      <Icon name="CheckCircle" size={12} className="text-success" />
                      <span className="font-caption text-xs text-success">
                        {file.isUrl ? 'Added successfully' : 'Upload complete'}
                      </span>
                    </>
                }
                  {file.status === 'error' &&
                <>
                      <Icon name="AlertCircle" size={12} className="text-error" />
                      <span className="font-caption text-xs text-error">
                        {file.error}
                      </span>
                    </>
                }
                  {file.status === 'queued' &&
                <>
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="font-caption text-xs text-muted-foreground">
                        Waiting to {file.isUrl ? 'process' : 'upload'}
                      </span>
                    </>
                }
                </div>

                {file.status === 'completed' &&
              <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="Play" size={12} className="mr-1" />
                    Play
                  </Button>
              }
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {uploadQueue.length > 1 &&
      <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Total: {uploadQueue.length} {uploadQueue.length === 1 ? 'file' : 'files'}
            </span>
            <span className="text-muted-foreground">
              {completedFiles} completed • {uploadingFiles} {uploadQueue.filter((f) => f.isUrl).length > 0 ? 'processing' : 'uploading'} • {errorFiles} failed
            </span>
          </div>
        </div>
      }
    </div>);

};

export default UploadProgress;