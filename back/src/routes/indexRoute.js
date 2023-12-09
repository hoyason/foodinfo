module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
  //app.get("/dummy", index.example);

  //app.get("/students/:FOOD_NM",index.readStudents);

  // 식당 목록 조회
  app.get("/foodinfo",index.readfoodinfo);
  
};
