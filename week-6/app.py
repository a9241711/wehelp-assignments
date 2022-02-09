from urllib import response
from flask import Flask, flash, redirect, url_for, request, render_template, session
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector




# 建立Application物件
app = Flask(__name__)
#建立Database
mydb = mysql.connector.connect(
 host="localhost",
 user="root",
 password="root",
 database="member"
    )

mycursor = mydb.cursor()
app.secret_key = "mySecret"  # session的密鑰
app.config["PERMANENT_SESSION_LIFETIME"] = 600

 

@app.route("/")
def index():
    successMssage=request.args.get("successMssage")
    return render_template("index.html",successMssage=successMssage)


@app.route("/signin", methods=["GET","POST"])
def signin():
    if request.method =="POST":
        username = request.form["username"]
        password = request.form["password"]
        mycursor.execute("SELECT name,username,password FROM member WHERE username=%s",(username,))
        user=mycursor.fetchone()
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
        session['username'] = user[0]  # 使用者存入session
        flash('You were successfully logged in')
        return redirect(url_for("member", username=username))
    return render_template("index.html")

@app.route("/signup", methods=["GET","POST"])
def signup():
    if request.method== "POST":
        name =request.form["name"]
        username = request.form["username"]
        # password = request.form["password"]
        hashed_password = generate_password_hash(request.form["password"])
        mycursor.execute("SELECT username FROM member WHERE username=%s",(username,))
        finduser = mycursor.fetchone()
        # print(finduser)
        if finduser:
            message="帳號已被註冊"
            return redirect(url_for("error",message=message))
        register=("INSERT INTO member (name,username,password) VALUES (%s,%s,%s)")
        val=(name,username,hashed_password)
        mycursor.execute(register,val)
        mydb.commit()   
        successMssage="註冊成功"
    return redirect(url_for("index",successMssage=successMssage))


@app.route("/error")
def error():
    responseMessage = request.args.get("message")
    return render_template("error.html", errorMessage=responseMessage)


@app.route("/member")
def member(): 
    return render_template("member.html", username=session.get("username"))


@app.route("/signout")
def signout():
    session.pop('username', None)
    return redirect(url_for("index"))


app.config["DEBUG"] = True
if __name__ == '__main__':
    app.run(port=3000)