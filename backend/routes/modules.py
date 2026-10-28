from fastapi import APIRouter
from pydantic import BaseModel
from data.seed import MODULES

router = APIRouter(prefix="/api/modules", tags=["modules"])


class NewTask(BaseModel):
    name: str
    module: str
    done: bool = False


@router.get("")
def modules():
    return MODULES


@router.get("/tasks")
def tasks():
    out = []
    for m in MODULES:
        for t in m["tasks"]:
            out.append({**t, "module": m["name"]})
    return out


@router.post("/tasks")
def add_task(body: NewTask):
    # Find the module by name
    module = next((m for m in MODULES if m["name"] == body.module), None)
    if not module:
        return {"error": f"module '{body.module}' not found"}

    # Create a new task id
    new_id = f"t{sum(len(m['tasks']) for m in MODULES) + 1}"

    task = {"id": new_id, "name": body.name, "done": body.done}
    module["tasks"].append(task)
    return {**task, "module": module["name"]}


@router.patch("/tasks/{task_id}/toggle")
def toggle_task(task_id: str):
    for m in MODULES:
        for t in m["tasks"]:
            if t["id"] == task_id:
                t["done"] = not t["done"]
                return {**t, "module": m["name"]}
    return {"error": "task not found"}


@router.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    for m in MODULES:
        for i, t in enumerate(m["tasks"]):
            if t["id"] == task_id:
                removed = m["tasks"].pop(i)
                return {"deleted": removed}
    return {"error": "task not found"}