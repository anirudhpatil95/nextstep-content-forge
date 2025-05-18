
import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Brand Profile',
    description: 'Define your brand's name, description, vibe, and key selling points to create a brand profile.'
  },
  {
    number: '02',
    title: 'Customize Vibe & Emotion',
    description: 'Fine-tune your brand's vibe and select the primary emotion you want your content to evoke.'
  },
  {
    number: '03',
    title: 'Generate Content',
    description: 'Choose the type of content you need, customize your prompt, and let our AI generate brand-perfect copy.'
  },
  {
    number: '04',
    title: 'Refine & Use',
    description: 'Review your generated content, make any tweaks if needed, and use it across your marketing channels.'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animation">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground scroll-animation">
            Generate on-brand content in four simple steps
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-nextstep-200 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 scroll-animation`}>
                <div className="flex-1 md:text-right md:pr-8">
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="inline-block text-4xl font-bold text-nextstep-300 mb-2">{step.number}</span>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="relative hidden md:flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-nextstep-600 flex items-center justify-center text-white relative z-10">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 md:text-left md:pl-8">
                  <div className={`${index % 2 === 0 ? 'hidden' : 'block'} md:block`}>
                    <div className="h-64 bg-gradient-to-br from-nextstep-100 to-purple-100 rounded-lg shadow-md overflow-hidden">
                      <div className="p-4 h-full flex items-center justify-center">
                        <span className="text-lg text-nextstep-800 font-medium">{step.title} Visualization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
