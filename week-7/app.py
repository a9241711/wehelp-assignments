from urllib import response
from flask import Flask, flash, redirect, url_for, request, render_template, session,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector,json
from mysql.connector import pooling,Error
from flask_restful import Resource, Api


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
except Error as e:
    print("Error while connecting to MySQL using Connection pool ", e)

# 建立Application物件
app = Flask(__name__)
#建立Database
# mydb = mysql.connector.connect(
#  host="localhost",
#  user="root",
#  password="root",
#  database="member"
#     )
api= Api(app) #創建api物件
app.secret_key = "mySecret"  # session的密鑰
app.config["PERMANENT_SESSION_LIFETIME"] = 600 #Session過期時間

 #建立API
class Search(Resource):
    def get(self):
        username=request.args.get("username")
        connection=connection_pool.get_connection()
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
    def post(self):
        if session.get("username"):
            username=session.get("username")
            name =session.get("name")
            newname=request.get_json() #接收json
            print(newname["name"])
            if newname["name"] =='' or newname["name"] == name:
                res={"error":"true"}
                print(res)
                return jsonify(res)
            else:
                connection=connection_pool.get_connection()
                mycursor=connection.cursor()
                update ="UPDATE member SET name=%s WHERE username=%s"
                val = (newname["name"],username)
                mycursor.execute(update,val)
                connection.commit()
                session["name"]=newname["name"]
                connection.close()#關閉connection pool
                return jsonify( {"ok":"true"})
        else:
            res={"error":"true"}
            print(res)
            return jsonify(res)
            #==json.dumps差別在於Content-Type。jsonify==application/jso。 json.dumps==text/html; charset=utf-8
api.add_resource(Search, "/api/members") #endpoint

#首頁
@app.route("/")
def index():
    successMssage=request.args.get("successMssage")
    return render_template("index.html",successMssage=successMssage)

#登入
@app.route("/signin", methods=["GET","POST"])
def signin():
    if request.method =="POST":
        username = request.form["username"]
        password = request.form["password"]
        connection=connection_pool.get_connection()
        mycursor=connection.cursor() 
        mycursor.execute("SELECT name,username,password FROM member WHERE username=%s",(username,))
        user=mycursor.fetchone()
        connection.close()#關閉connection pool
        # print(user)
        if username == "" or password == "":
            flash('請輸入帳號或密碼')
            return redirect(url_for("index"))
        if not user :
            message="帳號或密碼錯誤"
            return redirect(url_for("error",message=message))
        userpassword=user[2] #取得使用者密碼
        if not check_password_hash(userpassword,password):#驗證密碼
            message="帳號或密碼錯誤"
            return redirect(url_for("error",message=message))
        #if user exist
        session['name'] = user[0]  # 使用者存入session
        session['username']=user[1]
        print(user[0],user[1])
        flash('You were successfully logged in')
        return redirect(url_for("member"))
    return render_template("index.html")

#註冊
@app.route("/signup", methods=["GET","POST"])
def signup():
    if request.method== "POST":
        name =request.form["name"]
        username = request.form["username"]
        # password = request.form["password"]
        hashed_password = generate_password_hash(request.form["password"])
        connection=connection_pool.get_connection()  #連結connection pool
        mycursor=connection.cursor()
        mycursor.execute("SELECT username FROM member WHERE username=%s",(username,))
        finduser = mycursor.fetchone()
        
        # print(finduser)
        if finduser:
            message="帳號已被註冊"
            return redirect(url_for("error",message=message))
        register=("INSERT INTO member (name,username,password) VALUES (%s,%s,%s)")
        val=(name,username,hashed_password)
        mycursor.execute(register,val)
        connection.commit()#存入DB
        connection.close()#關閉connection pool
        successMssage="註冊成功"
    return redirect(url_for("index",successMssage=successMssage))


@app.route("/error")
def error():
    responseMessage = request.args.get("message")
    return render_template("error.html", errorMessage=responseMessage)

#會員畫面
@app.route("/member")
def member(): 
    return render_template("member.html", name=session.get("name"),username=session.get("username"))

#登出
@app.route("/signout")
def signout():
    session.pop('username', None)
    return redirect(url_for("index"))


app.config["DEBUG"] = True
if __name__ == '__main__':
    app.run(port=3000)