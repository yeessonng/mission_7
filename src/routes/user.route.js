import express from "express";
import asyncHandler from 'express-async-handler';
import {userReviewPreview, missionChallenge, userMissionCompletePreview} from '../controllers/user.controller.js';

export const userRouter = express.Router({mergeParams: true});

//4
userRouter.post('/missions/:missionId', asyncHandler(missionChallenge))


//10주차
//사용자 리뷰 목록 조회
userRouter.get('/reviews', asyncHandler(userReviewPreview));

//내가 진행중인 미션 목록 조회
userRouter.get('/missions-chanllenge', asyncHandler(userMissionCompletePreview));