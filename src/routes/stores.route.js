import express from "express";
import asyncHandler from 'express-async-handler';
import {storesAdd, missionAdd} from "../controllers/stores.controller.js";

export const storesRouter = express.Router();

//특정 지역에 가게 추가
storesRouter.post('/add', asyncHandler(storesAdd));

//가게에 미션 추가
storesRouter.post('/missions', asyncHandler(missionAdd));