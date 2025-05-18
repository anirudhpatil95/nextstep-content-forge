import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const DocsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about NextStep AI
          </p>
          <div className="max-w-xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="guides">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="sdk">SDK</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-primary hover:underline">Quick Start Guide</a>
                      <p className="text-sm text-muted-foreground">Learn the basics of NextStep AI in 5 minutes</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Creating Your First Brand Profile</a>
                      <p className="text-sm text-muted-foreground">Set up and configure your brand identity</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Understanding the Vibe Matrix</a>
                      <p className="text-sm text-muted-foreground">Learn how our AI understands and generates content</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-primary hover:underline">Custom Vibe Configuration</a>
                      <p className="text-sm text-muted-foreground">Fine-tune the AI to match your brand perfectly</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Batch Content Generation</a>
                      <p className="text-sm text-muted-foreground">Generate content in bulk for multiple platforms</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Team Collaboration</a>
                      <p className="text-sm text-muted-foreground">Work together on content creation and approval</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>
                        curl -X POST https://api.nextstepai.com/v1/auth/token \<br />
                        {'  '}-H "Content-Type: application/json" \<br />
                        {'  '}-d {"\"api_key\": \"your_api_key\""}
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Generate Content</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>
                        curl -X POST https://api.nextstepai.com/v1/content/generate \<br />
                        {'  '}-H "Authorization: Bearer your_token" \<br />
                        {'  '}-H "Content-Type: application/json" \<br />
                        {'  '}-d {"\"brand_id\": \"123\", \"content_type\": \"social_post\""}
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdk">
            <Card>
              <CardHeader>
                <CardTitle>SDK Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Installation</h3>
                    <pre className="bg-muted p-4 rounded-lg">
                      <code>npm install @nextstepai/sdk</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>
                        import {'{'} NextStepAI {'}'} from '@nextstepai/sdk';<br /><br />
                        const client = new NextStepAI("your_api_key");<br />
                        const content = await client.generateContent({'{'}<br />
                        {'  '}brandId: "123",<br />
                        {'  '}contentType: "social_post"<br />
                        {'}'});
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-primary hover:underline">React Integration</a>
                      <p className="text-sm text-muted-foreground">Example of using NextStep AI in a React application</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Node.js Backend</a>
                      <p className="text-sm text-muted-foreground">Server-side implementation examples</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Webhook Integration</a>
                      <p className="text-sm text-muted-foreground">Handle content generation callbacks</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <a href="#" className="text-primary hover:underline">Social Media Dashboard</a>
                      <p className="text-sm text-muted-foreground">Complete dashboard with content scheduling</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">E-commerce Integration</a>
                      <p className="text-sm text-muted-foreground">Product description generation example</p>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">Blog Content Generator</a>
                      <p className="text-sm text-muted-foreground">Automated blog post creation system</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help with implementation?
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocsPage; 