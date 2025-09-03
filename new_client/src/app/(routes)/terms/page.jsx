import React from 'react';

const Page = () => {
    return (
        <main className="flex flex-col bg-black mt-20">
            <div className="flex-1 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                    
                    <div className="space-y-8">
                        {/* Introduction */}
                        <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl p-8 space-y-6">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    Welcome to our platform. By accessing or using our services, you agree to be bound by these Terms of Service. 
                                    If you disagree with any part of these terms, you may not access or use our services.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">2. Definitions</h2>
                                <ul className="list-disc list-inside space-y-2 text-neutral-300 pl-4">
                                    <li>"Service" refers to our platform and all related services</li>
                                    <li>"User" refers to any individual or entity using our Service</li>
                                    <li>"Content" refers to all materials and information shared on our platform</li>
                                    <li>"Account" refers to the user's registered profile on our platform</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">3. User Accounts</h2>
                                <div className="space-y-4 text-neutral-300">
                                    <p className="leading-relaxed">
                                        When creating an account on our platform, you must provide accurate and complete information.
                                        You are responsible for maintaining the security of your account credentials.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 pl-4">
                                        <li>You must be at least 18 years old to create an account</li>
                                        <li>You are responsible for all activities under your account</li>
                                        <li>You must notify us immediately of any security breaches</li>
                                        <li>We reserve the right to terminate accounts at our discretion</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">4. Intellectual Property</h2>
                                <div className="space-y-4 text-neutral-300">
                                    <p className="leading-relaxed">
                                        All content on our platform, including but not limited to text, graphics, logos, and software,
                                        is our property or the property of our licensors and is protected by intellectual property laws.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 pl-4">
                                        <li>Users may not copy, modify, or distribute our content without permission</li>
                                        <li>Users retain ownership of their own content</li>
                                        <li>By posting content, users grant us a license to use their content</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">5. User Conduct</h2>
                                <div className="space-y-4 text-neutral-300">
                                    <p className="leading-relaxed">Users agree not to:</p>
                                    <ul className="list-disc list-inside space-y-2 pl-4">
                                        <li>Violate any applicable laws or regulations</li>
                                        <li>Impersonate others or provide false information</li>
                                        <li>Harass, abuse, or harm other users</li>
                                        <li>Distribute malware or harmful code</li>
                                        <li>Attempt to gain unauthorized access to our systems</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">6. Payment Terms</h2>
                                <div className="space-y-4 text-neutral-300">
                                    <p className="leading-relaxed">
                                        Some features of our Service may require payment. By choosing a paid service, you agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 pl-4">
                                        <li>Provide accurate billing information</li>
                                        <li>Pay all charges at the prices in effect</li>
                                        <li>Pay applicable taxes</li>
                                        <li>Maintain valid payment information</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">7. Limitation of Liability</h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    Our service is provided "as is" without warranties of any kind. We are not liable for any damages
                                    arising from your use of our service. This includes but is not limited to direct, indirect,
                                    incidental, consequential, and punitive damages.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">8. Changes to Terms</h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    We reserve the right to modify these terms at any time. We will notify users of any material
                                    changes. Continued use of our service after changes constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold text-white">9. Contact Information</h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    For questions about these Terms of Service, please contact us at:
                                    <br />
                                    Email: support@example.com
                                    <br />
                                    Address: 123 Example Street, City, Country
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;