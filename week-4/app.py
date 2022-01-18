from urllib import response
from flask import Flask, flash, redirect, url_for, request, render_template, session

# 建立Application物件
app = Flask(__name__)

app.secret_key = "mySecret"  # session的密鑰
app.config["PERMANENT_SESSION_LIFETIME"] = 600


@app.route("/")
def index():
    return render_template("index.html", name="Tony")


@app.route("/signin", methods=["POST"])
def signin():
    # name = request.args.get("name", "Tony")  # GET 取得參數方式
    # session["username"] = name  # session["欄位名稱"]=資料
    userName = request.form["username"]
    password = request.form["password"]
    if userName == "" or password == "":
        return redirect(url_for("error", message="請輸入帳號、密碼"))
    if userName == "test" and password == "test":
        session["username"] = userName  # 使用者存入session
        session['auth'] = "success"  # 存入session驗證狀態
        flash('You were successfully logged in')
        return redirect(url_for("member"))
    if userName != "test" or password != "test":
        return redirect(url_for("error", message="帳號、或密碼輸入錯誤"))


@app.route("/error")
def error():
    responseMessage = request.args.get("message")
    return render_template("error.html", errorMessage=responseMessage)


@app.route("/member")
def member():
    if "auth" not in session:  # 驗證session
        return redirect(url_for("index"))
    userName = session.get("username")
    auth = session.get("auth")
    return render_template("member.html", userName=userName, auth=auth)


@app.route("/logout")
def logout():
    session.pop('auth', None)
    return redirect(url_for("index"))


app.config["DEBUG"] = True
if __name__ == '__main__':
    app.run(port=3000)
