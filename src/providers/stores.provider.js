import {getPreviewReview} from '../models/stores.dao.js';
import {previewReviewResponseDTO} from '../dtos/stores.dto.js';

//가게 리뷰 목록 조회
export const getReview = async (storeId, query) => {
    const {reviewId, paging = 3} = query;//구조 분해 할당
    return previewReviewResponseDTO(await getPreviewReview(reviewId, paging, storeId))
}