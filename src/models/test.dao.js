import {pool} from "../../config/db.config.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";


export const getRegion = async () => {
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query("select region.name from region;");
        
        conn.release();
        return result; //객체 배열이 됨
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}