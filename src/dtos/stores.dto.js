//1
export const storeAddResponseDTO = (data) => {
    return {"region": data[0].regionName, "storeName": data[0].storeName};
}
//2
export const reviewAddResponseDTO = (data) => {
    return {"user_nickname": data[0].nickname, "storeName": data[0].storeName, "star": data[0].star, "mission_body": data[0].body, "review_date": data[0].review_date};
}
//3
export const missionAddResponseDTO = (data) => {
    return {"storeName": data[0].storeName, "mission_body": data[0].body, "mission_term": data[0].term, "mission_reward": data[0].reward, "mission_complete": data[0].complete, "mission_success": data[0].success};
}
//4
export const patchMissionResponseDTO = (data) => {
    return {"storeName": data[0].storeName, "mission_body": data[0].body, "mission_term": data[0].term, "mission_reward": data[0].reward, "mission_complete": data[0].complete}
}