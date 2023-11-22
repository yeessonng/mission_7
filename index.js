import express from 'express'; //ES6
import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';

import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';

import { storesRouter } from './src/routes/stores.route.js'
import { tempRouter } from './src/routes/temp.route.js';

import { testRouter } from './src/routes/test.route.js'; //db테스트용 나중에지웡지워

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000); //서버 포트 지정
app.use(cors()); //cors 방식 허용
app.use(express.static('public')); //정적 파일 접근
app.use(express.json()); //request 본문을 json으로 해석할 수 있도록 함. (json형태 요청 body 파싱을 위해)
app.use(express.urlencoded({extended: false})); //단순 객체 문자열 형태로 본문 데이터 해석

//swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

//router setting
app.use('/temp', tempRouter);
app.use('/stores', storesRouter);
//app.use('/user', userRouter);
app.use('/test', testRouter); //db테스트용 지워지워

//error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});


app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});