import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {insertStoreSql, getRegionStoreSql, insertMissionSql, getStoreMissionSql, confirmMissionSql, patchMissionSql, getResultStoreMissionSql, checkStoreSql, insertReviewSql, resultUserStoreReviewSql, getStoreIdSql, missionSuccessSql, getReviewByReviewIdSql, getReviewByReviewIdAtFirstSql} from "./stores.sql.js";

//1. 특정 지역에 가게 추가
//store 데이터 삽입
export const addStore = async (data) => {
    try {
        const conn  = await pool.getConnection();

        const result = await pool.query(insertStoreSql, [data.region_id, data.name, data.address, data.check_status]);

        conn.release();

        return result[0].insertId; //storeid 리턴

    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

//지역하고 join하는 함수
export const getRegionStore = async(storeId) => {
    try{
        const conn = await pool.getConnection();
        const [regionStore] = await pool.query(getRegionStoreSql, storeId);

        conn.release();

        return regionStore;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
//------------------------------------------------------
//2. 가게에 리뷰 추가
export const addReview = async(data) => {
    try{
        const conn = await pool.getConnection();
        //storeId를 req.body로 받지 않고 missionId와 join하여 얻어 냄 mission 테이블에 storeId가 존재할 것
        const [storeId] = await pool.query(getStoreIdSql, data.mission_id);

        const [checkStore] = await pool.query(checkStoreSql, storeId[0].id);

        //리뷰를 작성하려는 가게가 존재하는지 검증
        if(checkStore[0].isExistStore == false){//store가 존재하지 않으면
            conn.release();
            return -1;//함수 바로 리턴
        }

        //가게가 존재하면 
        //mission테이블의 completet와 success 부분을 바꿔줌 > 
        //리뷰 추가하기 위해서는 mission을 진행완료, 성공해야 하기 때문에... 리뷰 추가 전에 진행완료, 성공을 했다고 가정함.
        await pool.query(missionSuccessSql, data.mission_id);

        const result = await pool.query(insertReviewSql, [data.user_id, storeId[0].id, data.mission_id, data.star, data.body, data.review_date]);

        conn.release();

        return result[0].insertId;//reviewId
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserStoreReview = async(reviewId) => {
    try{
        const conn = await pool.getConnection();

        const [resultUserStoreReview] = await pool.query(resultUserStoreReviewSql, reviewId)

        conn.release();

        return resultUserStoreReview;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//------------------------------------------------------
//3. 가게에 미션 추가
export const addMission = async(data) => {
    try{
        const conn = await pool.getConnection();

        const result = await pool.query(insertMissionSql, [data.store_id, data.body, data.term, data.reward]);

        conn.release();

        return result[0].insertId; //미션 id리턴
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

//미션이랑 가게 join
export const getStoreMission = async(missionId) => {
    try{
        const conn = await pool.getConnection();
        const [storeMission] = await pool.query(getStoreMissionSql, missionId);

        conn.release();

        return storeMission;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

//------------------------------------------------------
//4. 미션 도전
//이미 진행중인 미션인지 확인
export const confirmMission = async(missionId) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmMissionSql, missionId);

        if(confirm[0].isExistMission){//이미 진행중 OR 진행완료된 미션이면 true를 반환할 것임
            conn.release();
            return -1;
        }

        conn.release();
        return missionId;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const patchMissionChallenge = async(body) => {
    try{
        const conn = await pool.getConnection();
        await pool.query(patchMissionSql, [body.complete, body.id]);

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

//가게 리뷰 목록 조회
export const getPreviewReview = async(cursorId, size, storeId) => {
    try{
        const conn = await pool.getConnection();
        //cusorId가 정의되지 않았거나 null인지 확인
        if(cursorId == "undefined" || typeof cursorId == "undefinded" || cursorId == null ){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirstSql, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return reviews;
        }else{
            const [reviews] = await pool.query(getReviewByReviewIdSql, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;
        }
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
    }
}