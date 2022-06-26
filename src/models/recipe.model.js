const db = require("../config/db");

const recipeModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM recipe WHERE is_active=1",
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  allDataAdmin: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS total FROM recipe", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  listAll: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title LIKE '%${search}%' AND is_active=1 LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  allRecipe: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE title LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  detailRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  inputRecipe: (data) => {
    return new Promise((resolve, reject) => {
      const { id, photo, title, ingredients, video, date, idUser, isActive } =
        data;
      db.query(
        `INSERT INTO recipe( photo, title, ingredients, video, date, user_Id, is_active) 
        VALUES ('${photo}', '${title}','${ingredients}', '${video}', '${date}', '${idUser}',${isActive})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  updateRecipe: (id, file, title, ingredients, video, date, idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe SET photo='${file}', title='${title}',ingredients='${ingredients}'
            , video='${video}', date='${date}', user_id='${idUser}' WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipe WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  newRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM recipe ORDER BY date DESC LIMIT 6",
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  recipeUser: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE user_id=${idUser}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  RecipeControl: (id, isActive) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE recipe SET is_active=${isActive} WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  public: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recipe WHERE is_active= 1 LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

module.exports = recipeModel;
