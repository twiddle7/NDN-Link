export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="card stat-card">
      <div className="stat-icon" style={accent ? { background: `${accent}15`, color: accent } : {}}>
        {Icon && <Icon size={18} />}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
