import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {patchMissionResponseDTO, previewUserMissionSuccessResponseDTO} from "../dtos/user.dto.js"
import {confirmMission, getResultStoreMission, addUserMission, getCheckMissionUserSuccessId, getCheckMissionUserId, patchUserMissionSuccess, getUserMissionSuccess} from "../models/user.dao.js"

//4
export const patchMission = async(userId, missionId, body) => {
    
    const confirm = await confirmMission(parseInt(userId), parseInt(missionId)); //이미 진행중인 미션인지 check

    if(confirm == -1){//이미 진행중인 미션
        throw new BaseError(status.MISSION_ALREADY_CHANLLENGE);
    }

    //user_mission 매핑 테이블 채우기
    await addUserMission({
        "user_id": parseInt(parseInt(userId)),
        "mission_id": parseInt(parseInt(missionId)),
        "complete": body.status
    });

    //response할 값 만들기
    const result = await getResultStoreMission(parseInt(missionId), parseInt(userId));
    
    //dto로 만들어서 controller로 리턴 > controller가 클라이언트에게 전송!
    return(patchMissionResponseDTO(result));

}

//진행중인 미션 > 진행완료 미션 > 조회
export const patchMissionSuccess = async(userId, missionId, body, query) => {
    //매핑 테이블에 해당 userId가 미션을 진행하고 있는가 검사
    const confirm = await getCheckMissionUserId(parseInt(userId));
    if(confirm == -1){
        throw new BaseError(status.USER_NOT_MISSION_CHANLLENGE);
    }
    //userId가 미션을 진행하고 있음 > 진행완료 상태로 바꾸려는 미션이 이미 진행완료가 되었는지 확인
    const check = await getCheckMissionUserSuccessId(parseInt(userId), parseInt(missionId));
    if(check == -1){
        throw new BaseError(status.MISSION_ALREADY_SUCCESS);
    }

    await patchUserMissionSuccess(parseInt(userId), parseInt(missionId), body);

    const {cursorId, paging = 3} = query;
    return previewUserMissionSuccessResponseDTO(await getUserMissionSuccess(cursorId, paging, userId));
}