import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get('/api/projects');
      return data;
    },
  });
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data } = await api.get(`/api/projects/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
