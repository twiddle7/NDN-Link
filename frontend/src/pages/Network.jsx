import { useEffect, useState } from "react";
import NodeGraph from "../components/NodeGraph.jsx";
import { api } from "../services/api.js";

export default function Network() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => { api.nodes().then(setNodes); }, []);

  async function toggle(id) {
    const updated = await api.toggleNode(id);
    setNodes(ns => ns.map(n => n.id === updated.id ? updated : n));
  }

  const online = nodes.filter(n => n.status === "online").length;

  return (
    <div className="page">
      <h1 className="page-title">Network</h1>
      <p className="page-sub">
        {online} of {nodes.length} nodes online · click a node to toggle its status.
      </p>

      <div className="card" style={{ padding: 0, marginBottom: 20 }}>
        <NodeGraph nodes={nodes} onToggle={toggle} />
      </div>

      <div className="grid grid-3">
        {nodes.map(n => (
          <div key={n.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>{n.name}</h3>
              <span className={`badge ${n.status === "online" ? "success" : "danger"}`}>
                ● {n.status}
              </span>
            </div>
            <div className="fmeta" style={{ marginTop: 10 }}>
              <div>NDN prefix: <b style={{ fontFamily: "monospace" }}>{n.ndn_prefix}</b></div>
              <div style={{ marginTop: 4 }}>IP: {n.ip}</div>
              <div style={{ marginTop: 4 }}>Cached: {n.cached} objects</div>
              <div style={{ marginTop: 4 }}>Requests: {n.requests}</div>
              <div style={{ marginTop: 4 }}>Cache hits: {n.cache_hits}</div>
              <div style={{ marginTop: 4 }}>Latency: {n.latency_ms} ms</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
