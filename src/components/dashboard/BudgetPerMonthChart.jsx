import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MONTHS, MONTH_LABELS } from '../../types/project';
import { formatNumber } from '../../utils/formatNumber';

export function BudgetPerMonthChart({ projects }) {
  const data = MONTHS.map(month => {
    const totalPrevu = projects.reduce((sum, p) => sum + (p[month]?.prevu || 0), 0);

    return {
      month: MONTH_LABELS[month],
      budget: parseFloat(totalPrevu.toFixed(2))
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Budget Prévu par Mois</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} style={{ fontSize: '11px' }} />
          <YAxis
            label={{ value: 'Budget (MDH)', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
            style={{ fontSize: '11px' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip contentStyle={{ fontSize: '11px' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="budget" fill="#3b82f6" name="Budget Prévu (MDH)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
