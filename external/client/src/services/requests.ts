import api from "./api";

export async function login(credentials: any): Promise<any> {
    // const headers = {
    //   'authorization': generateToken() //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImdsYXZuaS1mcm9udGVuZCIsImlhdCI6MTY5MTUwNzM3MX0.qZQbITu07WhOd25mEDGLpfDXj-_zh_Qy6Rj5ascP2DU agentska-aplikacija +++++ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImdsYXZuaS1mcm9udGVuZCIsImlhdCI6MTY5MTUwNzE1M30.PuwrmSOakBGiFmZQxDbJeEd4Dgfu6_PXFsiUqNltDHA glavni-frontend
    // };
    return api().post("login", credentials).then();
  }

  export async function getCompletedAndPendingAppointments(
    token: any
  ): Promise<any> {
    return api()
      .get("appointment/visits", { params: token })
      .then((res) => res.data);
  }

  export async function getMyInteractions(token: any): Promise<any> {
    return api()
      .get("feedback/interactions", { params: token })
      .then((res) => res.data);
  }

  export async function submitFeedback(
    newFeedback: any,
    token: any
  ): Promise<any> {
    return api().post("feedback", newFeedback, { params: token }).then();
  }

  export async function myFeedbackHistory(token: any): Promise<any> {
    return api()
      .get("feedback/history", { params: token })
      .then((res) => res.data);
  }

  export async function getFeedbackById(id: number): Promise<any> {
    return api()
      .get(`feedback/${id}`)
      .then((res) => res.data);
  }