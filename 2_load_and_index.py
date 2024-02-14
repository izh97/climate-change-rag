## This script loads data from a mongo database into an index
from dotenv import load_dotenv
load_dotenv()
import os
from llama_index.readers.mongo import SimpleMongoReader
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch #discontinued, can now be accessed at llama_index.legacy.vector_stores.mongodb
from llama_index.indices.vector_store.base import VectorStoreIndex #can now be accessed at llama_index.core.indices.vector_store.base
from llama_index.storage.storage_context import StorageContext

# load objects from mongo and convert them into LlamaIndex Document objects
query_dict = {}
reader = SimpleMongoReader(uri=os.getenv("MONGODB_URI"))
documents = reader.load_data(
    os.getenv("MONGODB_DATABASE"),
    os.getenv("MONGODB_COLLECTION"), 
    field_names=["content"], 
                               
    query_dict=query_dict 
)

# Create a new client and connect to the server
client = MongoClient(os.getenv("MONGODB_URI"), server_api=ServerApi('1'))

# create Atlas as a vector store
store = MongoDBAtlasVectorSearch(
    client,
    db_name=os.getenv('MONGODB_DATABASE'),
    collection_name=os.getenv('MONGODB_VECTORS'), 
    index_name=os.getenv('MONGODB_VECTOR_INDEX') 
)

# now create an index from all the Documents and store them in Atlas
storage_context = StorageContext.from_defaults(vector_store=store)
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context,
    show_progress=True, 
)


