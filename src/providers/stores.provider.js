import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

import {getPreviewReview, getCheckStoreId, getStorePreviewMission} from '../models/stores.dao.js';
import {previewReviewResponseDTO, previewStoreMissionResponseDTO} from '../dtos/stores.dto.js';

//가게 리뷰 목록 조회
export const getReview = async (storeId, query) => {
    const {reviewId, paging = 3} = query;//구조 분해 할당
    return previewReviewResponseDTO(await getPreviewReview(reviewId, paging, storeId));
}

//특정 가게 미션 목록 조회
export const getStoreMission = async (storeId, query) => {
    const confirm = await getCheckStoreId(parseInt(storeId));
    
    if(confirm == -1){
        throw new BaseError(status.STORE_NOT_EXIST);
    }
    
    const {missionId, paging = 3} = query;
    return previewStoreMissionResponseDTO(await getStorePreviewMission(missionId, paging, storeId));
}