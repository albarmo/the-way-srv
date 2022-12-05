const { Project, UserProject, User, Task } = require('../models')

class ProjectController {
  static async list(req, res, next) {
    try {
      const data = await Project.findAll({
        include: {
          model: Task,
        },
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
      const data = await Project.findOne({
        where: {
          id: id,
        },
        include: {
          model: Task,
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
      let { title, descripton, image, status } = req.body
      let inputData = {
        title,
        descripton,
        image,
        status,
      }
      Project.create(inputData)
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
      const idProject = req.params.id
      let { title, descripton, image, status } = req.body
      let inputData = {
        title,
        descripton,
        image,
        status,
      }
      Project.update(inputData, {
        where: {
          id: idProject,
        },
        returning: true,
      })
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
    const projectId = req.params.id
    try {
      const deleteProject = await Project.destroy({
        where: {
          id: projectId,
        },
        returning: true,
      })
      if (deleteProject) {
        return res
          .status(200)
          .json({ msg: `sucess deleted Projects ${projectId}` })
      }
    } catch (error) {
      next(error)
    }
  }

  static async myProject(req, res, next) {
    const userId = req.userData.id
    try {
      const members = await UserProject.findAll({
        include: {
          model: Project,
        },
        where: {
          userId: userId,
        },
      })
      return res.status(200).json(members)
    } catch (error) {
      next(error)
    }
  }

  static async listMember(req, res, next) {
    const projectId = req.params.id
    try {
      const members = await UserProject.findAll({
        include: {
          model: User,
          attributes: ['id', 'fullname', 'nickname', 'email', 'gender'],
        },
        where: {
          projectId: projectId,
        },
      })
      return res.status(200).json(members)
    } catch (error) {
      next(error)
    }
  }

  static async joinProject(req, res, next) {
    const userId = req.userData.id
    const projectId = req.params.id

    try {
      const isAlreadyJoined = await UserProject.findOne({
        where: {
          projectId: projectId,
          userId: userId,
        },
      })
      if (isAlreadyJoined == null) {
        const joinResult = await UserProject.create({
          userId,
          projectId,
        })
        return res.status(201).json(joinResult)
      } else {
        return res.status(500).json({ message: 'Already joined project' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async leaveProject(req, res, next) {
    const userId = req.userData.id
    const projectId = req.params.id
    try {
      const isAlreadyJoined = await UserProject.findOne({
        where: {
          projectId: projectId,
          userId: userId,
        },
      })
      if (isAlreadyJoined == null) {
        const deleteProject = await UserProject.destroy({
          where: {
            projectId: projectId,
            userId: userId,
          },
          returning: true,
        })
        return res
          .status(200)
          .json({ msg: `You are leaveing project ${projectId}` }, deleteProject)
      } else {
        return res
          .status(500)
          .json({ message: 'Error, user are not a member of this project' })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProjectController
