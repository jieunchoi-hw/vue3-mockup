// src/mocks/handlers/users.ts - MSW 핸들러
import { http, HttpResponse } from 'msw'
import { userDB, User } from '../data/users'

export const userHandlers = [
  // 사용자 목록 가져오기
  http.get('/api/users', (): Response => {
    const users = userDB.getAllUsers()
    console.log('📋 사용자 목록 조회:', users.length + '명')

    // 약간의 지연 시뮬레이션 (실제 API처럼)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(users))
      }, 300)
    }) as any
  }),

  // 새 사용자 생성
  http.post('/api/users', async ({ request }): Promise<Response> => {
    try {
      const userData = (await request.json()) as Omit<User, 'id' | 'createdAt'>

      // 이메일 중복 확인
      if (userDB.isEmailExists(userData.email)) {
        return HttpResponse.json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 })
      }

      // 새 사용자 생성
      const newUser = userDB.createUser(userData)

      return HttpResponse.json(newUser, { status: 201 })
    } catch (error) {
      console.error('사용자 생성 오류:', error)
      return HttpResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 500 })
    }
  }),

  // 개별 사용자 조회
  http.get('/api/users/:id', ({ params }): Response => {
    const userId = Number(params.id)
    const user = userDB.getUserById(userId)

    if (!user) {
      return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    console.log('👤 사용자 조회:', user)
    return HttpResponse.json(user)
  }),

  // 사용자 업데이트
  http.put('/api/users/:id', async ({ params, request }): Promise<Response> => {
    try {
      const userId = Number(params.id)
      const updates = (await request.json()) as Partial<Omit<User, 'id'>>

      const updatedUser = userDB.updateUser(userId, updates)

      if (!updatedUser) {
        return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
      }

      return HttpResponse.json(updatedUser)
    } catch (error) {
      return HttpResponse.json({ error: '사용자 업데이트에 실패했습니다.' }, { status: 500 })
    }
  }),

  // 사용자 삭제
  http.delete('/api/users/:id', ({ params }): Response => {
    const userId = Number(params.id)
    const success = userDB.deleteUser(userId)

    if (!success) {
      return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    return HttpResponse.json({ message: '사용자가 삭제되었습니다.' })
  }),

  // 모든 사용자 삭제 (테스트용)
  http.delete('/api/users', (): Response => {
    userDB.clearAllUsers()
    return HttpResponse.json({ message: '모든 사용자가 삭제되었습니다.' })
  }),

  // 데이터 리셋 (개발용)
  http.post('/api/users/reset', (): Response => {
    userDB.resetToInitialData()
    const users = userDB.getAllUsers()
    return HttpResponse.json({
      message: '사용자 데이터가 초기 상태로 리셋되었습니다.',
      users: users,
    })
  }),

  // favicon.ico 요청 처리 (선택사항)
  http.get('/favicon.ico', (): Response => {
    return new HttpResponse(null, { status: 204 })
  }),
]
