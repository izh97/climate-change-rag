#Example of querying our vectorized data
from dotenv import load_dotenv
load_dotenv()
# Turns on really noisy logging
import logging
import sys
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch
from llama_index.indices.vector_store.base import VectorStoreIndex

# Create a new client and connect to the server
client = MongoClient(os.getenv("MONGODB_URI"), server_api=ServerApi('1'))

# connect to Atlas as a vector store
store = MongoDBAtlasVectorSearch(
    client,
    db_name=os.getenv('MONGODB_DATABASE'), # this is the database where you stored your embeddings
    collection_name=os.getenv('MONGODB_VECTORS'), # this is where your embeddings were stored in 2_load_and_index.py
    index_name=os.getenv('MONGODB_VECTOR_INDEX') # this is the name of the index you created after loading your data
)
index = VectorStoreIndex.from_vector_store(store)

# query your data!
# here we have customized the number of documents returned per query to 20, because tweets are really short
query_engine = index.as_query_engine(similarity_top_k=50)
response = query_engine.query("What are major threats from global warming in Asia?")
print(response)

