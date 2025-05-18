import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiesPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Cookie Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us make your experience better by remembering your preferences and how you use our site.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for several purposes:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly (e.g., authentication, security).
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences and settings.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors use our website.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Improve website speed and performance.
            </li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          <h3>3.1 Essential Cookies</h3>
          <ul>
            <li>Authentication cookies</li>
            <li>Security cookies</li>
            <li>Session management cookies</li>
          </ul>

          <h3>3.2 Functional Cookies</h3>
          <ul>
            <li>Language preferences</li>
            <li>Theme preferences</li>
            <li>Brand profile settings</li>
          </ul>

          <h3>3.3 Analytics Cookies</h3>
          <ul>
            <li>Google Analytics</li>
            <li>Usage patterns</li>
            <li>Feature adoption tracking</li>
          </ul>

          <h2>4. Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways:
          </p>
          <ul>
            <li>Browser settings to accept or reject cookies</li>
            <li>Delete cookies periodically</li>
            <li>Use private browsing mode</li>
            <li>Opt-out of specific tracking cookies</li>
          </ul>

          <h2>5. Third-Party Cookies</h2>
          <p>
            We use some third-party services that may set their own cookies:
          </p>
          <ul>
            <li>Google Analytics for website analytics</li>
            <li>Payment processors for transactions</li>
            <li>Social media integration</li>
          </ul>

          <h2>6. Cookie Duration</h2>
          <p>Cookies on our site can last for different periods:</p>
          <ul>
            <li>Session cookies: Deleted when you close your browser</li>
            <li>Persistent cookies: Remain for a set period</li>
            <li>Third-party cookies: Duration set by the third party</li>
          </ul>

          <h2>7. Your Choices</h2>
          <p>
            You have the right to choose whether to accept or reject cookies. However, please note that essential cookies cannot be rejected as they are necessary for the website to function properly.
          </p>

          <h2>8. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us:
          </p>
          <p>
            Email: privacy@nextstepai.com<br />
            Address: 123 AI Boulevard, Tech City, TC 12345
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiesPage; 