import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            At NextStep AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our content generation platform.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Name and email address</li>
            <li>Billing information</li>
            <li>Company information (if provided)</li>
            <li>User-generated content and brand profiles</li>
          </ul>

          <h3>2.2 Usage Information</h3>
          <ul>
            <li>Log data and device information</li>
            <li>Content generation history</li>
            <li>User preferences and settings</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and improving our services</li>
            <li>Processing payments</li>
            <li>Communicating with you about our services</li>
            <li>Personalizing your experience</li>
            <li>Analyzing usage patterns to improve our platform</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Service providers (e.g., hosting, payment processing)</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Export your data</li>
          </ul>

          <h2>7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to improve your experience. You can control cookie settings through your browser preferences.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect information from children under 13.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>10. Changes to Privacy Policy</h2>
          <p>
            We may update this policy periodically. We will notify you of any material changes via email or through our platform.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For privacy-related questions, please contact us at:
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

export default PrivacyPage; 