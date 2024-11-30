// store/useProjectStore.ts
import { create } from 'zustand';
import { Project } from '@/lib/types';

interface ProjectState {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));