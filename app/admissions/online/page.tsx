'use client';

import React, { useState } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa';

interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

const OnlineAdmission: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      motherName: '',
      guardianPhone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    academicInfo: {
      program: '',
      specialization: '',
      previousQualification: '',
      previousInstitute: '',
      previousPercentage: '',
      entranceExamScore: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const steps: ApplicationStep[] = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Fill your basic personal details',
      completed: currentStep > 1,
      active: currentStep === 1
    },
    {
      id: 2,
      title: 'Academic Information',
      description: 'Enter your academic qualifications',
      completed: currentStep > 2,
      active: currentStep === 2
    },
    {
      id: 3,
      title: 'Review & Submit',
      description: 'Review and submit your application',
      completed: currentStep > 3,
      active: currentStep === 3
    }
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setApiError(null);

    const combinedPayload = {
      // Basic Info
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      email: formData.personalInfo.email,
      phone: formData.personalInfo.phone,
      subject: `Admission Application: ${formData.academicInfo.program}`,

      // Expanded Info (for the new columns)
      program: formData.academicInfo.program,
      dob: formData.personalInfo.dateOfBirth,
      gender: formData.personalInfo.gender,
      fatherName: formData.personalInfo.fatherName,
      motherName: formData.personalInfo.motherName,
      address: formData.personalInfo.address,
      prevQualification: formData.academicInfo.previousQualification,
      prevInstitute: formData.academicInfo.previousInstitute,
      prevPercentage: formData.academicInfo.previousPercentage,
      entranceScore: formData.academicInfo.entranceExamScore || 'N/A'
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setSubmitSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <FaCheck className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying to Uday Pratap College. Your application details have been saved, and our admission counseling team will contact you shortly.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
          <select
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Father&apos;s Name *</label>
          <input
            type="text"
            value={formData.personalInfo.fatherName}
            onChange={(e) => handleInputChange('personalInfo', 'fatherName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mother&apos;s Name *</label>
          <input
            type="text"
            value={formData.personalInfo.motherName}
            onChange={(e) => handleInputChange('personalInfo', 'motherName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <textarea
          value={formData.personalInfo.address}
          onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program *</label>
          <select
            value={formData.academicInfo.program}
            onChange={(e) => handleInputChange('academicInfo', 'program', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Program</option>
            <option value="ba">Bachelor of Arts (BA)</option>
            <option value="bba">Bachelor of Business Administration (BBA)</option>
            <option value="bca">Bachelor of Computer Applications (BCA)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <input
            type="text"
            value={formData.academicInfo.specialization}
            onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Qualification *</label>
          <select
            value={formData.academicInfo.previousQualification}
            onChange={(e) => handleInputChange('academicInfo', 'previousQualification', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Qualification</option>
            <option value="12th">12th Standard</option>
            <option value="diploma">Diploma</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Institute *</label>
          <input
            type="text"
            value={formData.academicInfo.previousInstitute}
            onChange={(e) => handleInputChange('academicInfo', 'previousInstitute', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Percentage/CGPA *</label>
          <input
            type="text"
            value={formData.academicInfo.previousPercentage}
            onChange={(e) => handleInputChange('academicInfo', 'previousPercentage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Exam Score</label>
          <input
            type="text"
            value={formData.academicInfo.entranceExamScore}
            onChange={(e) => handleInputChange('academicInfo', 'entranceExamScore', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );



  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Review Your Application</h3>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {formData.personalInfo.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {formData.personalInfo.phone}
          </div>
          <div>
            <span className="font-medium">Date of Birth:</span> {formData.personalInfo.dateOfBirth}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Academic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Program:</span> {formData.academicInfo.program}
          </div>
          <div>
            <span className="font-medium">Previous Qualification:</span> {formData.academicInfo.previousQualification}
          </div>
          <div>
            <span className="font-medium">Previous Institute:</span> {formData.academicInfo.previousInstitute}
          </div>
          <div>
            <span className="font-medium">Percentage/CGPA:</span> {formData.academicInfo.previousPercentage}
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Admission Application</h1>
            <p className="text-gray-600">Complete your application in 3 simple steps</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.completed
                    ? 'bg-green-600 border-green-600 text-white'
                    : step.active
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                    }`}>
                    {step.completed ? <FaCheck /> : step.id}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${step.active ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${step.completed ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderAcademicInfo()}
            {currentStep === 3 && renderReview()}

            {apiError && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                {apiError}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitApplication}
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-6 py-2 text-white rounded-lg ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                  {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineAdmission;
