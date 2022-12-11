const { Vendor } = require('../models')

class VendorController {
  static async list(req, res, next) {
    try {
      const data = await Vendor.findAll({
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
      const data = await Vendor.findOne({
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
      let {
        title,
        type,
        address,
        city,
        province,
        geolocation,
        phone,
        price,
        image,
      } = req.body
      Vendor.create({
        title,
        type,
        address,
        city,
        province,
        geolocation,
        phone,
        price,
        package: req.body.package,
        image,
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
      const vendorId = req.params.id
      let {
        title,
        type,
        address,
        city,
        province,
        geolocation,
        phone,
        price,
        image,
      } = req.body

      Vendor.update(
        {
          title,
          type,
          address,
          city,
          province,
          geolocation,
          phone,
          price,
          package: req.body.package,
          image,
        },
        {
          where: {
            id: vendorId,
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
    const vendorId = req.params.id
    try {
      const deleteVendor = await Vendor.destroy({
        where: {
          id: vendorId,
        },
        returning: true,
      })
      if (deleteVendor) {
        return res
          .status(200)
          .json({ msg: `sucess deleted Vendor ${vendorId}` })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = VendorController
