import React from 'react';

const Page = () => {
  return (
    <main className="flex flex-col bg-black mt-20">
      <div className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl p-8 space-y-6">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                <p className="text-neutral-300 leading-relaxed">
                  We are committed to protecting your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our service.
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                  please do not access the service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
                <div className="space-y-4 text-neutral-300">
                  <h3 className="text-lg font-medium text-white">2.1 Personal Data</h3>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Name and contact information</li>
                    <li>Email address and password</li>
                    <li>Profile information and preferences</li>
                    <li>Payment and billing information</li>
                    <li>Communication history with us</li>
                  </ul>

                  <h3 className="text-lg font-medium text-white mt-6">2.2 Usage Data</h3>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>IP address and browser type</li>
                    <li>Device information and settings</li>
                    <li>Pages viewed and links clicked</li>
                    <li>Time spent on platform</li>
                    <li>Error logs and performance data</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
                <div className="space-y-4 text-neutral-300">
                  <p className="leading-relaxed">We use the collected information for various purposes:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information</li>
                    <li>To detect, prevent and address technical issues</li>
                    <li>To fulfill any other purpose for which you provide it</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">4. Data Protection</h2>
                <div className="space-y-4 text-neutral-300">
                  <p className="leading-relaxed">
                    We implement robust security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Encryption of sensitive data</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Secure data storage systems</li>
                    <li>Regular security updates and patches</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">5. Data Sharing and Disclosure</h2>
                <div className="space-y-4 text-neutral-300">
                  <p className="leading-relaxed">We may share your information with:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Service providers and business partners</li>
                    <li>Law enforcement when required by law</li>
                    <li>Other users with your consent</li>
                    <li>Analytics and tracking providers</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">6. Cookies and Tracking</h2>
                <div className="space-y-4 text-neutral-300">
                  <p className="leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our Service and
                    hold certain information. Cookies are files with small amount of data which may include
                    an anonymous unique identifier.
                  </p>
                  <p className="leading-relaxed">
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                    sent. However, if you do not accept cookies, you may not be able to use some portions of
                    our Service.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">7. Your Data Rights</h2>
                <div className="space-y-4 text-neutral-300">
                  <p className="leading-relaxed">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to data processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">8. Children's Privacy</h2>
                <p className="text-neutral-300 leading-relaxed">
                  Our Service does not address anyone under the age of 18. We do not knowingly collect
                  personally identifiable information from anyone under the age of 18. If you are a parent
                  or guardian and you are aware that your child has provided us with personal data, please
                  contact us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">9. Changes to Privacy Policy</h2>
                <p className="text-neutral-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date.
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">10. Contact Us</h2>
                <div className="text-neutral-300 leading-relaxed">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <p className="mt-4">
                    Email: privacy@example.com<br />
                    Phone: +1 (234) 567-8900<br />
                    Address: 123 Privacy Street, Security City, 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;