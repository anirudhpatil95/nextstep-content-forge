import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend service
    toast.success('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose">
            <p>
              Have questions about NextStep AI? We're here to help! Choose the most convenient way to reach us.
            </p>
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  General inquiries: contact@nextstepai.com<br />
                  Support: support@nextstepai.com<br />
                  Sales: sales@nextstepai.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">
                  Main: (555) 123-4567<br />
                  Support: (555) 123-4568
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-muted-foreground">
                  123 AI Boulevard<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Social Media</h3>
                <p className="text-muted-foreground">
                  Twitter: @nextstepai<br />
                  LinkedIn: NextStep AI<br />
                  Facebook: NextStepAI
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  type="text"
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage; 