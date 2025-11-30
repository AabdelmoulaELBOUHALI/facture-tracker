# Sample Data Structure

## Invoice Data Model

Each invoice in the sample data follows this structure:

```javascript
{
  id: "inv-1",                      // Unique identifier
  contratNo: "Cde1000",              // Contract number
  project: "Projet Alpha",           // Project name
  site: "Jorf",                      // Site location
  description: "Fourniture matériel électrique",  // Work description
  montantAttachement: 125000,        // Attachment amount (DH)
  dateValidationAtt: "2025-03-15",   // Attachment validation date
  factureNo: "Fact001",              // Invoice number
  dateFacture: "2025-03-18",         // Invoice date
  dateEcheance: "2025-04-17",        // Due date (based on payment term)
  delaiPaiement: "30j",              // Payment term (days)
  status2: "Non Echue",              // Due status (Echue/Non Echue)
  montantHT: 122500,                 // Amount excluding tax (DH)
  statue1Facture: "Payée",           // Payment status (Payée/Impayée)
  datePaiement: "2025-04-10",        // Payment date (if paid)
  moisPaiement: "Avril",             // Payment month (if paid)
  fournisseur: "Frs1",               // Supplier name
  commentaire: "Remarque: Conformité vérifiée"  // Comments
}
```

## Sample Data Characteristics

### Contracts
- **Count**: 6 contracts
- **Range**: Cde1000 to Cde1005
- **Distribution**: Randomly assigned across invoices

### Projects
- **Count**: 4 projects
- **Names**:
  - Projet Alpha
  - Projet Beta
  - Projet Gamma
  - Projet Delta
- **Distribution**: Evenly distributed

### Sites
- **Count**: 5 sites
- **Locations**:
  - Jorf
  - Safi
  - Laayaune
  - Casablanca
  - Rabat
- **Distribution**: Randomly assigned

### Descriptions
Six types of work/services:
1. Fourniture matériel électrique
2. Prestation de service maintenance
3. Travaux de construction
4. Installation équipements
5. Fourniture et pose
6. Étude et conception

### Suppliers
- **Count**: 5 suppliers
- **Names**: Frs1, Frs2, Frs3, Frs4, Frs5
- **Distribution**: Random assignment

### Financial Amounts
- **Montant Attachement**: 50,000 - 550,000 DH
- **Montant HT**: Varies ±10% from attachment amount
- **Total Sample Amount**: Approximately 10-15 million DH across 50 invoices

### Payment Terms
Five different payment terms:
- 15j (15 days)
- 30j (30 days)
- 45j (45 days)
- 60j (60 days)
- 90j (90 days)

### Payment Statistics
- **Paid Invoices**: ~70% (35 out of 50)
- **Unpaid Invoices**: ~30% (15 out of 50)
- **Payment Timing**:
  - 70% paid on time or early
  - 30% paid with delays (1-20 days late)

### Dates
- **Date Range**: Throughout 2025
- **Validation to Invoice**: 1-5 days after validation
- **Invoice to Due Date**: Based on payment term
- **Payment Delays**: Realistic variation (some early, some late)

### Status Calculation Logic

#### status2 (Due Status)
```javascript
if (invoice is unpaid AND dueDate < today) {
  status2 = "Echue"  // Overdue
} else {
  status2 = "Non Echue"  // Not yet due
}
```

#### statue1Facture (Payment Status)
- **Payée**: 70% of invoices
  - Has datePaiement
  - Has moisPaiement
- **Impayée**: 30% of invoices
  - No datePaiement
  - No moisPaiement

### Comments
- **Frequency**: ~30% of invoices have comments
- **Types**:
  - "Remarque: Paiement en attente de validation"
  - "Remarque: Conformité vérifiée"

## Data Generation Function

The sample data is generated using [src/utils/sampleData.js](src/utils/sampleData.js):

```javascript
import { SAMPLE_INVOICES } from '../utils/sampleData';

// Use in component
setProjects(SAMPLE_INVOICES);
```

Or generate fresh data:

```javascript
import { generateSampleInvoices } from '../utils/sampleData';

const newData = generateSampleInvoices();
setProjects(newData);
```

## Data Validation

All sample data follows these rules:
1. All required fields are populated
2. Dates are in ISO format (YYYY-MM-DD)
3. Amounts are positive numbers
4. Payment dates are after invoice dates
5. Due dates are calculated from invoice date + payment term
6. Unpaid invoices have empty payment date and month
7. Status2 is calculated based on current date vs due date
