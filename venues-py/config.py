from pymongo import MongoClient

DATABASE = MongoClient()['venuesdev']
DEBUG = True
client = MongoClient('localhost', 27017)