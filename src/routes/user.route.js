import express from "express";
import asyncHandler from 'express-async-handler';
import {userReviewPreview} from '../controllers/stores.controller.js';

export const userRouter = express.Router({mergeParams: true});

userRouter.get('/reviews', asyncHandler(userReviewPreview));