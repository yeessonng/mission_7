const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}
//1
export const storeAddResponseDTO = (data) => {
    return {"region": data[0].regionName, "storeName": data[0].storeName};
}
//2
export const reviewAddResponseDTO = (data) => {
    return {"user_nickname": data[0].nickname, "storeName": data[0].storeName, "star": data[0].star, "mission_body": data[0].body, "review_date": formatDate(data[0].created_at)};
}
//3
export const missionAddResponseDTO = (data) => {
    return {"storeName": data[0].storeName, "mission_body": data[0].body, "mission_term": ('D-' + data[0].term), "mission_reward": (data[0].reward + 'P')};
}

//10주차
//가게 리뷰 목록 조회
export const previewReviewResponseDTO = (data) => {
    const reviews = [];
    //data는 객체 배열로 들어옴
    for(let i = 0; i < data.length; i++){
        reviews.push({
            "user_nickname": data[i].nickname,
            "star": data[i].star,
            "review_body": data[i].body,
            "create_date": formatDate(data[i].created_at)
        });
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].id};
    //                             cusorId > 마지막으로 조회한 컨텐츠
}

//특정 가게 미션 목록 조회
export const previewStoreMissionResponseDTO = (data) => {
    const missions = [];
    for(let i = 0; i < data.length; i++){
        missions.push({
            "mission_body": data[i].body,
            "term": ('D-' + data[i].term),
            "reward": (data[i].reward + 'P')
        });
    }
    return {"missionData": missions, "cursorId": data[data.length-1].id};
}