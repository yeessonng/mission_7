/*
// models/user.sql.js

export const insertUserSql = "INSERT INTO user (email, user_name, gender, birth, user_address, user_spec_address, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?);";
//values를 줘서 db에 사용자 추가
export const getUserID = "SELECT * FROM user WHERE user_id = ?";

export const connectFoodCategory = "INSERT INTO user_favor_category (f_category_id, user_id) VALUES (?, ?);";
																								//테이블이름(필드이름,필드이름)
export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";
//주어진 email과 일치하는 사용자가 테이블에 존재하면 1을 반환 > isExistEmail > true, 존재하지 않으면 아무 결과도 반환하지 않음. > isExistEmail > false
export const getPreferToUserID =
"SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
+ "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";

/*
SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name
FROM user_favor_category ufc
JOIN food_category_list fcl ON ufc.f_category_id = fcl.f_category_id
WHERE ufc.user_id = ?
ORDER BY ufc.f_category_id ASC;

user_favor_category 테이블과 food_category_list 테이블을 조인하여 특정 사용자 ID에 해당하는 사용자의 선호 음식 카테고리 정보를 가져오며
*/
*/