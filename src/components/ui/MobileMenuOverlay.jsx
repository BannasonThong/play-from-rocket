import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useNavigation } from './NavigationProvider';

const MobileMenuOverlay = () => {
  const { mobileMenuOpen, closeMobileMenu } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Library',
      path: '/music-library-dashboard',
      icon: 'Music',
      description: 'Browse your music collection'
    },
    {
      label: 'Search',
      path: '/search-results-display',
      icon: 'Search',
      description: 'Find specific tracks and artists'
    },
    {
      label: 'Upload',
      path: '/music-upload-interface',
      icon: 'Upload',
      description: 'Add new music to your collection'
    },
    {
      label: 'Settings',
      path: '/settings-and-preferences',
      icon: 'Settings',
      description: 'Customize your music experience'
    }
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMobileMenu]);

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  if (!mobileMenuOpen) return null;

  return createPortal(
    <div className="md:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={closeMobileMenu}
      />
      
      {/* Menu Panel */}
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-card shadow-music-lg animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Music" size={24} color="white" />
            </div>
            <div>
              <h1 className="font-heading font-heading-bold text-xl text-foreground">
                MusicZone
              </h1>
              <p className="font-caption text-sm text-muted-foreground">
                Your Personal Music Hub
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMobileMenu}
            className="w-8 h-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6">
          <ul className="space-y-3">
            {navigationItems.map((item, index) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-4 p-4 rounded-lg
                    music-transition group text-left
                    ${isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground shadow-music-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fade-in 0.3s ease-out forwards'
                  }}
                >
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${isActiveRoute(item.path)
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted group-hover:bg-muted-foreground/10'
                    }
                  `}>
                    <Icon 
                      name={item.icon} 
                      size={24}
                      className={`
                        ${isActiveRoute(item.path) 
                          ? 'text-primary-foreground' 
                          : 'group-hover:text-foreground'
                        }
                      `}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-body-medium text-base">
                      {item.label}
                    </h3>
                    <p className={`
                      font-caption text-sm
                      ${isActiveRoute(item.path)
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground group-hover:text-muted-foreground'
                      }
                    `}>
                      {item.description}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="text-center space-y-1">
            <p className="font-caption text-sm text-muted-foreground">
              © 2025 MusicZone
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              Personal Music Streaming Platform
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenuOverlay;