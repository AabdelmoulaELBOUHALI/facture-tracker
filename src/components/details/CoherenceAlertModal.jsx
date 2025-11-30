import { AlertTriangle, X } from 'lucide-react';

export function CoherenceAlertModal({ isOpen, onClose, onIgnore, coherenceData }) {
  if (!isOpen || !coherenceData) return null;

  const { projectName, budget, difference } = coherenceData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-red-50">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Alerte - Données non cohérentes</h3>
            <p className="text-sm text-gray-600 mt-1">Les valeurs saisies ne sont pas cohérentes avec le budget</p>
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
                <span className="text-sm font-medium text-gray-700">Différence:</span>
                <span className={`text-sm font-semibold ${difference >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {difference > 0 ? '+' : ''}{difference.toFixed(2)} MDH
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium mb-1">
              Incohérence détectée
            </p>
            <p className="text-xs text-red-700">
              Les montants saisis ne sont pas cohérents avec le budget du projet.
              Veuillez vérifier vos données avant de continuer.
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
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Ignorer l'alerte et continuer
          </button>
        </div>
      </div>
    </div>
  );
}
