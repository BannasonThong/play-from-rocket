import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    username: 'alexj_music',
    bio: 'Music enthusiast and vinyl collector. Love discovering new artists and sharing great tracks.'
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareListening: true,
    showProfile: true,
    allowRecommendations: true,
    dataCollection: false
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setIsEditing(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-heading-bold text-lg text-foreground">
            Account Settings
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Manage your profile and privacy preferences
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Profile Information */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-body font-body-medium text-sm text-foreground">
              Profile Information
            </h4>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Camera"
                  iconPosition="left"
                >
                  Change Photo
                </Button>
              )}
            </div>

            <Input
              label="Full Name"
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className="mb-4"
            />

            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="mb-4"
            />

            <Input
              label="Username"
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
              disabled={!isEditing}
              className="mb-4"
            />

            <div>
              <label className="font-body font-body-medium text-sm text-foreground mb-2 block">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className={`
                  w-full px-3 py-2 border border-border rounded-lg
                  bg-input text-foreground placeholder-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  music-transition
                `}
                placeholder="Tell us about your music taste..."
              />
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="default"
                  onClick={handleSaveProfile}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="border-t border-border pt-6">
          <h4 className="font-body font-body-medium text-sm text-foreground mb-4">
            Privacy Settings
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-foreground">
                  Share Listening Activity
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Allow others to see what you're currently playing
                </div>
              </div>
              <button
                onClick={() => handlePrivacyToggle('shareListening')}
                className={`
                  relative w-12 h-6 rounded-full music-transition
                  ${privacySettings.shareListening ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
                  music-transition transform
                  ${privacySettings.shareListening ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-foreground">
                  Public Profile
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Make your profile visible to other users
                </div>
              </div>
              <button
                onClick={() => handlePrivacyToggle('showProfile')}
                className={`
                  relative w-12 h-6 rounded-full music-transition
                  ${privacySettings.showProfile ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
                  music-transition transform
                  ${privacySettings.showProfile ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-foreground">
                  Personalized Recommendations
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Use listening history to suggest new music
                </div>
              </div>
              <button
                onClick={() => handlePrivacyToggle('allowRecommendations')}
                className={`
                  relative w-12 h-6 rounded-full music-transition
                  ${privacySettings.allowRecommendations ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
                  music-transition transform
                  ${privacySettings.allowRecommendations ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm text-foreground">
                  Data Collection
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Allow collection of usage data for improvements
                </div>
              </div>
              <button
                onClick={() => handlePrivacyToggle('dataCollection')}
                className={`
                  relative w-12 h-6 rounded-full music-transition
                  ${privacySettings.dataCollection ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 bg-white rounded-full shadow-music-sm
                  music-transition transform
                  ${privacySettings.dataCollection ? 'translate-x-7' : 'translate-x-1'}
                `} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="border-t border-border pt-6">
          <h4 className="font-body font-body-medium text-sm text-foreground mb-4">
            Data Management
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <div className="font-body text-sm text-foreground">
                  Download Your Data
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Export all your account data and music library information
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div>
                <div className="font-body text-sm text-destructive">
                  Delete Account
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Permanently delete your account and all associated data
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="flex items-center space-x-2 p-4 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="font-body text-sm text-success">
              Profile updated successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;