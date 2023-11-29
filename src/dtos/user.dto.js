const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}

//4
export const patchMissionResponseDTO = (data) => {
    return {"store_name": data[0].storeName, "mission_body": data[0].body, "term": ('D-' + data[0].term), "reward": (data[0].reward + 'P'), "complete": data[0].complete}
}

//사용자 리뷰 목록 조회
export const previewUserReviewResponseDTO = (data) => {
    const reviews = [];
    for(let i = 0; i < data.length; i++){
        reviews.push({
            "store_name": data[i].name,
            "star": data[i].star,
            "review_body": data[i].body,
            "create_date": formatDate(data[i].created_at)
        });
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].id};
}