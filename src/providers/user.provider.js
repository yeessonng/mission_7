import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {getCheckUserId, getUserPreviewReview} from '../models/user.dao.js'
import {previewUserReviewResponseDTO} from '../dtos/user.dto.js'



//사용자 리뷰 목록 조회
export const getUserReview = async (userId, query) => {
    //userId 있는지 검사
    const confirm = await getCheckUserId(parseInt(userId));
    if(confirm == -1){
        throw new BaseError(status.MEMBER_NOT_FOUND);
    }

    const {reviewId, paging = 3} = query;
    return previewUserReviewResponseDTO(await getUserPreviewReview(reviewId, paging, userId));
}