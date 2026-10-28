from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from data.seed import CHATS, MESSAGES
from services.ndn_service import ndn

router = APIRouter(prefix="/api/chats", tags=["chats"])

class NewMessage(BaseModel):
    sender: str
    text: str

@router.get("")
def list_chats():
    return CHATS

@router.get("/{chat_id}/messages")
def get_messages(chat_id: str):
    return MESSAGES.get(chat_id, [])

@router.post("/{chat_id}/messages")
def send_message(chat_id: str, body: NewMessage):
    chat = next((c for c in CHATS if c["id"] == chat_id), None)
    if not chat:
        return {"error": "chat not found"}
    msg_id = f"m{len(MESSAGES.get(chat_id, [])) + 1}"
    ndn_name = f"{chat['ndn_prefix']}/message/{msg_id}"
    ndn.publish_data(ndn_name, body.text)
    msg = {
        "id": msg_id, "chat_id": chat_id, "sender": body.sender,
        "text": body.text, "time": datetime.now().strftime("%H:%M"),
        "ndn_name": ndn_name, "status": "signed",
    }
    MESSAGES.setdefault(chat_id, []).append(msg)
    return msg
