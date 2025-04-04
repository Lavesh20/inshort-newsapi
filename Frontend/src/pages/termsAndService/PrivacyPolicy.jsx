import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };
  
  const sections = [
    {
      id: 1,
      title: "INFORMATION WE COLLECT",
      content: (
        <div className="space-y-4">
          <p>We collect both <strong>Personal Information</strong> and <strong>Non-Personal Information</strong> to enhance and provide our services effectively.</p>
          
          <h4 className="font-semibold text-lg mt-4">1. Non-Personal Information</h4>
          <p>Non-Personal Information refers to data that does not personally identify you. This includes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Anonymous usage data</li>
            <li>General demographic information</li>
            <li>Referring/exit pages and URLs</li>
            <li>Platform types</li>
            <li>User preferences (both submitted and generated based on usage patterns)</li>
            <li>Number of clicks</li>
            <li>Other analytical data that does not personally identify you</li>
          </ul>
          
          <h4 className="font-semibold text-lg mt-4">2. Personal Information</h4>
          <p>Personal Information refers to data that can identify you and may include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email address (submitted during registration)</li>
            <li>Location data</li>
            <li>Mobile number</li>
            <li>Any additional details required for account setup and service access</li>
          </ul>
          
          <h4 className="font-semibold text-lg mt-4">A. Information Collected via Technology</h4>
          <p>To activate the Service or use the platform you do not need to submit any Personal Information other than your <em>email address</em>. To use the Service thereafter, you do need to submit further Personal Information, which may include: <em>location, mobile number, etc</em>.</p>
          
          <h4 className="font-semibold mt-4">Use of Cookies</h4>
          <p>We track this information using cookies, or small text files which include an anonymous unique identifier. Cookies are sent to a user's browser from our servers and are stored on the user's computer hard drive.</p>
          
          <p>We use the following types of cookies:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> These cookies are essential for the basic functionalities offered by the Service.</li>
            <li><strong>Insight Cookies:</strong> These are used for tracking the user activities within the Service, which in turn helps us in improving your user experience.</li>
            <li><strong>Marketing Cookies:</strong> We also use some marketing cookies provided by third parties to collect and analyse various information about the visitors.</li>
          </ul>
          
          <h4 className="font-semibold text-lg mt-4">B. Information you provide us by registering for an account</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>New User Registration:</strong> To become a subscriber to the Service you will need to create a personal profile by registering and entering your email address, and creating a user name and a password.</li>
            <li><strong>Social Login & Third-Party Services:</strong> Registration can be done by supplying a unique email address and password, or by linking your Google accounts.</li>
            <li><strong>Contact With Our Call Centers:</strong> We collect personal information from you in non-digital contexts, including when you reach us over the phone or contact customer service.</li>
          </ul>
          
          <h4 className="font-semibold text-lg mt-4">C. Information from Other Sources</h4>
          <p>We may use publicly available databases, including privately-held marketing and data analytics resources. For example, we may receive demographic information (age, gender, household income, job industry and job title) from these sources.</p>
          
          <h4 className="font-semibold text-lg mt-4">D. Children's Privacy</h4>
          <p>The Platform and the Service are not directed to anyone <em>under the age of 13</em>. If we learn that we have gathered personal information from anyone under the age of 13 without the consent of a parent or guardian, we will delete that information as soon as possible.</p>
        </div>
      )
    },
    {
      id: 2,
      title: "THIRD-PARTY LINKS AND SERVICES",
      content: (
        <div className="space-y-4">
          <p>Our Platform may contain links to third-party websites or applications. The inclusion or exclusion of such links does not constitute an endorsement by <strong>TickerShorts</strong> of the third-party website, its provider, or the information and content available on such websites.</p>
          
          <p>You acknowledge and understand that the privacy practices and policies of these third-party websites are beyond our control. <strong>TickerShorts</strong> does not make any representations or warranties regarding:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The privacy practices or policies of third parties</li>
            <li>The terms of use of such websites</li>
            <li>The accuracy, integrity, or quality of any information, data, software, media, or other materials available on these websites</li>
          </ul>
          
          <p>Once you leave our Platform, any data you provide or interactions you have with third-party services shall be governed by their respective privacy policies. We strongly encourage you to review the privacy policies of each third-party website before engaging with their services.</p>
          
          <p><strong>TickerShorts</strong> shall not be liable for any loss, damage, or data misuse arising from your interaction with third-party websites or applications.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "HOW WE USE AND SHARE INFORMATION",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Use of Personal Information</h4>
          <p>Except as expressly stated in this Privacy Policy, <strong>TickerShorts</strong> does not sell, trade, rent, or otherwise share your Personal Information with third parties for marketing purposes without your consent. However, we may share Personal Information with third-party service providers engaged by <strong>TickerShorts</strong> to perform services on our behalf.</p>
          
          <p>Personal Information collected from users is primarily utilized to facilitate communication with users, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding to inquiries</li>
            <li>Soliciting feedback</li>
            <li>Providing technical support</li>
            <li>Informing users about promotional offers</li>
          </ul>
          
          <p>We may also share Personal Information with third parties if we have a <strong>good-faith belief</strong> that such access, use, preservation, or disclosure is reasonably necessary to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Comply with applicable legal processes, court orders, or enforceable governmental requests</li>
            <li>Enforce our <strong>Terms of Service</strong>, including the investigation of potential violations</li>
            <li>Address security, fraud prevention, or technical issues</li>
            <li>Protect the rights, property, or safety of <strong>TickerShorts</strong>, its users, or the public, as required or permitted by law</li>
          </ul>
          
          <h4 className="font-semibold text-lg mt-4">Use of Non-Personal Information</h4>
          <p>Non-Personal Information is utilized to enhance the <strong>TickerShorts</strong> platform, improve service offerings, and personalize the user experience. We may aggregate Non-Personal Information to analyze usage patterns, track trends, and optimize platform functionality.</p>
          
          <p>In the event of a <strong>merger, acquisition, corporate restructuring, or sale of assets</strong>, your Personal Information may be transferred as part of the transaction.</p>
          
          <h4 className="font-semibold text-lg mt-4">Use of Analytics</h4>
          <p><strong>TickerShorts</strong> may share collected data with third-party analytics providers to generate insights, detect fraudulent activities (including spam), and improve service delivery. All such data-sharing activities comply with applicable industry standards, including the <strong>General Data Protection Regulation (GDPR)</strong> and other relevant data protection laws.</p>
        </div>
      )
    },
    {
      id: 4,
      title: "DISCLOSURE OF PERSONAL INFORMATION",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>We do not disclose your Personal Information to any third parties except for TickerShorts' affiliates, third-party service providers, or other trusted business partners, including those located outside India, who process such information under a lawful contract and in compliance with this Privacy Policy, along with appropriate confidentiality and security measures.</li>
            <li>We do not rent or sell any user information to third parties.</li>
            <li>In the event of a merger, reorganization, acquisition, joint venture, assignment, spin-off, transfer, asset sale, or any other disposition of all or a portion of our business, including in connection with bankruptcy or similar proceedings, we may transfer your Personal Information to the relevant third party.</li>
            <li>Except as otherwise stated in this Privacy Policy, we will maintain the confidentiality of your Personal Information and will not disclose it to third parties unless we believe in good faith that such disclosure is necessary to:
              <ul className="list-disc pl-5 mt-2">
                <li>Comply with a court order, legal obligation, or other enforceable governmental request</li>
                <li>Protect the rights, property, or safety of TickerShorts, its users, or any other party</li>
                <li>Enforce the Privacy Policy, including our Terms of Service</li>
                <li>Respond to claims that any user-generated content violates the rights of third parties</li>
              </ul>
            </li>
            <li>By agreeing to this Privacy Policy, you consent to the sharing of your Personal Information with third parties, including those located outside India, for the purposes outlined herein and as permitted under this Privacy Policy.</li>
          </ol>
        </div>
      )
    },
    {
      id: 5,
      title: "SECURITY AND PROTECTION OF INFORMATION",
      content: (
        <div className="space-y-4">
          <p>We are committed to protecting your Personal Information and implement appropriate security measures to prevent unauthorized access, alteration, disclosure, misuse, or destruction of the data we collect and store. These security measures include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Encryption</li>
            <li>Firewalls</li>
            <li>Secure Socket Layer (SSL) technology</li>
            <li>Other commercially reasonable physical, managerial, operational, and technical safeguards as required under applicable laws</li>
          </ul>
          
          <p>Your account is secured by a password, and we urge you to take precautions to protect your Personal Information by keeping your password confidential and logging out of your account after each session. We strongly advise against sharing your password with any third party.</p>
          
          <p>Despite our best efforts to maintain a secure operating environment, no method of transmission over the internet or other networks is entirely secure. While we strive to safeguard your data, we cannot guarantee absolute security.</p>
          
          <p>By using our services, you acknowledge and accept the inherent security risks associated with online data transmission and agree to assume these risks.</p>
        </div>
      )
    },
    {
      id: 6,
      title: "DATA RETENTION POLICY",
      content: (
        <div className="space-y-4">
          <p>We will retain your information for as long as your account is active or as needed by us to provide you services. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
        </div>
      )
    },
    {
      id: 7,
      title: "YOUR RIGHTS REGARDING PERSONAL INFORMATION",
      content: (
        <div className="space-y-4">
          <p>You have the right to review, update, and correct any inaccuracies in your Personal Information held by us. If you wish to make any corrections, you may contact us at <strong>grievances@tickershorts.com</strong></p>
          
          <p>You may also request that we cease using your Personal Information or delete your existing data by writing to us at the same email address. However, please note that if you refuse to provide certain information or withdraw your consent for processing previously shared information, we reserve the right to restrict or deny access to our services where such information is deemed necessary for their provision.</p>
          
          <p>Additionally, you have the right to opt out of receiving marketing communications from us at any time. Please be aware that even if you opt out of marketing communications, we may continue to send you account-related or administrative emails, including updates to our Privacy Policy and other essential service-related notifications.</p>
        </div>
      )
    },
    {
      id: 8,
      title: "LINKS TO OTHER WEBSITES",
      content: (
        <div className="space-y-4">
          <p>As part of the Service, we may provide links to or compatibility with other websites or applications. However, we are not responsible for the privacy practices employed by those websites or the information or content they contain. This Privacy Policy applies solely to information collected by us through the Platform and the Service.</p>
          
          <p>Therefore, this Privacy Policy does not apply to your use of a third party website accessed by selecting a link on our Site or via our Service. To the extent that you access or use the Service through or on another website or application, then the privacy policy of that other website or application will apply to your access or use of that site or application.</p>
          
          <p>We encourage our users to read the privacy statements of other websites before proceeding to use them.</p>
        </div>
      )
    },
    {
      id: 9,
      title: "RESTRICTION OF LIABILITY",
      content: (
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>TickerShorts makes no representations, warranties, or guarantees regarding the accuracy, completeness, or adequacy of the content available through the Platform and expressly disclaims liability for any errors or omissions therein.</li>
            <li>The content provided on the Platform is made available on an "as is" basis without any express or implied warranties of any kind, including but not limited to warranties of non-infringement of third-party rights, title, merchantability, fitness for a particular purpose, or freedom from computer viruses.</li>
            <li>Any references made within the App to specific commercial products, services, trade names, firms, or corporations are solely for informational and convenience purposes. Such references do not constitute an endorsement, recommendation, or sponsorship by TickerShorts.</li>
          </ol>
          
          <p>For any concerns or queries, you may contact <strong>Mr. Raghav Gupta, Grievance Officer</strong>, at <strong>grievances@tickershorts.com</strong> and we will make reasonable efforts to address your concerns.</p>
        </div>
      )
    },
    {
      id: 10,
      title: "CHANGES TO OUR PRIVACY POLICY",
      content: (
        <div className="space-y-4">
          <p>TickerShorts reserves the right to change this policy and our Terms of Service at any time. We will notify you of significant changes to our Privacy Policy by sending a notice to the primary email address specified in your account or by placing a prominent notice on our Platform.</p>
          
          <p>Significant changes will go into effect immediately or within 2-3 business days following such notification. Non-material changes or clarifications will take effect immediately. You should periodically check the Site and this privacy page for updates.</p>
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
          {/* Privacy Policy Header */}
          <div className="bg-blue-800 text-white p-6">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            {/* <p className="mt-2">Last Updated: 26 February 2025</p> */}
          </div>
          
          {/* Introduction */}
          <div className="p-6 border-b">
            <p className="text-gray-700">
              TickerShorts is committed to safeguarding the privacy of its users and maintaining robust data protection standards. This <strong>Privacy Policy</strong> ("Policy") outlines how we collect, use, store, and protect the information you provide to us, enabling you to make informed decisions while using our Platform and Services.
            </p>
            
            <p className="mt-4 text-gray-700">
              For the purposes of this Policy:
            </p>
            
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
              <li><strong>"Platform"</strong> refers collectively to the <strong>TickerShorts App and Website</strong>, including all features, content, and services provided therein.</li>
              <li><strong>"Service"</strong> refers to the stock market news and related services offered by <strong>TickerShorts</strong>, accessible via the App or Website.</li>
              <li><strong>"Company," "we," "us,"</strong> or <strong>"our"</strong> refers to <strong>Kredent InfoEdge Private Limited</strong>, the entity operating TickerShorts.</li>
              <li><strong>"You"</strong> refers to the user accessing or utilizing our Platform or Services.</li>
            </ul>
            
            <p className="mt-4 text-gray-700">
              By accessing or using our Platform or Services, you acknowledge that you have read, understood, and agreed to this Privacy Policy, along with our <strong>Terms of Use</strong>. You further consent to our collection, storage, use, and disclosure of your Personal Information as described herein.
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
          
          {/* Additional Information */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions or concerns about this Privacy Policy or your data, please contact our Grievance Officer at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p><strong>Grievance Officer:</strong> Mr. Raghav Gupta</p>
              <p><strong>Email:</strong> grievances@tickershorts.com</p>
            </div>
            {/* <div className="mt-6">
              <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded">
                Download Privacy Policy (PDF)
              </button>
            </div> */}
          </div>
        </div>
        
        {/* Footer */}
        {/* <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2025 TickerShorts. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-blue-700 hover:underline">Terms of Service</a> | 
            <a href="#" className="text-blue-700 hover:underline ml-3">Cookie Policy</a> | 
            <a href="#" className="text-blue-700 hover:underline ml-3">Contact Us</a>
          </p>
        </div> */}
      </main>
    </div>
  );
};

export default PrivacyPolicy;