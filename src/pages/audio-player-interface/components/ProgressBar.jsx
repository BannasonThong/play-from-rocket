import React, { useState, useEffect } from 'react';

const ProgressBar = ({ 
  currentTime, 
  duration, 
  onSeek, 
  className = "",
  showTime = true 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? ((isDragging ? dragTime : currentTime) / duration) * 100 : 0;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleSeek(e, false);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    handleSeek(e, true);
  };

  const handleSeek = (e, shouldSeek = true) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    
    if (shouldSeek && onSeek) {
      onSeek(newTime);
    } else {
      setDragTime(newTime);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = (e) => handleMouseUp(e);
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={`w-full ${className}`}>
      {showTime && (
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-muted-foreground">
            {formatTime(isDragging ? dragTime : currentTime)}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      )}
      
      <div 
        className="relative h-2 bg-muted rounded-full cursor-pointer group"
        onMouseDown={handleMouseDown}
        onClick={handleSeek}
      >
        {/* Progress Track */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full music-transition"
          style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
        />
        
        {/* Progress Thumb */}
        <div 
          className={`
            absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full
            shadow-music-sm music-transition
            ${isDragging || 'group-hover'} ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          `}
          style={{ 
            left: `calc(${Math.max(0, Math.min(100, progressPercent))}% - 8px)`,
            opacity: isDragging ? 1 : undefined
          }}
        />
        
        {/* Hover indicator */}
        <div className="absolute inset-0 rounded-full group-hover:bg-primary/10 music-transition" />
      </div>
    </div>
  );
};

export default ProgressBar;