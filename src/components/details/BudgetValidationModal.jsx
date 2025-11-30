import { AlertTriangle, X } from 'lucide-react';

export function BudgetValidationModal({ isOpen, onClose, onIgnore, validationData }) {
  if (!isOpen || !validationData) return null;

  const { projectName, budget, totalPrevu, totalRealise, prevuDiff, realiseDiff } = validationData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-orange-50">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Attention - Incohérence budgétaire</h3>
            <p className="text-sm text-gray-600 mt-1">Le total des montants mensuels ne correspond pas au budget</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Projet: {projectName}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Budget total:</span>
              <span className="text-sm font-semibold text-gray-900">{budget.toFixed(2)} MDH</span>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Total Prévu (tous les mois):</span>
                <span className={`text-sm font-semibold ${prevuDiff !== 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {totalPrevu.toFixed(2)} MDH
                </span>
              </div>
              {prevuDiff !== 0 && (
                <div className="flex justify-between items-center pl-4">
                  <span className="text-xs text-gray-600">Différence:</span>
                  <span className="text-xs font-medium text-orange-600">
                    {prevuDiff > 0 ? '+' : ''}{prevuDiff.toFixed(2)} MDH
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Total Réalisé (tous les mois):</span>
                <span className={`text-sm font-semibold ${realiseDiff !== 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {totalRealise.toFixed(2)} MDH
                </span>
              </div>
              {realiseDiff !== 0 && (
                <div className="flex justify-between items-center pl-4">
                  <span className="text-xs text-gray-600">Différence:</span>
                  <span className="text-xs font-medium text-orange-600">
                    {realiseDiff > 0 ? '+' : ''}{realiseDiff.toFixed(2)} MDH
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Il est recommandé que la somme des montants mensuels (Prévu ou Réalisé) soit égale au budget total du projet.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler la modification
          </button>
          <button
            onClick={onIgnore}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Ignorer l'alerte et continuer
          </button>
        </div>
      </div>
    </div>
  );
}
