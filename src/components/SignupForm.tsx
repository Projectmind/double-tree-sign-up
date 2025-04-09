
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData, saveToGoogleDrive, redirectToGoogleReview } from "@/utils/googleIntegration";
import { googleConfig } from "@/config/google-config";
import { Loader2 } from "lucide-react";

interface SignupFormProps {
  // Customization props
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
}

const SignupForm: React.FC<SignupFormProps> = ({
  primaryColor = googleConfig.formConfig.theme.primaryColor,
  secondaryColor = googleConfig.formConfig.theme.secondaryColor,
  backgroundColor = googleConfig.formConfig.theme.backgroundColor,
  textColor = googleConfig.formConfig.theme.textColor,
  fontFamily = "Inter",
  logoUrl = "",
  title = "Sign Up",
  subtitle = "Please provide your information to continue",
  buttonText = "Submit & Continue to Review",
  thankYouMessage = googleConfig.formConfig.settings.thankYouMessage,
  redirectDelay = googleConfig.formConfig.settings.redirectDelay,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    purpose: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Custom styles based on props
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Form validation
    if (!formData.name || !formData.email || !formData.company || !formData.purpose) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Email validation
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
      // Save data to Google Drive
      const success = await saveToGoogleDrive(formData);
      
      if (success) {
        setSubmitted(true);
        toast({
          title: "Success!",
          description: "Your information has been submitted successfully.",
        });
        
        // Redirect after delay
        setTimeout(() => {
          redirectToGoogleReview();
        }, redirectDelay);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Input
                  id="purpose"
                  name="purpose"
                  placeholder="Consultation, Meeting, etc."
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                />
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
