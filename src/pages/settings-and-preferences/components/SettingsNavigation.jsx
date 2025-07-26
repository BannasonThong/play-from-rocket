import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'theme',
      label: 'Theme',
      icon: 'Palette',
      description: 'Appearance settings'
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: 'Volume2',
      description: 'Playback preferences'
    },
    {
      id: 'display',
      label: 'Display',
      icon: 'Monitor',
      description: 'Library view options'
    },
    {
      id: 'storage',
      label: 'Storage',
      icon: 'HardDrive',
      description: 'Manage your data'
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      description: 'Profile & privacy'
    }
  ];

  return (
    <nav className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-heading font-heading-bold text-lg text-foreground mb-4">
        Settings
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-lg text-left
                music-transition group
                ${activeSection === section.id
                  ? 'bg-primary text-primary-foreground shadow-music-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon 
                name={section.icon} 
                size={20}
                className={`
                  ${activeSection === section.id 
                    ? 'text-primary-foreground' 
                    : 'group-hover:text-foreground'
                  }
                `}
              />
              <div className="flex-1 min-w-0">
                <div className={`
                  font-body font-body-medium text-sm
                  ${activeSection === section.id 
                    ? 'text-primary-foreground' 
                    : 'group-hover:text-foreground'
                  }
                `}>
                  {section.label}
                </div>
                <div className={`
                  font-caption text-xs
                  ${activeSection === section.id 
                    ? 'text-primary-foreground/80' 
                    : 'text-muted-foreground'
                  }
                `}>
                  {section.description}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNavigation;