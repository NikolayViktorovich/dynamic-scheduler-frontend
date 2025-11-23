import axios from 'axios'

const API_BASE_URL = ''

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const studentAPI = {
  getProfile: () => api.get('/student/profile'),
  getSkills: () => api.get('/student/skills'),
  getCourses: () => api.get('/courses'),
  updateCourseSelection: (data) => api.post('/student/courses', data),
  simulateSpecialty: (specialtyId) => api.get(`/simulate/${specialtyId}`),
}

export default api