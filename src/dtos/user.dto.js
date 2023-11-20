/*
// dtos/user.dto.js

// sign in response DTO
export const signinResponseDTO = (user, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].f_category_name);
    }//이 부분이 사용자에게 응답되는 값 result 값이 됨
    return {"email": user[0].email, "name": user[0].user_name, "preferCategory": preferFood};
}
*/