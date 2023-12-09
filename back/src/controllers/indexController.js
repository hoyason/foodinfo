const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");
// 식당 조회
exports.readfoodinfo = async function(req, res){
 const {CITY} = req.query;

 // CITY 값이 넘어 왔다면 , 유효한 값인지 체크
      if(CITY){
        const validCITY = [
          "곡성",
          "군위",
          "청도",
          "음성",
          "경산",
          "삼척",
          "동해",
          "담양",
        ];

        if(!validCITY.includes(CITY)){
          return  res.send({
            isSuccess: false,
            code: 400, // 요청 실패시 400번대 코드
            message: "유효한 CITY가 아닙니다.",
          });
        }  
      }
     
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectfoodinfo(connection,CITY);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readfoodinfo DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}


// 테이블 조회
exports.readStudents = async function(req, res){

  const {FOOD_NM} = req.params;


  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectStudents(connection);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
}


// 예시 코드
exports.example = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.exampleDao(connection);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};
