/*
// models/user.dao.js

import { pool } from "../../config/db.config";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmEmail, data.email); //구조 분해 할당
				
        if(confirm[0].isExistEmail){ //> isExistEmail true면 주어진 email과 일치하는 사용자가 테이블에 존재한다는 것
            conn.release(); //커넥션을 풀에 반환
            return -1; //return > 함수 즉시 종료
        }
				//isExistEmail false면 if문 수행 없이 계속 진행        values(?,?~~~~) 에 ? 부분
        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId; //쿼리에 새로 추가된 사용자의 id 리턴
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);
				//user 배열 객체
        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);
													//쿼리
        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}
//foodCatehoryId

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);
																					//쿼리문
        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
*/