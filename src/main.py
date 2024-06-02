from typing import List
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI()
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

@app.delete("/guestbook", response_model=Guestbook)
def delete_guestbook(guestbook : Guestbook):
    db.remove(guestbook)
