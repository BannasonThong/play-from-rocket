import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import GlobalAudioPlayer from '../../components/ui/GlobalAudioPlayer';
import MobileMenuOverlay from '../../components/ui/MobileMenuOverlay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ThemeToggle from './components/ThemeToggle';
import AudioPreferences from './components/AudioPreferences';
import DisplayPreferences from './components/DisplayPreferences';
import StorageManagement from './components/StorageManagement';
import AccountSettings from './components/AccountSettings';
import SettingsNavigation from './components/SettingsNavigation';

const SettingsAndPreferences = () => {
  const [activeSection, setActiveSection] = useState('theme');
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    theme: true,
    audio: false,
    display: false,
    storage: false,
    account: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (sectionId) => {
    if (isMobile) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
      }));
    } else {
      setActiveSection(sectionId);
    }
  };

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case 'theme':
        return <ThemeToggle />;
      case 'audio':
        return <AudioPreferences />;
      case 'display':
        return <DisplayPreferences />;
      case 'storage':
        return <StorageManagement />;
      case 'account':
        return <AccountSettings />;
      default:
        return <ThemeToggle />;
    }
  };

  const sections = [
    {
      id: 'theme',
      label: 'Theme Preferences',
      icon: 'Palette',
      description: 'Customize your visual experience'
    },
    {
      id: 'audio',
      label: 'Audio Settings',
      icon: 'Volume2',
      description: 'Configure playback and sound quality'
    },
    {
      id: 'display',
      label: 'Display Options',
      icon: 'Monitor',
      description: 'Adjust library view and interface'
    },
    {
      id: 'storage',
      label: 'Storage Management',
      icon: 'HardDrive',
      description: 'Monitor and optimize storage usage'
    },
    {
      id: 'account',
      label: 'Account & Privacy',
      icon: 'User',
      description: 'Manage profile and privacy settings'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Settings & Preferences - MusicZone</title>
        <meta name="description" content="Customize your MusicZone experience with theme, audio, display, storage, and account settings." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar />
        <MobileMenuOverlay />

        <main className="md:ml-64 pb-24 md:pb-20">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="px-4 md:px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="font-heading font-heading-bold text-2xl md:text-3xl text-foreground">
                    Settings & Preferences
                  </h1>
                  <p className="font-caption text-sm text-muted-foreground mt-1">
                    Customize your MusicZone experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 py-6">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-12 gap-8">
              {/* Navigation Sidebar */}
              <div className="col-span-3">
                <div className="sticky top-32">
                  <SettingsNavigation 
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                  />
                </div>
              </div>

              {/* Content Area */}
              <div className="col-span-9">
                <div className="space-y-6">
                  {renderSectionContent(activeSection)}
                </div>
              </div>
            </div>

            {/* Mobile Layout - Accordion Style */}
            <div className="md:hidden space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="bg-card rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left music-transition hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={section.icon} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-body font-body-medium text-base text-foreground">
                          {section.label}
                        </h3>
                        <p className="font-caption text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Icon 
                      name="ChevronDown" 
                      size={20} 
                      className={`
                        text-muted-foreground music-transition transform
                        ${expandedSections[section.id] ? 'rotate-180' : ''}
                      `}
                    />
                  </button>
                  
                  {expandedSections[section.id] && (
                    <div className="border-t border-border p-4 animate-fade-in">
                      {renderSectionContent(section.id)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions - Mobile Only */}
            <div className="md:hidden mt-8 bg-card rounded-lg border border-border p-4">
              <h3 className="font-body font-body-medium text-base text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  fullWidth
                >
                  Reset Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Export Config
                </Button>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-muted/30 rounded-lg border border-border p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="HelpCircle" size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-body-medium text-base text-foreground mb-2">
                    Need Help?
                  </h3>
                  <p className="font-caption text-sm text-muted-foreground mb-4">
                    If you're having trouble with any settings or need assistance customizing your experience, 
                    check out our help documentation or contact support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Book"
                      iconPosition="left"
                    >
                      View Documentation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <GlobalAudioPlayer />
      </div>
    </>
  );
};

export default SettingsAndPreferences;