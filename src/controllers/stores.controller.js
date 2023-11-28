import {response} from '../../config/response.js';
import {status} from '../../config/response.status.js';
import {joinStore, joinReview, joinMission, patchMission} from '../services/stores.service.js';
import {getReview, getUserReview, getStoreMission} from '../providers/stores.provider.js';

//9주차
//1
export const storesAdd = async (req, res, next) => {
    console.log("가게 추가를 요청하였습니다!");

    res.send(response(status.SUCCESS, await joinStore(req.body)));
}

//2
export const reviewAdd = async (req, res, next) => {
    console.log("리뷰 추가를 요청하였습니다!");

    res.send(response(status.SUCCESS, await joinReview(req.body)));
}

//3
export const missionAdd = async (req, res, next) => {
    console.log("미션 추가를 요청하였습니다!");

    res.send(response(status.SUCCESS, await joinMission(req.body)));
}

//4
export const missionChallenge = async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다!");

    res.send(response(status.SUCCESS, await patchMission(req.body)));
}

//10주차
//가게 리뷰 목록 조회
export const reviewPreview = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
}

//사용자 리뷰 목록 조회
export const userReviewPreview = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserReview(req.params.userId, req.query)));
}

//특정 가게 미션 목록 조회
export const missionPreview = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getStoreMission(req.params.storeId, req.query)));
}