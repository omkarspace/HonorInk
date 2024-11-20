import React from "react";

const CertificateForm = ({ onSubmit, fields, platform }) => {
  return (
    <div className="glass-card bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl w-full max-w-md mx-auto shadow-lg border border-gray-700">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center">
        {platform} Certificate
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          onSubmit(data);
        }}
        className="space-y-6"
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-300"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                id={field.name}
                required
                rows={3}
                className="input-field w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required
                className="input-field w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn-primary w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;
