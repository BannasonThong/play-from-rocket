import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('musiczone-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = !isDark;
    
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('musiczone-theme', newTheme ? 'dark' : 'light');
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={isDark ? "Moon" : "Sun"} 
              size={24} 
              className="text-primary"
            />
          </div>
          <div>
            <h3 className="font-heading font-heading-bold text-lg text-foreground">
              Theme Preference
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Switch between light and dark modes
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="font-body text-sm text-muted-foreground">
            Light
          </span>
          <button
            onClick={toggleTheme}
            className={`
              relative w-14 h-7 rounded-full music-transition
              ${isDark ? 'bg-primary' : 'bg-muted'}
              ${isAnimating ? 'scale-105' : ''}
            `}
            disabled={isAnimating}
          >
            <div className={`
              absolute top-1 w-5 h-5 bg-white rounded-full shadow-music-sm
              music-transition transform
              ${isDark ? 'translate-x-8' : 'translate-x-1'}
              ${isAnimating ? 'scale-110' : ''}
            `}>
              <div className="w-full h-full flex items-center justify-center">
                <Icon 
                  name={isDark ? "Moon" : "Sun"} 
                  size={12} 
                  className={isDark ? "text-primary" : "text-muted-foreground"}
                />
              </div>
            </div>
          </button>
          <span className="font-body text-sm text-muted-foreground">
            Dark
          </span>
        </div>
      </div>
      
      {isAnimating && (
        <div className="mt-4 flex items-center space-x-2 text-primary">
          <Icon name="Check" size={16} />
          <span className="font-caption text-sm">
            Theme updated successfully
          </span>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;