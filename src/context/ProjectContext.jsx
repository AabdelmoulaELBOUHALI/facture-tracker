import { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_INVOICES } from '../utils/sampleData';

const ProjectContext = createContext(undefined);
const STORAGE_KEY = 'facturation-tracker-invoices';
const FILTERS_STORAGE_KEY = 'facturation-tracker-filters';

export function ProjectProvider({ children }) {
  // Initialize from localStorage or use SAMPLE_INVOICES
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SAMPLE_INVOICES;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return SAMPLE_INVOICES;
    }
  });

  // Initialize filters from localStorage
  const [filters, setFilters] = useState(() => {
    try {
      const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {
        contrats: [],
        projects: [],
        sites: [],
        factures: [],
        fournisseurs: [],
        paymentStatus: [],
        search: ''
      };
    } catch (error) {
      console.error('Error loading filters from localStorage:', error);
      return {
        contrats: [],
        projects: [],
        sites: [],
        factures: [],
        fournisseurs: [],
        paymentStatus: [],
        search: ''
      };
    }
  });

  // Save to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [projects]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filters to localStorage:', error);
    }
  }, [filters]);

  const updateProject = (id, updates) => {
    setProjects(prev =>
      prev.map(invoice => {
        if (invoice.id !== id) return invoice;
        return { ...invoice, ...updates };
      })
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addProject = (project) => {
    setProjects(prev => [...prev, project]);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, updateProject, deleteProject, addProject, filters, setFilters }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
}
