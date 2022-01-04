// 作業一
function calculate(min, max) {
  // 請用你的程式補完這個函式的區塊
  let result = 0;
  for (min; min <= max; min++) {
    result += min;
  }
  //   return result;
  console.log(result);
}

calculate(1, 3); // 你的程式要能夠計算 1+2+3，最後印出 6
calculate(4, 8); // 你的程式要能夠計算 4+5+6+7+8，最後印出 30
// console.log(calculate(4, 8));

// 作業二
function avg(data) {
  // 請用你的程式補完這個函式的區塊，完成以下函式，正確計算出員工的平均薪資，請考慮員工數量會變動的情況。
  let result = 0;
  let avg;
  let employee_count = data.count;
  console.log(employee_count);
  for (let i = 0; i < data.employees.length; i++) {
    result += data.employees[i].salary;
    // console.log(result);
  }
  //   console.log(result);
  avg = result / employee_count;
  //   return avg;
  console.log(avg);
}
avg({
  count: 3,
  employees: [
    {
      name: "John",
      salary: 30000,
    },
    {
      name: "Bob",
      salary: 60000,
    },
    {
      name: "Jenny",
      salary: 50000,
    },
  ],
}); // 呼叫 avg 函式

//作業三 找出至少包含兩筆整數的列表 (Python) 或陣列 (JavaScript) 中，兩兩數字相乘後的最大值。
function maxProduct(nums) {
  // 請用你的程式補完這個函式的區塊
  let arr = [];
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (j != i) {
        result = nums[i] * nums[j];
        arr.push(result);
      }
    }
  }
  //   let max = Math.max.apply(null, arr);
  //   console.log(max);
  //try兩兩比對比大小
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    cur > max ? (max = cur) : null;
  }
  console.log(max);
}

maxProduct([5, 20, 2, 6]); // 得到 120
maxProduct([10, -20, 0, 3]); // 得到 30
maxProduct([-1, 2]); // 得到 -2
maxProduct([-1, 0, 2]); // 得到 0
maxProduct([-1, -2, 0]);

// 作業四

//雙迴圈
function twoSum(nums, target) {
  // your code here
  let sum = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (target == nums[i] + nums[j]) {
        sum.push(i, j);
      }
    }
    return sum;
  }
}
let result = twoSum([2, 11, 7, 15], 9);
console.log(result); // show [0, 2] because nums[0]+nums[2] is 9
