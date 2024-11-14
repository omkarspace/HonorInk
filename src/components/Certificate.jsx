import React from 'react';
import { format } from 'date-fns';
import { Award, Shield } from 'lucide-react';

const generateCertificateId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export default function Certificate({ 
  firstName,
  lastName,
  courseName,
  completionDate,
  courseLength,
  instructorName,
  certificateType,
  showWatermark
}) {
  const certId = generateCertificateId();
  
  const LinkedInCertificate = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-16 relative">
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-200 text-9xl font-bold rotate-[-45deg] select-none">
            LINKEDIN
          </p>
        </div>
      )}
      
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <Shield className="w-20 h-20 text-[#0077B5]" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-gray-800">Certificate of Completion</h1>
          <p className="text-gray-600">This is to certify that</p>
          <h2 className="text-3xl font-bold text-[#0077B5]">{`${firstName} ${lastName}`}</h2>
          <p className="text-gray-600">has completed {courseLength} of</p>
          <h3 className="text-2xl font-bold text-gray-800">{courseName}</h3>
          <p className="text-xl text-gray-700 mt-4">
            {completionDate && format(new Date(completionDate), 'MMMM dd, yyyy')}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500">Certificate ID: {certId}</p>
            <p className="text-sm text-gray-500 mt-2">LinkedIn Learning</p>
          </div>
        </div>
      </div>
    </div>
  );

  const UdemyCertificate = () => (
    <div className="bg-gradient-to-br from-purple-50 to-red-50 border-4 border-purple-200 p-16 relative">
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-200 text-9xl font-bold rotate-[-45deg] select-none">
            UDEMY
          </p>
        </div>
      )}
      
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <Award className="w-20 h-20 text-[#A435F0]" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-gray-800">Certificate of Completion</h1>
          <p className="text-gray-600">This is to certify that</p>
          <h2 className="text-3xl font-bold text-[#A435F0]">{`${firstName} ${lastName}`}</h2>
          <p className="text-gray-600">has successfully completed {courseLength} of</p>
          <h3 className="text-2xl font-bold text-gray-800">{courseName}</h3>
          <p className="text-gray-600">as taught by</p>
          <p className="text-xl font-semibold text-[#A435F0]">{instructorName}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="text-sm text-gray-500">Certificate ID: {certId}</p>
              <p className="text-sm text-gray-500">Udemy</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {completionDate && format(new Date(completionDate), 'MM/dd/yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-[800px] h-[600px]">
      {certificateType === 'linkedin' ? <LinkedInCertificate /> : <UdemyCertificate />}
    </div>
  );
}