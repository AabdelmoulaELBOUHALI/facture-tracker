import { Filter, Search } from 'lucide-react';

export function Filters({ filters, setFilters, projects }) {
  const types = Array.from(new Set(projects.map(p => p.type))).filter(Boolean);
  const lprs = Array.from(new Set(projects.map(p => p.lpr))).filter(Boolean);
  const projectNames = Array.from(new Set(projects.map(p => p.project))).filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nom du projet, contrat..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Projet</label>
          <select
            value={filters.project}
            onChange={(e) => setFilters({ ...filters, project: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les projets</option>
            {projectNames.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LPR</label>
          <select
            value={filters.lpr}
            onChange={(e) => setFilters({ ...filters, lpr: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les LPR</option>
            {lprs.map(lpr => (
              <option key={lpr} value={lpr}>{lpr}</option>
            ))}
          </select>
        </div>
      </div>

      {(filters.type || filters.lpr || filters.search || filters.project) && (
        <button
          onClick={() => setFilters({ type: '', lpr: '', search: '', project: '' })}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
