import express from "express";
import asyncHandler from 'express-async-handler';
<<<<<<< HEAD
import {storesAdd, missionAdd, reviewAdd} from "../controllers/stores.controller.js";
=======
import {storesAdd, missionAdd, missionChallenge} from "../controllers/stores.controller.js";
>>>>>>> feature/4

export const storesRouter = express.Router();

//특정 지역에 가게 추가
storesRouter.post('/add', asyncHandler(storesAdd));

//가게에 리뷰 추가
storesRouter.post('/reviews', asyncHandler(reviewAdd));

//가게에 미션 추가
storesRouter.post('/missions', asyncHandler(missionAdd));

//미션 도전
storesRouter.patch('/missions', asyncHandler(missionChallenge))