import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {insertStoreSql, getRegionStoreSql} from "./stores.sql.js";

//store 데이터 삽입
export const addStore = async (data) => {
    try {
        const conn = await pool.getConnection();

        const result = await pool.query(insertStoreSql, [data.region_id, data.name, data.address, data.check_status]);

        conn.release();

        return result[0].insertId; //id 리턴

    } catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

//지역하고 join하는 함수
export const getRegionStore = async(storeId) => {
    try{
        const conn = await pool.getConnection();
        const [regionStore] = await pool.query(getRegionStoreSql, storeId)

        conn.release();

        return regionStore;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}