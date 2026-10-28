import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import { api } from "../services/api.js";

// Simulated replies from team members
const AUTO_REPLIES = [
  { sender: "Kriswin", text: "Got it, I'll check that now." },
  { sender: "Hrithik", text: "Looks good to me 👍" },
  { sender: "Arun",    text: "Let me test this on my node." },
  { sender: "Sara",    text: "I'll update the docs." },
  { sender: "Naveen",  text: "Noted — adding to the report." },
  { sender: "Kriswin", text: "Cached it on Node C, ready to serve." },
  { sender: "Hrithik", text: "Signature verified on my side." },
];

const AVATAR_COLORS = {
  Devika:  "#6366f1",
  Kriswin: "#0ea5e9",
  Hrithik: "#10b981",
  Arun:    "#f59e0b",
  Sara:    "#ec4899",
  Naveen:  "#8b5cf6",
  Priya:   "#ef4444",
  Vikram:  "#14b8a6",
  system:  "#94a3b8",
};

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [replyIndex, setReplyIndex] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    api.chats().then(list => {
      setChats(list);
      if (list.length) setActive(list[1] || list[0]);
    });
  }, []);

  useEffect(() => {
    if (active) api.messages(active.id).then(setMessages);
  }, [active]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [messages]);

  async function send() {
    if (!text.trim() || !active) return;

    // 1. Send your message to backend
    const msg = await api.sendMessage(active.id, { sender: "Devika", text });
    setMessages(m => [...m, msg]);
    setText("");

    // 2. Auto-reply from a team member after 1.2 seconds
    const reply = AUTO_REPLIES[replyIndex % AUTO_REPLIES.length];
    setReplyIndex(i => i + 1);

    setTimeout(async () => {
      const replyMsg = await api.sendMessage(active.id, {
        sender: reply.sender,
        text: reply.text,
      });
      setMessages(m => [...m, replyMsg]);
    }, 1200);
  }

  if (!active) return <div className="page">Loading…</div>;

  return (
    <div className="chat-layout">
      <div className="chat-list">
        {chats.map(c => (
          <div
            key={c.id}
            className={`chat-list-item ${active.id === c.id ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            <div className="row">
              <span className="name">{c.name}</span>
              <span className="time">{c.last_time}</span>
            </div>
            <div className="row">
              <span className="last">{c.last_message}</span>
              {c.unread > 0 && <span className="unread">{c.unread}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h3>{active.name}</h3>
          <div className="meta">{active.members} members · ● {active.online} online</div>
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.map(m =>
            m.sender === "system" ? (
              <div key={m.id} className="system-msg">🔔 {m.text}</div>
            ) : (
              <div key={m.id} className="msg">
                <div
                  className="avatar"
                  style={{ background: AVATAR_COLORS[m.sender] || "#6366f1" }}
                >
                  {m.sender[0]}
                </div>
                <div className="msg-body">
                  <div className="msg-head">
                    <span className="msg-sender">{m.sender}</span>
                    <span className="msg-time">{m.time}</span>
                  </div>
                  <div className="msg-text">{m.text}</div>
                  <div className="msg-ndn">
                    <span>{m.ndn_name}</span>
                    <span className={`badge ${m.status === "signed" ? "success" : "warn"}`}>
                      ✓ {m.status}
                    </span>
                    <span className="badge">cacheable</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="chat-input">
          <button className="icon-btn"><Paperclip size={17} /></button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder={`Message ${active.name}…`}
          />
          <button className="icon-btn"><Smile size={17} /></button>
          <button className="btn btn-primary" onClick={send} style={{ padding: "8px 14px" }}>
            <Send size={15} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}