import { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-xs font-medium text-gray-900 mb-1">{payload[0].payload.fullName}</p>
        <p className="text-xs text-blue-600">
          Budget: <span className="font-semibold">{payload[0].value.toFixed(1)} MDH</span>
        </p>
      </div>
    );
  }
  return null;
};

export function BudgetChart({ projects }) {
  const chartRef = useRef(null);
  const data = projects.map(project => ({
    name: project.project.length > 20 ? project.project.substring(0, 20) + '...' : project.project,
    fullName: project.project,
    budget: project.budget
  })).slice(0, 8);

  return (
    <div ref={chartRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-900">Budget par Projet</h3>
        <DownloadChartButton chartRef={chartRef} fileName="budget-projet" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} style={{ fontSize: '11px' }} />
          <YAxis
            label={{ value: 'Budget (MDH)', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
            style={{ fontSize: '11px' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="budget" fill="#3b82f6" name="Budget (MDH)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
