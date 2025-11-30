import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Table2 } from 'lucide-react';
import logo from '../img/logo.png';

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-40 h-15 object-contain" />
            <h1 className="text-xl font-medium text-green-600">Gestion de Facturation</h1>
          </div>

          <nav className="flex gap-2">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Tableau de bord
            </Link>
            <Link
              to="/details"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                location.pathname === '/details'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Table2 className="w-4 h-4" />
              Détails des factures
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
