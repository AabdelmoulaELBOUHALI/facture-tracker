import { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';
import { DownloadChartButton } from '../DownloadChartButton';

export function SupplierChart({ projects }) {
  const chartRef = useRef(null);
  // Group by supplier and calculate totals
  const supplierData = projects.reduce((acc, invoice) => {
    const existing = acc.find(item => item.fournisseur === invoice.fournisseur);
    if (existing) {
      existing.montantHT += invoice.montantHT;
      existing.nombreFactures += 1;
    } else {
      acc.push({
        fournisseur: invoice.fournisseur,
        montantHT: invoice.montantHT,
        nombreFactures: 1
      });
    }
    return acc;
  }, []);

  // Sort by montantHT descending
  const sortedData = supplierData.sort((a, b) => b.montantHT - a.montantHT);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{payload[0].payload.fournisseur}</p>
          <p className="text-sm text-gray-600">
            Montant HT: {formatNumber(payload[0].value)} DH
          </p>
          <p className="text-sm text-gray-600">
            Nombre de factures: {payload[0].payload.nombreFactures}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Montant HT par Fournisseur</h3>
        <DownloadChartButton chartRef={chartRef} fileName="montant-fournisseur" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fournisseur" angle={-45} textAnchor="end" height={80} fontSize={10} />
          <YAxis tickFormatter={(value) => `${formatNumber(value)} DH`} fontSize={10} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="montantHT" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
