import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NavigationContext = createContext();

const initialState = {
  sidebarExpanded: true,
  mobileMenuOpen: false,
  activeRoute: '/',
  isMobile: false,
};

const navigationReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded,
      };
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
      };
    case 'CLOSE_MOBILE_MENU':
      return {
        ...state,
        mobileMenuOpen: false,
      };
    case 'SET_ACTIVE_ROUTE':
      return {
        ...state,
        activeRoute: action.payload,
      };
    case 'SET_IS_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
        sidebarExpanded: action.payload ? false : state.sidebarExpanded,
        mobileMenuOpen: action.payload ? state.mobileMenuOpen : false,
      };
    case 'LOAD_PREFERENCES':
      return {
        ...state,
        sidebarExpanded: action.payload.sidebarExpanded ?? state.sidebarExpanded,
      };
    default:
      return state;
  }
};

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('musiczone-navigation-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'LOAD_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Failed to load navigation preferences:', error);
      }
    }

    // Handle window resize
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch({ type: 'SET_IS_MOBILE', payload: isMobile });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    const preferences = {
      sidebarExpanded: state.sidebarExpanded,
    };
    localStorage.setItem('musiczone-navigation-preferences', JSON.stringify(preferences));
  }, [state.sidebarExpanded]);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const closeMobileMenu = () => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  };

  const setActiveRoute = (route) => {
    dispatch({ type: 'SET_ACTIVE_ROUTE', payload: route });
  };

  const value = {
    ...state,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    setActiveRoute,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export default NavigationProvider;