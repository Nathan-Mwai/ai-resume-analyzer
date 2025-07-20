interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine background gradient based on score
  const bgGradient = score > 70 
    ? 'bg-gradient-to-br from-green-100 to-white' 
    : score > 49 
      ? 'bg-gradient-to-br from-yellow-100 to-white' 
      : 'bg-gradient-to-br from-red-100 to-white';

  // Determine icon based on score
  const iconSrc = score > 70 
    ? '/icons/ats-good.svg' 
    : score > 49 
      ? '/icons/ats-warning.svg' 
      : '/icons/ats-bad.svg';

  // Determine status text based on score
  const statusText = score > 70 
    ? 'Excellent ATS Compatibility' 
    : score > 49 
      ? 'Good ATS Compatibility' 
      : 'Poor ATS Compatibility';

  return (
    <div className={`${bgGradient} rounded-2xl shadow-md w-full p-6`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
          <p className="text-gray-700">{statusText}</p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Applicant Tracking System Analysis</h3>
        <p className="text-gray-500 mb-4">
          This score indicates how well your resume will perform when scanned by Applicant Tracking Systems (ATS) used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3 mb-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <img 
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                alt={suggestion.type === "good" ? "Check" : "Warning"} 
                className="w-5 h-5 mt-0.5" 
              />
              <p className={suggestion.type === "good" ? "text-green-700" : "text-amber-700"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing line */}
      <p className="text-center text-gray-600 italic">
        Improving your ATS score can significantly increase your chances of getting an interview.
      </p>
    </div>
  );
};

export default ATS;
