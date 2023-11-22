import {response} from '../../config/response.js';
import {status} from '../../config/response.status.js';
import {joinStore} from '../services/stores.service.js';

export const storesAdd = async (req, res, next) => {
    console.log("가게 추가를 요청하였습니다!");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await joinStore(req.body)));
}

/*
export const reviewAdd = async (req, res, next) => {
    console.log("리뷰 추가를 요청하였습니다!");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS))
}
*/