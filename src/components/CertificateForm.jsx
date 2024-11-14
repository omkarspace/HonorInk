import React from 'react';
import { Calendar, User, BookOpen, GraduationCap, Clock } from 'lucide-react';

export default function CertificateForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Certificate Details</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Certificate Type
          </label>
          <select
            name="certificateType"
            value={formData.certificateType}
            onChange={handleChange}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="linkedin">LinkedIn Learning</option>
            <option value="udemy">Udemy</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last name"
              />
            </div>
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
            Course Length
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="courseLength"
              value={formData.courseLength}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 2 hours"
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

        {formData.certificateType === 'udemy' && (
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
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showWatermark"
            name="showWatermark"
            checked={formData.showWatermark}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="showWatermark" className="text-sm font-medium text-gray-700">
            Show Watermark
          </label>
        </div>
      </div>
    </div>
  );
}