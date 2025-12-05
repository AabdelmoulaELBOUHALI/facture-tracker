# Chart Download Feature Implementation

## Overview
This document describes the minimal changes needed to add a download button to each chart in the dashboard. Each chart now has a download icon that allows users to export the chart as a PNG image.

---

## Changes Made

### 1. Install Required Dependency

**Command:**
```bash
npm install html2canvas
```

**Purpose:** html2canvas is a library that captures DOM elements as images, allowing us to convert charts to PNG files.

---

### 2. Create Reusable Download Button Component

**File:** `src/components/DownloadChartButton.jsx` (NEW FILE)

```jsx
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export function DownloadChartButton({ chartRef, fileName = 'chart' }) {
  const handleDownload = async () => {
    if (!chartRef.current) return;

    try {
      const element = chartRef.current;

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
      title="Télécharger le graphique"
    >
      <Download size={18} />
    </button>
  );
}
```

**Features:**
- Accepts `chartRef` (reference to chart container) and `fileName` (download name)
- Uses html2canvas with optimized settings to capture complete charts without cropping
- Scale 2 for high-quality retina displays
- useCORS enabled for cross-origin images
- Explicit width/height settings to ensure full chart capture
- Creates a download link and triggers it automatically
- Shows download icon from lucide-react with hover effects
- Includes error handling

---

### 3. Update Chart Components

The same pattern is applied to ALL chart components. Here are three examples:

#### Example 1: PaymentStatusChart.jsx

**File:** `src/components/dashboard/PaymentStatusChart.jsx`

**Changes:**

1. **Add imports:**
```jsx
import { useRef } from 'react';
import { DownloadChartButton } from '../DownloadChartButton';
```

2. **Create ref inside component:**
```jsx
export function PaymentStatusChart({ projects }) {
  const chartRef = useRef(null);
  // ... rest of component
```

3. **Update return statement:**
```jsx
return (
  <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Statut de Paiement</h3>
      <DownloadChartButton chartRef={chartRef} fileName="statut-paiement" />
    </div>

    {/* Rest of chart content */}
  </div>
);
```

**Key Changes:**
- Added `ref={chartRef}` to the main container div
- Wrapped title in a flex container with download button
- Download button positioned on the right side

---

#### Example 2: ContractChart.jsx

**File:** `src/components/dashboard/ContractChart.jsx`

**Changes:**

1. **Add imports:**
```jsx
import { useRef } from 'react';
import { DownloadChartButton } from '../DownloadChartButton';
```

2. **Create ref inside component:**
```jsx
export function ContractChart({ projects }) {
  const chartRef = useRef(null);
  // ... rest of component
```

3. **Update return statement:**
```jsx
return (
  <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Paiements par Contrat</h3>
      <DownloadChartButton chartRef={chartRef} fileName="paiements-contrat" />
    </div>

    {/* Rest of chart content */}
  </div>
);
```

---

#### Example 3: MonthlyInvoiceChart.jsx

**File:** `src/components/dashboard/MonthlyInvoiceChart.jsx`

**Changes:**

1. **Add imports:**
```jsx
import { useRef } from 'react';
import { DownloadChartButton } from '../DownloadChartButton';
```

2. **Create ref inside component:**
```jsx
export function MonthlyInvoiceChart({ projects }) {
  const chartRef = useRef(null);
  // ... rest of component
```

3. **Update return statement:**
```jsx
return (
  <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Évolution Mensuelle des Factures</h3>
      <DownloadChartButton chartRef={chartRef} fileName="evolution-mensuelle" />
    </div>

    {/* Rest of chart content */}
  </div>
);
```

---

## How to Apply to Other Charts

To add the download feature to any remaining charts, follow this pattern:

1. **Import dependencies:**
```jsx
import { useRef } from 'react';
import { DownloadChartButton } from '../DownloadChartButton';
```

2. **Add ref at the start of component:**
```jsx
const chartRef = useRef(null);
```

3. **Add ref to container and update header:**
```jsx
<div ref={chartRef} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-medium text-gray-900">[Chart Title]</h3>
    <DownloadChartButton chartRef={chartRef} fileName="[descriptive-name]" />
  </div>

  {/* Rest of chart */}
</div>
```

---

## Charts Updated - ALL COMPLETE ✅

All 15 chart components have been updated with download functionality:

1. ✅ PaymentStatusChart.jsx - fileName: "statut-paiement"
2. ✅ ContractChart.jsx - fileName: "paiements-contrat"
3. ✅ MonthlyInvoiceChart.jsx - fileName: "evolution-mensuelle"
4. ✅ DueStatusChart.jsx - fileName: "statut-echeance"
5. ✅ SiteDistributionChart.jsx - fileName: "distribution-site"
6. ✅ SupplierChart.jsx - fileName: "montant-fournisseur"
7. ✅ InvoiceAmountChart.jsx - fileName: "analyse-attachement-ht"
8. ✅ PaymentTermsChart.jsx - fileName: "delais-paiement"
9. ✅ PaymentTimelineChart.jsx - fileName: "chronologie-paiements"
10. ✅ PaymentDelayChart.jsx - fileName: "analyse-delais-paiement"
11. ✅ ProgressChart.jsx - fileName: "evolution-cumulee"
12. ✅ ProjectTypeChart.jsx - fileName: "repartition-type"
13. ✅ BudgetChart.jsx - fileName: "budget-projet"
14. ✅ BudgetPerMonthChart.jsx - fileName: "budget-mensuel"
15. ✅ MonthlyComparisonChart.jsx - fileName: "comparaison-prevu-realise"

---

## Visual Changes

**Before:**
```
┌─────────────────────────────┐
│ Chart Title                 │
│                             │
│     [Chart Content]         │
└─────────────────────────────┘
```

**After:**
```
┌─────────────────────────────┐
│ Chart Title            📥   │ <- Download icon appears here
│                             │
│     [Chart Content]         │
└─────────────────────────────┘
```

---

## Benefits

1. **Minimal Changes:** Only 3 lines per chart component
2. **Reusable Component:** Single DownloadChartButton used across all charts
3. **High Quality:** Exports at 2x scale for sharp images
4. **User-Friendly:** Hover effects and tooltip for better UX
5. **Consistent Naming:** Each chart has a descriptive filename

---

## Testing

To test the feature:
1. Navigate to the dashboard
2. Hover over the download icon (📥) in the top-right of any chart
3. Click the icon
4. A PNG file should download automatically with the chart rendered

---

## Technical Details

- **Library:** html2canvas v1.4.1
- **Export Format:** PNG
- **Resolution:** 2x scale (retina quality)
- **Background:** White (#ffffff)
- **Icon Library:** lucide-react (Download icon)
- **React Hook:** useRef for DOM reference
