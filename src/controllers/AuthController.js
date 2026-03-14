const bcrypt = require('bcrypt')
const User = require('../models/User')

class AuthController {

  static async register(req, res, next) {
    try {
      const { nickname, email, phone, password } = req.body

      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        return res.status(409).json({ message: 'Email already in use' })
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const user = await User.create({
        nickname,
        email,
        phone,
        passwordHash,
        isActive: true
      })

      req.session.user = {
        id: user.userId,
        nickname: user.nickname,
        email: user.email
      }

      return res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash)

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      if (!user.isActive) {
        return res.status(403).json({ message: 'User inactive' })
      }

      req.session.user = {
        id: user.userId,
        nickname: user.nickname,
        email: user.email
      }

      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.sendStatus(204)
    })
  }

}

module.exports = AuthController