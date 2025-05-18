import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using NextStep AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            NextStep AI is a content generation platform that uses artificial intelligence to help users create content for various social media platforms. The Service includes features for brand profile management, content generation, and customization of content style and tone.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h2>4. Content Generation and Usage Rights</h2>
          <ul>
            <li>Content generated through our Service is owned by you once generated.</li>
            <li>You are responsible for ensuring that your use of generated content complies with applicable laws and regulations.</li>
            <li>We do not guarantee the uniqueness or originality of AI-generated content.</li>
          </ul>

          <h2>5. Acceptable Use</h2>
          <p>
            You agree not to use the Service to:
          </p>
          <ul>
            <li>Generate content that is illegal, harmful, threatening, abusive, or discriminatory</li>
            <li>Infringe upon intellectual property rights</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Interfere with or disrupt the Service or servers</li>
          </ul>

          <h2>6. Payment Terms</h2>
          <p>
            If you choose a paid subscription:
          </p>
          <ul>
            <li>Payments are processed securely through our payment providers</li>
            <li>Subscriptions auto-renew unless cancelled</li>
            <li>Refunds are provided in accordance with our refund policy</li>
          </ul>

          <h2>7. Privacy and Data Protection</h2>
          <p>
            Our collection and use of personal information is governed by our Privacy Policy. By using the Service, you consent to our data practices as described in the Privacy Policy.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            The Service, including its original content, features, and functionality, is owned by NextStep AI and is protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            NextStep AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
          </p>

          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@nextstepai.com<br />
            Address: 123 AI Boulevard, Tech City, TC 12345
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage; 