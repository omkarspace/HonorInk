import React from 'react';

const CertificateForm = ({ onSubmit, fields, platform }) => {
  return (
    <div className="glass-card p-8 rounded-2xl w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center">
        {platform} Certificate
      </h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
      }} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                required
                rows={3}
                className="input-field"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                required
                className="input-field"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
        
        <button type="submit" className="btn-primary w-full">
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;