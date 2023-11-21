import express from "express";
import asyncHandler from 'express-async-handler';
import {storesAdd} from "../controllers/stores.controller.js";

export const storesRouter = express.Router();

storesRouter.post('/add', asyncHandler(storesAdd));