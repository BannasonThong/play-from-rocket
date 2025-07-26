import React from 'react';
import Icon from '../../../components/AppIcon';

const FormatValidation = ({ acceptedFormats, maxFileSize }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validationRules = [
    {
      icon: 'FileAudio',
      title: 'Supported Formats',
      description: `We support ${acceptedFormats.join(', ').toUpperCase()} audio files`,
      type: 'info'
    },
    {
      icon: 'HardDrive',
      title: 'File Size Limit',
      description: `Maximum file size is ${formatFileSize(maxFileSize)} per file`,
      type: 'info'
    },
    {
      icon: 'Shield',
      title: 'Quality Assurance',
      description: 'Files are automatically scanned for quality and metadata',
      type: 'success'
    },
    {
      icon: 'Zap',
      title: 'Fast Processing',
      description: 'Your music will be available in your library within seconds',
      type: 'success'
    }
  ];

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'error':
        return 'bg-error/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-heading font-heading-bold text-lg text-foreground mb-2">
          Upload Guidelines
        </h3>
        <p className="font-body text-muted-foreground text-sm">
          Please review the following requirements before uploading your music files
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {validationRules.map((rule, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 music-shadow-sm hover:shadow-music-md music-transition"
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${getBgColor(rule.type)}
              `}>
                <Icon 
                  name={rule.icon} 
                  size={20} 
                  className={getIconColor(rule.type)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-body-medium text-sm text-foreground mb-1">
                  {rule.title}
                </h4>
                <p className="font-caption text-xs text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-body font-body-medium text-sm text-foreground mb-2">
              Pro Tips for Better Uploads
            </h4>
            <ul className="space-y-1 font-caption text-xs text-muted-foreground">
              <li>• Ensure your files have proper metadata (title, artist, album)</li>
              <li>• Higher bitrate files provide better audio quality</li>
              <li>• Organize files in folders by artist or album for batch uploads</li>
              <li>• Check file names for special characters that might cause issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatValidation;