
import { googleConfig } from "../config/google-config";
import { toast } from "sonner";

export interface FormData {
  name: string;
  email: string;
  company: string;
  purpose: string;
}

/**
 * Saves form data to Google Drive via Google Apps Script
 */
export const saveToGoogleDrive = async (data: FormData): Promise<boolean> => {
  try {
    console.log("Saving to Google Drive:", data);
    
    // Use the permanently configured Google Apps Script endpoint
    const response = await fetch(googleConfig.driveConfig.apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors' // This is required for cross-origin requests to Google Apps Script
    });
    
    // Since we're using no-cors, we can't read the response
    // For production, you might want to set up proper CORS in your Apps Script
    console.log("Data sent to Google Drive API");
    
    // For now, we'll assume success if no error is thrown
    return true;
  } catch (error) {
    console.error("Error saving to Google Drive:", error);
    toast.error("Failed to save your information. Please try again.");
    return false;
  }
};

/**
 * Redirects user to Google review page
 */
export const redirectToGoogleReview = (url: string): void => {
  // In a real application, you might want to track this redirect
  console.log("Redirecting to Google review page:", url);
  
  // Use window.open to open in a new tab instead of redirecting the current window
  // This ensures the user can still see the thank you message
  window.open(url, '_blank');
}
