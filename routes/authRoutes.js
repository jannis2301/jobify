import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  // Max 10 Requests, try again in 15 Minutes
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    'Too many requests from this IP address, please try again after 15 minutes',
})

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/updateUser').patch(authenticateUser, testUser, updateUser)
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser)
router.route('/logout').get(logout)

export default router
