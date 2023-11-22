import {response} from '../../config/response.js';
import {status} from '../../config/response.status.js';
import {joinStore, joinMission, patchMission} from '../services/stores.service.js';

//1
export const storesAdd = async (req, res, next) => {
    console.log("가게 추가를 요청하였습니다!");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await joinStore(req.body)));
}

//3
export const missionAdd = async (req, res, next) => {
    console.log("미션 추가를 요청하였습니다!");
    console.log("body: ", req.body);

    res.send(response(status.SUCCESS, await joinMission(req.body)));
}

//4
export const missionChallenge = async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다!");

    res.send(response(status.SUCCESS, await patchMission(req.body)));
}