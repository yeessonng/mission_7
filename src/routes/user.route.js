import express from "express";
import asyncHandler from 'express-async-handler';
import {userReviewPreview, missionChallenge} from '../controllers/user.controller.js';

export const userRouter = express.Router({mergeParams: true});

//4
userRouter.patch('/missions', asyncHandler(missionChallenge));

//10주차
//사용자 리뷰 목록 조회
userRouter.get('/reviews', asyncHandler(userReviewPreview));

