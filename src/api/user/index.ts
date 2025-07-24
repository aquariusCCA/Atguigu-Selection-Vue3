import request from "@/utils/request";
import type { LoginFormData, LoginRespData, UserInfoRespData } from "./type";

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginRespData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<any, UserInfoRespData>(API.USERINFO_URL);

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
