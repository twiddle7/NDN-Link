from fastapi import APIRouter
from data.seed import USERS

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("")
def list_users():
    return USERS

@router.get("/online")
def online_users():
    return [u for u in USERS if u["status"] == "online"]
