def calculate(min, max):
    result = 0
    for i in range(min, max+1):
        result += i
    # return(result)
    print(result)

    # 請用你的程式補完這個函式的區塊
calculate(1, 3)  # 你的程式要能夠計算 1+2+3，最後印出 6
calculate(4, 8)  # 你的程式要能夠計算 4+5+6+7+8，最後印出 30


# 作業二
def avg(data):
    employee_count = len(data["employees"])
    # print(employee_count)
    # print(len(data["employees"]))
    # print(data["employees"])
    result = 0
    avg = 0
    for d in data["employees"]:
        result += d["salary"]
        # print(d["salary"])
    # print(result)
    avg = result/employee_count
    print(avg)


    # 請用你的程式補完這個函式的區塊
avg({
    "count": 3,
    "employees": [
        {
            "name": "John",
            "salary": 30000
        },
        {
            "name": "Bob",
            "salary": 60000
        },
        {
            "name": "Jenny",
            "salary": 50000
        },
    ]
})  # 呼叫 avg 函式

# 作業三

# 時間複雜度 O(n^2)
# 取執行次數中最高次方或最大指數部份


def maxProduct(nums):
    arr = []
    for i in nums:
        for j in nums:
            if(i != j):
                result = i * j
                arr.append(result)
        # print(arr)
    # maxNum = max(arr)
    # print(maxNum)

    # try兩兩比對比大小
    maxnum = arr[0]
    for x in arr:
        cur = x
        if cur > maxnum:
            maxnum = x

    print(maxnum)


    # 請用你的程式補完這個函式的區塊
maxProduct([5, 20, 2, 6])  # 得到 120
maxProduct([10, -20, 0, 3])  # 得到 30
maxProduct([-1, 2])  # 得到 -2
maxProduct([-1, 0, 2])  # 得到 0
maxProduct([-1, -2, 0])


# 作業四

def twoSum(nums, target):
    # result_dit = dict()
    # i = 0
    # while i < len(nums):
    #     if (target - nums[i]) not in result_dit:
    #         result_dit[nums[i]] = i
    #         # print(result_dit)
    #         i += 1
    #     else:
    #         return [result_dit[target-nums[i]], i]
    result = {}
    i = 0
    for i in range(len(nums)):
        if nums[i] > target:
            continue
        if target - nums[i] in nums:
            result[nums[i]] = i
    return(result.values(), result)


# your code here
result = twoSum([2, 11, 7, 15], 9)
print(result)  # show [0, 2] because nums[0]+nums[2] is 9


# 作業五

def maxZeros(nums):
    temp = 0
    max = 0
    for i in nums:
        if(i == 0):
            temp += 1
        else:
            temp = 0
        if temp > max:
            max = temp
    print(max)

    # 請用你的程式補完這個函式的區塊
maxZeros([0, 1, 0, 0])  # 得到 2
maxZeros([1, 0, 0, 0, 0, 1, 0, 1, 0, 0])  # 得到 4
maxZeros([1, 1, 1, 1, 1])  # 得到 0
maxZeros([0, 0, 0, 1, 1])  # 得到 3
