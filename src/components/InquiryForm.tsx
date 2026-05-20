// src/components/InquiryForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';

interface InquiryFormProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: Errors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d\s-()]{7,20}$/;

    if (!formData.name.trim()) { tempErrors.name = 'Full name is required.'; isValid = false; }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) { tempErrors.email = 'Please enter a valid email address.'; isValid = false; }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) { tempErrors.phone = 'Please enter a valid phone number.'; isValid = false; }
    if (!formData.subject.trim()) { tempErrors.subject = 'Subject is required.'; isValid = false; }
    if (!formData.message.trim()) { tempErrors.message = 'Message cannot be empty.'; isValid = false; }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;

      if (!webhookUrl) {
        console.log('Testing Mode: Captured Inquiry Form Data:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        if (onSuccess) setTimeout(onSuccess, 3000);
        setIsSubmitting(false);
        return;
      }

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Bypasses CORS for Google Apps Script
        headers: {
          'Content-Type': 'text/plain', // Prevents preflight request
        },
        body: JSON.stringify(formData),
      });

      // With no-cors, response is opaque. We assume success if fetch doesn't throw.
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      if (onSuccess) setTimeout(onSuccess, 3000);

    } catch (error: unknown) {
      console.error('Inquiry Form Submission Error:', error);
      setApiError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "block w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";
  const inputSizeClass = "text-xs px-2 py-1.5 sm:text-sm sm:px-2.5 sm:py-1.5";
  const labelClass = "block text-xs font-medium text-slate-700 mb-0.5 sm:text-sm sm:mb-1";
  const errorTextClass = "text-red-500 text-xs mt-0.5";

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-4xl mb-4">✅</div>
        <h2 className="text-lg font-bold text-indigo-700 mb-2">Inquiry Submitted!</h2>
        <p className="text-slate-600 text-sm">Thank you for reaching out. Our administration office will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-1.5 sm:mb-2 md:mb-3">
        <div className="relative mx-auto h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full overflow-hidden mb-0.5 sm:mb-1 shadow-sm">
          <Image
            src="/images/logo.png"
            alt="Uday Pratap College Logo"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-indigo-700">Uday Pratap College</h2>
        <p className="text-slate-600 mt-0.5 text-xs sm:text-sm">Inquiry Form</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2 md:space-y-3">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
            className={`${inputBaseClass} ${inputSizeClass} ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="e.g., John Doe" required />
          {errors.name && <p className={errorTextClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
            className={`${inputBaseClass} ${inputSizeClass} ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="you@example.com" required />
          {errors.email && <p className={errorTextClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number (Optional)</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange}
            className={`${inputBaseClass} ${inputSizeClass} ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="+91 XXXXX XXXXX" />
          {errors.phone && <p className={errorTextClass}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>Subject <span className="text-red-500">*</span></label>
          <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
            className={`${inputBaseClass} ${inputSizeClass} ${errors.subject ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="e.g., Admission Inquiry" required />
          {errors.subject && <p className={errorTextClass}>{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>Your Message <span className="text-red-500">*</span></label>
          <textarea name="message" id="message" rows={3} value={formData.message} onChange={handleChange}
            className={`${inputBaseClass} ${inputSizeClass} ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
            placeholder="Please type your inquiry here..." required />
          {errors.message && <p className={errorTextClass}>{errors.message}</p>}
        </div>
        {apiError && (
          <div className="p-3 bg-red-50 text-red-700 text-xs sm:text-sm rounded-md border border-red-200">
            {apiError}
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition duration-150 ease-in-out text-xs sm:text-sm ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}>
            {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
          </button>
        </div>
      </form>
    </>
  );
};

export default InquiryForm;