import express from "express";
import asyncHandler from 'express-async-handler';
import {userReviewPreview, missionChallenge, userMissionCompletePreview, missionSuccess} from '../controllers/user.controller.js';

export const userRouter = express.Router({mergeParams: true});

//4
userRouter.post('/missions/:missionId', asyncHandler(missionChallenge));


//10주차
//사용자 리뷰 목록 조회
userRouter.get('/reviews', asyncHandler(userReviewPreview));

//내가 진행중인 미션 목록 조회
userRouter.get('/missions-chanllenge', asyncHandler(userMissionCompletePreview));

//진행중인 미션 > 성공중인 미션 > 조회
userRouter.patch('/missions/:missionId/success', asyncHandler(missionSuccess));