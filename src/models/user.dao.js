import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {checkUserIdSql, checkUserMissionIdSql} from './user.sql.js'
import {getUserReviewByReviewIdAtFirstSql, getUerReviewByReviewIdSql, confirmMissionSql, patchMissionSql, getResultStoreMissionSql, insertUserMission, getUserMissionByMissionIdAtFirstSql, getUserMissionByMissionIdSql} from './user.sql.js'

//4. 미션 도전
//이미 진행중인 미션인지 확인
export const confirmMission = async(missionId) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmMissionSql, missionId);

        if(confirm[0].isExistCompleteMission){//이미 진행중 OR 진행완료된 미션이면 true를 반환할 것임
            conn.release();
            return -1;
        }

        conn.release();
        return missionId;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const patchMissionChallenge = async(status, missionId) => {
    try{
        const conn = await pool.getConnection();
        await pool.query(patchMissionSql, [status, missionId]);

        conn.release();
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getResultStoreMission = async(missionId) => {
    try{
        const conn = await pool.getConnection();
        const [resultStoreMission] = await pool.query(getResultStoreMissionSql, missionId);

        conn.release();

        return resultStoreMission;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addUserMission = async(data) => {
    try{
        const conn = await pool.getConnection();
        await pool.query(insertUserMission, [data.user_id, data.mission_id]);

        conn.release();
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


//사용자 리뷰 목록 조회
//사용자 있는지 확인
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
export const getUserMissionReview = async(cursorId, size, userId) => {
    try{
        const conn = await pool.getConnection();

        if(cursorId == "undefinded" || typeof cursorId == "undefined" || cursorId == null){
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