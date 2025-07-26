import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingUploadButton = ({ onClick, isUploading, uploadCount }) => {
  return (
    <>
      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-20 right-4 z-30">
        <Button
          variant="default"
          size="lg"
          onClick={onClick}
          disabled={isUploading}
          className="w-14 h-14 rounded-full shadow-music-lg music-hover-scale relative"
        >
          <Icon 
            name={isUploading ? "Loader2" : "Plus"} 
            size={24} 
            className={isUploading ? "animate-spin" : ""}
          />
          
          {/* Upload Count Badge */}
          {uploadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center">
              <span className="font-mono text-xs font-bold">
                {uploadCount > 99 ? '99+' : uploadCount}
              </span>
            </div>
          )}
        </Button>
      </div>

      {/* Desktop Quick Upload Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-30">
        <Button
          variant="outline"
          size="default"
          onClick={onClick}
          disabled={isUploading}
          className="bg-card shadow-music-lg music-hover-scale"
        >
          <Icon 
            name={isUploading ? "Loader2" : "Upload"} 
            size={20} 
            className={`mr-2 ${isUploading ? "animate-spin" : ""}`}
          />
          {isUploading ? 'Uploading...' : 'Quick Upload'}
          
          {/* Upload Count Badge */}
          {uploadCount > 0 && (
            <div className="ml-2 px-2 py-0.5 bg-success text-success-foreground rounded-full">
              <span className="font-mono text-xs font-bold">
                {uploadCount > 99 ? '99+' : uploadCount}
              </span>
            </div>
          )}
        </Button>
      </div>
    </>
  );
};

export default FloatingUploadButton;