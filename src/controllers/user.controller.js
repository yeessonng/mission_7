import {response} from '../../config/response.js';
import {status} from '../../config/response.status.js';

import { getUserReview } from '../providers/user.provider.js';
import { patchMission } from '../services/user.service.js';

//4
export const missionChallenge = async (req, res, next) => {
    console.log("미션 도전을 요청하였습니다!");

    res.send(response(status.SUCCESS, await patchMission(req.body)));
}

//사용자 리뷰 목록 조회
export const userReviewPreview = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getUserReview(req.params.userId, req.query)));
}