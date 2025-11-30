import { AlertTriangle, X } from 'lucide-react';

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, projectName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-red-50">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
            <p className="text-sm text-gray-600 mt-1">Cette action est irréversible</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              Êtes-vous sûr de vouloir supprimer le projet:
            </p>
            <p className="text-base font-semibold text-gray-900 mt-2">
              {projectName}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              <strong>Attention:</strong> Cette action ne peut pas être annulée. Toutes les données du projet seront définitivement supprimées.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Supprimer le projet
          </button>
        </div>
      </div>
    </div>
  );
}
