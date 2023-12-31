import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {checkUserIdSql, checkUserMissionIdSql} from './user.sql.js'
import {getUserReviewByReviewIdAtFirstSql, getUerReviewByReviewIdSql, confirmMissionSql, getResultStoreMissionSql, insertUserMission, getUserMissionByMissionIdAtFirstSql, getUserMissionByMissionIdSql, patchUserMissionSuccessSql, getUerMissionSuccessByMissionIdAtFirstSql, getUerMissionSuccessByMissionIdSql, checkUserMissionSuccessIdSql} from './user.sql.js'

//4. 미션 도전
//이미 진행중인 미션인지 확인
export const confirmMission = async(userId, missionId) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmMissionSql, [userId, missionId]);

        if(confirm[0].isExistCompleteMission){//이미 진행중 OR 진행완료된 미션이면 true를 반환할 것임
            conn.release();
            return -1;
        }

        conn.release();
        return;
    }catch(err){
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getResultStoreMission = async(missionId, userId) => {
    try{
        const conn = await pool.getConnection();
        const [resultStoreMission] = await pool.query(getResultStoreMissionSql, [missionId, userId]);

        conn.release();

        return resultStoreMission;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addUserMission = async(data) => {
    try{
        const conn = await pool.getConnection();
        await pool.query(insertUserMission, [data.user_id, data.mission_id, data.complete]);

        conn.release();
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


//사용자 리뷰 목록 조회
//사용자 리뷰 작성 여부
export const getCheckUserId = async(userId) => {
    try{
        const conn = await pool.getConnection();
        const [checkUserId] = await pool.query(checkUserIdSql, userId);

        if(!checkUserId[0].isExistUser){
            conn.release();
            return -1;
        }
        conn.release();
        return true;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
    }
}

export const getUserPreviewReview = async(cursorId, size, userId) => {
    try{
        const conn = await pool.getConnection();

        //cursorId x >처음으로 들어 페이지 요청할 때
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getUserReviewByReviewIdAtFirstSql, [parseInt(userId), parseInt(size)]);
            conn.release();
            return reviews;
        }else{
            const [reviews] = await pool.query(getUerReviewByReviewIdSql, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;
        }
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//내가 진행중인 미션 목록 조회
//user_mission 매핑 테이블에 userId 있는지 확인
export const getCheckMissionUserId = async(userId) => {
    try{
        const conn = await pool.getConnection();
        const [checkUserId] = await pool.query(checkUserMissionIdSql, userId);

        if(!checkUserId[0].isExistUser){
            conn.release();
            return -1;
        }
        conn.release();
        return true;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
    }
}

export const getUserMissionPreview = async(cursorId, size, userId) => {
    try{
        const conn = await pool.getConnection();

        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getUserMissionByMissionIdAtFirstSql, [parseInt(userId), parseInt(size)]);
            conn.release();
            return missions;
        }else{
            const [missions] = await pool.query(getUserMissionByMissionIdSql, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;
        }
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
    }
}

//진행중인 미션 > 진행 완료 미션 바꾸고 > 진행완료 조회
//진행완료 상태로 바꾸려는 미션이 이미 진행완료가 되었는지 확인
export const getCheckMissionUserSuccessId = async(userId, missionId) => {
    try{
        const conn = await pool.getConnection();
        const [checkUserId] = await pool.query(checkUserMissionSuccessIdSql, [userId, missionId]);

        if(checkUserId[0].isExistUserMissionSuccess){//이미 진행완료된 미션이면 true반환
            conn.release();
            return -1;
        }
        conn.release();
        return true;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
    }
}

export const patchUserMissionSuccess = async(userId, missionId, body) => {
    try{
        const conn = await pool.getConnection();
        await pool.query(patchUserMissionSuccessSql, [body.complete, body.success, userId, missionId]);
        conn.release();
        return;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//진행완료인 미션 가져오기
export const getUserMissionSuccess = async(cursorId, size, userId) => {
    try{
        const conn = await pool.getConnection();
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getUerMissionSuccessByMissionIdAtFirstSql, [parseInt(userId), parseInt(size)]);
            conn.release();
            return missions;
        }else{
            const [missions] = await pool.query(getUerMissionSuccessByMissionIdSql, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;
        }
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}