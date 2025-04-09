
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
    // In a real implementation, this would call your Google Apps Script endpoint
    // For now, we'll simulate a successful API call
    console.log("Saving to Google Drive:", data);
    
    // This is a placeholder for the actual API call
    // In a real implementation, you would use fetch() to POST to your Google Apps Script
    // For example:
    /*
    const response = await fetch(googleConfig.driveConfig.apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to save data');
    }
    
    const result = await response.json();
    return result.success;
    */
    
    // For demo purposes, we'll simulate a delay and return success
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
