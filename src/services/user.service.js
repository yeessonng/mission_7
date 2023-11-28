import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {patchMissionResponseDTO} from "../dtos/user.dto.js"
import {confirmMission, getResultStoreMission, patchMissionChallenge} from "../models/user.dao.js"


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
        
        //dto로 만들어서 controller로 리턴 > controller가 클라이언트에게 전송!
        return(patchMissionResponseDTO(result));
    }
}