import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {storeAddResponseDTO, missionAddResponseDTO, patchMissionResponseDTO} from "../dtos/stores.dto.js"
import {addStore, addReview, addMission} from "../models/stores.dao.js"
import {getRegionStore, getStoreMission, confirmMission, getResultStoreMission, patchMissionChallenge} from "../models/stores.dao.js"

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
    
    const transResult = storeAddResponseDTO(result);
    //조인해서 가져온 결과를 클라이언트에게 보낼 값만 추려서 보내기 위해 dto 객체로 바꿈
    return transResult;
    //dto를 리턴 response> result부분이 됨
}

//2
export const joinReview = async(body) => {
    const joinReviewData = await addReview({
        "user_id": body.user_id,
		"store_id": body.store_id,
        "mission_id": body.mission_id,
        "star": body.star,
        "body": body.body,
        "review_date": body.review_data
    });
    
    if(joinReviewData == -1){//가게 존재 X
        throw new BaseError(status.STORE_NOT_EXIST)
    }else{
        
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

    const transResult = missionAddResponseDTO(result);
    
    return transResult;
}

//4
export const patchMission = async(body) => {
    const confirm = await confirmMission(body.id); //진행중인 미션인지 check

    if(confirm == -1){//이미 진행중인 미션
        throw new BaseError(status.MISSION_ALREADY_CHANLLENGE);
    }else{
        //complete > 진행중
        await patchMissionChallenge(body);

        //response할 값 만들기
        const result = await getResultStoreMission(body.id);
        
        //dto로 만들자
        const transResult = patchMissionResponseDTO(result);
        console.log(transResult);
        return transResult;
    }
}