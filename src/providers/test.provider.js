import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";
import {getRegion} from "../models/test.dao.js";

export const getTestData = async() => {
    const result = await getRegion();    
    return result;
}