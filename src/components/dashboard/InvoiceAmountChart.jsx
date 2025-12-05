import { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

export function InvoiceAmountChart({ projects }) {
  const chartRef = useRef(null);
  // Group by contract and calculate totals
  const contractData = {};

  projects.forEach(invoice => {
    const contract = invoice.contratNo || 'Sans contrat';
    if (!contractData[contract]) {
      contractData[contract] = {
        contratNo: contract,
        totalAttachement: 0,
        totalHT: 0,
        count: 0
      };
    }
    contractData[contract].totalAttachement += invoice.montantAttachement || 0;
    contractData[contract].totalHT += invoice.montantHT || 0;
    contractData[contract].count += 1;
  });

  // Convert to array and calculate difference
  const chartData = Object.values(contractData)
    .map(item => ({
      ...item,
      difference: item.totalHT - item.totalAttachement,
      contratShort: item.contratNo.length > 15 ? item.contratNo.substring(0, 12) + '...' : item.contratNo
    }))
    .sort((a, b) => b.totalHT - a.totalHT)
    .slice(0, 10); // Top 10 contracts

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold mb-2">{data.contratNo}</p>
          <p className="text-sm text-blue-600">
            Attachement: {formatNumber(data.totalAttachement)} DH
          </p>
          <p className="text-sm text-green-600">
            Montant HT: {formatNumber(data.totalHT)} DH
          </p>
          <p className={`text-sm font-semibold ${data.difference >= 0 ? 'text-purple-600' : 'text-orange-600'}`}>
            Différence: {data.difference >= 0 ? '+' : ''}{formatNumber(data.difference)} DH
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.count} facture(s)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">Analyse Attachement vs Montant HT</h3>
        <DownloadChartButton chartRef={chartRef} fileName="analyse-attachement-ht" />
      </div>
      <p className="text-sm text-gray-600 mb-4">Comparaison par contrat (Top 10)</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="contratShort"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={10}
            interval={0}
          />
          <YAxis
            fontSize={10}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="rect"
          />
          <Bar
            dataKey="totalAttachement"
            name="Total Attachement"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="totalHT"
            name="Total Montant HT"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600">Total Attachement</p>
          <p className="text-sm font-semibold text-blue-600">
            {formatNumber(chartData.reduce((sum, item) => sum + item.totalAttachement, 0))} DH
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Total Montant HT</p>
          <p className="text-sm font-semibold text-green-600">
            {formatNumber(chartData.reduce((sum, item) => sum + item.totalHT, 0))} DH
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Écart Total</p>
          <p className={`text-sm font-semibold ${
            chartData.reduce((sum, item) => sum + item.difference, 0) >= 0
              ? 'text-purple-600'
              : 'text-orange-600'
          }`}>
            {formatNumber(Math.abs(chartData.reduce((sum, item) => sum + item.difference, 0)))} DH
          </p>
        </div>
      </div>
    </div>
  );
}
