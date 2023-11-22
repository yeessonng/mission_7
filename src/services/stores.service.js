/*
import {BaseError} from "../../config/error";
import {status} from "../../config/response.status.js";
*/
import {storeAddResponseDTO, missionAddResponseDTO} from "../dtos/stores.dto.js"
import {getRegionStore, addStore, addMission, getStoreMission} from "../models/stores.dao.js"

//                              req.body
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

