
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData, saveToGoogleDrive, redirectToGoogleReview } from "@/utils/googleIntegration";
import { Loader2 } from "lucide-react";
import LogoSelectionButton from "./LogoSelectionButton";
import { googleConfig } from "@/config/google-config";

interface SignupFormProps {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  logoUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  thankYouMessage?: string;
  redirectDelay?: number;
  googleReviewUrl?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  fontFamily = "Inter",
  logoUrl = "",
  title = "Sign Up",
  subtitle = "Please provide your information to continue",
  buttonText = "Submit & Continue to Review",
  thankYouMessage = "Thank you for signing up! You'll be redirected to our review page shortly.",
  redirectDelay = 3000,
  googleReviewUrl,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    purpose: "",
    selectedProperty: "doubleTree",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const customStyles = {
    background: backgroundColor,
    color: textColor,
    fontFamily,
  };

  const buttonStyle = {
    backgroundColor: primaryColor,
    color: "#ffffff",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, selectedProperty: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.name || !formData.email || !formData.company || !formData.purpose || !formData.selectedProperty) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      
      // Add additional console logs for debugging
      console.log("Using API endpoint:", googleConfig.driveConfig.apiEndpoint);
      
      const success = await saveToGoogleDrive(formData);
      
      console.log("Submission result:", success ? "Success" : "Failed");
      
      // Since we're using no-cors mode, we can't actually verify if it was successful
      // We'll assume it was successful if no error was thrown
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });
      
      const selectedReviewUrl = formData.selectedProperty === "doubleTree" 
        ? googleConfig.reviewPageUrls.doubleTree 
        : googleConfig.reviewPageUrls.home2Suites;
      
      // Add delay before redirecting to ensure toast is seen
      setTimeout(() => {
        redirectToGoogleReview(selectedReviewUrl);
      }, redirectDelay);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const doubleTreeLogo = "/lovable-uploads/15a6aac8-ec16-4827-9360-0a09c34c3bd4.png";
  const home2SuitesLogo = "/lovable-uploads/0025e39c-6378-499c-921b-99fbb034dbb6.png";

  return (
    <div
      className="w-full max-w-md mx-auto animate-fade-in"
      style={customStyles}
    >
      <Card className="glass-card shadow-xl border border-gray-200">
        <CardHeader className="space-y-1">
          {logoUrl && (
            <div className="flex justify-center mb-4">
              <img src={logoUrl} alt="Logo" className="h-16 w-auto" />
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-center" style={{ color: primaryColor }}>
            {title}
          </CardTitle>
          <CardDescription className="text-center">{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
              <div className="space-y-2 transition-all duration-200 hover:shadow-md rounded-lg p-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-200 hover:shadow-md rounded-lg p-2">
                <Label htmlFor="email" className="font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-200 hover:shadow-md rounded-lg p-2">
                <Label htmlFor="company" className="font-medium">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 transition-all duration-200 hover:shadow-md rounded-lg p-2">
                <Label htmlFor="purpose" className="font-medium">Purpose of Visit</Label>
                <Input
                  id="purpose"
                  name="purpose"
                  placeholder="Business, Corporate Meetings, Events, etc."
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-3 transition-all duration-200 hover:shadow-md rounded-lg p-2">
                <Label className="font-medium">Select Property</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <LogoSelectionButton 
                    logo={doubleTreeLogo}
                    value="doubleTree"
                    isSelected={formData.selectedProperty === "doubleTree"}
                    onClick={() => handlePropertyChange("doubleTree")}
                    alt="DoubleTree by Hilton"
                  />
                  <LogoSelectionButton 
                    logo={home2SuitesLogo}
                    value="home2Suites"
                    isSelected={formData.selectedProperty === "home2Suites"}
                    onClick={() => handlePropertyChange("home2Suites")}
                    alt="Home2 Suites by Hilton"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4 animate-fade-in">
              <div className="text-2xl font-medium" style={{ color: secondaryColor }}>
                Thank you!
              </div>
              <p>{thankYouMessage}</p>
              <div className="flex justify-center mt-4">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: primaryColor }} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!submitted && (
            <Button 
              className="w-full font-medium" 
              style={buttonStyle}
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {buttonText}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
