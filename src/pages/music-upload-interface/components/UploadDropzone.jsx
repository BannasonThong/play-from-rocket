import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadDropzone = ({ onFilesSelected, isUploading, acceptedFormats }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const audioFiles = files.filter(file => 
      file.type.startsWith('audio/') || 
      acceptedFormats.some(format => file.name.toLowerCase().endsWith(format))
    );

    if (audioFiles.length > 0) {
      onFilesSelected(audioFiles);
    }
  }, [onFilesSelected, acceptedFormats]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [onFilesSelected]);

  const openFilePicker = useCallback(() => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  }, [isUploading]);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="audio/*,.mp3,.flac,.wav,.m4a,.aac,.ogg"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
      
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center
          music-transition cursor-pointer group
          ${isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
          h-[80vh] md:h-[60vh] flex flex-col items-center justify-center
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFilePicker}
      >
        {/* Upload Icon */}
        <div className={`
          w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6
          music-transition group-hover:scale-110
          ${isDragOver 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
          }
        `}>
          <Icon 
            name={isUploading ? "Loader2" : "Upload"} 
            size={32} 
            className={isUploading ? "animate-spin" : ""}
          />
        </div>

        {/* Main Text */}
        <h3 className="font-heading font-heading-bold text-xl md:text-2xl text-foreground mb-3">
          {isUploading ? 'Uploading Files...' : isDragOver ? 'Drop Files Here' : 'Upload Your Music'}
        </h3>

        <p className="font-body text-muted-foreground text-base md:text-lg mb-6 max-w-md">
          {isUploading 
            ? 'Please wait while we process your files'
            : 'Drag and drop your audio files here, or click to browse'
          }
        </p>

        {/* Supported Formats */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {acceptedFormats.map((format) => (
            <span
              key={format}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full font-mono"
            >
              {format.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Browse Button */}
        <Button
          variant="outline"
          size="lg"
          disabled={isUploading}
          className="pointer-events-none"
        >
          <Icon name="FolderOpen" size={20} className="mr-2" />
          Browse Files
        </Button>

        {/* File Size Limit */}
        <p className="font-caption text-xs text-muted-foreground mt-4">
          Maximum file size: 100MB per file
        </p>

        {/* Drag Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="text-primary font-heading font-heading-bold text-xl">
              Release to upload
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;