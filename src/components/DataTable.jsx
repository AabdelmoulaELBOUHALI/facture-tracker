import React, { useState } from 'react';

const MONTHS = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];

function DataTable({ projects, setProjects, loading }) {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCellEdit = (projectId, field, month = null, subField = null) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    let currentValue = '';
    if (month && subField) {
      currentValue = project.months?.[month]?.[subField] || '';
    } else {
      currentValue = project[field] || '';
    }

    setEditingCell({ projectId, field, month, subField });
    setEditValue(currentValue);
  };

  const handleSaveCell = async () => {
    if (!editingCell) return;

    const { projectId, field, month, subField } = editingCell;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field,
          value: editValue,
          month,
          subField
        })
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(p => p.id === projectId ? updatedProject.project : p));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour');
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const toggleComment = (projectId, month) => {
    const key = `${projectId}-${month}`;
    setExpandedComments(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEditComment = (projectId, month) => {
    const project = projects.find(p => p.id === projectId);
    const comment = project?.months?.[month]?.commentaire || '';
    setEditingComment({ projectId, month });
    setCommentValue(comment);
  };

  const handleSaveComment = async () => {
    if (!editingComment) return;

    const { projectId, month } = editingComment;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/comment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month,
          comment: commentValue
        })
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(p => p.id === projectId ? updatedProject.project : p));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
      alert('Erreur lors de la mise à jour du commentaire');
    }

    setEditingComment(null);
    setCommentValue('');
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `budget_tracker_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement');
    }
  };

  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true;
    return (
      project.contrat_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.lpr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.project_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div>
          <h1>Données Détaillées</h1>
          <p className="subtitle">Gérer et modifier les projets</p>
        </div>
        <button className="btn-primary" onClick={handleDownloadExcel}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
          </svg>
          Télécharger Excel
        </button>
      </div>

      <div className="search-bar">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher par N° Contrat, LPR ou Type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th rowSpan="2">N° Contrat</th>
              <th rowSpan="2">LPR</th>
              <th rowSpan="2">Type de Projet</th>
              <th rowSpan="2">Budget (MDH HH)</th>
              {MONTHS.map(month => (
                <th key={month} colSpan="2">{month}</th>
              ))}
              <th rowSpan="2">Actions</th>
            </tr>
            <tr>
              {MONTHS.map(month => (
                <React.Fragment key={month}>
                  <th className="sub-header">Prévu</th>
                  <th className="sub-header">Réalisé</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(project => (
              <tr key={project.id}>
                <td onClick={() => handleCellEdit(project.id, 'contrat_no')}>
                  {editingCell?.projectId === project.id && editingCell?.field === 'contrat_no' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleSaveCell}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                      autoFocus
                    />
                  ) : (
                    project.contrat_no || '-'
                  )}
                </td>
                <td onClick={() => handleCellEdit(project.id, 'lpr')}>
                  {editingCell?.projectId === project.id && editingCell?.field === 'lpr' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleSaveCell}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                      autoFocus
                    />
                  ) : (
                    project.lpr || '-'
                  )}
                </td>
                <td onClick={() => handleCellEdit(project.id, 'project_type')}>
                  {editingCell?.projectId === project.id && editingCell?.field === 'project_type' ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleSaveCell}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                      autoFocus
                    />
                  ) : (
                    project.project_type || '-'
                  )}
                </td>
                <td onClick={() => handleCellEdit(project.id, 'budget')}>
                  {editingCell?.projectId === project.id && editingCell?.field === 'budget' ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleSaveCell}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                      autoFocus
                    />
                  ) : (
                    project.budget || '0'
                  )}
                </td>
                {MONTHS.map(month => (
                  <React.Fragment key={month}>
                    <td
                      className="month-cell"
                      onClick={() => handleCellEdit(project.id, 'months', month, 'prevu')}
                    >
                      <div className="cell-with-comment">
                        {editingCell?.projectId === project.id &&
                        editingCell?.month === month &&
                        editingCell?.subField === 'prevu' ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleSaveCell}
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                            autoFocus
                          />
                        ) : (
                          <>
                            <span>{project.months?.[month]?.prevu || '0'}</span>
                            <button
                              className="comment-toggle"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComment(project.id, month);
                              }}
                              title="Voir/Modifier commentaire"
                            >
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                      {expandedComments[`${project.id}-${month}`] && (
                        <div className="comment-popup">
                          <div className="comment-header">
                            <strong>Commentaire - {month}</strong>
                            <button onClick={() => toggleComment(project.id, month)}>×</button>
                          </div>
                          {editingComment?.projectId === project.id &&
                          editingComment?.month === month ? (
                            <div className="comment-edit">
                              <textarea
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                rows="4"
                                placeholder="Entrez votre commentaire..."
                              />
                              <div className="comment-actions">
                                <button onClick={handleSaveComment} className="btn-save">
                                  Enregistrer
                                </button>
                                <button
                                  onClick={() => setEditingComment(null)}
                                  className="btn-cancel"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="comment-view">
                              <p>{project.months?.[month]?.commentaire || 'Aucun commentaire'}</p>
                              <button
                                onClick={() => handleEditComment(project.id, month)}
                                className="btn-edit-comment"
                              >
                                Modifier
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td onClick={() => handleCellEdit(project.id, 'months', month, 'realise')}>
                      {editingCell?.projectId === project.id &&
                      editingCell?.month === month &&
                      editingCell?.subField === 'realise' ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSaveCell}
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveCell()}
                          autoFocus
                        />
                      ) : (
                        project.months?.[month]?.realise || '0'
                      )}
                    </td>
                  </React.Fragment>
                ))}
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteProject(project.id)}
                    title="Supprimer"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Aucun projet trouvé</p>
          <p className="subtitle">Importez un fichier Excel pour commencer</p>
        </div>
      )}
    </div>
  );
}

export default DataTable;
