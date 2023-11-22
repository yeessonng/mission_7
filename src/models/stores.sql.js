export const insertStoreSql = "INSERT INTO store (region_id, name, address, check_status) VALUES (?, ?, ?, ?);";
export const getRegionStoreSql = "SELECT store.name as storeName, region.name as regionName " +
"FROM store JOIN region ON store.region_id = region.id " +
"WHERE store.id = ?;";