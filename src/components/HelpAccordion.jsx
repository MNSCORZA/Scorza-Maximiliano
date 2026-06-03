import { useState } from 'react';

export const HelpAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-800 gap-4 transition-colors hover:bg-slate-50"
      >
        <span className="text-[15px] sm:text-base">{question}</span>
        <span className={`transform transition-transform duration-300 text-slate-400 flex-shrink-0 text-xl ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
        }`}
      >
        <div className="p-5 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/50">
          {answer}
        </div>
      </div>
    </div>
  );
};
