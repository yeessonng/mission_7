import express from "express";
import asyncHandler from 'express-async-handler';
import {storesAdd, reviewAdd, missionAdd, missionChallenge, reviewPreview, missionPreview} from "../controllers/stores.controller.js";
export const storesRouter = express.Router({mergeParams: true});

//9주차
//특정 지역에 가게 추가
storesRouter.post('/add', asyncHandler(storesAdd));

//가게에 리뷰 추가
storesRouter.post('/reviews', asyncHandler(reviewAdd));

//가게에 미션 추가
storesRouter.post('/missions', asyncHandler(missionAdd));

//미션 도전
storesRouter.patch('/missions', asyncHandler(missionChallenge));

//10주차
//가게 리뷰 목록 조회
storesRouter.get('/reviews', asyncHandler(reviewPreview));

//특정 가게 미션 목록 조회
storesRouter.get('/missions', asyncHandler(missionPreview));