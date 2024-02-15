## This script imports the cleaned_climate_data.json file into our mongo database
json_file = 'cleaned_climate_data.json'

# Load environment variables from local .env file
from dotenv import load_dotenv
load_dotenv()

import os
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Load the climate data from a local file
with open(json_file,"r", encoding="utf-8") as f:
    climate = json.load(f)
# Create a new client and connect to the server
client = MongoClient(os.getenv("MONGODB_URI"), server_api=ServerApi('1'))
db = client[os.getenv('MONGODB_DATABASE')]
collection = db[os.getenv("MONGODB_COLLECTION")]

# Insert the tweets into mongo
collection.insert_many(climate)
