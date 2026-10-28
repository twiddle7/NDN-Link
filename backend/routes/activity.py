from fastapi import APIRouter
from data.seed import ACTIVITY
from services.ndn_service import ndn

router = APIRouter(prefix="/api/activity", tags=["activity"])

@router.get("")
def activity():
    return ACTIVITY + ndn.get_activity()
