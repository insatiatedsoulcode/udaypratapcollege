// components/InquiryForm.tsx
'use client'; // This component uses client-side hooks (useState)

import React, { useState, FormEvent } from 'react';
// import collegeLogo from '/images/logo.png'; // If using next/image and logo is in public/images

interface InquiryFormProps {
  onSuccess?: () => void; // Optional callback for successful submission
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submissionStatus.submitted) {
      setSubmissionStatus({ submitted: false, message: '', type: '' });
    }
  };

  const validateForm = (): boolean => {
    let tempErrors: Errors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d\s-()]{7,20}$/;

    if (!formData.name.trim()) {
      tempErrors.name = 'Full name is required.';
      isValid = false;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid phone number.';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Message cannot be empty.';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionStatus({ submitted: false, message: '', type: '' });

    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});

      const dataToSend = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; // Use NEXT_PUBLIC_ for client-side env vars
      const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/send-enquiry`;

      try {
        const response = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setSubmissionStatus({
              submitted: true,
              message: result.message || 'Inquiry submitted successfully!',
              type: 'success'
            });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            if (onSuccess) setTimeout(onSuccess, 2500);
          } else {
            setSubmissionStatus({ submitted: true, message: result.message || 'Submission failed.', type: 'error' });
            if (result.errors) setErrors(prev => ({ ...prev, ...result.errors }));
          }
        } else {
          let errorMsg = `Server error: ${response.status}.`;
          try { const errData = await response.json(); errorMsg = errData.message || errorMsg; if (errData.errors) setErrors(errData.errors); } catch (_) { /* no json body */ }
          setSubmissionStatus({ submitted: true, message: errorMsg, type: 'error' });
        }
      } catch (networkError) {
        console.error('Network error:', networkError);
        setSubmissionStatus({ submitted: true, message: 'Network error. Please try again.', type: 'error' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSubmissionStatus({ submitted: true, message: 'Please correct form errors.', type: 'error' });
    }
  };

  const inputBaseClass = "block w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";
  const inputTextSizeAndPadding = "text-xs px-2 py-1.5 sm:text-sm sm:px-2.5 sm:py-1.5";
  const labelClass = "block text-xs font-medium text-slate-700 mb-0.5 sm:text-sm sm:mb-1";
  const errorTextClass = "text-red-500 text-xs mt-0.5";

  return (
    <>
      <div className={`text-center mb-1.5 sm:mb-2 md:mb-3 ${isSubmitting ? 'opacity-50' : ''}`}>
        <img
          src="/images/logo.png" // Assuming logo.png is in public/images/
          alt="Uday Pratap College Logo"
          className="mx-auto h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full mb-0.5 sm:mb-1 object-cover shadow-sm"
        />
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-indigo-700">
          Uday Pratap College
        </h1>
        <p className="text-slate-600 mt-0.5 text-xs sm:text-sm">
          Inquiry Form
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-1.5 sm:space-y-2 md:space-y-3 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
        <div>
          <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                 className={`${inputBaseClass} ${inputTextSizeAndPadding} ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                 placeholder="e.g., John Doe" disabled={isSubmitting} required />
          {errors.name && <p className={errorTextClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                 className={`${inputBaseClass} ${inputTextSizeAndPadding} ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                 placeholder="you@example.com" disabled={isSubmitting} required />
          {errors.email && <p className={errorTextClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number (Optional)</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange}
                 className={`${inputBaseClass} ${inputTextSizeAndPadding} ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                 placeholder="+91 XXXXX XXXXX" disabled={isSubmitting} />
          {errors.phone && <p className={errorTextClass}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>Subject <span className="text-red-500">*</span></label>
          <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
                 className={`${inputBaseClass} ${inputTextSizeAndPadding} ${errors.subject ? 'border-red-500' : 'border-slate-300'}`}
                 placeholder="e.g., Admission Inquiry" disabled={isSubmitting} required />
          {errors.subject && <p className={errorTextClass}>{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>Your Message <span className="text-red-500">*</span></label>
          <textarea name="message" id="message" rows={2} value={formData.message} onChange={handleChange}
                    className={`${inputBaseClass} ${inputTextSizeAndPadding} ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder="Please type your inquiry here..." disabled={isSubmitting} required />
          {errors.message && <p className={errorTextClass}>{errors.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}
                  className={`w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out text-xs sm:text-sm ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}>
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </div>
      </form>

      {submissionStatus.submitted && submissionStatus.message && (
        <div className={`mt-2 sm:mt-3 p-1.5 sm:p-2 rounded-md font-medium text-xs text-center ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
          {submissionStatus.message}
        </div>
      )}
    </>
  );
};

export default InquiryForm;
