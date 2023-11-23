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
export const getStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward, mission.complete, mission.success " +
"FROM mission JOIN store ON mission.store_id = store.id " + 
"WHERE mission.id = ?;";

//4
//req.body에 넣어준 mission의 complete가 진행중이면 isExistMission > 1 반환
export const confirmMissionSql = "SELECT EXISTS(SELECT 1 FROM mission WHERE mission.id = ? AND mission.complete = '진행중') as isExistMission;";
export const patchMissionSql = "UPDATE mission SET complete = ? WHERE id = ?;";
export const getResultStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward, mission.complete " +
"FROM mission JOIN store ON mission.store_id = store.id " + 
"WHERE mission.id = ?;";