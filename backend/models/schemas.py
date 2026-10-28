from pydantic import BaseModel
from typing import Optional, List

class User(BaseModel):
    id: str
    name: str
    role: str
    status: str
    last_active: str
    avatar_color: str

class Message(BaseModel):
    id: str
    chat_id: str
    sender: str
    text: str
    time: str
    ndn_name: str
    status: str

class Chat(BaseModel):
    id: str
    name: str
    members: int
    online: int
    last_message: str
    last_time: str
    unread: int
    ndn_prefix: str

class FileItem(BaseModel):
    id: str
    name: str
    type: str
    size: str
    owner: str
    date: str
    ndn_name: str
    cached: bool
    cached_on: Optional[str] = None
    signed: bool = True
    hash: str = ""

class Node(BaseModel):
    id: str
    name: str
    status: str
    ip: str
    ndn_prefix: str
    cached: int
    requests: int
    cache_hits: int
    latency_ms: int
    x: int
    y: int

class ActivityItem(BaseModel):
    id: str
    time: str
    type: str
    message: str
    ndn_name: Optional[str] = None

class Module(BaseModel):
    id: str
    name: str
    tasks: List[dict]
