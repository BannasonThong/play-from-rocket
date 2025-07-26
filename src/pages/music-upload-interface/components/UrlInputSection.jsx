import React, { useState, useCallback } from 'react';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import { validateAudioUrl, validateYouTubeUrl, extractAudioMetadata, generateFileFromUrl } from '../../../utils/audioUtils';

        const UrlInputSection = ({ onUrlAdded, isProcessing }) => {
          const [url, setUrl] = useState('');
          const [urlType, setUrlType] = useState('audio'); // 'audio' or 'youtube'
          const [isValidating, setIsValidating] = useState(false);
          const [validationError, setValidationError] = useState('');

          const handleUrlSubmit = useCallback(async (e) => {
            e.preventDefault();
            if (!url.trim() || isProcessing || isValidating) return;

            setIsValidating(true);
            setValidationError('');

            try {
              let validationResult;
              let metadata;

              if (urlType === 'youtube') {
                validationResult = validateYouTubeUrl(url.trim());
                if (!validationResult.isValid) {
                  throw new Error(validationResult.error);
                }
                metadata = await extractAudioMetadata(url.trim(), 'youtube');
              } else {
                validationResult = validateAudioUrl(url.trim());
                if (!validationResult.isValid) {
                  throw new Error(validationResult.error || 'Invalid audio URL');
                }
                metadata = await extractAudioMetadata(url.trim(), 'direct');
              }

              const fileObject = generateFileFromUrl(metadata);
              onUrlAdded([fileObject]);
              setUrl('');
              setValidationError('');
            } catch (error) {
              setValidationError(error.message);
            } finally {
              setIsValidating(false);
            }
          }, [url, urlType, onUrlAdded, isProcessing, isValidating]);

          const handleUrlTypeChange = useCallback((type) => {
            setUrlType(type);
            setUrl('');
            setValidationError('');
          }, []);

          const isYouTubeUrl = (url) => {
            return url.includes('youtube.com') || url.includes('youtu.be');
          };

          const handleUrlChange = useCallback((e) => {
            const newUrl = e.target.value;
            setUrl(newUrl);
            setValidationError('');
            
            // Auto-detect URL type
            if (newUrl && isYouTubeUrl(newUrl)) {
              setUrlType('youtube');
            } else if (newUrl) {
              setUrlType('audio');
            }
          }, []);

          return (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-heading-bold text-lg text-foreground mb-1">
                    Add from URL
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Import music from YouTube or direct audio links
                  </p>
                </div>
                
                {/* URL Type Toggle */}
                <div className="flex bg-muted rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => handleUrlTypeChange('audio')}
                    className={`px-3 py-1 text-sm rounded-md music-transition ${
                      urlType === 'audio' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Link" size={14} className="mr-1 inline" />
                    Audio URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUrlTypeChange('youtube')}
                    className={`px-3 py-1 text-sm rounded-md music-transition ${
                      urlType === 'youtube' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Youtube" size={14} className="mr-1 inline" />
                    YouTube
                  </button>
                </div>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder={
                      urlType === 'youtube' ?'https://www.youtube.com/watch?v=...' :'https://example.com/audio.mp3'
                    }
                    className={`pr-12 ${validationError ? 'border-error' : ''}`}
                    disabled={isValidating || isProcessing}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {urlType === 'youtube' ? (
                      <Icon name="Youtube" size={16} className="text-muted-foreground" />
                    ) : (
                      <Icon name="Link" size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </div>

                {validationError && (
                  <div className="flex items-center space-x-2 text-error text-sm">
                    <Icon name="AlertCircle" size={14} />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {urlType === 'youtube' ? (
                      <span>Supports YouTube videos and music</span>
                    ) : (
                      <span>Supports MP3, WAV, FLAC, and other audio formats</span>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={!url.trim() || isValidating || isProcessing}
                    size="sm"
                  >
                    {isValidating ? (
                      <>
                        <Icon name="Loader2" size={14} className="mr-2 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        <Icon name="Plus" size={14} className="mr-2" />
                        Add URL
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Quick Examples */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Examples:</p>
                <div className="space-y-1">
                  {urlType === 'youtube' ? (
                    <>
                      <div className="text-xs text-muted-foreground">
                        • https://www.youtube.com/watch?v=dQw4w9WgXcQ
                      </div>
                      <div className="text-xs text-muted-foreground">
                        • https://youtu.be/dQw4w9WgXcQ
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs text-muted-foreground">
                        • https://example.com/song.mp3
                      </div>
                      <div className="text-xs text-muted-foreground">
                        • https://archive.org/download/audio.wav
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        };

        export default UrlInputSection;