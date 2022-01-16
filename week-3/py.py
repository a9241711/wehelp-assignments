# import urllib.request as request
# import json
# import csv

# src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
# with request.urlopen(src) as response:
#     data = json.load(response)  # 透過Json模組處理json格式
# # print(data)

# # 取得要的資料景點名稱,區域,經度,緯度,第一張圖檔網址
# list = data["result"]["results"]
# header = ["地點", "地址", "經度", "緯度", "圖片"]

# # 轉換成csv
# with open("data.csv", "w", newline='', encoding="utf-8-sig") as file:
#     csv_output = csv.DictWriter(file, fieldnames=header)
#     csv_output.writeheader()
#     for item in list:
#         title = item["stitle"]
#         address = item["address"][5:8]
#         longitude = item["longitude"]
#         latitude = item["latitude"]
#         files = "https://" + item["file"].split("https://")[1]
#         # print(title, address, files)
#         file.write(title+","+address+","+longitude+","+latitude+","+files+"\n")


# 練習復刻上方程式碼
from encodings import utf_8_sig
import urllib.request as request
import json
import csv

url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
with request.urlopen(url) as request:  # urlopen，因為來源是JSON格式的url
    data = json.load(request)


with open("csv2.csv", "w", newline="",  encoding="utf_8_sig") as file:
    list = data["result"]["results"]
    # print(list)
    header = ["景點", "城市", "經度", "緯度", "照片"]
    writer = csv.writer(file)
    writer.writerow(header)
    for item in list:
        stitle = item["stitle"]
        # print(stitle)
        city = item["address"][4:8]
        latitude = item["latitude"]
        longitude = item["longitude"]
        files = "https://" + item["file"].split("https://")[1].lower()
        file.write(stitle+","+city+","+latitude+","+longitude+","+files+"\n")
