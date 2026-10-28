import { useEffect, useState } from "react";
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react";
import { api } from "../services/api.js";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modules, setModules] = useState([]);
  const [newName, setNewName] = useState("");
  const [newModule, setNewModule] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | done

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [t, m] = await Promise.all([api.tasks(), api.modules()]);
    setTasks(t);
    setModules(m);
    if (!newModule && m.length) setNewModule(m[0].name);
  }

  async function addTask() {
    if (!newName.trim() || !newModule) return;
    await api.addTask({ name: newName.trim(), module: newModule, done: false });
    setNewName("");
    await loadData();
  }

  async function toggleTask(id) {
    await api.toggleTask(id);
    await loadData();
  }

  async function deleteTask(id) {
    await api.deleteTask(id);
    await loadData();
  }

  const visible = tasks.filter(t => {
    if (filter === "pending") return !t.done;
    if (filter === "done")    return t.done;
    return true;
  });

  const doneCount = tasks.filter(t => t.done).length;
  const pendingCount = tasks.length - doneCount;

  return (
    <div className="page">
      <h1 className="page-title">Tasks</h1>
      <p className="page-sub">
        {tasks.length} total · {pendingCount} pending · {doneCount} done
      </p>

      {/* ---------- Add Task Form ---------- */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Add a Task</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Task name, e.g. Write NDN report"
            style={inputStyle}
          />
          <select
            value={newModule}
            onChange={e => setNewModule(e.target.value)}
            style={{ ...inputStyle, maxWidth: 220 }}
          >
            {modules.map(m => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={addTask}
            style={{ padding: "9px 18px" }}
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* ---------- Filter ---------- */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["all", "pending", "done"].map(f => (
          <button
            key={f}
            className={`btn ${filter === f ? "btn-primary" : "btn-secondary"}`}
            style={{ padding: "6px 14px", fontSize: 13 }}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* ---------- Task List ---------- */}
      <div className="card" style={{ padding: 0 }}>
        {visible.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
            No tasks to show.
          </div>
        )}

        {visible.map(t => (
          <div
            key={t.id}
            style={{
              display: "grid",
              gridTemplateColumns: "36px 1fr 200px 110px 40px",
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              alignItems: "center",
              gap: 10,
            }}
          >
            <button
              className="icon-btn"
              onClick={() => toggleTask(t.id)}
              title={t.done ? "Mark as pending" : "Mark as done"}
            >
              {t.done
                ? <CheckCircle size={20} color="var(--success)" />
                : <Circle size={20} color="var(--muted)" />}
            </button>

            <span
              style={{
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "var(--muted)" : "var(--text)",
              }}
            >
              {t.name}
            </span>

            <span className="fmeta">{t.module}</span>

            <span className={`badge ${t.done ? "success" : "warn"}`}>
              {t.done ? "done" : "pending"}
            </span>

            <button
              className="icon-btn"
              onClick={() => deleteTask(t.id)}
              title="Delete task"
            >
              <Trash2 size={16} color="var(--danger)" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "9px 12px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  outline: "none",
  background: "var(--bg)",
  fontSize: 14,
};