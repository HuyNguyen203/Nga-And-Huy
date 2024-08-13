const clos = require("../models/ELOs");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { index } = require("./GiangVienController");

class CLOsController {
  index(req, res, next) {
    clos
      .aggregate([
        {
          $unwind: "$pis",
        },
        {
          $unwind: "$pis.clos",
        },
        {
          $unwind: "$pis.clos.maCLO",
        },
        {
          $lookup: {
            from: "monhocs",
            localField: "pis.clos.maMonHoc",
            foreignField: "maMonHoc",
            as: "monhoc",
          },
        },
        {
          $unwind: "$monhoc",
        },
        {
          $lookup: {
            from: "giangviens",
            localField: "monhoc.giangVienChuQuan",
            foreignField: "maGiangVien",
            as: "giangvien",
          },
        },
        {
          $addFields: {
            giangVien: { $arrayElemAt: ["$giangvien.hoTen", 0] },
          },
        },
        {
          $group: {
            _id: {
              maMonHoc: "$pis.clos.maMonHoc",
              sttClo: "$pis.clos.maCLO.sttCLO",
              moTa: "$pis.clos.maCLO.moTa",
              bloomLevel: "$pis.bloomTaxomyLevels",
              pis: "$pis.maPI",
              elos: "$maELO",
              level: "$pis.clos.level",
            },
            tenMonHocTiengViet: { $first: "$monhoc.tenMonHocTiengViet" },
            tenMonHocTiengAnh: { $first: "$monhoc.tenMonHocTiengAnh" },
            chuThich: { $first: "" },
            giangVien: { $first: "$giangVien" },
          },
        },
        {
          $group: {
            _id: "$_id.maMonHoc",
            tenMonHocTiengViet: { $first: "$tenMonHocTiengViet" },
            tenMonHocTiengAnh: { $first: "$tenMonHocTiengAnh" },
            chuThich: { $first: "$chuThich" },
            giangVien: { $first: { $ifNull: ["$giangVien", ""] } },
            clos: {
              $addToSet: {
                sttClo: {
                  $concat: ["CLO", { $toString: "$_id.sttClo" }],
                },
                moTa: "$_id.moTa",
                bloomLevel: "$_id.bloomLevel",
                pis: "$_id.pis",
                elos: "$_id.elos",
                level: "$_id.level",
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $group: {
            _id: null,
            docs: { $push: "$$ROOT" },
          },
        },
        {
          $unwind: {
            path: "$docs",
            includeArrayIndex: "id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                "$docs",
                { id: { $toInt: { $add: ["$id", 1] } } },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            maMonHoc: "$_id",
            tenMonHocTiengViet: "$tenMonHocTiengViet",
            tenMonHocTiengAnh: "$tenMonHocTiengAnh",
            giangVien: { $ifNull: ["$giangVien", ""] },
            chuThich: "$chuThich",
            clos: {
              $sortArray: {
                input: "$clos",
                sortBy: { sttClo: 1 },
              },
            },
          },
        },
      ])
      .then((elos) => {
        res.json(elos);
      })
      .catch(next);
  }
}

module.exports = new CLOsController();
