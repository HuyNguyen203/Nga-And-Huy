const chuongTrinhKhung = require("../models/ChuongTrinhKhung");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ChuongTrinhKhungController {
  index(req, res, next) {
    chuongTrinhKhung
      .find({})
      .then((a) => {
        res.json(a);
      })
      .catch(next);
  }
  ChiTietNiemGiam(req, res, next) {
    const id = req.params.id;

    chuongTrinhKhung
      .aggregate([
        {
          $addFields: {
            hockys: {
              $map: {
                input: "$hockys",
                as: "hocKy",
                in: {
                  hocKy: "$$hocKy.hocKy",
                  monHocBatBuoc: "$$hocKy.monHocBatBuoc",
                  monHocTuChon: "$$hocKy.monHocTuChon",
                  soTinChiBatBuoc: "$$hocKy.soTinChiBatBuoc",
                  soTinChiTuChon: "$$hocKy.soTinChiTuChon",
                },
              },
            },
          },
        },
        {
          $unwind: "$hockys",
        },
        {
          $lookup: {
            from: "monhocs",
            localField: "hockys.monHocBatBuoc",
            foreignField: "maMonHoc",
            as: "monHocBatBuocChiTiet",
          },
        },
        {
          $lookup: {
            from: "monhocs",
            localField: "hockys.monHocTuChon",
            foreignField: "maMonHoc",
            as: "monHocTuChonChiTiet",
          },
        },
        {
          $addFields: {
            monHocBatBuocChiTiet: {
              $cond: {
                if: { $isArray: "$monHocBatBuocChiTiet" },
                then: "$monHocBatBuocChiTiet",
                else: [],
              },
            },
            monHocTuChonChiTiet: {
              $cond: {
                if: { $isArray: "$monHocTuChonChiTiet" },
                then: "$monHocTuChonChiTiet",
                else: [],
              },
            },
          },
        },
        {
          $group: {
            _id: {
              hocKy: "$hockys.hocKy",
              khoaHoc: "$khoaHoc",
            },
            hocPhanBatBuoc: { $first: "$monHocBatBuocChiTiet" },
            hocPhanTuChon: { $first: "$monHocTuChonChiTiet" },
            soTinChiBatBuoc: { $first: "$hockys.soTinChiBatBuoc" },
            soTinChiTuChon: { $first: "$hockys.soTinChiTuChon" },
          },
        },
        {
          $sort: {
            "_id.hocKy": 1, // Sort by hocKy in ascending order
          },
        },
        {
          $project: {
            _id: 0,
            hocKy: "$_id.hocKy",
            soTinChiBatBuoc: 1,
            soTinChiTuChon: 1,
            hocPhanBatBuoc: 1,
            hocPhanTuChon: {
              $cond: {
                if: { $eq: [{ $size: "$hocPhanTuChon" }, 0] },
                then: "$$REMOVE",
                else: "$hocPhanTuChon",
              },
            },
          },
        },
      ])

      .then((a) => {
        res.json(a);
      })
      .catch(next);
  }
}

module.exports = new ChuongTrinhKhungController();
