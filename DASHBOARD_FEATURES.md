# Dashboard Features - Facturation Tracker

## Sample Data

The dashboard now includes a sample data generator that creates realistic invoice data based on the column descriptions provided. The sample data includes:

### Data Fields
- **Contrat N°**: Contract identifiers (Cde1000-Cde1005)
- **Project**: Project names (Projet Alpha, Beta, Gamma, Delta)
- **Site**: Geographic locations (Jorf, Safi, Laayaune, Casablanca, Rabat)
- **Description**: Service/work descriptions
- **Fournisseur**: Suppliers (Frs1-Frs5)
- **Montant Attachement**: Attachment amounts (50,000 - 550,000 DH)
- **Montant HT**: Invoice amounts excluding tax
- **Date Validation ATT**: Attachment validation date
- **Date Facture**: Invoice date
- **Date Échéance**: Due date
- **Délai Paiement**: Payment terms (15j, 30j, 45j, 60j, 90j)
- **Status2**: Due status (Echue/Non Echue)
- **Statue1 Facture**: Payment status (Payée/Impayée)
- **Date Paiement**: Actual payment date (for paid invoices)
- **Mois Paiement**: Payment month
- **Commentaire**: Additional notes

### How to Load Sample Data
Click the **"Charger données d'exemple"** button in the dashboard to load 50 sample invoices with realistic data patterns:
- 70% of invoices are paid, 30% are unpaid
- Payment delays vary realistically (some early, some on-time, some late)
- Overdue status is calculated based on current date vs due date

## Dashboard Charts & Visualizations

### Existing KPIs (Statistics Cards)
1. **Total Attachements**: Sum of all attachment amounts
2. **Total Montant HT**: Total invoice amounts excluding tax
3. **Total HT Payé**: Total paid invoice amounts
4. **Total HT Impayé**: Total unpaid invoice amounts
5. **Nombre de Contrats**: Unique contract count
6. **Total Factures**: Total number of invoices
7. **Factures Payées**: Number of paid invoices
8. **Factures Impayées**: Number of unpaid invoices
9. **Taux de Paiement**: Payment rate percentage

### Existing Charts
1. **Payment Status Chart** (Pie Chart)
   - Shows distribution of paid vs unpaid invoices
   - Color-coded: Green for paid, Red for unpaid

2. **Contract Chart** (Bar Chart)
   - Displays invoice amounts by contract number
   - Helps identify highest-value contracts

3. **Supplier Chart** (Bar Chart)
   - Shows total HT amounts by supplier
   - Includes number of invoices per supplier
   - Sorted by amount descending

4. **Monthly Invoice Chart** (Line/Bar Chart)
   - Displays invoice trends over time

### New Charts Added

#### 1. Due Status Chart (Pie Chart)
- **Purpose**: Shows distribution of overdue vs not-yet-due invoices
- **Data Source**: `status2` field (Echue/Non Echue)
- **Features**:
  - Visual split between overdue (red) and current (blue) invoices
  - Displays both count and total amounts
  - Tooltip shows detailed breakdown
- **Business Value**: Quickly identify overdue invoice exposure

#### 2. Site Distribution Chart (Pie Chart)
- **Purpose**: Shows invoice distribution across geographical sites
- **Data Source**: `site` field
- **Features**:
  - Multi-color pie chart with percentage labels
  - Tooltip shows site name, amount, and invoice count
  - Sorted by amount descending
- **Business Value**: Understand which sites generate most invoicing activity

#### 3. Payment Delay Analysis Chart (Bar Chart)
- **Purpose**: Analyzes actual payment timing vs due dates
- **Data Source**: Comparison of `datePaiement` vs `dateEcheance`
- **Categories**:
  - En avance (Early - Green)
  - À temps (On-time - Green)
  - 1-7 jours de retard (Orange)
  - 8-15 jours de retard (Orange)
  - 16-30 jours de retard (Orange/Red)
  - 30+ jours de retard (Red)
- **Features**: Color-coded by severity of delay
- **Business Value**: Identify payment patterns and supplier compliance

#### 4. Payment Timeline Chart (Line Chart)
- **Purpose**: Shows payment amounts over time by month
- **Data Source**: `moisPaiement` and `montantHT` fields
- **Features**:
  - Line chart showing payment trends
  - Displays months with actual payments only
  - Tooltip shows amount and number of invoices
- **Business Value**: Track cash flow and payment seasonality

#### 5. Payment Terms Chart (Bar Chart)
- **Purpose**: Distribution of contractual payment terms
- **Data Source**: `delaiPaiement` field
- **Features**:
  - Shows how many invoices have each payment term
  - Sorted by term duration
- **Business Value**: Understand payment term mix and obligations

## Dashboard Layout

The charts are organized in a logical flow:

1. **Row 1**: Payment & Due Status - Overall payment health
2. **Row 2**: Contract & Site Distribution - Business distribution
3. **Row 3**: Supplier & Monthly Invoice - Partner and time analysis
4. **Row 4**: Payment Timeline & Delay Analysis - Payment behavior
5. **Row 5**: Payment Terms - Contractual obligations

## Filters

All charts respond to the filter panel which includes:
- Contract numbers
- Projects
- Sites
- Invoice numbers
- Suppliers
- Search functionality

## Data Export

The dashboard supports:
- **Import**: Upload Excel files with the T_Facturation sheet
- **Export**: Download current filtered data as Excel
- **Sample Data**: Load realistic sample data for testing

## Technical Implementation

### New Files Created
1. [src/utils/sampleData.js](src/utils/sampleData.js) - Sample data generator
2. [src/components/dashboard/SiteDistributionChart.jsx](src/components/dashboard/SiteDistributionChart.jsx)
3. [src/components/dashboard/PaymentDelayChart.jsx](src/components/dashboard/PaymentDelayChart.jsx)
4. [src/components/dashboard/DueStatusChart.jsx](src/components/dashboard/DueStatusChart.jsx)
5. [src/components/dashboard/PaymentTimelineChart.jsx](src/components/dashboard/PaymentTimelineChart.jsx)
6. [src/components/dashboard/PaymentTermsChart.jsx](src/components/dashboard/PaymentTermsChart.jsx)

### KPI Logic Preservation
All existing KPI calculations remain unchanged:
- No modifications to StatsCards component logic
- Existing chart calculations maintained
- Filter logic preserved

### Libraries Used
- **recharts**: For all chart visualizations
- **lucide-react**: For icons
- **xlsx-js-style**: For Excel import/export
- **tailwindcss**: For styling
