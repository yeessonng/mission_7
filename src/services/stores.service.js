/*
import {BaseError} from "../../config/error";
import {status} from "../../config/response.status.js";
*/
import {storeAddResponseDTO} from "../dtos/stores.dto.js"
import {getRegionStore, addStore} from "../models/stores.dao.js"

//                              req.body
export const joinStore = async (body) => {
    const joinStoreData = await addStore({//가게 추가 >dao
        'region_id': body.region_id,
        'name': body.name,
        'address': body.address,
        'check_status': body.check_status
    });
    
    const result = await getRegionStore(body.region_id);
    //const 가게 id랑, req.body regionid랑 조인하는 함수

    return result;
}