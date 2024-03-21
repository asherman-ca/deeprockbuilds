import { auth } from './auth'
import { apiAuthPrefix, protectedRoutes, publicRoutes } from './routes'

export default auth((req) => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)

	if (!isLoggedIn && isProtectedRoute) {
		return Response.redirect(new URL('/', nextUrl))
	}
})
