import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {getPreviewReview, getUserPreviewReview, getCheckUserId} from '../models/stores.dao.js';
import {previewReviewResponseDTO, previewUserReviewResponseDTO} from '../dtos/stores.dto.js';

//가게 리뷰 목록 조회
export const getReview = async (storeId, query) => {
    const {reviewId, paging = 3} = query;//구조 분해 할당
    return previewReviewResponseDTO(await getPreviewReview(reviewId, paging, storeId));
}

export const getUserReview = async (userId, query) => {
    //userId 있는지 검사
    const confirm = await getCheckUserId(parseInt(userId));
    if(confirm == -1){
        throw new BaseError(status.MEMBER_NOT_FOUND);
    }

    const {reviewId, paging = 3} = query;
    return previewUserReviewResponseDTO(await getUserPreviewReview(reviewId, paging, userId));
}