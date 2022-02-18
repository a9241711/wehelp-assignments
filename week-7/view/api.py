from database import connect
from flask import session,jsonify ,Blueprint,request
api= Blueprint("app",__name__,url_prefix='/api')

@api.route("/members",methods=["GET"])
def Search():
    username=request.args.get("username")
    connection=connect()
    mycursor=connection.cursor()
    mycursor.execute("SELECT id,name,username from member WHERE username=%s",(username,))
    user=mycursor.fetchone()
    connection.close()#關閉connection pool
    if user:
        return {"data": {
                "id":user[0],
                "name":user[1],
                "username":user[2]
                    }
                }
    else:
        return{"data":None
            }

@api.route("/member",methods=["POST"])
def Update():
    if session.get("username"):
        username=session.get("username")
        name =session.get("name")
        newname=request.get_json() #接收json
        # print(newname["name"],username)
        if newname["name"] =='' or newname["name"] == name:
            res={"error":True} 
            print(res)
            return jsonify(res)
        else:
            connection=connect()
            mycursor=connection.cursor()
            update ="UPDATE member SET name=%s WHERE username=%s"
            val = (newname["name"],username)
            mycursor.execute(update,val)
            connection.commit()
            session["name"]=newname["name"]
            connection.close()#關閉connection pool
            return jsonify( {"ok":True})
    else:
        res={"error":True}
        print(res)
        return jsonify(res)
        #==json.dumps差別在於Content-Type。jsonify==application/jso。 json.dumps==text/html; charset=utf-8