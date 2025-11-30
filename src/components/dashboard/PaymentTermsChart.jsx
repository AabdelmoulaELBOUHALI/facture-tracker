import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PaymentTermsChart({ projects }) {
  // Group by payment terms
  const termsData = projects.reduce((acc, invoice) => {
    const term = invoice.delaiPaiement || 'Non spécifié';
    const existing = acc.find(item => item.term === term);

    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        term: term,
        count: 1
      });
    }

    return acc;
  }, []);

  // Sort by term value (extract number from string like "30j")
  const sortedData = termsData.sort((a, b) => {
    const aNum = parseInt(a.term) || 0;
    const bNum = parseInt(b.term) || 0;
    return aNum - bNum;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des Délais de Paiement</h3>
      <p className="text-sm text-gray-600 mb-4">Distribution des termes de paiement contractuels</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="term" fontSize={10} />
          <YAxis label={{ value: 'Nombre de factures', angle: -90, position: 'insideLeft', fontSize: 11 }} fontSize={10} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="count" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
