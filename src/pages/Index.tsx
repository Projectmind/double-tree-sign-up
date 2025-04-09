
import React, { useState } from "react";
import SignupForm from "@/components/SignupForm";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { googleConfig } from "@/config/google-config";

const Index = () => {
  const [formSettings, setFormSettings] = useState({
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
    googleReviewUrl: googleConfig.reviewPageUrl,
    googleDriveApiEndpoint: googleConfig.driveConfig.apiEndpoint,
  });
  
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };
  
  const handleSettingsChange = (newSettings: any) => {
    setFormSettings(newSettings);
    
    // Update Google config with new settings
    googleConfig.reviewPageUrl = newSettings.googleReviewUrl;
    googleConfig.driveConfig.apiEndpoint = newSettings.googleDriveApiEndpoint;
    googleConfig.formConfig.settings.thankYouMessage = newSettings.thankYouMessage;
    googleConfig.formConfig.settings.redirectDelay = newSettings.redirectDelay;
    googleConfig.formConfig.theme.primaryColor = newSettings.primaryColor;
    googleConfig.formConfig.theme.secondaryColor = newSettings.secondaryColor;
    googleConfig.formConfig.theme.backgroundColor = newSettings.backgroundColor;
    googleConfig.formConfig.theme.textColor = newSettings.textColor;
  };
  
  // Dynamic background style based on settings
  const pageBackgroundStyle = {
    background: `linear-gradient(135deg, ${formSettings.backgroundColor} 0%, white 100%)`,
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
            Please complete the form below. After submission, you'll be redirected to our Google review page.
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
