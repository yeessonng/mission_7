export const storeAddResponseDTO = (data) => {
    return {"region": data[0].regionName, "storeName": data[0].storeName};
}

export const missionAddResponseDTO = (data) => {
    return {"storeName": data[0].storeName, "mission_body": data[0].body, "mission_term": data[0].term, "mission_reward": data[0].reward, "mission_complete": data[0].complete, "mission_success": data[0].success};
}