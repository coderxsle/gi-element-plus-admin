from fastapi import APIRouter, Depends
from app.core.deps import get_current_user

router = APIRouter(tags=["菜单"])


@router.get("/menu/routes")
def get_routes(current_user = Depends(get_current_user)):
    return {
        "code": 200,
        "message": "success",
        "data": [
            {
                "path": "/crud",
                "component": "Layout",
                "meta": {"title": "学生管理", "icon": "user"},
                "children": [
                    {
                        "path": "",
                        "component": "crud/index",
                        "meta": {"title": "学生列表"}
                    }
                ]
            }
        ]
    }