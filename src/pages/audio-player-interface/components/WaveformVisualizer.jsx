import React, { useEffect, useRef, useState } from 'react';

const WaveformVisualizer = ({ isPlaying, currentTime, duration, onSeek }) => {
  const canvasRef = useRef(null);
  const [waveformData, setWaveformData] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);

  // Generate mock waveform data
  useEffect(() => {
    const generateWaveform = () => {
      const points = 200;
      const data = [];
      for (let i = 0; i < points; i++) {
        // Create a more realistic waveform pattern
        const baseAmplitude = Math.sin(i * 0.1) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const amplitude = Math.max(0.1, Math.min(1, baseAmplitude + noise));
        data.push(amplitude);
      }
      setWaveformData(data);
    };

    generateWaveform();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveformData.length;
    const progressPosition = duration > 0 ? (currentTime / duration) * width : 0;

    waveformData.forEach((amplitude, index) => {
      const barHeight = amplitude * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      // Determine bar color based on progress
      const isPlayed = x < progressPosition;
      const isHovered = isHovering && x < hoverPosition;
      
      if (isPlayed || isHovered) {
        ctx.fillStyle = 'var(--color-primary)';
      } else {
        ctx.fillStyle = 'var(--color-muted-foreground)';
      }

      ctx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
    });

    // Draw progress indicator
    if (isPlaying) {
      ctx.fillStyle = 'var(--color-primary)';
      ctx.fillRect(progressPosition - 1, 0, 2, height);
    }
  }, [waveformData, currentTime, duration, isPlaying, isHovering, hoverPosition]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverPosition(x);
  };

  const handleClick = (e) => {
    if (!canvasRef.current || !onSeek) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    
    onSeek(newTime);
  };

  return (
    <div className="w-full h-16 bg-muted/30 rounded-lg overflow-hidden cursor-pointer group">
      <canvas
        ref={canvasRef}
        width={800}
        height={64}
        className="w-full h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </div>
  );
};

export default WaveformVisualizer;