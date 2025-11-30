// Generate sample invoice data based on the column descriptions
export function generateSampleInvoices() {
  const contracts = ['Cde1000', 'Cde1001', 'Cde1002', 'Cde1003', 'Cde1004', 'Cde1005'];
  const projects = ['Projet Alpha', 'Projet Beta', 'Projet Gamma', 'Projet Delta'];
  const sites = ['Jorf', 'Safi', 'Laayaune', 'Casablanca', 'Rabat'];
  const descriptions = [
    'Fourniture matériel électrique',
    'Prestation de service maintenance',
    'Travaux de construction',
    'Installation équipements',
    'Fourniture et pose',
    'Étude et conception'
  ];
  const suppliers = ['Frs1', 'Frs2', 'Frs3', 'Frs4', 'Frs5'];
  const paymentTerms = ['30', '45', '60', '15', '90', '120'];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const sampleData = [];
  let factureCounter = 1;

  // Generate 200 sample invoices
  for (let i = 0; i < 200; i++) {
    const dateValidation = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const dateFacture = new Date(dateValidation);
    dateFacture.setDate(dateFacture.getDate() + Math.floor(Math.random() * 5) + 1);

    const paymentTerm = paymentTerms[Math.floor(Math.random() * paymentTerms.length)];
    const delayDays = parseInt(paymentTerm);

    const dateEcheance = new Date(dateFacture);
    dateEcheance.setDate(dateEcheance.getDate() + delayDays);

    const isPaid = Math.random() > 0.3; // 70% paid, 30% unpaid

    let datePaiement = '';
    let moisPaiement = '';
    if (isPaid) {
      const paymentDate = new Date(dateFacture);
      // Some paid on time, some late
      const paymentDelay = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : Math.floor(Math.random() * delayDays);
      paymentDate.setDate(paymentDate.getDate() + paymentDelay);
      datePaiement = formatDate(paymentDate);
      moisPaiement = months[paymentDate.getMonth()];
    }

    const now = new Date();
    const isOverdue = !isPaid && dateEcheance < now;
    const status2 = isOverdue ? 'Echue' : 'Non Echue';

    const montantAttachement = Math.floor(Math.random() * 500000) + 50000;
    const montantHT = montantAttachement * (0.9 + Math.random() * 0.2); // HT amount varies slightly from attachment

    const invoice = {
      id: `inv-${i + 1}`,
      contratNo: contracts[Math.floor(Math.random() * contracts.length)],
      project: projects[Math.floor(Math.random() * projects.length)],
      site: sites[Math.floor(Math.random() * sites.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      montantAttachement: Math.round(montantAttachement),
      dateValidationAtt: formatDate(dateValidation),
      factureNo: `Fact${String(factureCounter++).padStart(3, '0')}`,
      dateFacture: formatDate(dateFacture),
      dateEcheance: formatDate(dateEcheance),
      delaiPaiement: paymentTerm,
      status2: status2,
      montantHT: Math.round(montantHT),
      statue1Facture: isPaid ? 'Payée' : 'Impayée',
      datePaiement: datePaiement,
      moisPaiement: moisPaiement,
      fournisseur: suppliers[Math.floor(Math.random() * suppliers.length)],
      commentaire: Math.random() > 0.7 ? 'Remarque: ' + (Math.random() > 0.5 ? 'Paiement en attente de validation' : 'Conformité vérifiée') : ''
    };

    sampleData.push(invoice);
  }

  return sampleData;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Export sample data for immediate use
export const SAMPLE_INVOICES = generateSampleInvoices();
