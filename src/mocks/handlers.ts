import { http, HttpResponse, passthrough } from "msw";
import type { HttpResponseResolver } from "msw";
import { ApiMode } from "@/utils/request";
import { get as getDataFromIdb } from "idb-keyval";

const BASE_URL = import.meta.env.VITE_SERVER;

const mockResolver: HttpResponseResolver = async ({ request }) => {
  console.log("Mocking request:", request);
  
  // 1. 先取得 method，並轉小寫方便比對
  const method = request.method.toLowerCase();

  // 2. 根據 method 分別解析 mode
  let modeValue: string | undefined;
  if (["post", "put", "patch", "delete"].includes(method)) {
    // 對於有 body 的請求，從 JSON body 讀
    try {
      const body = await request.clone().json();
      // body.mode 可能是 ApiMode.TEST，也可能是其他字串
      modeValue = body?.mode;
    } catch {
      // 如果 parse 失敗（如非 JSON），modeValue 保持 undefined
    }
  } else {
    // 對於 GET/HEAD 等無 body 的請求，從 URL query 拿
    const url = new URL(request.url.toString());
    modeValue = url.searchParams.get("mode") || undefined;
  }

  // 3. 若 mode === TEST，則回傳假資料；否則 passthrough
  if (modeValue?.toLowerCase() === ApiMode.TEST) {
    // 這裡的 key 可以依你的需求決定：可用完整 URL，也可用 endpoint path
    const data = await getDataFromIdb(request.url.toString());
    return HttpResponse.json(data);
  }

  // 預設放行到真實伺服器
  return passthrough();
};

export const handlers = [
  http.post(`${BASE_URL}/admin/acl/index/login`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.get(`${BASE_URL}/admin/acl/index/info?mode=test`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.post(`${BASE_URL}/admin/acl/index/logout`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.get(`${BASE_URL}/admin/acl/user/1/5?mode=test`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.post(`${BASE_URL}/admin/acl/user/save`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.put(`${BASE_URL}/admin/acl/user/update`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.delete(`${BASE_URL}/admin/acl/user/batchRemove`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.get(`${BASE_URL}/admin/acl/user/toAssign/81260?mode=test`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  }),
  http.post(`${BASE_URL}/admin/acl/user/doAssignRole`, (resolverInfo) => {
    return mockResolver(resolverInfo);
  })
];
