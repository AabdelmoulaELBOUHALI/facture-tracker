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
