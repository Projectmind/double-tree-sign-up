
// This implementation integrates with Google Sheets via Google Apps Script

export interface FormData {
  name: string;
  email: string;
  company: string;
  purpose: string;
  selectedProperty?: string;
  timestamp?: string; // Added for tracking submission time
}

// Save form data to Google Sheets via Google Apps Script
export const saveToGoogleDrive = async (formData: FormData): Promise<boolean> => {
  try {
    // Get the API endpoint from Google config
    const apiEndpoint = "https://script.google.com/macros/s/AKfycbxpouanJkKzGnjsoe3VWIXdQiHzOuCn6W1aU4E7f-rv99R00DrJBcyZDr-BfP12Y7zX/exec";
    
    // Add timestamp to the form data
    const dataToSubmit = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    console.log("Submitting form data to Google Sheets:", dataToSubmit);
    
    // Make a POST request to the Google Apps Script endpoint
    // Using no-cors mode to avoid CORS issues with Google Apps Script
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
      // Using no-cors mode since Google Apps Script might not have proper CORS headers
      mode: "no-cors", 
    });
    
    console.log("Response received:", response);
    
    // When using no-cors, we cannot read the response data
    // This will always return true since we can't actually verify if it was successful
    // But this should allow the request to go through without CORS errors
    return true;
  } catch (error) {
    console.error("Error saving form data to Google Sheets:", error);
    return false;
  }
};

// Redirect to Google review page
export const redirectToGoogleReview = (googleReviewUrl: string) => {
  try {
    console.log("Redirecting to Google review page:", googleReviewUrl);
    
    // Open the Google review page in a new tab
    window.open(googleReviewUrl, "_blank");
  } catch (error) {
    console.error("Error redirecting to Google review page:", error);
  }
};
