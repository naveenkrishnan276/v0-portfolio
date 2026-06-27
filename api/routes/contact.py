"""
Contact messages API routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/messages", response_model=schemas.ContactMessageResponse)
def send_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact form message"""
    return crud.create_contact_message(db, message)


@router.get("/messages", response_model=List[schemas.ContactMessageResponse])
def get_messages(
    unread_only: bool = Query(False, description="Filter to show only unread messages"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all contact messages (admin endpoint)"""
    return crud.get_contact_messages(db, unread_only=unread_only, skip=skip, limit=limit)


@router.get("/messages/{message_id}", response_model=schemas.ContactMessageResponse)
def get_message(message_id: int, db: Session = Depends(get_db)):
    """Get a single message by ID"""
    message = crud.get_contact_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.patch("/messages/{message_id}/read", response_model=schemas.ContactMessageResponse)
def mark_as_read(message_id: int, db: Session = Depends(get_db)):
    """Mark a message as read"""
    message = crud.mark_message_as_read(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.delete("/messages/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    """Delete a message"""
    message = crud.delete_contact_message(db, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted successfully"}
