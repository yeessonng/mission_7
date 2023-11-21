import express from 'express';
import {testTest} from '../controllers/test.controller.js';
export const testRouter = express.Router();

testRouter.get('/a', testTest);
console.log("여기 route");