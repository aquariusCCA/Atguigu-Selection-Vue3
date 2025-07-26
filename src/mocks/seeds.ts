import { setMany } from "idb-keyval";
import { 
  doLogin, 
  getInfo, 
  doLogout 
} from './jsons/user.json'

import { 
  reqUserList5, 
  reqUserSave, 
  reqUserUpdate, 
  reqUserDeleteBatch,
  reqRoleList 
} from './jsons/aclUser.json'

const BASE_URL = import.meta.env.VITE_SERVER;

/** 注入假資料 */
export const setSeeds = async () => {
  try {
    await setMany([
      // 這裡設定假資料 json mapping
      // [url, json key]
      [`${BASE_URL}/admin/acl/index/login`, doLogin],
      [`${BASE_URL}/admin/acl/index/info?mode=test`, getInfo],
      [`${BASE_URL}/admin/acl/index/logout`, doLogout],
      [`${BASE_URL}/admin/acl/user/1/5?mode=test`, reqUserList5],
      [`${BASE_URL}/admin/acl/user/save`, reqUserSave],
      [`${BASE_URL}/admin/acl/user/update`, reqUserUpdate],
      [`${BASE_URL}/admin/acl/user/batchRemove`, reqUserDeleteBatch],
      [`${BASE_URL}/admin/acl/user/toAssign/81260?mode=test`, reqRoleList]
    ]);
  } catch (err) {
    console.log(err);
  }
};
