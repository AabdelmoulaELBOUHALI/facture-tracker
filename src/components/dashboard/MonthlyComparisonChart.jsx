import { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MONTHS, MONTH_LABELS } from '../../types/project';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

export function MonthlyComparisonChart({ projects }) {
  const chartRef = useRef(null);
  const data = MONTHS.map(month => {
    const totalPrevu = projects.reduce((sum, p) => sum + (p[month]?.prevu || 0), 0);
    const totalRealise = projects.reduce((sum, p) => sum + (p[month]?.realise || 0), 0);

    return {
      month: MONTH_LABELS[month],
      prevu: parseFloat(totalPrevu.toFixed(2)),
      realise: parseFloat(totalRealise.toFixed(2))
    };
  });

  return (
    <div ref={chartRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-900">Comparaison Prévu vs Réalisé</h3>
        <DownloadChartButton chartRef={chartRef} fileName="comparaison-prevu-realise" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} style={{ fontSize: '11px' }} />
          <YAxis
            label={{ value: 'Montant (MDH)', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
            style={{ fontSize: '11px' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip contentStyle={{ fontSize: '11px' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Line type="monotone" dataKey="prevu" stroke="#3b82f6" strokeWidth={2} name="Prévu" />
          <Line type="monotone" dataKey="realise" stroke="#10b981" strokeWidth={2} name="Réalisé" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
