import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const jobListings = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    experience: '5+ years',
    description: "We're looking for a Senior Full Stack Developer to help build and scale our AI-powered content generation platform.",
    responsibilities: [
      'Design and implement new features for our web application',
      'Work with AI/ML engineers to integrate content generation models',
      'Optimize application performance and scalability',
      'Mentor junior developers and contribute to technical decisions'
    ]
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    department: 'AI Research',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Join our AI team to develop and improve our content generation models and algorithms.',
    responsibilities: [
      'Develop and optimize AI models for content generation',
      'Implement and test new AI features',
      'Work on improving content quality and relevance',
      'Collaborate with the product team on AI strategy'
    ]
  },
  {
    id: 3,
    title: 'Product Marketing Manager',
    department: 'Marketing',
    location: 'Hybrid (New York)',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Lead our product marketing initiatives and help showcase the power of AI-driven content creation.',
    responsibilities: [
      'Develop and execute product marketing strategies',
      'Create compelling content for product launches',
      'Work with sales team on marketing materials',
      'Analyze market trends and competitor activities'
    ]
  },
  {
    id: 4,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Help our customers succeed with NextStep AI by providing exceptional support and guidance.',
    responsibilities: [
      'Onboard and train new customers',
      'Provide ongoing support and best practices',
      'Monitor customer health and satisfaction',
      'Identify upsell opportunities'
    ]
  }
];

const CareersPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            Help us revolutionize content creation with AI
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Why Work at NextStep AI?</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Competitive salary and equity</li>
                <li>• Health, dental, and vision insurance</li>
                <li>• Flexible PTO policy</li>
                <li>• Remote-first culture</li>
                <li>• Professional development budget</li>
                <li>• Home office setup allowance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Culture</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Innovation-driven environment</li>
                <li>• Work with cutting-edge AI technology</li>
                <li>• Collaborative and inclusive team</li>
                <li>• Regular team events and meetups</li>
                <li>• Focus on work-life balance</li>
                <li>• Continuous learning opportunities</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        <div className="grid gap-6">
          {jobListings.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{job.title}</CardTitle>
                  <Button>Apply Now</Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{job.department}</Badge>
                  <Badge variant="secondary">{job.location}</Badge>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{job.description}</p>
                <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">Required Experience: {job.experience}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Don't see a position that matches your skills?
          </p>
          <Button variant="outline" size="lg">
            Send us your Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage; 