const { Task } = require('../models')

class TaskController {
  static async list(req, res, next) {
    try {
      const data = await Task.findAll({
        order: [['title', 'ASC']],
      })
      if (data) {
        return res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async detail(req, res, next) {
    const { id } = req.params
    try {
      const data = await Task.findOne({
        where: {
          id: id,
        },
      })
      if (data) {
        return res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static create(req, res, next) {
    try {
      let { title, description, price, status, image, projectId } = req.body
      Task.create({
        title,
        description,
        price,
        status,
        image,
        projectId,
      })
        .then((data) => {
          return res.status(201).json({ data })
        })
        .catch((error) => {
          return res.status(500).json({ message: error })
        })
    } catch (error) {
      next(error)
    }
  }

  static update(req, res, next) {
    try {
      const taskId = req.params.id
      let { title, description, price, status, image, projectId } = req.body

      Task.update(
        { title, description, price, status, image, projectId },
        {
          where: {
            id: taskId,
          },
          returning: true,
        },
      )
        .then((data) => {
          return res.status(200).json({ data })
        })
        .catch((error) => {
          return res.status(500).json({ message: error })
        })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const taskId = req.params.id
    try {
      const deleteTask = await Task.destroy({
        where: {
          id: taskId,
        },
        returning: true,
      })
      if (deleteTask) {
        return res.status(200).json({ msg: `sucess deleted Task ${taskId}` })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController
