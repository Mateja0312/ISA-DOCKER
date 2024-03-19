import api from "./api";
import { generateToken } from "./consumer-token";
export async function register(newUser: any): Promise<any> {
  return api().post("account/register", newUser).then();
}

export async function login(credentials: any): Promise<any> {
  const headers = {
    'authorization': generateToken()
  };
  return api().post("account/login", credentials, {headers}).then();
}

export async function getCenters(query: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("center/list", { headers, params: query })
    .then((res) => res.data);
}

export async function getMyInteractions(token: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("feedback/interactions", { headers, params: token })
    .then((res) => res.data);
}

export async function getAnswers(token: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("questionnaire", { headers, params: token })
    .then((res) => res.data);
}

export async function questions(): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("questionnaire/questions", {headers})
    .then((res) => res.data);
}

export async function getAllUsers(): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("users", {headers})
    .then((res) => res.data);
}

export async function getPendingFeedbacks(): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("feedback/waiting-response", {headers})
    .then((res) => res.data);
}

export async function getFeedbackById(id: number): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get(`feedback/${id}`, {headers})
    .then((res) => res.data);
}

export async function myResponseHistory(token: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("feedback/response-history", { headers, params: token })
    .then((res) => res.data);
}

export async function getMyResponses(id: number): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get(`feedback/response/${id}`, {headers})
    .then((res) => res.data);
}

export async function myFeedbackHistory(token: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("feedback/history", { headers, params: token })
    .then((res) => res.data);
}

export async function makeAppointment(appointment: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api().post("appointment", appointment, {headers}).then();
}

export async function submitResponse(
  feedbackResponse: any,
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .post("feedback/response", feedbackResponse, { headers, params: token })
    .then();
}

export async function acceptAppointment(
  appointment: any,
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .post(`appointment/${appointment.id}`, appointment, { headers, params: token })
    .then();
}

export async function cancelAppointment(
  appointment: any,
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .delete(`appointment/${appointment.id}`, { headers, params: token })
    .then();
}

export async function updateClientInfo(clientInfo: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  //console.log("Integrity check 1");
  return api().put("account/profile", clientInfo, {headers}).then();
}

export async function updateUserActivity(userInfo: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api().post("updateUserActivity", userInfo, {headers}).then();
}

export async function approve(newUser: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api().post("register", newUser, {headers}).then();
}

export async function saveQuestionnaireInfo(
  newAnswers: any,
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api().post("questionnaire", newAnswers, { headers, params: token }).then();
}

export async function submitFeedback(
  newFeedback: any,
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api().post("feedback", newFeedback, { headers, params: token }).then();
}

export async function getCenter(id: number, token: any): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get(`center/${id}`, { headers, params: { token } })
    .then((res) => res.data);
}

export async function getCompletedAndPendingAppointments(
  token: any
): Promise<any> {
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get("appointment/visits", { headers, params: token })
    .then((res) => res.data);
}

export async function getAppointment(
  appointmentId: number,
  token: any
): Promise<any>{
  const headers = {
    authorization: generateToken()
  };
  return api()
    .get(`appointment/${appointmentId}`, { headers, params: { token } })
    .then((res) => res.data);
}