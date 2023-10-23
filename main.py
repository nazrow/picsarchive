import random
import pathlib
from typing import Optional
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

root = 'E:/YandexDisk/Фотовидеоархив'


def get_files(scope, deep):
    scope = pathlib.Path(scope)
    if not deep:
        result = [item for item in scope.iterdir() if item.is_file()]
    else:
        result = [item for item in scope.rglob('*') if item.is_file()]
    return [f'{item}'.replace('\\', '/') for item in result if f'{item}'.lower().endswith('jpg')]

@app.get('/')
async def fetch(year: str, quarter: Optional[str] = None, deep: bool = False, count: int = 100):
    scope = f'{root}/{year}'
    if quarter is not None:
        scope += f'/{quarter}'
    files = get_files(scope, deep)
    if len(files) <= count:
        result = files
    else:
        result = set()
        while len(result) < count:
            result.add(random.choice(files))
        result = list(result)
    return JSONResponse({'result': result})
