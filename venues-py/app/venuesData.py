from config import client
from app import app
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request, jsonify, Response
from schema import Schema, And, Use, Optional
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

      venue_schema = Schema({'name': And(str, len),
                            'description': And(str, len),
                            'address': And(str, len),
                            'owner': {
                              'id': And(str, len),
                              'ownerEmail': And(str, len)
                            }})
      
      venue = {
        'name': req_data['name'],
        'description': req_data['description'],
        'address': req_data['address'],
        'owner': {
          'id': req_data['currentUser']['id'],
          'ownerEmail': req_data['currentUser']['email']
        }
      }

      venue_schema.validate(venue)
      # if not venue_schema.is_valid(venue):
      #   raise Exception('Invalid parameters')
    except Exception as e:
      return str(e), 400

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