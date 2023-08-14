import api from "./api";

export async function login(credentials: any): Promise<any> {
    // const headers = {
    //   'authorization': generateToken() //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImdsYXZuaS1mcm9udGVuZCIsImlhdCI6MTY5MTUwNzM3MX0.qZQbITu07WhOd25mEDGLpfDXj-_zh_Qy6Rj5ascP2DU agentska-aplikacija +++++ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImdsYXZuaS1mcm9udGVuZCIsImlhdCI6MTY5MTUwNzE1M30.PuwrmSOakBGiFmZQxDbJeEd4Dgfu6_PXFsiUqNltDHA glavni-frontend
    // };
    return api().post("login", credentials).then();
  }