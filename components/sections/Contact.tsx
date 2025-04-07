'use client';

import React, { useState, FormEvent } from 'react';
import Button from '../shared/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/subbukp', icon: '📦' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/subrahmanya-k-p-964733184/', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/subrahmanya11', icon: '🐦' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-green-600">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Let's Connect
            </h3>
            <p className="text-gray-600 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <span className="text-xl mr-4">📧</span>
                <a href="mailto:kps.18.1999@gmail.com" className="hover:text-blue-600">
                  kps.18.1999@gmail.com
                </a>
              </p>
              <p className="flex items-center text-gray-600">
                <span className="text-xl mr-4">📍</span>
                Bengaluru, India
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-blue-600 transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
