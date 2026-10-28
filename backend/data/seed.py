USERS = [
    {"id": "u1", "name": "Devika",  "role": "Team Lead",        "status": "online",  "last_active": "now",        "avatar_color": "#6366f1"},
    {"id": "u2", "name": "Kriswin", "role": "Backend Dev",      "status": "online",  "last_active": "now",        "avatar_color": "#0ea5e9"},
    {"id": "u3", "name": "Hrithik", "role": "Frontend Dev",     "status": "online",  "last_active": "now",        "avatar_color": "#10b981"},
    {"id": "u4", "name": "Arun",    "role": "Network Engineer", "status": "away",    "last_active": "12 min ago", "avatar_color": "#f59e0b"},
    {"id": "u5", "name": "Priya",   "role": "Tester",           "status": "offline", "last_active": "1 hr ago",   "avatar_color": "#ef4444"},
    {"id": "u6", "name": "Naveen",  "role": "Docs",             "status": "online",  "last_active": "now",        "avatar_color": "#8b5cf6"},
    {"id": "u7", "name": "Sara",    "role": "UI/UX",            "status": "online",  "last_active": "now",        "avatar_color": "#ec4899"},
    {"id": "u8", "name": "Vikram",  "role": "Mentor",           "status": "away",    "last_active": "30 min ago", "avatar_color": "#14b8a6"},
]

CHATS = [
    {"id": "c1", "name": "Team General",      "members": 8, "online": 5, "last_message": "Welcome to NDN-Link",          "last_time": "09:12", "unread": 0, "ndn_prefix": "/ndn-link/chat/general"},
    {"id": "c2", "name": "Computer Networks", "members": 8, "online": 5, "last_message": "I uploaded the project report", "last_time": "10:42", "unread": 2, "ndn_prefix": "/ndn-link/chat/computer-networks"},
    {"id": "c3", "name": "Project Team",      "members": 6, "online": 4, "last_message": "Let's finish the demo",        "last_time": "11:05", "unread": 0, "ndn_prefix": "/ndn-link/chat/project-team"},
    {"id": "c4", "name": "Development",       "members": 4, "online": 3, "last_message": "NDN service layer is ready",   "last_time": "11:40", "unread": 1, "ndn_prefix": "/ndn-link/chat/development"},
    {"id": "c5", "name": "Testing",           "members": 3, "online": 1, "last_message": "Cache hit working",            "last_time": "12:02", "unread": 0, "ndn_prefix": "/ndn-link/chat/testing"},
]

MESSAGES = {
    "c2": [
        {"id": "m1", "chat_id": "c2", "sender": "Devika",  "text": "I uploaded the project report.", "time": "10:40", "ndn_name": "/ndn-link/chat/computer-networks/message/001", "status": "signed"},
        {"id": "m2", "chat_id": "c2", "sender": "Kriswin", "text": "I'll check it now.",             "time": "10:41", "ndn_name": "/ndn-link/chat/computer-networks/message/002", "status": "signed"},
        {"id": "m3", "chat_id": "c2", "sender": "system",  "text": "project-report.pdf is available from cache.", "time": "10:42", "ndn_name": "/ndn-link/chat/computer-networks/system/003", "status": "cached"},
    ],
    "c1": [{"id": "m4", "chat_id": "c1", "sender": "Devika",  "text": "Welcome to NDN-Link.",         "time": "09:12", "ndn_name": "/ndn-link/chat/general/message/001", "status": "signed"}],
    "c3": [{"id": "m5", "chat_id": "c3", "sender": "Hrithik", "text": "Let's finish the demo.",       "time": "11:05", "ndn_name": "/ndn-link/chat/project-team/message/001", "status": "signed"}],
    "c4": [{"id": "m6", "chat_id": "c4", "sender": "Kriswin", "text": "NDN service layer is ready.",  "time": "11:40", "ndn_name": "/ndn-link/chat/development/message/001", "status": "signed"}],
    "c5": [{"id": "m7", "chat_id": "c5", "sender": "Priya",   "text": "Cache hit working.",           "time": "12:02", "ndn_name": "/ndn-link/chat/testing/message/001", "status": "signed"}],
}

FILES = [
    {"id": "f1", "name": "project-report.pdf",       "type": "PDF",          "size": "2.4 MB", "owner": "Devika",  "date": "2025-01-14", "ndn_name": "/college/cn/teamA/files/project-report.pdf",       "cached": True,  "cached_on": "Node C", "signed": True, "hash": "a1b2c3d4"},
    {"id": "f2", "name": "network-design.pdf",       "type": "PDF",          "size": "1.8 MB", "owner": "Kriswin", "date": "2025-01-14", "ndn_name": "/college/cn/teamA/files/network-design.pdf",       "cached": False, "cached_on": None,     "signed": True, "hash": "e5f6a7b8"},
    {"id": "f3", "name": "presentation.pptx",        "type": "Presentation", "size": "5.1 MB", "owner": "Hrithik", "date": "2025-01-13", "ndn_name": "/college/cn/teamA/files/presentation.pptx",        "cached": True,  "cached_on": "Node B", "signed": True, "hash": "c9d0e1f2"},
    {"id": "f4", "name": "research-notes.docx",      "type": "Document",     "size": "640 KB", "owner": "Arun",    "date": "2025-01-12", "ndn_name": "/college/cn/teamA/files/research-notes.docx",      "cached": False, "cached_on": None,     "signed": True, "hash": "a3b4c5d6"},
    {"id": "f5", "name": "architecture.png",         "type": "Image",        "size": "820 KB", "owner": "Sara",    "date": "2025-01-11", "ndn_name": "/college/cn/teamA/files/architecture.png",         "cached": True,  "cached_on": "Node C", "signed": True, "hash": "e7f8a9b0"},
    {"id": "f6", "name": "project-notes.docx",       "type": "Document",     "size": "410 KB", "owner": "Naveen",  "date": "2025-01-10", "ndn_name": "/college/cn/teamA/files/project-notes.docx",       "cached": False, "cached_on": None,     "signed": True, "hash": "c1d2e3f4"},
    {"id": "f7", "name": "project-report-final.pdf", "type": "PDF",          "size": "2.6 MB", "owner": "Devika",  "date": "2025-01-15", "ndn_name": "/college/cn/teamA/files/project-report-final.pdf", "cached": False, "cached_on": None,     "signed": True, "hash": "a5b6c7d8"},
]

NODES = [
    {"id": "A", "name": "Node A", "status": "online",  "ip": "10.0.0.1", "ndn_prefix": "/college/cn/teamA", "cached": 8,  "requests": 94, "cache_hits": 51, "latency_ms": 4, "x": 50, "y": 10},
    {"id": "B", "name": "Node B", "status": "online",  "ip": "10.0.0.2", "ndn_prefix": "/college/cn/teamB", "cached": 11, "requests": 63, "cache_hits": 38, "latency_ms": 6, "x": 15, "y": 45},
    {"id": "C", "name": "Node C", "status": "online",  "ip": "10.0.0.3", "ndn_prefix": "/college/cn/teamC", "cached": 14, "requests": 82, "cache_hits": 61, "latency_ms": 5, "x": 50, "y": 50},
    {"id": "D", "name": "Node D", "status": "online",  "ip": "10.0.0.4", "ndn_prefix": "/college/cn/teamD", "cached": 6,  "requests": 41, "cache_hits": 22, "latency_ms": 9, "x": 85, "y": 45},
    {"id": "E", "name": "Node E", "status": "offline", "ip": "10.0.0.5", "ndn_prefix": "/college/cn/teamE", "cached": 3,  "requests": 27, "cache_hits": 10, "latency_ms": 0, "x": 50, "y": 88},
]

ACTIVITY = [
    {"id": "a1", "time": "17:42:10", "type": "interest",  "message": "Interest requested",       "ndn_name": "/college/cn/teamA/files/project-report.pdf"},
    {"id": "a2", "time": "17:42:11", "type": "interest",  "message": "Forwarded to Node C",      "ndn_name": "/college/cn/teamA/files/project-report.pdf"},
    {"id": "a3", "time": "17:42:12", "type": "cache_hit", "message": "Cache HIT on Node C",      "ndn_name": "/college/cn/teamA/files/project-report.pdf"},
    {"id": "a4", "time": "17:42:12", "type": "data",      "message": "Data delivered to Devika", "ndn_name": "/college/cn/teamA/files/project-report.pdf"},
    {"id": "a5", "time": "17:43:02", "type": "security",  "message": "Signature verified",       "ndn_name": "/college/cn/teamA/files/project-report.pdf"},
]

MODULES = [
    {"id": "mod1", "name": "Computer Networks", "tasks": [
        {"id": "t1", "name": "Mini Project", "done": False},
        {"id": "t2", "name": "Lab Work",     "done": True},
        {"id": "t3", "name": "Assignment",   "done": False},
    ]},
    {"id": "mod2", "name": "AIML", "tasks": [
        {"id": "t4", "name": "SVM",            "done": True},
        {"id": "t5", "name": "PCA",            "done": False},
        {"id": "t6", "name": "Neural Network", "done": False},
    ]},
    {"id": "mod3", "name": "Software Engineering", "tasks": [
        {"id": "t7", "name": "UML",   "done": True},
        {"id": "t8", "name": "Agile", "done": False},
    ]},
]
