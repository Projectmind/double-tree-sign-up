
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { googleConfig } from "@/config/google-config";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

interface AdminPanelProps {
  onSettingsChange: (settings: any) => void;
  initialSettings?: any;
  showAdminPanel: boolean;
  onToggleAdminPanel: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  onSettingsChange,
  initialSettings,
  showAdminPanel,
  onToggleAdminPanel,
}) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Default settings with fallbacks
    formTitle: initialSettings?.title || "Sign Up",
    formSubtitle: initialSettings?.subtitle || "Please provide your information to continue",
    buttonText: initialSettings?.buttonText || "Submit & Continue to Review",
    thankYouMessage: initialSettings?.thankYouMessage || googleConfig.formConfig.settings.thankYouMessage,
    redirectDelay: initialSettings?.redirectDelay || googleConfig.formConfig.settings.redirectDelay,
    primaryColor: initialSettings?.primaryColor || googleConfig.formConfig.theme.primaryColor,
    secondaryColor: initialSettings?.secondaryColor || googleConfig.formConfig.theme.secondaryColor,
    backgroundColor: initialSettings?.backgroundColor || googleConfig.formConfig.theme.backgroundColor,
    textColor: initialSettings?.textColor || googleConfig.formConfig.theme.textColor,
    fontFamily: initialSettings?.fontFamily || "Inter",
    logoUrl: initialSettings?.logoUrl || "",
    googleReviewUrl: initialSettings?.googleReviewUrl || googleConfig.reviewPageUrl,
    googleDriveApiEndpoint: initialSettings?.googleDriveApiEndpoint || googleConfig.driveConfig.apiEndpoint,
  });

  // Update local state when initialSettings prop changes
  useEffect(() => {
    if (initialSettings) {
      setSettings({
        formTitle: initialSettings.title || settings.formTitle,
        formSubtitle: initialSettings.subtitle || settings.formSubtitle,
        buttonText: initialSettings.buttonText || settings.buttonText,
        thankYouMessage: initialSettings.thankYouMessage || settings.thankYouMessage,
        redirectDelay: initialSettings.redirectDelay || settings.redirectDelay,
        primaryColor: initialSettings.primaryColor || settings.primaryColor,
        secondaryColor: initialSettings.secondaryColor || settings.secondaryColor,
        backgroundColor: initialSettings.backgroundColor || settings.backgroundColor,
        textColor: initialSettings.textColor || settings.textColor,
        fontFamily: initialSettings.fontFamily || settings.fontFamily,
        logoUrl: initialSettings.logoUrl || settings.logoUrl,
        googleReviewUrl: initialSettings.googleReviewUrl || settings.googleReviewUrl,
        googleDriveApiEndpoint: initialSettings.googleDriveApiEndpoint || settings.googleDriveApiEndpoint,
      });
    }
  }, [initialSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Format settings to match expected structure in parent component
    const formattedSettings = {
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      backgroundColor: settings.backgroundColor,
      textColor: settings.textColor,
      fontFamily: settings.fontFamily,
      title: settings.formTitle,
      subtitle: settings.formSubtitle,
      buttonText: settings.buttonText,
      thankYouMessage: settings.thankYouMessage,
      redirectDelay: settings.redirectDelay,
      logoUrl: settings.logoUrl,
      googleReviewUrl: settings.googleReviewUrl,
      googleDriveApiEndpoint: settings.googleDriveApiEndpoint,
    };
    
    onSettingsChange(formattedSettings);
    toast({
      title: "Settings Saved",
      description: "Your customization settings have been applied.",
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-in-out"
      style={{ transform: showAdminPanel ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <Card className="h-full rounded-none border-l shadow-xl overflow-auto">
        <div className="sticky top-0 bg-card z-10">
          <CardHeader className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2" 
              onClick={onToggleAdminPanel}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle>Customize Form</CardTitle>
            <CardDescription>Adjust the appearance and settings of your form</CardDescription>
          </CardHeader>
        </div>
        
        <CardContent className="p-0">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="appearance">Style</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formTitle">Form Title</Label>
                <Input
                  id="formTitle"
                  name="formTitle"
                  value={settings.formTitle}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="formSubtitle">Subtitle</Label>
                <Input
                  id="formSubtitle"
                  name="formSubtitle"
                  value={settings.formSubtitle}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={settings.buttonText}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thankYouMessage">Thank You Message</Label>
                <Input
                  id="thankYouMessage"
                  name="thankYouMessage"
                  value={settings.thankYouMessage}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="redirectDelay">
                  Redirect Delay (ms): {settings.redirectDelay}
                </Label>
                <Slider
                  id="redirectDelay"
                  min={1000}
                  max={10000}
                  step={500}
                  value={[settings.redirectDelay]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, redirectDelay: value[0] }))}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleChange}
                  />
                  <div className="h-10 w-10 rounded border" style={{ backgroundColor: settings.primaryColor }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="secondaryColor"
                    name="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={handleChange}
                  />
                  <div className="h-10 w-10 rounded border" style={{ backgroundColor: settings.secondaryColor }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="backgroundColor"
                    name="backgroundColor"
                    value={settings.backgroundColor}
                    onChange={handleChange}
                  />
                  <div className="h-10 w-10 rounded border" style={{ backgroundColor: settings.backgroundColor }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex space-x-2">
                  <Input
                    id="textColor"
                    name="textColor"
                    value={settings.textColor}
                    onChange={handleChange}
                  />
                  <div className="h-10 w-10 rounded border" style={{ backgroundColor: settings.textColor }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Input
                  id="fontFamily"
                  name="fontFamily"
                  value={settings.fontFamily}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  value={settings.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleReviewUrl">Google Review URL</Label>
                <Input
                  id="googleReviewUrl"
                  name="googleReviewUrl"
                  value={settings.googleReviewUrl}
                  onChange={handleChange}
                  placeholder="https://www.google.com/maps/place/YourBusinessName/reviews"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleDriveApiEndpoint">Google Drive API Endpoint</Label>
                <Input
                  id="googleDriveApiEndpoint"
                  name="googleDriveApiEndpoint"
                  value={settings.googleDriveApiEndpoint}
                  onChange={handleChange}
                  placeholder="https://script.google.com/macros/s/YOUR-SCRIPT-ID/exec"
                />
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Note: To save data to Google Drive, you'll need to set up a Google Apps Script as a web app
                  and provide its URL as the API endpoint above.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="sticky bottom-0 bg-card border-t p-4">
          <Button className="w-full" onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            Apply Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPanel;
