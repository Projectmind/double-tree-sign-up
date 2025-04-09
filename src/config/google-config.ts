
// Google integration configuration

export const googleConfig = {
  // Google review page URL - this should be customized with the actual review URL
  reviewPageUrl: "https://www.google.com/maps/place/YourBusinessName/reviews",
  
  // Google Drive API config
  driveConfig: {
    // These would typically be environment variables in a production app
    apiEndpoint: "https://script.google.com/macros/s/YOUR-GOOGLE-APPS-SCRIPT-ID/exec",
    // This is a placeholder for actual implementation
    sheetId: "YOUR-GOOGLE-SHEET-ID", 
  },
  
  // Form configuration options
  formConfig: {
    // Default theme colors - can be customized in the admin panel
    theme: {
      primaryColor: "#3B82F6", // blue-500
      secondaryColor: "#9b87f5", // purple
      backgroundColor: "#F9FAFB", // gray-50
      textColor: "#1F2937", // gray-800
      accentColor: "#33C3F0", // theme-blue
    },
    
    // Form settings
    settings: {
      redirectDelay: 3000, // ms to wait before redirecting to Google review
      showThankYouMessage: true,
      thankYouMessage: "Thank you for signing up! You'll be redirected to our review page shortly.",
    }
  }
};
