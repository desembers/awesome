from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:str #str해야 int면 서버가 받지 않는다  
    content:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return "메모 추가에 성공했습니다."

app.mount("/", StaticFiles(directory='static', html=True), name='static')
