import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import GlobalAudioPlayer from '../../components/ui/GlobalAudioPlayer';
import NavigationProvider from '../../components/ui/NavigationProvider';
import MobileMenuOverlay from '../../components/ui/MobileMenuOverlay';
import UploadDropzone from './components/UploadDropzone';
import UploadProgress from './components/UploadProgress';
import UploadedFilesList from './components/UploadedFilesList';
import FormatValidation from './components/FormatValidation';
import FloatingUploadButton from './components/FloatingUploadButton';
import UrlInputSection from './components/UrlInputSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MusicUploadInterface = () => {
  const [uploadQueue, setUploadQueue] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Configuration
  const acceptedFormats = ['.mp3', '.flac', '.wav', '.m4a', '.aac', '.ogg'];
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  // Mock upload simulation
  const simulateUpload = useCallback((file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        
        setUploadQueue(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, progress, status: progress === 100 ? 'completed' : 'uploading' }
            : f
        ));
      }, file.isUrl ? 300 : 200); // Slightly slower for URL processing
    });
  }, []);

  const validateFile = useCallback((file) => {
    const errors = [];
    
    // Skip validation for URL-based files
    if (file.isUrl) {
      return errors;
    }
    
    // Check file size
    if (file.size > maxFileSize) {
      errors.push(`File size exceeds ${Math.round(maxFileSize / (1024 * 1024))}MB limit`);
    }
    
    // Check file format
    const isValidFormat = acceptedFormats.some(format => 
      file.name.toLowerCase().endsWith(format) || 
      file.type.startsWith('audio/')
    );
    
    if (!isValidFormat) {
      errors.push('Unsupported file format. Please use MP3, FLAC, WAV, M4A, AAC, or OGG files');
    }
    
    return errors;
  }, [acceptedFormats, maxFileSize]);

  const processFiles = useCallback(async (files) => {
    const newFiles = files.map(file => {
      if (file.isUrl) {
        // URL-based files are already processed
        return file;
      }
      
      const errors = validateFile(file);
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        progress: 0,
        status: errors.length > 0 ? 'error' : 'queued',
        error: errors.length > 0 ? errors[0] : null,
        duration: Math.floor(Math.random() * 300) + 60, // Mock duration
        isUrl: false
      };
    });

    setUploadQueue(prev => [...prev, ...newFiles]);
    
    // Start uploading valid files
    const validFiles = newFiles.filter(f => f.status === 'queued');
    if (validFiles.length > 0) {
      setIsUploading(true);
      
      for (const file of validFiles) {
        setUploadQueue(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'uploading' } : f
        ));
        
        try {
          await simulateUpload(file);
          setUploadedFiles(prev => [...prev, { ...file, status: 'completed' }]);
        } catch (error) {
          setUploadQueue(prev => prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error', error: 'Upload failed. Please try again.' }
              : f
          ));
        }
      }
      
      setIsUploading(false);
    }
  }, [validateFile, simulateUpload]);

  const handleFilesSelected = useCallback(async (files) => {
    await processFiles(files);
  }, [processFiles]);

  const handleUrlAdded = useCallback(async (urlFiles) => {
    await processFiles(urlFiles);
  }, [processFiles]);

  const handleRemoveFile = useCallback((fileId) => {
    setUploadQueue(prev => prev.filter(f => f.id !== fileId));
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const handleRetryUpload = useCallback(async (file) => {
    const updatedFile = { ...file, status: 'uploading', progress: 0, error: null };
    setUploadQueue(prev => prev.map(f => f.id === file.id ? updatedFile : f));
    
    setIsUploading(true);
    try {
      await simulateUpload(updatedFile);
      setUploadedFiles(prev => [...prev, { ...updatedFile, status: 'completed' }]);
    } catch (error) {
      setUploadQueue(prev => prev.map(f => 
        f.id === file.id 
          ? { ...f, status: 'error', error: 'Upload failed. Please try again.' }
          : f
      ));
    }
    setIsUploading(false);
  }, [simulateUpload]);

  const handleCancelUpload = useCallback(() => {
    setUploadQueue(prev => prev.map(f => 
      f.status === 'uploading' || f.status === 'queued'
        ? { ...f, status: 'error', error: 'Upload cancelled by user' }
        : f
    ));
    setIsUploading(false);
  }, []);

  const completedCount = uploadedFiles.filter(f => f.status === 'completed').length;
  const hasActiveUploads = uploadQueue.some(f => f.status === 'uploading' || f.status === 'queued');
  const urlCount = uploadQueue.filter(f => f.isUrl).length + uploadedFiles.filter(f => f.isUrl).length;

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Upload Music - MusicZone</title>
          <meta name="description" content="Upload your music files to MusicZone. Support for MP3, FLAC, WAV, and more audio formats." />
        </Helmet>

        <Sidebar />
        <MobileMenuOverlay />

        {/* Main Content */}
        <main className="md:ml-64 pb-24 md:pb-20">
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="font-heading font-heading-bold text-2xl md:text-3xl text-foreground mb-2">
                    Upload Music
                  </h1>
                  <p className="font-body text-muted-foreground text-base md:text-lg">
                    Add new tracks from files, URLs, or YouTube to your personal library
                  </p>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                  >
                    <Icon name="Link" size={16} className="mr-2" />
                    Add URL
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowValidation(!showValidation)}
                  >
                    <Icon name="Info" size={16} className="mr-2" />
                    Guidelines
                  </Button>
                  
                  {completedCount > 0 && (
                    <Button variant="default">
                      <Icon name="FolderOpen" size={16} className="mr-2" />
                      View Library ({completedCount})
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
                    {uploadQueue.length}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    Files in Queue
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-heading-bold text-success mb-1">
                    {completedCount}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    Completed
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-heading-bold text-warning mb-1">
                    {uploadQueue.filter(f => f.status === 'uploading').length}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    Uploading
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-heading-bold text-error mb-1">
                    {uploadQueue.filter(f => f.status === 'error').length}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    Failed
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-heading font-heading-bold text-blue-500 mb-1">
                    {urlCount}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    From URLs
                  </div>
                </div>
              </div>
            </div>

            {/* URL Input Section */}
            {showUrlInput && (
              <div className="mb-8">
                <UrlInputSection
                  onUrlAdded={handleUrlAdded}
                  isProcessing={isUploading}
                />
              </div>
            )}

            {/* Format Validation */}
            {showValidation && (
              <div className="mb-8">
                <FormatValidation 
                  acceptedFormats={acceptedFormats}
                  maxFileSize={maxFileSize}
                />
              </div>
            )}

            {/* Upload Dropzone */}
            <div className="mb-8">
              <UploadDropzone
                onFilesSelected={handleFilesSelected}
                isUploading={isUploading}
                acceptedFormats={acceptedFormats}
              />
            </div>

            {/* Upload Progress */}
            {uploadQueue.length > 0 && (
              <div className="mb-8">
                <UploadProgress
                  uploadQueue={uploadQueue}
                  onRemoveFile={handleRemoveFile}
                  onCancelUpload={handleCancelUpload}
                />
              </div>
            )}

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mb-8">
                <UploadedFilesList
                  uploadedFiles={uploadedFiles}
                  onRemoveFile={handleRemoveFile}
                  onRetryUpload={handleRetryUpload}
                />
              </div>
            )}

            {/* Empty State */}
            {uploadQueue.length === 0 && uploadedFiles.length === 0 && !showValidation && !showUrlInput && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Music" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-heading-bold text-lg text-foreground mb-2">
                  Ready to Upload
                </h3>
                <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
                  Start building your music library by uploading files, adding URLs, or importing from YouTube. 
                  Drag and drop files or use the options above.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowUrlInput(true)}
                  >
                    <Icon name="Link" size={16} className="mr-2" />
                    Add from URL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowValidation(true)}
                  >
                    <Icon name="Info" size={16} className="mr-2" />
                    View Guidelines
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Floating Upload Button */}
        <FloatingUploadButton
          onClick={() => document.querySelector('input[type="file"]')?.click()}
          isUploading={isUploading}
          uploadCount={completedCount}
        />

        <GlobalAudioPlayer />
      </div>
    </NavigationProvider>
  );
};

export default MusicUploadInterface;