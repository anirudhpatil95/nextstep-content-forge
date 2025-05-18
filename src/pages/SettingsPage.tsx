import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Settings {
  email_notifications: boolean;
  marketing_emails: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

const SettingsPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({
    email_notifications: true,
    marketing_emails: false,
    theme: 'system',
    language: 'en',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getSettings();
  }, [user]);

  const getSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Error loading settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user?.id,
          ...settings,
          ...newSettings,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setSettings({ ...settings, ...newSettings });
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsList className="mb-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Email Address</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Language</h3>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={settings.language}
                    onChange={(e) => updateSettings({ language: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Implement account deletion logic
                    toast.error('Account deletion not implemented yet');
                  }}
                >
                  Delete Account
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-muted-foreground">Receive email notifications about your account</p>
                  </div>
                  <Switch
                    checked={settings.email_notifications}
                    onCheckedChange={(checked) => updateSettings({ email_notifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Marketing Emails</h3>
                    <p className="text-muted-foreground">Receive emails about new features and updates</p>
                  </div>
                  <Switch
                    checked={settings.marketing_emails}
                    onCheckedChange={(checked) => updateSettings({ marketing_emails: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Theme</h3>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={settings.theme}
                    onChange={(e) => updateSettings({ theme: e.target.value as Settings['theme'] })}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage; 