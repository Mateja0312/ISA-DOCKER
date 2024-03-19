import api from "./api";

export async function login(credentials: any): Promise<any> {
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