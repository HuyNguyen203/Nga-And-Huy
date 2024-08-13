const lopHocPhan = require("../models/LopHocPhan");
const { multipleMongooseToObject } = require("../../util/mongoose");

class LopHocPhanController {
  index(req, res, next) {
    const id = req.params.id;

    lopHocPhan
      .aggregate([
        {
          $lookup: {
            from: "monhocs",
            localField: "maMonHoc",
            foreignField: "maMonHoc",
            as: "thongTinMonHoc",
          },
        },
        {
          $unwind: {
            path: "$thongTinMonHoc",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            maLopHocPhan: 1,
            tenLopHocPhan: 1,
            trangThai: 1,
            deleted: 1,
            createdAt: 1,
            updatedAt: 1,
            slug: 1,
            maGiangVien: 1,
            maMonHoc: 1,
            thongTinMonHoc: {
              tenMonHocTiengViet: 1,
              tenMonHocTiengAnh: 1,
            },
          },
        },
      ])
      .then((lopHocPhan) => {
        res.json(lopHocPhan);
      })
      .catch(next);
  }

  ChiTietLopHocPhan(req, res, next) {
    const id = req.params.id;

    lopHocPhan
      .aggregate([
        {
          $match: {
            maLopHocPhan: id,
          },
        },
        {
          $unwind: "$danhSachSinhVien",
        },
        {
          $lookup: {
            from: "sinhviens",
            localField: "danhSachSinhVien.maSinhVien",
            foreignField: "maSinhVien",
            as: "thongTinSinhVien",
          },
        },
        {
          $unwind: "$thongTinSinhVien",
        },

        {
          $addFields: {
            // Tạo các trường clo1, clo2, clo3, clo4 từ mảng clos
            clo1: { $arrayElemAt: ["$danhSachSinhVien.clos", 0] },
            clo2: { $arrayElemAt: ["$danhSachSinhVien.clos", 1] },
            clo3: { $arrayElemAt: ["$danhSachSinhVien.clos", 2] },
            clo4: { $arrayElemAt: ["$danhSachSinhVien.clos", 3] },
            // Thêm các trường clo5, clo6, ... nếu cần
          },
        },
        {
          $group: {
            _id: "$danhSachSinhVien.maSinhVien",
            mssv: { $first: "$danhSachSinhVien.maSinhVien" },
            hoTen: { $first: "$thongTinSinhVien.hoTen" },
            ngaySinh: {
              $first: {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$thongTinSinhVien.ngaySinh",
                  timezone: "Asia/Ho_Chi_Minh",
                },
              },
            },
            lopDanhNghia: { $first: "$thongTinSinhVien.lopDanhNghia" },
            clo1: { $first: "$clo1" },
            clo2: { $first: "$clo2" },
            clo3: { $first: "$clo3" },
            clo4: { $first: "$clo4" },
            trangThai: {
              $first: {
                $cond: {
                  if: { $eq: ["$thongTinSinhVien.trangThai", true] },
                  then: "Còn học",
                  else: "Đã nghỉ",
                },
              },
            },
            thongTinMonHoc: { $first: "$thongTinMonHoc" },
          },
        },
        {
          $project: {
            _id: 0,
            mssv: 1,
            hoTen: 1,
            ngaySinh: 1,
            lopDanhNghia: 1,
            clo1: { $ifNull: ["$clo1", 0] },
            clo2: { $ifNull: ["$clo2", 0] },
            clo3: { $ifNull: ["$clo3", 0] },
            clo4: { $ifNull: ["$clo4", 0] },
            trangThai: 1,
            thongTinMonHoc: 1,
          },
        },
      ])

      .then((chiTietHocPhan) => {
        res.json(chiTietHocPhan);
      })
      .catch(next);
  }
}

module.exports = new LopHocPhanController();
