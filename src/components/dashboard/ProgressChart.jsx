import { useRef } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MONTHS, MONTH_LABELS } from '../../types/project';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-xs font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-xs text-blue-600 mb-1">
          Cumulé Prévu: <span className="font-semibold">{payload[0].value.toFixed(1)} MDH</span>
        </p>
        <p className="text-xs text-green-600 mb-1">
          Cumulé Réalisé: <span className="font-semibold">{payload[1].value.toFixed(1)} MDH</span>
        </p>
        {payload.length > 2 && (
          <p className="text-xs text-orange-600">
            Écart: <span className="font-semibold">{payload[2].value.toFixed(1)} MDH</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function ProgressChart({ projects }) {
  const chartRef = useRef(null);
  // Calculate cumulative data per month
  const data = MONTHS.map((month, index) => {
    // Get all months up to and including current month
    const monthsUpToNow = MONTHS.slice(0, index + 1);

    // Calculate cumulative totals
    const cumulativePrevu = projects.reduce((sum, project) => {
      return sum + monthsUpToNow.reduce((monthSum, m) => monthSum + project[m].prevu, 0);
    }, 0);

    const cumulativeRealise = projects.reduce((sum, project) => {
      return sum + monthsUpToNow.reduce((monthSum, m) => monthSum + project[m].realise, 0);
    }, 0);

    const ecart = cumulativeRealise - cumulativePrevu;

    return {
      name: MONTH_LABELS[month],
      prevu: parseFloat(cumulativePrevu.toFixed(1)),
      realise: parseFloat(cumulativeRealise.toFixed(1)),
      ecart: parseFloat(ecart.toFixed(1))
    };
  });

  return (
    <div ref={chartRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-900">Évolution Cumulée des Dépenses</h3>
        <DownloadChartButton chartRef={chartRef} fileName="evolution-cumulee" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} style={{ fontSize: '11px' }} />
          <YAxis
            label={{ value: 'Montant (MDH)', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
            style={{ fontSize: '11px' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Area
            type="monotone"
            dataKey="prevu"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Cumulé Prévu (MDH)"
          />
          <Area
            type="monotone"
            dataKey="realise"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
            name="Cumulé Réalisé (MDH)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
