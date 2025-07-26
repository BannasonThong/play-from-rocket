import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DisplayPreferences = () => {
  const [defaultView, setDefaultView] = useState('grid');
  const [cardSize, setCardSize] = useState('medium');
  const [showAnimations, setShowAnimations] = useState(true);
  const [showWaveforms, setShowWaveforms] = useState(true);

  const viewOptions = [
    { value: 'grid', label: 'Grid View', icon: 'Grid3X3' },
    { value: 'list', label: 'List View', icon: 'List' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small', description: 'Compact cards' },
    { value: 'medium', label: 'Medium', description: 'Standard size' },
    { value: 'large', label: 'Large', description: 'Detailed cards' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Monitor" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-heading-bold text-lg text-foreground">
            Display Preferences
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Customize how your music library appears
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Default Library View */}
        <div>
          <label className="font-body font-body-medium text-sm text-foreground mb-3 block">
            Default Library View
          </label>
          <div className="grid grid-cols-2 gap-3">
            {viewOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDefaultView(option.value)}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border music-transition
                  ${defaultView === option.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-background text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }
                `}
              >
                <Icon name={option.icon} size={20} />
                <span className="font-body text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Size */}
        <div>
          <label className="font-body font-body-medium text-sm text-foreground mb-3 block">
            Card Size
          </label>
          <div className="space-y-2">
            {sizeOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="cardSize"
                  value={option.value}
                  checked={cardSize === option.value}
                  onChange={(e) => setCardSize(e.target.value)}
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

        {/* Preview */}
        <div>
          <label className="font-body font-body-medium text-sm text-foreground mb-3 block">
            Preview
          </label>
          <div className={`
            border border-border rounded-lg p-4 bg-muted/30
            ${defaultView === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}
          `}>
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`
                  bg-card border border-border rounded-lg music-transition
                  ${defaultView === 'grid' 
                    ? cardSize === 'small'? 'p-2' : cardSize === 'medium' ? 'p-3' : 'p-4' :'p-3 flex items-center space-x-3'
                  }
                `}
              >
                <div className={`
                  bg-primary/10 rounded flex items-center justify-center
                  ${defaultView === 'grid'
                    ? cardSize === 'small'? 'w-8 h-8' : cardSize === 'medium' ? 'w-12 h-12' : 'w-16 h-16' :'w-10 h-10'
                  }
                `}>
                  <Icon name="Music" size={defaultView === 'grid' && cardSize === 'small' ? 16 : 20} className="text-primary" />
                </div>
                {defaultView === 'grid' && (
                  <div className="mt-2">
                    <div className={`font-body text-foreground ${cardSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                      Sample Track
                    </div>
                    <div className={`font-caption text-muted-foreground ${cardSize === 'small' ? 'text-xs' : 'text-xs'}`}>
                      Artist Name
                    </div>
                  </div>
                )}
                {defaultView === 'list' && (
                  <div className="flex-1">
                    <div className="font-body text-sm text-foreground">Sample Track</div>
                    <div className="font-caption text-xs text-muted-foreground">Artist Name</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Animation Settings */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body font-body-medium text-sm text-foreground">
              Show Animations
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Enable hover effects and transitions
            </div>
          </div>
          <button
            onClick={() => setShowAnimations(!showAnimations)}
            className={`
              relative w-12 h-6 rounded-full music-transition
              ${showAnimations ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
              music-transition transform
              ${showAnimations ? 'translate-x-7' : 'translate-x-1'}
            `} />
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body font-body-medium text-sm text-foreground">
              Waveform Visualization
            </div>
            <div className="font-caption text-xs text-muted-foreground">
              Show audio waveforms in player
            </div>
          </div>
          <button
            onClick={() => setShowWaveforms(!showWaveforms)}
            className={`
              relative w-12 h-6 rounded-full music-transition
              ${showWaveforms ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
              music-transition transform
              ${showWaveforms ? 'translate-x-7' : 'translate-x-1'}
            `} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayPreferences;