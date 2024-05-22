from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory='templates')

db = []

class Todo(BaseModel):
    id : int
    title : str
    desc : str

@app.get("/todos")
async def get_todos(request:Request):
    return templates.TemplateResponse('index.html', {'request':request})

@app.post("/todos", response_model=Todo)
async def create_todo(todo : Todo):
    global db
    new_todo = Todo(id=len(db), title=todo.title, desc=todo.desc)
    db.append(new_todo)
    return new_todo

@app.get('api/button')
async def create(todo : Todo):
    global db
    new_todo = Todo(id=len(db), title=todo.title, desc=todo.desc)
    db.append(new_todo)
    return new_todo
