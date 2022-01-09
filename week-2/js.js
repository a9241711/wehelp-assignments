// 作業一
function calculate(min, max) {
  // 請用你的程式補完這個函式的區塊
  //   let result = 0;
  //   for (min; min <= max; min++) {
  //     result += min;
  //   }
  let result = ((min + max) * (max-min+1)) / 2;
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
  //時間複雜度O(n^2)，取執行次數中最高次方或最大指數部份，用了兩個迴圈，所以是n*n的次數
  // let arr = [];
  // let result = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = 0; j < nums.length; j++) {
  //     if (j != i) {
  //       result = nums[i] * nums[j];
  //       arr.push(result);
  //     }
  //   }
  // }
  // //   let max = Math.max.apply(null, arr);
  // //   console.log(max);
  // //try兩兩比對比大小
  // let max = arr[0];
  // for (let i = 1; i < arr.length; i++) {
  //   let cur = arr[i];
  //   cur > max ? (max = cur) : null;
  // }
  // console.log(max);

  //方法二//Sort寫法

//   nums.sort(function(a,b){
//     return a-b;
//   })
//   let newarr =nums.slice(-2)
//   let result= newarr[0]*newarr[1]
//   console.log(result)
// }

///方法三，選擇排序
    
    // for(let i=0;i<nums.length;i++){
    //   let min_num= nums[i];
    //   let min_index=i;
    //   for(let j=i; j<nums.length-1; j++){
    //     if(min_num > nums[j]){
    //       min_num =nums[j];
    //       min_index = j;
    //     }
    //   }[nums[min_index],nums[i]]=[nums[i],nums[min_index]]; 
    //   //第一次[2:5,0:2]//第二次[2:20,1:5]//第三次[3:20,2:6]
    // }console.log(nums);
    // let twoMax= nums.slice(-2);
    // let result = twoMax[0]*twoMax[1];
    // console.log(result)

    //方法四插入法

    for(let i =1;i<nums.length;i++){
      let position =i;
      let value = nums[i]
      while( position>=0 && value <nums[position-1]){
        console.log('i:',position,nums[position],value);
        [nums[position],nums[position-1]]=[nums[position-1],nums[position]]
        position--;
        console.log(position,nums,value)
      }
      console.log("ANY"+nums[position])
      // nums[position]=value;
      console.log(nums)
     
    }
  }
maxProduct([50, 20, 2, 6]); // 得到 120
maxProduct([5, 20, 200, 600,6700,6800]); 
// maxProduct([10, -20, 0, 3]); // 得到 30
// maxProduct([-1, 2]); // 得到 -2
// maxProduct([-1, 0, 2]); // 得到 0
// maxProduct([-1, -2, 0]);

// 作業四

//雙迴圈
function twoSum(nums, target) {
  // your code here
  //   let sum = [];
  //   for (let i = 0; i < nums.length; i++) {
  //     for (let j = i; j < nums.length; j++) {
  //       if (target == nums[i] + nums[j]) {
  //         sum.push(i, j);
  //       }
  //     }
  //     return sum;
  //   }[2, 11, 7, 15], 9)
    let arr=[];
    for (let i=0; i<nums[i];i++){
      if( nums[i]> target){
        continue;
      }
      if(nums.includes(target-nums[i])){
        arr.push(i)
      }
    console.log(arr)
    }
}

//   let sum = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] > target) {
//       continue;
//     }
//     if (nums.includes(target - nums[i])) {
//       sum.push(i);
//     }
//   }
//   return sum;
// }
let result = twoSum([2, 11, 7, 15], 9);
console.log(result); // show [0, 2] because nums[0]+nums[2] is 9

//作業五

function maxZeros(nums) {
  // 請用你的程式補完這個函式的區塊
  // let arr = [];
  // let count = 0;
  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] == 0) {
  //     count++;
  //   } else if (nums[i] == 1) {
  //     arr.push(count);
  //     count = 0;
  //   } else {
  //     if (count != 0) {
  //       arr.push(count);
  //       count = 0;
  //     }
  //   }
  //   if (count != 0) {
  //     arr.push(count);
  //   }
  // }
  // //   let max = Math.max.apply(null, arr);
  // //   console.log(max);
  // let max = arr[0];
  // for (let i = 0; i < arr.length; i++) {
  //   let cur = arr[i];
  //   if (cur > max) {
  //     max = cur;
  //   } else {
  //     null;
  //   }
  // }
  // console.log(max);
  let temp=0;
  let max =0;
  for (let i =0; i<nums.length;i++){
    if(nums[i]==0){
      temp +=1;
    }else{
      temp=0
    }
    if(temp>max){
      max=temp
    }
  }console.log(max)
}
maxZeros([0, 1, 0, 0]); // 得到 2
maxZeros([1, 0, 0, 0, 0, 1, 0, 1, 0, 0]); // 得到 4
maxZeros([1, 1, 1, 1, 1]); // 得到 0
maxZeros([0, 0, 0, 1, 1]); // 得到 3
