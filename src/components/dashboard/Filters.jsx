import { Filter, Search } from 'lucide-react';
import { MultiSelect } from './MultiSelect';

export function Filters({ filters, setFilters, projects }) {
  const contratNos = Array.from(new Set(projects.map(p => p.contratNo))).filter(Boolean).sort();
  const projectNames = Array.from(new Set(projects.map(p => p.project))).filter(Boolean).sort();
  const sites = Array.from(new Set(projects.map(p => p.site))).filter(Boolean).sort();
  const factureNos = Array.from(new Set(projects.map(p => p.factureNo))).filter(Boolean).sort();
  const fournisseurs = Array.from(new Set(projects.map(p => p.fournisseur))).filter(Boolean).sort();

  const hasActiveFilters = filters.contrats.length > 0 || filters.projects.length > 0 ||
                          filters.sites.length > 0 || filters.factures.length > 0 ||
                          filters.fournisseurs.length > 0 || filters.search;

  const handleReset = () => {
    setFilters({
      contrats: [],
      projects: [],
      sites: [],
      factures: [],
      fournisseurs: [],
      paymentStatus: [],
      search: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <MultiSelect
          label="Contrat N°"
          options={contratNos}
          selected={filters.contrats}
          onChange={(value) => setFilters({ ...filters, contrats: value })}
          placeholder="Tous les contrats"
        />

        <MultiSelect
          label="Project"
          options={projectNames}
          selected={filters.projects}
          onChange={(value) => setFilters({ ...filters, projects: value })}
          placeholder="Tous les projets"
        />

        <MultiSelect
          label="Site"
          options={sites}
          selected={filters.sites}
          onChange={(value) => setFilters({ ...filters, sites: value })}
          placeholder="Tous les sites"
        />

        <MultiSelect
          label="Facture N°"
          options={factureNos}
          selected={filters.factures}
          onChange={(value) => setFilters({ ...filters, factures: value })}
          placeholder="Toutes les factures"
        />

        <MultiSelect
          label="Fournisseur"
          options={fournisseurs}
          selected={filters.fournisseurs}
          onChange={(value) => setFilters({ ...filters, fournisseurs: value })}
          placeholder="Tous les fournisseurs"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleReset}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
