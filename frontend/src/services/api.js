const BASE = "http://localhost:8000";

async function get(path) {
  const r = await fetch(`${BASE}${path}`);
  return r.json();
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function patch(path, body = {}) {
  const r = await fetch(`${BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function del(path) {
  const r = await fetch(`${BASE}${path}`, { method: "DELETE" });
  return r.json();
}

export const api = {
  users:         () => get("/api/users"),
  onlineUsers:   () => get("/api/users/online"),
  chats:         () => get("/api/chats"),
  messages: (id) => get(`/api/chats/${id}/messages`),
  sendMessage: (id, body) => post(`/api/chats/${id}/messages`, body),
  files:         () => get("/api/files"),
  file: (id)     => get(`/api/files/${id}`),
  nodes:         () => get("/api/network/nodes"),
  networkStatus: () => get("/api/network/status"),
  toggleNode: (id) => post(`/api/network/nodes/${id}/toggle`, {}),
  cacheStats:    () => get("/api/cache/stats"),
  cacheActivity: () => get("/api/cache/activity"),
  activity:      () => get("/api/activity"),
  modules:       () => get("/api/modules"),
  tasks:         () => get("/api/modules/tasks"),
  addTask:    (body) => post("/api/modules/tasks", body),
  toggleTask: (id)   => patch(`/api/modules/tasks/${id}/toggle`),
  deleteTask: (id)   => del(`/api/modules/tasks/${id}`),
  packets:     (id) => get(`/api/ndn/packets/${id}`),
  naming:      () => get("/api/ndn/naming"),
  ndnTables:   () => get("/api/ndn/tables"),
  aggregation: () => get("/api/ndn/aggregation"),
  tamper:      (id) => post("/api/ndn/tamper", { file_id: id }),
};
