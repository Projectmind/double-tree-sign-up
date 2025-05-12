
// Google integration configuration

export const googleConfig = {
  // Google review page URLs for both properties
  reviewPageUrls: {
    doubleTree: "https://g.page/r/Cd9Sx2DusXg4EBM/review",
    home2Suites: "https://g.page/r/CfykebXntLwXEBM/review"
  },
  
  // Google Drive API config
  driveConfig: {
    // Using the provided Google Apps Script endpoint URL - this is the deployment ID for your Google Apps Script
    apiEndpoint: "https://script.google.com/macros/s/AKfycbxpouanJkKzGnjsoe3VWIXdQiHzOuCn6W1aU4E7f-rv99R00DrJBcyZDr-BfP12Y7zX/exec",
    // This is the ID of your Google Sheet - you should replace this with your actual Google Sheet ID
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
