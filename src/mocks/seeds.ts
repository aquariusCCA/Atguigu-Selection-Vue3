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
  reqRoleList,
  reqSetUserRole,
  reqUserDelete
} from './jsons/aclUser.json'

import {
  aclRoleList,
  aclRoleSave,
  aclRoleUpdate,
  aclRoleRemove,
  aclRoleMenuList,
  aclSetMenu
} from './jsons/aclRole.json'

import {
  reqMenuList,
  reqMenuAdd,
  reqMenuRemove,
  reqMenuUpdate
} from './jsons/menu.json'

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
      [`${BASE_URL}/admin/acl/user/toAssign/81260?mode=test`, reqRoleList],
      [`${BASE_URL}/admin/acl/user/doAssignRole`, reqSetUserRole],
      [`${BASE_URL}/admin/acl/user/remove/81260`, reqUserDelete],
      [`${BASE_URL}/admin/acl/role/1/5?mode=test`, aclRoleList],
      [`${BASE_URL}/admin/acl/role/save`, aclRoleSave],
      [`${BASE_URL}/admin/acl/role/update`, aclRoleUpdate],
      [`${BASE_URL}/admin/acl/role/remove/19093`, aclRoleRemove],
      [`${BASE_URL}/admin/acl/permission/toAssign/19093`, aclRoleMenuList],
      [`${BASE_URL}/admin/acl/permission/doAssign?roleId=19093&permissionId=1,7,8,11,12,13,14,16994,9,15,16,17,18,17086,10,19,20,21,17234,17209,17210,17211,22,23,44,45,46,17224,17235,24,50,51,52,25,47,48,49,13146,26,53,54,55,56,57,27,58,59,60,61,28,29,41,42,30,31,43,32,33,35,36,37,34,38,39,40`, aclSetMenu],
      [`${BASE_URL}/admin/acl/permission?mode=test`, reqMenuList],
      [`${BASE_URL}/admin/acl/permission/save`, reqMenuAdd],
      [`${BASE_URL}/admin/acl/permission/update`, reqMenuUpdate],
      [`${BASE_URL}/admin/acl/permission/remove/7`, reqMenuRemove]      
    ]);
  } catch (err) {
    console.log(err);
  }
};
