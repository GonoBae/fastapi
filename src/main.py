from typing import List
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory='templates')

db = []

class Todo(BaseModel):
    id : int = -1
    title : str = "-1"

@app.get("/")
async def get_todos(request:Request):
    return templates.TemplateResponse('index.html', {'request':request})


@app.router.post("/todos", response_model=Todo)
async def create_todo(todo : Todo):
    db.append(todo)
    return todo

@app.get("/todos/all", response_model=List[Todo])
async def get_todos_all():
    return db

@app.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id : int):
    return db[todo_id]
