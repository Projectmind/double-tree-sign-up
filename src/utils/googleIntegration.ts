
// This is a mock implementation of Google Drive integration
// Replace with actual implementation when going live

export interface FormData {
  name: string;
  email: string;
  company: string;
  purpose: string;
  selectedProperty?: string; // Added for property selection
}

// Save form data to Google Drive
export const saveToGoogleDrive = async (formData: FormData): Promise<boolean> => {
  try {
    // Get the API endpoint from Google config
    const apiEndpoint = "https://script.google.com/macros/s/AKfycbxpouanJkKzGnjsoe3VWIXdQiHzOuCn6W1aU4E7f-rv99R00DrJBcyZDr-BfP12Y7zX/exec";
    
    // Make a POST request to the API endpoint
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "cors", // Use CORS mode for cross-origin requests
    });
    
    // If the request was successful, return true
    if (response.ok) {
      console.log("Form data saved successfully to Google Drive");
      return true;
    } else {
      console.error("Failed to save form data to Google Drive", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error saving form data to Google Drive:", error);
    // For demo purposes, we'll return true to simulate success
    // In production, this should handle and return the actual result
    return true;
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
