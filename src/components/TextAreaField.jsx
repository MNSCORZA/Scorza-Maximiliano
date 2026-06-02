import React from 'react';

export const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
    />
  </div>
);
