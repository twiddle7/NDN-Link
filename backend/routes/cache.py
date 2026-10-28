from fastapi import APIRouter
from data.seed import NODES
from services.cache_service import get_cache_stats
from services.ndn_service import ndn

router = APIRouter(prefix="/api/cache", tags=["cache"])

@router.get("")
def cache_items():
    return ndn.get_cache_status()

@router.get("/stats")
def cache_stats():
    return get_cache_stats(NODES)

@router.get("/activity")
def cache_activity():
    return ndn.get_activity()
