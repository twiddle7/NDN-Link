export default function NodeGraph({ nodes, onToggle }) {
  const edges = [["A", "C"], ["B", "C"], ["C", "D"], ["C", "E"]];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <div className="topology">
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {edges.map(([a, b]) => {
          const na = byId[a], nb = byId[b];
          if (!na || !nb) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke={na.status === "online" && nb.status === "online" ? "#a5b4fc" : "#e2e8f0"}
              strokeWidth="2"
              strokeDasharray={na.status === "online" && nb.status === "online" ? "0" : "5,5"}
            />
          );
        })}
      </svg>

      {nodes.map(n => (
        <div
          key={n.id}
          className={`node ${n.status}`}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => onToggle?.(n.id)}
          title={`Click to toggle ${n.name}`}
        >
          <div className="node-circle">{n.id}</div>
          <div className="node-label">{n.name}</div>
          <div className="node-status">
            {n.status === "online" ? `● ${n.latency_ms}ms` : "○ offline"}
          </div>
        </div>
      ))}
    </div>
  );
}