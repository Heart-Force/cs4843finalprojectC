import datetime
import uuid
from flask import Blueprint, request, jsonify, Flask, make_response
from werkzeug.security import generate_password_hash,check_password_hash
from functools import wraps
import jwt
from firebase_admin import firestore

db = firestore.client()
todos_collection_ref = db.collection('todos')
users_collection_ref = db.collection('users')

todoApi = Blueprint('todoApi', __name__)

SECRET_KEY = '004f2af45d3a4e161a7dd2d17fdae47f'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'message': 'a valid token is missing'})

        try:
            # remove Bearer from jwt token
            data = jwt.decode(token.split(' ')[1], SECRET_KEY, algorithms=["HS256"])
        except:
            return jsonify({'message': 'token is invalid'})

        return f(*args, **kwargs)

    return decorator


@todoApi.before_request
def pre_request_processor():
    """
        pre_request_processor() : Method is executed for every request
        to the API. It updates the header to allow Cross Origin.
    """
    if request.method == 'OPTIONS':
        headers = {
            # 'Access-Control-Allow-Origin': 'https://mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
            # 'Access-Control-Allow-Credentials': 'true'
        }
        return '', 204, headers


@todoApi.route('/add', methods=['POST'])
@token_required
def create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        todo_id = uuid.uuid4()
        new_request = request.json
        new_request['id'] = todo_id.hex
        todos_collection_ref.document(todo_id.hex).set(new_request)

        response = jsonify({"success": True})
        response.headers.set('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@todoApi.route('/list', methods=['GET'])
@token_required
def read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        user_id = request.args.get('id')
        item_id = request.args.get('itemId')
        if item_id:
            todo = todos_collection_ref.document(item_id).get()
            response = jsonify(todo.to_dict())
            response.headers.set('Access-Control-Allow-Origin', '*')
            return response, 200
        if user_id:
            user_todos = [doc.to_dict() for doc in todos_collection_ref.where(u'user_id', u'==', user_id).get()]
            response = jsonify(user_todos)
            response.headers.set('Access-Control-Allow-Origin', '*')
            return response, 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@todoApi.route('/update', methods=['POST', 'PUT'])
@token_required
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """

    try:
        todo_id = request.json['id']
        todos_collection_ref.document(todo_id).update(request.json)
        response = jsonify({"success": True})
        response.headers.set('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@todoApi.route('/delete', methods=['GET', 'DELETE'])
@token_required
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        todos_collection_ref.document(todo_id).delete()
        response = jsonify({"success": True})
        response.headers.set('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@todoApi.route('/user/add', methods=['POST'])
def create_ser():
    """
        create_ser() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        user_id = uuid.uuid4()
        new_request = request.json
        new_request['id'] = user_id.hex

        hashed_password = generate_password_hash(new_request['password'], method='sha256')
        new_request['password'] = hashed_password

        users_collection_ref.document(user_id.hex).set(new_request)

        response = jsonify({"success": True})
        response.headers.set('Access-Control-Allow-Origin', '*')

        return response, 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@todoApi.route('/user/login', methods=['POST'])
def login_user():
    auth = request.authorization

    auth = request.json

    if not auth or not auth['username'] or not auth['password']:
        return make_response('could not verify', 401, {'Authentication': 'login required"'})

    users = users_collection_ref.where(u'username', u'==', auth['username']).get()

    user = {}
    for item in users:
        user = item.to_dict()

    if user != {}:
        if check_password_hash(user['password'], auth['password']):
            token = jwt.encode(
                {'id': user['id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45)},
                SECRET_KEY, "HS256")

            response = jsonify({'token': token, 'userId': user['id'], 'username': user['username']})
            response.headers.set('Access-Control-Allow-Origin', '*')

            return response, 200

        response = jsonify({'Authentication': 'Could not verify'})
        response.headers.set('Access-Control-Allow-Origin', '*')
        return response, 401
    else:
        response = jsonify({'Authentication': 'Could not verify'})
        response.headers.set('Access-Control-Allow-Origin', '*')
        return response, 401
