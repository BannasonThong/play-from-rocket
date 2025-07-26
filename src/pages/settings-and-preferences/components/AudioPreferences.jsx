import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AudioPreferences = () => {
  const [playbackQuality, setPlaybackQuality] = useState('high');
  const [crossfadeDuration, setCrossfadeDuration] = useState(3);
  const [volumeNormalization, setVolumeNormalization] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const qualityOptions = [
    { value: 'low', label: 'Low (128 kbps)', description: 'Saves bandwidth' },
    { value: 'medium', label: 'Medium (256 kbps)', description: 'Balanced quality' },
    { value: 'high', label: 'High (320 kbps)', description: 'Best quality' },
    { value: 'lossless', label: 'Lossless', description: 'Original quality' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Volume2" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-heading-bold text-lg text-foreground">
            Audio Preferences
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Customize your audio playback experience
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Playback Quality */}
        <div>
          <label className="font-body font-body-medium text-sm text-foreground mb-3 block">
            Playback Quality
          </label>
          <div className="space-y-2">
            {qualityOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="quality"
                  value={option.value}
                  checked={playbackQuality === option.value}
                  onChange={(e) => setPlaybackQuality(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <div className="font-body text-sm text-foreground">
                    {option.label}
                  </div>
                  <div className="font-caption text-xs text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Crossfade Duration */}
        <div>
          <label className="font-body font-body-medium text-sm text-foreground mb-3 block">
            Crossfade Duration: {crossfadeDuration}s
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={crossfadeDuration}
              onChange={(e) => setCrossfadeDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${crossfadeDuration * 10}%, var(--color-muted) ${crossfadeDuration * 10}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0s</span>
              <span>5s</span>
              <span>10s</span>
            </div>
          </div>
        </div>

        {/* Volume Normalization */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body font-body-medium text-sm text-foreground">
              Volume Normalization
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Automatically adjust volume levels across tracks
            </div>
          </div>
          <button
            onClick={() => setVolumeNormalization(!volumeNormalization)}
            className={`
              relative w-12 h-6 rounded-full music-transition
              ${volumeNormalization ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
              music-transition transform
              ${volumeNormalization ? 'translate-x-7' : 'translate-x-1'}
            `} />
          </button>
        </div>

        {/* Auto Play */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body font-body-medium text-sm text-foreground">
              Auto Play Next Track
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Automatically play the next song when current track ends
            </div>
          </div>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`
              relative w-12 h-6 rounded-full music-transition
              ${autoPlay ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
              music-transition transform
              ${autoPlay ? 'translate-x-7' : 'translate-x-1'}
            `} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPreferences;