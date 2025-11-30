export function StatusBadge({ status, type = 'payment' }) {
  const getStatusConfig = () => {
    if (type === 'payment') {
      // statue1Facture: Payée / Impayée
      if (status === 'Payée') {
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      } else {
        return {
          color: 'bg-green-500',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      }
    } else if (type === 'due') {
      // status2: Echue / Non Echue
      if (status === 'Echue') {
        return {
          color: 'bg-red-500',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      } else {
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-700',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      }
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <span className={`w-2 h-2 rounded-full ${config.color}`}></span>
      {status}
    </span>
  );
}
