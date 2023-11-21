import {status} from '../../config/response.status.js';
import {getTestData} from '../providers/test.provider.js';
import {response} from '../../config/response.js';

export const testTest = async (req, res, next) => {
    const testdata = await getTestData();
    res.send(response(status.SUCCESS, testdata));
};
