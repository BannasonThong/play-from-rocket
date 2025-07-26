import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { NavigationProvider } from "components/ui/NavigationProvider";
// Add your imports here
import MusicLibraryDashboard from "pages/music-library-dashboard";
import SearchResultsDisplay from "pages/search-results-display";
import AudioPlayerInterface from "pages/audio-player-interface";
import MusicUploadInterface from "pages/music-upload-interface";
import SettingsAndPreferences from "pages/settings-and-preferences";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            <Route path="/" element={<MusicLibraryDashboard />} />
            <Route path="/music-library-dashboard" element={<MusicLibraryDashboard />} />
            <Route path="/search-results-display" element={<SearchResultsDisplay />} />
            <Route path="/audio-player-interface" element={<AudioPlayerInterface />} />
            <Route path="/music-upload-interface" element={<MusicUploadInterface />} />
            <Route path="/settings-and-preferences" element={<SettingsAndPreferences />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default Routes;