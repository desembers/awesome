from fastapi import FastAPI #백엔드드
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:str #str해야 int면 서버가 받지 않는다  
    content:str 

memos = []

app = FastAPI()

@app.get("/memos") #서버 받을 준비
def read_memo():
    return memos 

@app.post("/memos") #js에 createMemo함수 
def create_memo(memo:Memo):
    memos.append(memo)
    return "메모 추가에 성공했습니다."

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content=req_memo.centent
            return '성공했습니다.'
        return '그런 메모는 없습니다.'

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
     for index,memo in enumerate(memos):
        if memo.id == memo_id:
            memos.pop(index)
            return '성공했습니다.'
        return '그런 메모는 없습니다.'

app.mount("/", StaticFiles(directory='static', html=True), name='static')
#서버 static 파일에 html을 호스팅 해줘라 html=True 

