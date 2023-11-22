import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {insertStoreSql, getRegionStoreSql, insertMissionSql, getStoreMissionSql, confirmMissionSql, patchMissionSql, getResultStoreMissionSql} from "./stores.sql.js";

//1. 특정 지역에 가게 추가
//store 데이터 삽입
export const addStore = async (data) => {
    try {
        const conn = await pool.getConnection();

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
//3. 가게에 미션 추가
export const addMission = async(data) => {
    try{
        const conn = await pool.getConnection();

        const result = await pool.query(insertMissionSql, [data.store_id, data.body, data.term, data.reward]);

        conn.release();

        return result[0].insertId; //미션 id리턴
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG)
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

        if(confirm[0].isExistMission){//이미 진행중인 미션이면 true를 반환할 것임
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