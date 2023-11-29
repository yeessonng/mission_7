//1
export const insertStoreSql = "INSERT INTO store (region_id, name, address, check_status) VALUES (?, ?, ?, ?);";
export const getRegionStoreSql = "SELECT store.name as storeName, region.name as regionName " +
"FROM store JOIN region ON store.region_id = region.id " +
"WHERE store.id = ?;";

//2
export const missionSuccessSql = "UPDATE mission SET complete = '진행완료', success = '성공' WHERE id = ?;";
export const getStoreIdSql = "SELECT store.id FROM mission JOIN store ON mission.store_id = store.id WHERE mission.id = ?;";
export const checkStoreSql = "SELECT EXISTS(SELECT 1 FROM store WHERE store.id = ?) as isExistStore;";
export const insertReviewSql = "INSERT INTO review (user_id, store_id, mission_id, star, body, review_date) VALUES (?, ?, ?, ?, ?, ?);";
export const resultUserStoreReviewSql = "SELECT user.nickname, store.name as storeName, review.star, review.body, review.review_date FROM review " +
"JOIN user ON user.id = review.user_id JOIN store ON store.id = review.store_id JOIN mission ON mission.id = review.mission_id " +
"WHERE review.id = ? AND mission.success = '성공' AND mission.complete = '진행완료';";

//3
export const insertMissionSql = "INSERT INTO mission (store_id, body, term, reward) VALUES (?, ?, ?, ?);";
export const getStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward " +
"FROM mission JOIN store ON mission.store_id = store.id " + 
"WHERE mission.id = ?;";

//10주차
//가게 리뷰 목록 조회
export const getReviewByReviewIdAtFirstSql = "SELECT user.nickname, review.id, review.star, review.body, review.created_at " +
"FROM review JOIN user on review.user_id = user.id WHERE review.store_id = ? ORDER BY review.id DESC LIMIT ?;";
export const getReviewByReviewIdSql = "SELECT user.nickname, review.id, review.star, review.body, review.created_at " +
"FROM review JOIN user on review.user_id = user.id WHERE review.store_id = ? AND review.id < ? " +
"ORDER BY review.id DESC LIMIT ?;";

//특정 가게 미션 목록 
export const checkMissionStoreSql = "SELECT EXISTS(SELECT 1 FROM mission WHERE mission.store_id = ?) as isExistStore;";
export const getStoreMissionByMissionIdAtFirstSql = "SELECT mission.id, mission.body, mission.term, mission.reward " +
"FROM mission JOIN store ON mission.store_id = store.id WHERE mission.store_id = ? ORDER BY mission.id DESC LIMIT ?;";
export const getStoreMissionByMissionIdSql = "SELECT mission.id, mission.body, mission.term, mission.reward " +
"FROM mission JOIN store ON mission.store_id = store.id WHERE mission.store_id = ? AND mission.id < ? ORDER BY mission.id DESC LIMIT ?;";