import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing NextStep AI: The Future of Social Media Content Creation',
    excerpt: 'Learn how our AI-powered platform is revolutionizing the way brands create and manage social media content.',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    category: 'Product Updates',
    readTime: '5 min read',
    image: '/blog/intro-nextstep.jpg'
  },
  {
    id: 2,
    title: 'The Power of Brand Consistency Across Social Media Platforms',
    excerpt: 'Discover why maintaining a consistent brand voice is crucial for social media success and how AI can help.',
    author: 'Michael Chen',
    date: '2024-03-10',
    category: 'Best Practices',
    readTime: '7 min read',
    image: '/blog/brand-consistency.jpg'
  },
  {
    id: 3,
    title: 'AI and Content Creation: Myths vs. Reality',
    excerpt: 'We debunk common misconceptions about AI in content creation and show how it enhances human creativity.',
    author: 'Emily Rodriguez',
    date: '2024-03-05',
    category: 'Industry Insights',
    readTime: '6 min read',
    image: '/blog/ai-myths.jpg'
  },
  {
    id: 4,
    title: 'Maximizing Engagement with AI-Generated Content',
    excerpt: 'Tips and strategies for using AI to create content that resonates with your target audience.',
    author: 'David Kim',
    date: '2024-02-28',
    category: 'Tips & Tricks',
    readTime: '8 min read',
    image: '/blog/engagement-tips.jpg'
  }
];

const BlogPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">NextStep AI Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, updates, and best practices for AI-powered content creation
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-muted">
                  <div className="h-48 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      
                      <Button variant="outline">Read More</Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 