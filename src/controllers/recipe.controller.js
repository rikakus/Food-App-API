const recipeModel = require("../models/recipe.model");
const { success, failed } = require("../helpers/response");
const recipeController = {
  list: async (req, res) => {
    try {
      const str = "";
      const search = req.query.search ? req.query.search : str;
      const { page, limit } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 10;
      const offset = (pageValue - 1) * limitValue;
      let allData;

      //admin
      if (req.APP_DATA.tokenDecode.level == 0) {
        allData = await recipeModel.allDataAdmin();
        const totalData = Number(allData.rows[0].total);
        recipeModel
          .allRecipe(search, limitValue, offset)
          .then((result) => {
            const pagination = {
              currentPage: pageValue,
              dataPerPage: limitValue,
              totalPage: Math.ceil(totalData / limitValue),
            };
            if (result.rowCount === 0) {
              return failed(
                res,
                "failed to get data",
                "failed",
                "data not found"
              );
            }
            success(
              res,
              result.rows,
              "success",
              "success to get data",
              pagination
            );
          })
          .catch((err) => {
            failed(res, err.message, "failed", "failed to get data");
          });

        //customer
      } else if (req.APP_DATA.tokenDecode.level == 1) {
        const id = req.APP_DATA.tokenDecode.id;
        allData = await recipeModel.recipeUser(id, 1000, 0);
        const totalData = Number(allData.rowCount);
        recipeModel
          .recipeUser(id, limitValue, offset)
          .then((result) => {
            const pagination = {
              currentPage: pageValue,
              dataPerPage: limitValue,
              totalPage: Math.ceil(totalData / limitValue),
            };
            if (result.rowCount === 0) {
              return failed(
                res,
                "failed to get data",
                "failed",
                "data not found"
              );
            }
            success(
              res,
              result.rows,
              "success",
              "success to get data",
              pagination
            );
          })
          .catch((err) => {
            failed(res, err.message, "failed", "failed to get data");
          });
      }
    } catch (err) {
      failed(res, err.message, "failed", "failed to get data");
    }
  },
  detail: (req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      if (isNaN(check)) {
        throw Error("input must be a number");
      }
      recipeModel
        .detailRecipe(id)
        .then((result) => {
          if (result.rowCount === 0) {
            return failed(
              res,
              "failed to get data",
              "failed",
              "data not found"
            );
          }
          success(res, result.rows[0], "success", "success to delete recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get detail");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get detail");
    }
  },
  input: async (req, res) => {
    try {
      const body = req.body;
      const file = req.file.filename;
      const { id, photo, title, ingredients, video, date, idUser, isActive } = body;
      if (!id || !title || !ingredients || !video || !date || !idUser ) {
        throw Error("parameter cannot blank");
      } else if (req.APP_DATA.tokenDecode.id != idUser) {
        return failed(
          res,
          "forbidden access",
          "failed",
          "failed to input recipe"
        );
      }
      const data = {
        id,
        photo: file,
        title,
        ingredients,
        video,
        date,
        idUser,
        isActive,
      };
      recipeModel
        .inputRecipe(data)
        .then((result) => {
          success(res, result.command, "success", "success to input recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to input recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to input recipe");
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { photo, title, ingredients, video, date, idUser } = req.body;
      const check = parseInt(id);
      const getData = await recipeModel.detailRecipe(id);
      const checkId = getData.rows[0].user_id;
      if (isNaN(check)) {
        throw Error("input must be a number");
      } else if (!title || !ingredients || !video || !date || !idUser) {
        throw Error("parameter cannot blank");
      } else if (req.APP_DATA.tokenDecode.id != idUser || idUser != checkId) {
        return failed(
          res,
          "forbidden access",
          "failed",
          "failed to update recipe"
        );
      }
      recipeModel
        .updateRecipe(id, photo, title, ingredients, video, date, idUser)
        .then((result) => {
          success(res, result.command, "success", "success to update recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to update recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to update recipe");
    }
  },
  deleted: async (req, res) => {
    try {
      const id = req.params.id;
      const check = parseInt(id);
      const getData = await recipeModel.detailRecipe(id);
      const checkId = getData.rows[0].user_id;
      if (isNaN(check)) {
        throw Error("input must be a number");
      } else if (req.APP_DATA.tokenDecode.id !== checkId) {
        return failed(
          res,
          "forbidden access",
          "failed",
          "failed to input recipe"
        );
      }
      recipeModel
        .deleteRecipe(id)
        .then((result) => {
          success(res, result.command, "success", "success to delete recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to delete recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to delete recipe");
    }
  },
  news: (req, res) => {
    try {
      recipeModel
        .newRecipe()
        .then((result) => {
          success(res, result.rows, "success", "success to get new recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get new recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get new recipe");
    }
  },
  public: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offset = (pageValue - 1) * limitValue;
      const allData = await recipeModel.allData();
      const totalData = Number(allData.rows[0].total);
      recipeModel
        .public(limitValue, offset)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData / limitValue),
          };
          success(
            res,
            result.rows,
            "success",
            "success to get recipe",
            pagination
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to get recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to get recipe");
    }
  },
  recipeControl: (req, res) => {
    try {
      const id = req.params.id;
      const isActive = Number(req.query.isActive);
      const check = parseInt(id);
      if (isNaN(check)) {
        throw Error("input must be a number");
      }else if ( isActive != 0) {
        throw Error("parameter must be 0");
      }
      recipeModel
        .RecipeControl(id,isActive)
        .then((result) => {
          success(res, result.command, "success", "success to deactive recipe");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "failed to deactive recipe");
        });
    } catch (err) {
      failed(res, err.message, "failed", "failed to deactive recipe");
    }
  },
  recipe: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE user_id=${idUser}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
module.exports = recipeController;
