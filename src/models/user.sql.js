
//4
//이미 진행중이거나 진행완료 된 미션인지 확인 > 1을 반환
export const confirmMissionSql = "SELECT EXISTS(SELECT 1 FROM mission JOIN user_mission ON mission.id = user_mission.mission_id WHERE user_mission.user_id = ? AND user_mission.mission_id = ?) as isExistCompleteMission;";
export const patchMissionSql = "UPDATE mission SET complete = ? WHERE id = ?;";
export const getResultStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward, user_mission.complete FROM mission " +
"JOIN user_mission ON user_mission.mission_id = mission.id JOIN store ON mission.store_id = store.id WHERE user_mission.mission_id = ? AND user_mission.user_id = ?;"
export const insertUserMission = "INSERT INTO user_mission (user_id, mission_id, complete) VALUES (?, ?, ?);";

//사용자 리뷰 목록 조회
export const checkUserIdSql = "SELECT EXISTS(SELECT 1 FROM review WHERE review.user_id = ?) as isExistUser";
export const getUserReviewByReviewIdAtFirstSql = "SELECT store.name, review.id, review.star, review.body, review.created_at FROM review " +
"JOIN user ON review.user_id = user.id JOIN store ON review.store_id = store.id " +
"WHERE review.user_id = ? ORDER BY review.id DESC LIMIT ?;";
export const getUerReviewByReviewIdSql = "SELECT store.name, review.id, review.star, review.body, review.created_at FROM review " +
"JOIN user ON review.user_id = user.id JOIN store ON review.store_id = store.id " +
"WHERE review.user_id = ? AND review.id < ? ORDER BY review.id DESC LIMIT ?;";

//내가 진행중인 미션 목록 조회
export const checkUserMissionIdSql = "SELECT EXISTS(SELECT 1 FROM user_mission WHERE user_mission.user_id = ? AND user_mission.complete = '진행중') as isExistUser;";
export const getUserMissionByMissionIdAtFirstSql = "SELECT mission.id, store.name, mission.body, mission.term, mission.reward, user_mission.complete " +
"FROM user_mission JOIN mission ON user_mission.mission_id = mission.id JOIN store ON mission.store_id = store.id " +
"WHERE user_mission.user_id = ? AND user_mission.complete = '진행중' ORDER BY mission.id DESC LIMIT ?;";
export const getUserMissionByMissionIdSql= "SELECT mission.id, store.name, mission.body, mission.term, mission.reward, user_mission.complete " +
"FROM user_mission JOIN mission ON user_mission.mission_id = mission.id JOIN store ON mission.store_id = store.id " +
"WHERE user_mission.user_id = ? AND user_mission.complete = '진행중' AND mission.id < ? ORDER BY mission.id DESC LIMIT ?;";

//진행중인 미션 > 진행완료 미션 > 조회
export const checkUserMissionSuccessIdSql = "SELECT EXISTS(select 1 from user_mission where user_mission.user_id = ? AND user_mission.mission_id = ? AND user_mission.complete = '진행완료') as isExistUserMissionSuccess;";
export const patchUserMissionSuccessSql = "UPDATE user_mission SET complete = ?, success = ? WHERE user_id = ? AND mission_id = ?;";
export const getUerMissionSuccessByMissionIdAtFirstSql = "SELECT mission.id, store.name, mission.body, mission.reward, user_mission.complete, user_mission.success " +
"FROM user_mission JOIN mission ON user_mission.mission_id = mission.id JOIN store ON mission.store_id = store.id " +
"WHERE user_mission.user_id = ? AND user_mission.complete = '진행완료' ORDER BY mission.id DESC LIMIT ?;";
export const getUerMissionSuccessByMissionIdSql = "SELECT mission.id, store.name, mission.body, mission.reward, user_mission.complete, user_mission.success " +
"FROM user_mission JOIN mission ON user_mission.mission_id = mission.id JOIN store ON mission.store_id = store.id " +
"WHERE user_mission.user_id = ? AND user_mission.complete = '진행완료' AND mission.id < ? ORDER BY mission.id DESC LIMIT ?;";;