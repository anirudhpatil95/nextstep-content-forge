
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlight?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the platform',
    features: [
      '1 Brand Profile',
      '10 Content Generations / Month',
      'Basic Content Types',
      'Email Support',
    ],
    buttonText: 'Get Started',
    buttonLink: '/signup',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For businesses with multiple brands',
    features: [
      'Unlimited Brand Profiles',
      '100 Content Generations / Month',
      'All Content Types',
      'Custom Vibes',
      'Content History',
      'Priority Support',
    ],
    buttonText: 'Sign Up Now',
    buttonLink: '/signup',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'Unlimited Content Generations',
      'API Access',
      'Custom Integrations',
      'Team Collaboration',
      'Dedicated Account Manager',
    ],
    buttonText: 'Contact Sales',
    buttonLink: '#',
  },
];

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animation">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground scroll-animation">
            Choose the plan that's right for your business
          </p>
          
          <div className="flex justify-center mt-8 mb-12">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-nextstep-800 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-nextstep-800 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                Yearly <span className="text-nextstep-600">(Save 20%)</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`overflow-hidden flex flex-col scroll-animation ${
                tier.highlight
                  ? 'border-nextstep-500 shadow-xl relative'
                  : 'border-gray-200'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 inset-x-0 h-2 bg-nextstep-500"></div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {billingPeriod === 'yearly' && tier.price !== 'Custom' && tier.price !== '$0'
                      ? `$${parseInt(tier.price.replace('$', '')) * 0.8 * 12}`
                      : tier.price}
                  </span>
                  {tier.price !== 'Custom' && tier.price !== '$0' && (
                    <span className="text-gray-600 ml-1">
                      /{billingPeriod === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-600">{tier.description}</p>
                
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-nextstep-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button
                    asChild
                    className={`w-full ${
                      tier.highlight
                        ? 'bg-nextstep-600 hover:bg-nextstep-700 text-white'
                        : ''
                    }`}
                    variant={tier.highlight ? 'default' : 'outline'}
                  >
                    <Link to={tier.buttonLink}>{tier.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center scroll-animation">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
