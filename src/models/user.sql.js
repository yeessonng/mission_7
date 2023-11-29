//4
//이미 진행중이거나 진행완료 된 미션인지 확인 > 1을 반환
export const confirmMissionSql = "SELECT EXISTS(SELECT 1 FROM mission WHERE mission.id = ? AND mission.complete IS NOT NULL) as isExistCompleteMission";
export const patchMissionSql = "UPDATE mission SET complete = ? WHERE id = ?;";
export const getResultStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward, mission.complete " +
"FROM mission JOIN store ON mission.store_id = store.id " + 
"WHERE mission.id = ?;";
export const insertUserMission = "INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?);";

//사용자 리뷰 목록 조회
export const checkUserIdSql = "SELECT EXISTS(SELECT 1 FROM user WHERE user.id = ?) as isExistUser";
export const getUserReviewByReviewIdAtFirstSql = "SELECT store.name, review.id, review.star, review.body, review.created_at FROM review " +
"JOIN user ON review.user_id = user.id JOIN store ON review.store_id = store.id " +
"WHERE review.user_id = ? ORDER BY review.id DESC LIMIT ?;";
export const getUerReviewByReviewIdSql = "SELECT store.name, review.id, review.star, review.body, review.created_at FROM review " +
"JOIN user ON review.user_id = user.id JOIN store ON review.store_id = store.id " +
"WHERE review.user_id = ? AND review.id < ? ORDER BY review.id DESC LIMIT ?;";