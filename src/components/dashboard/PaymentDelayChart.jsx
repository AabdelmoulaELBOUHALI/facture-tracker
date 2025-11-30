import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { formatNumber } from '../../utils/formatNumber';

export function PaymentDelayChart({ projects }) {
  // Calculate payment delays - only for paid invoices
  const paidInvoices = projects.filter(inv => inv.datePaiement && inv.dateEcheance);

  // Create scatter plot data with actual delay values
  const scatterData = paidInvoices.map((invoice, index) => {
    const dateEcheance = new Date(invoice.dateEcheance);
    const datePaiement = new Date(invoice.datePaiement);
    const delayDays = Math.floor((datePaiement - dateEcheance) / (1000 * 60 * 60 * 24));

    return {
      index: index + 1,
      delay: delayDays,
      montantHT: invoice.montantHT,
      factureNo: invoice.factureNo,
      dateEcheance: invoice.dateEcheance,
      datePaiement: invoice.datePaiement
    };
  });

  // Sort by delay for better visualization
  const sortedData = scatterData.sort((a, b) => a.delay - b.delay);

  const getPointColor = (delay) => {
    if (delay < 0) return '#10b981'; // Green for early
    if (delay === 0) return '#3b82f6'; // Blue for on time
    if (delay <= 7) return '#f59e0b'; // Amber for 1-7 days late
    if (delay <= 30) return '#fb923c'; // Orange for 8-30 days late
    return '#ef4444'; // Red for 30+ days late
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{data.factureNo}</p>
          <p className="text-sm text-gray-600">
            Délai: {data.delay} jours {data.delay < 0 ? '(en avance)' : data.delay === 0 ? '(à temps)' : '(en retard)'}
          </p>
          <p className="text-sm text-gray-600">
            Montant: {formatNumber(data.montantHT)} DH
          </p>
          <p className="text-sm text-gray-500 text-xs">
            Échéance: {data.dateEcheance}
          </p>
          <p className="text-sm text-gray-500 text-xs">
            Paiement: {data.datePaiement}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Analyse des Délais de Paiement</h3>
      <p className="text-sm text-gray-600 mb-4">Délai de paiement par facture (jours avant/après échéance)</p>

      {/* Legend */}
      <div className="flex gap-3 mb-3 flex-wrap text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>En avance</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>À temps</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>1-7j retard</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span>8-30j retard</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>30+j retard</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="index"
            name="Facture"
            label={{ value: 'Factures (ordonnées par délai)', position: 'insideBottom', offset: -10, fontSize: 10 }}
            fontSize={10}
          />
          <YAxis
            type="number"
            dataKey="delay"
            name="Délai (jours)"
            label={{ value: 'Délai (jours)', angle: -90, position: 'insideLeft', fontSize: 11 }}
            fontSize={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" label={{ value: 'Échéance', fontSize: 10 }} />
          <Scatter data={sortedData} fill="#8884d8">
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getPointColor(entry.delay)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
