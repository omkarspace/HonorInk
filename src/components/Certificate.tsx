import React from 'react';
import { format } from 'date-fns';
import { Award } from 'lucide-react';

interface CertificateProps {
  participantName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  template: string;
}

export default function Certificate({ 
  participantName, 
  courseName, 
  completionDate, 
  instructorName,
  template 
}: CertificateProps) {
  const getTemplateStyles = () => {
    switch (template) {
      case 'classic':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-double border-8 border-amber-900';
      case 'minimal':
        return 'bg-white border-2 border-gray-200';
      default: // modern
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200';
    }
  };

  return (
    <div className={`w-[800px] h-[600px] p-16 mx-auto ${getTemplateStyles()} relative`}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-gray-800 opacity-20" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-gray-800 opacity-20" />
      </div>
      
      <div className="text-center space-y-8">
        <div className="flex justify-center mb-8">
          <Award className="w-16 h-16 text-blue-600" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-gray-800">Certificate of Completion</h1>
          <p className="text-gray-600">This is to certify that</p>
          <h2 className="text-3xl font-bold text-gray-900 my-4">{participantName}</h2>
          <p className="text-gray-600">has successfully completed the course</p>
          <h3 className="text-2xl font-bold text-blue-600 my-4">{courseName}</h3>
          <p className="text-gray-600">on</p>
          <p className="text-xl text-gray-800">
            {completionDate && format(new Date(completionDate), 'MMMM dd, yyyy')}
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-center items-end space-x-16">
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-400 mb-2"></div>
              <p className="text-gray-600">Course Instructor</p>
              <p className="font-bold text-gray-800">{instructorName}</p>
            </div>
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-400 mb-2"></div>
              <p className="text-gray-600">Date Issued</p>
              <p className="font-bold text-gray-800">
                {completionDate && format(new Date(completionDate), 'MM/dd/yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}