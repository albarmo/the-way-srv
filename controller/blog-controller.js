const { Blog } = require('../models')

class BlogController {
  static async list(req, res, next) {
    try {
      const data = await Blog.findAll({
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
      const data = await Blog.findOne({
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
      let { title, image, author, tag, content } = req.body
      Blog.create({
        title,
        image,
        author,
        tag,
        content,
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
      const blogId = req.params.id
      let { title, image, author, tag, content } = req.body

      Blog.update(
        { title, image, author, tag, content },
        {
          where: {
            id: blogId,
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
    const blogId = req.params.id
    try {
      const deleteBlog = await Blog.destroy({
        where: {
          id: blogId,
        },
        returning: true,
      })
      if (deleteBlog) {
        return res.status(200).json({ msg: `sucess deleted Blog ${blogId}` })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BlogController
