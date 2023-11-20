/*
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { signinResponseDTO } from "../dtos/user.dto"
import { addUser, getUser, getUserPreferToUserID, setPrefer } from "../models/user.dao";

//res.send(response(status.SUCCESS, await joinUser(req.body)));
export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const joinUserData = await addUser({//사용자를 추가하는 함수
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': birth, //위에 birth
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    }); //사용자 추가

    if(joinUserData == -1){//에러처리 > dao의 addUser에서 email이 중복되면 -1 리턴
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{ //선호 음식 카테고리 매핑
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]); //dao의 setPrefer 함수
        } //joinUserData = userId
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }                                        //user 배열객체, 
}
*/