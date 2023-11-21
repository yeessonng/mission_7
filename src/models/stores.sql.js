export const insertStoreSql = "INSERT INTO store (region_id, name, address, check_status) VALUES (?, ?, ?, ?);";
export const getRegionStoreSql = "SELECT store.name, region.name " +
"FROM store JOIN region ON store.region_id = region.id " +
"WHERE region.id = ?;";

//data.region_id, data.name, data.address, data.check_status]);