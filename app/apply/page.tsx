// app/apply/page.tsx
'use client';

import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaArrowRight, FaArrowLeft, FaSpinner, FaCheckCircle } from 'react-icons/fa';

// Define the structure for our form data
interface ApplicationData {
  // Personal Details
  fullName: string;
  dob: string;
  gender: string;
  parentName: string;
  email: string;
  phone: string;
  fullAddress: string;

  // Academic Details
  tenthBoard: string;
  tenthPercentage: string;
  twelfthBoard: string;
  twelfthPercentage: string;
  programApplyingFor: string;
}

const ApplicationFormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: '',
    dob: '',
    gender: '',
    parentName: '',
    email: '',
    phone: '',
    fullAddress: '',
    tenthBoard: '',
    tenthPercentage: '',
    twelfthBoard: '',
    twelfthPercentage: '',
    programApplyingFor: 'BBA', // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    // In a real app, you would add validation for the current step's fields here
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({ success: false, message: '' });

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    const APPLICATION_ENDPOINT = `${API_BASE_URL}/api/applications`;

    try {
      const response = await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmissionStatus({ success: true, message: result.message || 'Application submitted successfully!' });
      } else {
        setSubmissionStatus({ success: false, message: result.message || 'An error occurred. Please try again.' });
      }
    } catch (error) {
        console.error('Form submission failed with a network error:', error);
      setSubmissionStatus({ success: false, message: 'A network error occurred. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common styles for input fields
  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <main className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg">

          <div className="text-center border-b pb-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">College Application Form</h1>
            <p className="mt-2 text-slate-500">Please fill out the details carefully.</p>
          </div>

          {submissionStatus.success ? (
            <div className="text-center py-10">
              <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-green-700">Submission Successful!</h2>
              <p className="mt-2 text-gray-600">{submissionStatus.message}</p>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-sky-600' : 'text-slate-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-400'}`}><FaUser /></div>
                  <span className={`ml-2 font-semibold ${currentStep >= 1 ? 'text-slate-700' : 'text-slate-500'}`}>Personal Details</span>
                </div>
                <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-sky-600' : 'bg-slate-300'}`}></div>
                <div className={`flex items-center ${currentStep >= 2 ? 'text-sky-600' : 'text-slate-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-400'}`}><FaGraduationCap /></div>
                  <span className={`ml-2 font-semibold ${currentStep >= 2 ? 'text-slate-700' : 'text-slate-500'}`}>Academic Details</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* --- THIS IS STEP 1 - PERSONAL DETAILS --- */}
                {/* It is shown when currentStep is 1 */}
                <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className={labelClass}>Full Name</label>
                      <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="dob" className={labelClass}>Date of Birth</label>
                      <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="gender" className={labelClass}>Gender</label>
                      <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange} className={inputClass} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="parentName" className={labelClass}>Parent&apos;s/Guardian&apos;s Name</label>
                      <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number</label>
                      <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="fullAddress" className={labelClass}>Full Address</label>
                      <textarea name="fullAddress" id="fullAddress" rows={3} value={formData.fullAddress} onChange={handleInputChange} className={inputClass} required></textarea>
                    </div>
                  </div>
                </div>

                {/* --- THIS IS STEP 2 - ACADEMIC DETAILS --- */}
                {/* It is shown when currentStep is 2 */}
                <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="tenthBoard" className={labelClass}>10th / Secondary Board</label>
                      <input type="text" name="tenthBoard" id="tenthBoard" value={formData.tenthBoard} onChange={handleInputChange} className={inputClass} placeholder="e.g., CBSE, ICSE, State Board" required />
                    </div>
                    <div>
                      <label htmlFor="tenthPercentage" className={labelClass}>Percentage/CGPA in 10th</label>
                      <input type="text" name="tenthPercentage" id="tenthPercentage" value={formData.tenthPercentage} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="twelfthBoard" className={labelClass}>12th / Sr. Secondary Board</label>
                      <input type="text" name="twelfthBoard" id="twelfthBoard" value={formData.twelfthBoard} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div>
                      <label htmlFor="twelfthPercentage" className={labelClass}>Percentage in 12th</label>
                      <input type="text" name="twelfthPercentage" id="twelfthPercentage" value={formData.twelfthPercentage} onChange={handleInputChange} className={inputClass} required />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="programApplyingFor" className={labelClass}>Program Applying For</label>
                      <select name="programApplyingFor" id="programApplyingFor" value={formData.programApplyingFor} onChange={handleInputChange} className={inputClass} required>
                        <option value="BBA">Bachelor of Business Administration (BBA)</option>
                        <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                        <option value="BA">Bachelor of Arts (BA)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submission Error Message */}
                {submissionStatus.message && !submissionStatus.success && (
                  <div className="mt-4 text-center p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {submissionStatus.message}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-5 border-t flex justify-between items-center">
                  {currentStep > 1 ? (
                    <button type="button" onClick={prevStep} disabled={isSubmitting} className="inline-flex items-center bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                      <FaArrowLeft className="mr-2 h-4 w-4"/> Previous
                    </button>
                  ) : (
                    <div></div> // Empty div to keep "Next" button on the right
                  )}

                  {currentStep < 2 ? (
                    <button type="button" onClick={nextStep} className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Next <FaArrowRight className="ml-2 h-4 w-4"/>
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                      {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : null}
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ApplicationFormPage;