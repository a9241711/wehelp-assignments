import mysql.connector,json
from mysql.connector import pooling,Error

def connect():
    try:
        connection_pool=pooling.MySQLConnectionPool(#connection pool
            pool_name="test_pool",
            pool_size=20,
            pool_reset_session=True,
            host="localhost",
            database="member",
            user="root",
            password="root",
            )
        connection=connection_pool.get_connection()
        return connection
    except Error as e:
        print("Error while connecting to MySQL using Connection pool ", e)