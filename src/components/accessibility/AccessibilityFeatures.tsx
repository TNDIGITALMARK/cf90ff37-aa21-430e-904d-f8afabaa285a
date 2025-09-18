'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  Keyboard,
  Focus,
  Volume2,
  VolumeX,
  Settings
} from 'lucide-react';

interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  soundEffects: boolean;
  focusIndicators: boolean;
}

const AccessibilityFeatures: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    soundEffects: false,
    focusIndicators: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('luxe-atelier-accessibility');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Check for user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersReducedMotion || prefersHighContrast) {
      const updatedSettings = {
        ...settings,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
      };
      setSettings(updatedSettings);
      applySettings(updatedSettings);
    }

    // Add keyboard listener for accessibility menu
    const handleKeyPress = (event: KeyboardEvent) => {
      // Alt + A to toggle accessibility menu
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsVisible(!isVisible);
      }
      
      // Alt + H for high contrast
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        toggleSetting('highContrast');
      }
      
      // Alt + T for large text
      if (event.altKey && event.key === 't') {
        event.preventDefault();
        toggleSetting('largeText');
      }
      
      // Alt + M for reduced motion
      if (event.altKey && event.key === 'm') {
        event.preventDefault();
        toggleSetting('reducedMotion');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible, settings]);

  const applySettings = (settings: AccessibilityState) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Enhanced focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    
    // Screen reader optimizations
    if (settings.screenReader) {
      root.classList.add('screen-reader-optimized');
    } else {
      root.classList.remove('screen-reader-optimized');
    }
  };

  const toggleSetting = (key: keyof AccessibilityState) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    applySettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem('luxe-atelier-accessibility', JSON.stringify(newSettings));
    
    // Announce change to screen readers
    const message = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${newSettings[key] ? 'enabled' : 'disabled'}`;
    announceToScreenReader(message);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilityState = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      soundEffects: false,
      focusIndicators: true,
    };
    
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('luxe-atelier-accessibility');
    announceToScreenReader('Accessibility settings reset to defaults');
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-20 right-4 z-50 bg-luxe-gold text-luxe-black hover:bg-luxe-gold/90 rounded-full p-3"
        aria-label="Toggle accessibility menu"
        title="Accessibility Settings (Alt + A)"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Accessibility Panel */}
      {isVisible && (
        <Card className="fixed bottom-32 right-4 z-50 w-80 p-6 luxury-shadow-lg bg-background border border-luxe-gold/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg text-foreground">
              Accessibility Settings
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              aria-label="Close accessibility menu"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">High Contrast</span>
              </div>
              <Button
                variant={settings.highContrast ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSetting('highContrast')}
                aria-label={`${settings.highContrast ? 'Disable' : 'Enable'} high contrast mode`}
                title="Alt + H"
              >
                {settings.highContrast ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Large Text</span>
              </div>
              <Button
                variant={settings.largeText ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSetting('largeText')}
                aria-label={`${settings.largeText ? 'Disable' : 'Enable'} large text`}
                title="Alt + T"
              >
                {settings.largeText ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Focus className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Reduced Motion</span>
              </div>
              <Button
                variant={settings.reducedMotion ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSetting('reducedMotion')}
                aria-label={`${settings.reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
                title="Alt + M"
              >
                <Focus className="h-4 w-4" />
              </Button>
            </div>

            {/* Screen Reader Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Screen Reader Mode</span>
              </div>
              <Button
                variant={settings.screenReader ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSetting('screenReader')}
                aria-label={`${settings.screenReader ? 'Disable' : 'Enable'} screen reader optimizations`}
              >
                {settings.screenReader ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>

            {/* Enhanced Focus */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Keyboard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Enhanced Focus</span>
              </div>
              <Button
                variant={settings.focusIndicators ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSetting('focusIndicators')}
                aria-label={`${settings.focusIndicators ? 'Disable' : 'Enable'} enhanced focus indicators`}
              >
                <Keyboard className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetSettings}
            className="w-full mt-4"
            aria-label="Reset all accessibility settings to defaults"
          >
            Reset to Defaults
          </Button>

          {/* Keyboard Shortcuts Info */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              Keyboard Shortcuts:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Alt + A: Toggle menu</div>
              <div>Alt + H: High contrast</div>
              <div>Alt + T: Large text</div>
              <div>Alt + M: Reduced motion</div>
            </div>
          </div>
        </Card>
      )}

      {/* Screen Reader Only Content */}
      <div className="sr-only">
        <h2>Accessibility Features Available</h2>
        <p>
          This website includes accessibility features to enhance your browsing experience. 
          Use Alt + A to open the accessibility menu, or use the individual shortcuts listed below.
        </p>
        <ul>
          <li>Alt + H: Toggle high contrast mode</li>
          <li>Alt + T: Toggle large text size</li>
          <li>Alt + M: Toggle reduced motion</li>
        </ul>
      </div>
    </>
  );
};

// Skip to main content link
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-luxe-gold text-luxe-black px-4 py-2 rounded font-medium"
    >
      Skip to main content
    </a>
  );
};

// Add required CSS to globals.css for accessibility features
export const accessibilityStyles = `
/* Accessibility Enhancements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.high-contrast {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --muted: 0 0% 20%;
  --muted-foreground: 0 0% 80%;
  --border: 0 0% 40%;
}

.large-text {
  font-size: 1.25em !important;
}

.large-text .text-sm { font-size: 1rem !important; }
.large-text .text-base { font-size: 1.125rem !important; }
.large-text .text-lg { font-size: 1.25rem !important; }
.large-text .text-xl { font-size: 1.5rem !important; }

.reduced-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

.enhanced-focus *:focus {
  outline: 3px solid hsl(var(--luxe-gold)) !important;
  outline-offset: 2px !important;
}

.screen-reader-optimized img:not([alt]) {
  opacity: 0.5;
}

.screen-reader-optimized [aria-hidden="true"] {
  opacity: 0.7;
}

/* High contrast mode overrides */
.high-contrast .bg-primary { background: white !important; color: black !important; }
.high-contrast .text-primary { color: white !important; }
.high-contrast .bg-secondary { background: black !important; color: white !important; }
.high-contrast .text-secondary { color: black !important; }

/* Focus management */
.focus-trap {
  position: fixed;
  inset: 0;
  z-index: 50;
}

/* Reduced motion for animations */
@media (prefers-reduced-motion: reduce) {
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Prefers color scheme support */
@media (prefers-color-scheme: dark) {
  .auto-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
  }
}

/* High contrast media query */
@media (prefers-contrast: high) {
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --border: 0 0% 50%;
  }
}
`;

export default AccessibilityFeatures;