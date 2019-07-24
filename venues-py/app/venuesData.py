from config import client
from app import app
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request, jsonify, Response
import json

# 

db = client.venuesdev
collection = db.venues

@app.route("/test")
def test():
  message = {
    'msg': 'test'
  }
  resp = jsonify(message)
  return resp

@app.route("/create", methods=['POST'])
def create_venue():
  try:
    try:
      req_data=request.get_json()
      name = req_data['name']
      description = req_data['description']
      address = req_data['address']
      ownerId = req_data['currentUser']['id']
      ownerEmail = req_data['currentUser']['email']
    except:
      return "", 400
    
    venue = {
      "name": name,
      "description": description,
      "address": address,
      "owner": {
        "id": ownerId,
        "ownerEmail": ownerEmail
      }
    }

    record_created = collection.insert(venue)
    return jsonify(str(record_created)), 200
  except:
    return "", 500

@app.route("/", methods=['GET'])
def getAllVenues():
  try:
    return Response(
      dumps(collection.find()),
      mimetype='application/json'
    )
  except:
    return "", 500

@app.route("/<string:venue_id>", methods=['GET'])
def getSingleVenue(venue_id):
  try:
    venue = collection.find_one({"_id": ObjectId(venue_id)})
    return Response(
      dumps(venue),
      mimetype='application/json'
    )
  except:
    return "", 500


@app.errorhandler(404)
def page_not_found(e):
  message={
    'err':{
      'msg': 'This route is currently not supported'
    }
  }
  resp = jsonify(message)
  resp.status_code = 404
  return resp