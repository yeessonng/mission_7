export const insertStoreSql = "INSERT INTO store (region_id, name, address, check_status) VALUES (?, ?, ?, ?);";
export const getRegionStoreSql = "SELECT store.name as storeName, region.name as regionName " +
"FROM store JOIN region ON store.region_id = region.id " +
"WHERE store.id = ?;";

export const insertMissionSql = "INSERT INTO mission (store_id, body, term, reward) VALUES (?, ?, ?, ?);";
export const getStoreMissionSql = "SELECT store.name as storeName, mission.body, mission.term, mission.reward, mission.complete, mission.success " +
"FROM mission JOIN store ON mission.store_id = store.id " + 
"WHERE mission.id = ?;";
