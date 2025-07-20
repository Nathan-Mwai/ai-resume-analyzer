interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-badge-red';
    badgeText = 'Needs Work';
  }

  const textColor = score > 70 ? 'text-green-600'
    : score > 49 ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <div className={`${badgeColor} px-2 py-1 rounded-md inline-block`}>
      <p className={`text-sm font-medium ${textColor}`}>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
