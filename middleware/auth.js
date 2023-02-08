import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //req.user = payload
    const testUser = payload.userId === '63e27f667fb5f178be70eca7'
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid')
  }
}

export default auth
