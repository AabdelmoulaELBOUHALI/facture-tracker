import { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

export function PaymentTimelineChart({ projects }) {
  const chartRef = useRef(null);
  // Group payments by month
  const monthlyData = {};

  projects.forEach(invoice => {
    const month = invoice.moisPaiement || 'Non payé';

    if (month !== 'Non payé') {
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month: month,
          montantPaye: 0,
          nombreFactures: 0
        };
      }
      monthlyData[month].montantPaye += invoice.montantHT || 0;
      monthlyData[month].nombreFactures += 1;
    }
  });

  // Convert to array and sort by month order
  const monthOrder = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const chartData = monthOrder
    .map(month => monthlyData[month] || { month, montantPaye: 0, nombreFactures: 0 })
    .filter(item => item.montantPaye > 0); // Only show months with payments

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{payload[0].payload.month}</p>
          <p className="text-sm text-blue-600">
            Montant payé: {formatNumber(payload[0].value)} DH
          </p>
          <p className="text-sm text-gray-600">
            Factures payées: {payload[0].payload.nombreFactures}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">Chronologie des Paiements</h3>
        <DownloadChartButton chartRef={chartRef} fileName="chronologie-paiements" />
      </div>
      <p className="text-sm text-gray-600 mb-4">Montants payés par mois</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={10}
          />
          <YAxis
            tickFormatter={(value) => `${formatNumber(value)} DH`}
            label={{ value: 'Montant (DH)', angle: -90, position: 'insideLeft', fontSize: 11 }}
            fontSize={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="montantPaye"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Montant Payé"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
