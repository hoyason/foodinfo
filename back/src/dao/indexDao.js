const { pool } = require("../../config/database");
exports.selectfoodinfo = async function (connection,CITY) {
  
  const selectAllQuery = `SELECT TITLE , ADDR, UTUBE_URL, CITY , TEL FROM foodinfo where STATUS ='A'`;
  const selectFOOD_NMBynameQuery = `SELECT TITLE , ADDR, UTUBE_URL, CITY , TEL FROM foodinfo where STATUS ='A' AND CITY = ?;`;
  
  const Params = [CITY];

  const Query = CITY ? selectFOOD_NMBynameQuery : selectAllQuery;


  const rows = await connection.query(Query, Params);

  return rows;
};

exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM foodinfo;`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};
