const elos = require("../models/ELOs");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ELOsController {
  index(req, res, next) {
    elos
      .aggregate([
        {
          $sort: { _id: 1 }, // Sắp xếp tài liệu theo _id nếu cần
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
            id: 1,
            maELO: 1,
            eloTiengViet: 1,
            eloTiengAnh: 1,
            pis: {
              $map: {
                input: "$pis",
                as: "pi",
                in: {
                  maPI: "$$pi.maPI",
                  piTiengAnh: "$$pi.piTiengAnh",
                  bloom: "$$pi.bloomTaxomyLevels",
                  domain: "$$pi.domain",
                  chuThich: "$$pi.chuThich",
                },
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

  BangAnhXa(req, res, next) {
    elos
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
          $group: {
            _id: {
              maMonHoc: "$pis.clos.maMonHoc",
              sttClo: "$pis.clos.maCLO.sttCLO",
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
            elos: {
              $addToSet: {
                sttCLO: "$_id.sttClo",
                sttPI: "$_id.pis",
                sttELO: "$_id.elos",
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
            tenMonHocTiengViet: "$tenMonHocTiengViet",
            tenMonHocTiengAnh: "$tenMonHocTiengAnh",
            chuThich: "$chuThich",
            elos: "$elos",
          },
        },
      ])
      .then((elos) => {
        res.json(elos);
      })
      .catch(next);
  }
}

module.exports = new ELOsController();
