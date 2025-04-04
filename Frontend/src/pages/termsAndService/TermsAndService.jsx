import React, { useState } from 'react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };
  
  const sections = [
    {
      id: 1,
      title: "ACCEPTANCE OF TERMS",
      content: "By accessing or using the Service via the Site or App, you agree to comply with and be legally bound by these Terms of Use. If you do not accept these Terms in full, you are not authorized to access or use the Service."
    },
    {
      id: 2,
      title: "DEFINITIONS AND INTERPRETATION",
      content: (
        <div className="space-y-2">
          <p><strong>Definitions:</strong> Capitalized terms used in this Agreement, unless otherwise defined elsewhere, shall have the following meanings:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>"App"</strong> refers to the TickerShorts mobile application, which is owned and operated by Us, and is available for download from Google Play and the App Store, including any updates, enhancements, or modifications thereto.</li>
            <li><strong>"App Store"</strong> refers to the service provided by Apple Inc. and/or its affiliates, a third party, through which You may download the App.</li>
            <li><strong>"App Store Terms and Conditions"</strong> refers to the terms and conditions that apply to the use of the App Store, as available at https://www.apple.com/legal/internet-services/itunes/us/terms.html.</li>
            <li><strong>"Google Play"</strong> refers to the service provided by Google Ireland Limited and/or its affiliates, which You may use to download the App.</li>
            <li><strong>"Google Play Terms of Service"</strong> refers to the terms of service applicable to the use of Google Play, as available at https://play.google.com/about/play-terms.html.</li>
            <li><strong>"Platform"</strong> refers collectively to the TickerShorts App and Website, including all content, features, and services offered therein.</li>
            <li><strong>"Sponsored Content"</strong> refers to content distinct from regular editorial content displayed on the Platform, presented in the form of audio, video, text, or image media, which promotes a third-party's brand message or views.</li>
            <li><strong>"Service(s)"</strong> refers to the features, functionalities, and services made available by TickerShorts through the Platform, including but not limited to stock market news, financial insights, analytics, and any other related offerings.</li>
            <li><strong>"TickerShorts," "We," "Us," or "Our"</strong> refers to the entity operating and managing the Platform, including its affiliates, officers, directors, employees, agents, and service providers.</li>
            <li><strong>"User," "You," or "Your"</strong> refers to any person who accesses, registers, or uses the Platform in any manner and agrees to be bound by this Agreement.</li>
            <li><strong>"Website"</strong> refers to the official website of TickerShorts, which provides access to its services, features, and content, as specified by Us.</li>
            <li><strong>"Third Party"</strong> refers to any entity, individual, or service provider other than TickerShorts that interacts with or provides services through the Platform.</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "YOUR APPROVAL",
      content: (
        <div className="space-y-2">
          <p>By engaging with the Platform, You acknowledge and agree to be bound by this Agreement through any of the following actions:</p>
          <ul className="list-disc pl-5">
            <li>Downloading and/or installing the App on Your device; or</li>
            <li>Accessing or using the Platform, including any content available on the App or Website, from any device.</li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "PROVISION OF THE PLATFORM",
      content: (
        <div className="space-y-2">
          <p>The App and the Website are designed to provide You with an in-app browsing experience through an embedded browser. The Platform aggregates and summarizes third-party content within a single interface, enabling easy access and assisting You in discovering relevant content of interest.</p>
          <p>When You access a summary of third-party content, a link to the original online source will be provided. By choosing to follow such a link, You acknowledge and agree that You are leaving the App, and We shall bear no liability for any consequences arising from Your interaction with such third-party websites.</p>
        </div>
      )
    },
    {
      id: 5,
      title: "YOUR AGREEMENT WITH TICKERSHORTS",
      content: (
        <div className="space-y-2">
          <p>A violation of any provision of this Agreement may result in legal liability for You. Nothing in this Agreement shall be construed to confer any rights or benefits upon any third party. You are solely responsible for Your conduct and activities while using the Platform.</p>
          <p>If any provision of this Agreement is found to be unenforceable under applicable law, such provision shall not affect the validity and enforceability of the remaining provisions.</p>
        </div>
      )
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg mt-14">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">TickerShorts</h1>
              <p className="text-blue-200">Financial News & Insights</p>
            </div>
            {/* <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-blue-300">Home</a></li>
                <li><a href="#" className="hover:text-blue-300">Features</a></li>
                <li><a href="#" className="hover:text-blue-300">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </nav> */}
            <button className="block md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Terms Header */}
          <div className="bg-blue-800 text-white p-6">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            {/* <p className="mt-2">Last Updated: 26 February 2025</p> */}
          </div>
          
          {/* Introduction */}
          <div className="p-6 border-b">
            <p className="text-gray-700">
              Welcome to the <strong>TickerShorts Terms of Use</strong> agreement. By accessing or using our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to these Terms in their entirety, you must refrain from using the Service and the Platform.
            </p>
          </div>
          
          {/* Table of Contents */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="text-left text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    {section.id}. {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Sections */}
          <div className="divide-y">
            {sections.map((section) => (
              <div key={section.id} className="p-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-xl font-semibold">{section.id}. {section.title}</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${activeSection === section.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {activeSection === section.id && (
                  <div className="mt-4 text-gray-700">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Additional Sections */}
          {/* <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Complete Terms</h2>
            <p className="text-gray-700">
              For the complete terms of service, please refer to the sections above or download our full Terms of Service document.
            </p>
            <button className="mt-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
              Download Full Terms (PDF)
            </button>
          </div> */}
        </div>
        
        {/* Footer */}
        {/* <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2025 TickerShorts. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-blue-700 hover:underline">Privacy Policy</a> | 
           
            <a href="#" className="text-blue-700 hover:underline ml-3">Contact Us</a>
          </p>
        </div> */}
      </main>
    </div>
  );
};

export default TermsOfService;