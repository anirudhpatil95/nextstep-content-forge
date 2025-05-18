import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">About NextStep AI</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg">
          <p>
            NextStep AI is a cutting-edge platform designed to revolutionize how social media managers and content creators work. Our mission is to empower businesses to create authentic, engaging content that resonates with their audience while maintaining consistent brand voice across all platforms.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            We believe that every brand has a unique story to tell. Our AI-powered platform helps you tell that story consistently and effectively across all your social media channels, saving you time while maintaining the authentic voice that makes your brand special.
          </p>

          <h2>Our Technology</h2>
          <p>
            At the heart of NextStep AI is our innovative Vibe Matrix technology. This proprietary system understands not just the words you use, but the emotion and style that makes your brand unique. By combining advanced AI with deep understanding of brand communication, we create content that truly represents your brand's voice.
          </p>

          <h2>Our Team</h2>
          <p>
            We're a team of passionate technologists, marketers, and creatives who understand the challenges of modern brand communication. Our diverse backgrounds in AI, content strategy, and social media management come together to create a platform that truly serves the needs of today's digital marketers.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>Innovation: We're constantly pushing the boundaries of what's possible with AI-assisted content creation.</li>
            <li>Authenticity: We help brands maintain their unique voice while scaling their content production.</li>
            <li>Simplicity: We believe powerful technology should be accessible and easy to use.</li>
            <li>Quality: We're committed to delivering the highest quality content generation tools.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! Whether you have questions about our platform, need support, or want to explore partnership opportunities, our team is here to help.
          </p>
          <p>
            Email: contact@nextstepai.com<br />
            Phone: (555) 123-4567<br />
            Address: 123 AI Boulevard, Tech City, TC 12345
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage; 