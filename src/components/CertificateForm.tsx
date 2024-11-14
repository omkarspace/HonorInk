import React from 'react';
import { Calendar, User, BookOpen, GraduationCap, Upload } from 'lucide-react';

interface FormData {
  participantName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  template: string;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function CertificateForm({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Certificate Details</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Participant's Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="participantName"
              value={formData.participantName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter participant's name"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Course Name
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course name"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Completion Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Instructor's Name
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter instructor's name"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Certificate Template
          </label>
          <select
            name="template"
            value={formData.template}
            onChange={handleChange}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="modern">Modern Template</option>
            <option value="classic">Classic Template</option>
            <option value="minimal">Minimal Template</option>
          </select>
        </div>

        <div className="mt-6">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Upload className="h-5 w-5 mr-2" />
            Upload Logo or Signature
          </button>
        </div>
      </div>
    </div>
  );
}