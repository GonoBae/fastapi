from typing import List
from fastapi import FastAPI, HTTPException, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import logging


app = FastAPI()

logging.basicConfig(filename="../saved/log_file.txt", level=logging.DEBUG,
                    format="[ %(asctime)s | %(levelname)s ] %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger()

app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory='templates')

db = []

class Guestbook(BaseModel):
    id : int = 0
    title : str = "-1"

@app.get("/")
async def get_todos(request:Request):
    return templates.TemplateResponse('index.html', {'request':request})

@app.get("/guestbook")
async def get_guestbook(request:Request):
    return templates.TemplateResponse('guest.html', {'request':request})

@app.router.post("/guestbook", response_model=Guestbook)
async def create_todo(guestbook : Guestbook):
    db.append(guestbook)
    return guestbook

@app.get("/guestbook/all", response_model=List[Guestbook])
async def get_todos_all():
    return db

@app.get("/guestbook/{guest_id}", response_model=Guestbook)
def read_todo(guest_id : int):
    return db[guest_id]

@app.delete("/guestbook/{id}")
def delete_guestbook(id : int):
    #if db.__contains__(guestbook):
    #    db.remove(guestbook)
    item = next((item for item in db if item.id == id), None)
    if item:
        db.remove(item)
    else:
        raise HTTPException(status_code=404, detail="guestbook is not found")

if __name__ == "__main__":
    logger.info("Run Server")
    uvicorn.run("main:app", host="172.30.1.53", reload=True)
    logger.info("Stop Server")
