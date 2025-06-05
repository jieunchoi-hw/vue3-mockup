import { http, HttpResponse } from 'msw'
import { mockUsers, type User } from '../data/users'

export const userHandlers = [
  // GET /api/users
  http.get('/api/users', () => {
    return HttpResponse.json(mockUsers)
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    const user = mockUsers.find(u => u.id === id)
    
    if (!user) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(user)
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    const userData = await request.json() as any
    console.log('새 사용자 생성:', userData)
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || 'Unknown',
      email: userData.email || 'unknown@example.com', 
      role: userData.role || 'user',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    return HttpResponse.json(newUser, { status: 201 })
  })
]
