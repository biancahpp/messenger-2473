from online_users import online_users

import socketio
import os
async_mode = None


basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(async_mode=async_mode, logger=False,
                      cors_allowed_origins=['http://localhost:3000'])
thread = None


@sio.event
def connect(sid, environ):
    print('connected')
    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid)


@sio.on("go-online")
def go_online(sid, user_id):
    print('go-online connected')
    if user_id not in online_users:
        online_users.append(user_id)
    sio.emit("add-online-user", user_id, skip_sid=sid)


@sio.on("new-message")
def new_message(sid, message):
    print('new message')
    sio.emit(
        "new-message",
        {"message": message["message"], "sender": message["sender"]},
        skip_sid=sid,
    )


@sio.on("logout")
def logout(sid, user_id):
    if user_id in online_users:
        online_users.remove(user_id)
    sio.emit("remove-offline-user", user_id, skip_sid=sid)
