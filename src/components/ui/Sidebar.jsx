import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Library',
      path: '/music-library-dashboard',
      icon: 'Music',
      tooltip: 'Browse your music collection'
    },
    {
      label: 'Search',
      path: '/search-results-display',
      icon: 'Search',
      tooltip: 'Find specific tracks and artists'
    },
    {
      label: 'Upload',
      path: '/music-upload-interface',
      icon: 'Upload',
      tooltip: 'Add new music to your collection'
    },
    {
      label: 'Settings',
      path: '/settings-and-preferences',
      icon: 'Settings',
      tooltip: 'Customize your music experience'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsExpanded(!isExpanded);
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="bg-card shadow-music-md"
        >
          <Icon name="Menu" size={24} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-full bg-card border-r border-border z-50
          music-transition-slow
          ${window.innerWidth < 768 
            ? `${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
            : `${isExpanded ? 'w-64' : 'w-16'} translate-x-0`
          }
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Music" size={20} color="white" />
            </div>
            {(isExpanded || isMobileMenuOpen) && (
              <div>
                <h1 className="font-heading font-heading-bold text-lg text-foreground">
                  MusicZone
                </h1>
                <p className="font-caption text-xs text-muted-foreground">
                  Your Personal Music Hub
                </p>
              </div>
            )}
          </div>
          
          {/* Desktop Toggle Button */}
          <div className="hidden md:block ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="w-6 h-6"
            >
              <Icon 
                name={isExpanded ? "ChevronLeft" : "ChevronRight"} 
                size={16} 
              />
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                    music-transition group relative
                    ${isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground shadow-music-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                  title={!isExpanded && !isMobileMenuOpen ? item.tooltip : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20}
                    className={`
                      ${isActiveRoute(item.path) 
                        ? 'text-primary-foreground' 
                        : 'group-hover:text-foreground'
                      }
                    `}
                  />
                  {(isExpanded || isMobileMenuOpen) && (
                    <span className="font-body font-body-medium text-sm">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && !isMobileMenuOpen && (
                    <div className="
                      absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground
                      text-xs rounded shadow-music-lg opacity-0 group-hover:opacity-100
                      music-transition pointer-events-none whitespace-nowrap z-50
                    ">
                      {item.tooltip}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-border">
          {(isExpanded || isMobileMenuOpen) && (
            <div className="text-center">
              <p className="font-caption text-xs text-muted-foreground">
                © 2025 MusicZone
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Personal Music Streaming
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;