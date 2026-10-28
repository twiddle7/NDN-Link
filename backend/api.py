from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, chats, files, network, cache, activity, modules, ndn_tools

app = FastAPI(title="NDN-Link API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(chats.router)
app.include_router(files.router)
app.include_router(network.router)
app.include_router(cache.router)
app.include_router(activity.router)
app.include_router(modules.router)
app.include_router(ndn_tools.router)

@app.get("/")
def root():
    return {"app": "NDN-Link", "status": "running", "ndn_layer": "simulated"}
