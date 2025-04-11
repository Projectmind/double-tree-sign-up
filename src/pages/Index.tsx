
import React, { useState, useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { googleConfig } from "@/config/google-config";

const Index = () => {
  // Load settings from localStorage if available or use default settings
  const loadSavedSettings = () => {
    const savedSettings = localStorage.getItem('formSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (e) {
        console.error("Error parsing saved settings:", e);
        // If parsing fails, return default settings
      }
    }
    
    return {
      primaryColor: googleConfig.formConfig.theme.primaryColor,
      secondaryColor: googleConfig.formConfig.theme.secondaryColor,
      backgroundColor: googleConfig.formConfig.theme.backgroundColor,
      textColor: googleConfig.formConfig.theme.textColor,
      fontFamily: "Inter",
      title: "Sign Up Form",
      subtitle: "Please fill in your details to continue to our review page",
      buttonText: "Submit & Continue to Review",
      thankYouMessage: googleConfig.formConfig.settings.thankYouMessage,
      redirectDelay: googleConfig.formConfig.settings.redirectDelay,
      logoUrl: "",
      // Always use the permanently configured Google review URLs
      googleReviewUrl: googleConfig.reviewPageUrls.doubleTree, // Default URL, but will use property-specific URLs
      // Always use the permanently configured API endpoint
      googleDriveApiEndpoint: googleConfig.driveConfig.apiEndpoint,
    };
  };
  
  const [formSettings, setFormSettings] = useState(loadSavedSettings);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // Ensure settings persist after page refresh
  useEffect(() => {
    const savedSettings = localStorage.getItem('formSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        // Make sure we always use the permanent API endpoint
        parsedSettings.googleDriveApiEndpoint = googleConfig.driveConfig.apiEndpoint;
        // Make sure we always use the permanent Google Review URLs
        parsedSettings.googleReviewUrl = googleConfig.reviewPageUrls.doubleTree; // Default URL
        setFormSettings(parsedSettings);
      } catch (e) {
        console.error("Error loading settings from localStorage:", e);
      }
    }
  }, []);
  
  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };
  
  const handleSettingsChange = (newSettings: any) => {
    // Always ensure the Google Drive API endpoint is the permanent one
    newSettings.googleDriveApiEndpoint = googleConfig.driveConfig.apiEndpoint;
    // Always ensure the Google Review URL is the permanent one (default one)
    newSettings.googleReviewUrl = googleConfig.reviewPageUrls.doubleTree;
    
    // Update the state with new settings
    setFormSettings(newSettings);
    
    // Save settings to localStorage
    try {
      localStorage.setItem('formSettings', JSON.stringify(newSettings));
      console.log("Settings saved to localStorage:", newSettings);
      
      // Update Google config with new settings
      // Do not update the Google Review URLs from localStorage
      // Do not update the API endpoint from localStorage
      googleConfig.formConfig.settings.thankYouMessage = newSettings.thankYouMessage;
      googleConfig.formConfig.settings.redirectDelay = newSettings.redirectDelay;
      googleConfig.formConfig.theme.primaryColor = newSettings.primaryColor;
      googleConfig.formConfig.theme.secondaryColor = newSettings.secondaryColor;
      googleConfig.formConfig.theme.backgroundColor = newSettings.backgroundColor;
      googleConfig.formConfig.theme.textColor = newSettings.textColor;
    } catch (e) {
      console.error("Error saving settings to localStorage:", e);
    }
  };
  
  // Changed from gradient to solid color
  const pageBackgroundStyle = {
    backgroundColor: "#09194e",
  };
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
      style={pageBackgroundStyle}
    >
      {/* Admin toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm shadow-md"
          onClick={toggleAdminPanel}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4" style={{ color: formSettings.primaryColor }}>
            Welcome to Our Sign-up Page
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            {/* Removed text as requested */}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <SignupForm
            primaryColor={formSettings.primaryColor}
            secondaryColor={formSettings.secondaryColor}
            backgroundColor={formSettings.backgroundColor}
            textColor={formSettings.textColor}
            fontFamily={formSettings.fontFamily}
            logoUrl={formSettings.logoUrl}
            title={formSettings.title}
            subtitle={formSettings.subtitle}
            buttonText={formSettings.buttonText}
            thankYouMessage={formSettings.thankYouMessage}
            redirectDelay={formSettings.redirectDelay}
            googleReviewUrl={formSettings.googleReviewUrl}
          />
        </div>
      </div>
      
      {/* Admin Panel */}
      <AdminPanel
        onSettingsChange={handleSettingsChange}
        initialSettings={formSettings}
        showAdminPanel={showAdminPanel}
        onToggleAdminPanel={toggleAdminPanel}
      />
    </div>
  );
};

export default Index;
