// Audio utility functions for URL validation and processing
        export const validateAudioUrl = (url) => {
          try {
            const urlObj = new URL(url);
            
            // Check for common audio file extensions
            const audioExtensions = ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.wma'];
            const hasAudioExtension = audioExtensions.some(ext => 
              urlObj.pathname.toLowerCase().includes(ext)
            );
            
            // Check for streaming audio domains
            const streamingDomains = [
              'soundcloud.com',
              'spotify.com',
              'apple.com',
              'music.youtube.com',
              'bandcamp.com',
              'mixcloud.com'
            ];
            
            const isStreamingDomain = streamingDomains.some(domain => 
              urlObj.hostname.includes(domain)
            );
            
            return {
              isValid: hasAudioExtension || isStreamingDomain,
              type: hasAudioExtension ? 'direct' : 'streaming',
              url: url,
              domain: urlObj.hostname
            };
          } catch (error) {
            return {
              isValid: false,
              error: 'Invalid URL format'
            };
          }
        };

        export const validateYouTubeUrl = (url) => {
          try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.toLowerCase();
            
            // YouTube URL patterns
            const youtubePatterns = [
              'youtube.com',
              'www.youtube.com',
              'youtu.be',
              'm.youtube.com',
              'music.youtube.com'
            ];
            
            const isYouTube = youtubePatterns.some(pattern => 
              hostname.includes(pattern)
            );
            
            if (!isYouTube) {
              return {
                isValid: false,
                error: 'Not a YouTube URL'
              };
            }
            
            // Extract video ID
            let videoId = null;
            
            if (hostname.includes('youtu.be')) {
              videoId = urlObj.pathname.slice(1);
            } else if (hostname.includes('youtube.com')) {
              videoId = urlObj.searchParams.get('v');
            }
            
            if (!videoId) {
              return {
                isValid: false,
                error: 'Could not extract video ID'
              };
            }
            
            return {
              isValid: true,
              videoId: videoId,
              url: url,
              embedUrl: `https://www.youtube.com/embed/${videoId}`,
              thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            };
          } catch (error) {
            return {
              isValid: false,
              error: 'Invalid URL format'
            };
          }
        };

        export const extractAudioMetadata = async (url, type = 'direct') => {
          try {
            if (type === 'youtube') {
              const ytData = validateYouTubeUrl(url);
              if (!ytData.isValid) {
                throw new Error(ytData.error);
              }
              
              return {
                title: 'YouTube Video',
                artist: 'Unknown Artist',
                duration: 0,
                artwork: ytData.thumbnailUrl,
                source: 'youtube',
                url: url,
                videoId: ytData.videoId
              };
            } else {
              // For direct audio URLs, we'll need to load the audio to get metadata
              return new Promise((resolve, reject) => {
                const audio = new Audio();
                audio.crossOrigin = 'anonymous';
                
                audio.addEventListener('loadedmetadata', () => {
                  resolve({
                    title: url.split('/').pop()?.split('.')[0] || 'Unknown Title',
                    artist: 'Unknown Artist',
                    duration: audio.duration || 0,
                    artwork: null,
                    source: 'url',
                    url: url
                  });
                });
                
                audio.addEventListener('error', () => {
                  reject(new Error('Failed to load audio metadata'));
                });
                
                audio.src = url;
              });
            }
          } catch (error) {
            throw new Error(`Failed to extract metadata: ${error.message}`);
          }
        };

        export const generateFileFromUrl = (metadata) => {
          return {
            id: Date.now() + Math.random(),
            name: metadata.title || 'Unknown Title',
            size: 0, // Unknown for URLs
            type: metadata.source === 'youtube' ? 'video/youtube' : 'audio/url',
            url: metadata.url,
            progress: 0,
            status: 'queued',
            error: null,
            duration: metadata.duration || 0,
            metadata: metadata,
            isUrl: true
          };
        };