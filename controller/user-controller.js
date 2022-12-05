const { User, Project } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateAccessToken } = require('../helpers/jwt')

class UserController {
  static async list(req, res, next) {
    let data = await User.findAll({})
    try {
      if (data) {
        return res.status(200).json({ users: data })
      } else {
        return res.status(500).json({ message: 'user table empty' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async currentUser(req, res, next) {
    const userId = req.userData.id
    if (!userId) return res.status(200).json({ msg: 'Invalid token!' })
    try {
      if (userId) {
        const user = await User.findOne({
          include: {
            model: Project,
          },
          where: {
            id: userId,
          },
        })
        if (user) {
          return res.status(200).json({ user })
        } else {
          return res.status(200).json({ msg: 'user not registred' })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    const inputLogin = {
      email: req.body.email,
      password: req.body.password,
    }
    const user = await User.findOne({
      where: { email: inputLogin.email },
    })
    const UserId = user?.dataValues?.id
    try {
      if (!user) {
        return res.status(400).json({ message: 'failed, user not registered' })
      } else if (
        !comparePassword(inputLogin.password, user.dataValues.password)
      ) {
        return res.status(401).json({ msg: 'email or password wrong!' })
      } else {
        const accessToken = generateAccessToken({
          id: user.id,
          email: user.email,
        })
        return res.status(200).json({ accessToken, UserId })
      }
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    let { fullname, nickname, gender, email, password } = req.body
    try {
      const register = await User.create({
        fullname,
        nickname,
        gender,
        email,
        password,
      })
      return res.status(201).json(register)
    } catch (error) {
      next(error)
    }
  }

  static async updateUser(req, res, next) {
    const { id } = req.params
    const { fullname, nickname, gender, email, password } = req.body
    try {
      const userDataById = await User.findOne({
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      })
      if (userDataById) {
        const updateUser = await User.update(
          { fullname, nickname, gender, email, password },
          {
            where: {
              id: id,
            },
            individualHooks: true,
            returning: true,
          },
        )
        if (updateUser) {
          return res.status(200).json({ updateUser })
        }
      } else if (!userDataById) {
        res.status(404).json({ msg: 'user not found!' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params
    try {
      const deleteUser = await User.destroy({
        where: { id: id },
        returning: true,
      })
      if (deleteUser) {
        return res
          .status(200)
          .json({ message: `success delete user with id ${id}` })
      } else {
        return res
          .status(404)
          .json({ message: `failed, delete user with id ${id} not found` })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
