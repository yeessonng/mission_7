import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {storeAddResponseDTO, reviewAddResponseDTO, missionAddResponseDTO} from "../dtos/stores.dto.js"
import {addStore, addReview, addMission} from "../models/stores.dao.js"
import {getRegionStore, getStoreMission, getUserStoreReview} from "../models/stores.dao.js"


//9주차
//1                             req.body
export const joinStore = async (body) => {
    const joinStoreData = await addStore({//가게 추가 >dao
        'region_id': body.region_id,
        'name': body.name,
        'address': body.address,
        'check_status': body.check_status
    });//store id가 리턴 됨
    
    const result = await getRegionStore(joinStoreData);
    //가게 id랑, req.body regionid랑 조인하는 함수
    
    return(storeAddResponseDTO(result));
    //조인해서 가져온 결과를 클라이언트에게 보낼 값만 추려서 보내기 위해 dto 객체로 바꿈
}

//2
export const joinReview = async(body) => {
    const joinReviewData = await addReview({
        "user_id": body.user_id,
        "mission_id": body.mission_id,
        "star": body.star,
        "body": body.body,
        "review_date": body.review_date
    });//reviewId
    
    if(joinReviewData == -1){//가게 존재 X
        throw new BaseError(status.STORE_NOT_EXIST)
    }else{
        const result = await getUserStoreReview(joinReviewData);

        return(reviewAddResponseDTO(result));
    }
}

//3
export const joinMission = async(body) => {
    const joinMissionData = await addMission({
        'store_id': body.store_id,
        'body': body.body,
        'term': body.term,
        'reward': body.reward
    });

    const result = await getStoreMission(joinMissionData);

    return(missionAddResponseDTO(result));
}