import { useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';
import { StatusBadge } from '../StatusBadge';
import { DownloadChartButton } from '../DownloadChartButton';

export function DueStatusChart({ projects }) {
  const chartRef = useRef(null);
  // Status2: "Echue" (Overdue) vs "Non Echue" (Not due yet)
  const echueCount = projects.filter(p => p.status2 === 'Echue').length;
  const nonEchueCount = projects.filter(p => p.status2 === 'Non Echue').length;

  const echueAmount = projects
    .filter(p => p.status2 === 'Echue')
    .reduce((sum, p) => sum + (p.montantHT || 0), 0);

  const nonEchueAmount = projects
    .filter(p => p.status2 === 'Non Echue')
    .reduce((sum, p) => sum + (p.montantHT || 0), 0);

  const countData = [
    {
      name: 'Échues',
      value: echueCount,
      color: '#ef4444',
      amount: echueAmount,
      status: 'Echue'
    },
    {
      name: 'Non Échues',
      value: nonEchueCount,
      color: '#3b82f6',
      amount: nonEchueAmount,
      status: 'Non Echue'
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">
            Nombre: {data.value} factures
          </p>
          <p className="text-sm text-gray-600">
            Montant HT: {formatNumber(data.amount)} DH
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (entry) => {
    const total = countData.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((entry.value / total) * 100).toFixed(1);
    return `${entry.value} (${percentage}%)`;
  };

  return (
    <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Statut d'Échéance</h3>
        <DownloadChartButton chartRef={chartRef} fileName="statut-echeance" />
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        {countData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <StatusBadge status={entry.status} type="due" />
            <span className="text-sm text-gray-600">
              {entry.value} factures • {formatNumber(entry.amount)} DH
            </span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={countData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={85}
            fill="#8884d8"
            dataKey="value"
          >
            {countData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
