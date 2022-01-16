// function get(url){
//     return new Promise((resolve,reject)=>{
//         //定義http
//     let req= new XMLHttpRequest();
//     req.open("GET", url , true);
//     req.onload=function(){
//         if (req.status==200){
//             resolve(JSON.parse(req.response))
//         }else{
//             reject(new Error(req))
//         }
//     };
//     req.send();
//     })

// }

// // let content = document.querySelector(".container-content")
// get("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json").then((res)=>{
//     // console.log(res.result.results)
//     let data = res["result"]["results"];
//     let text = document.querySelectorAll(".text");
    
//     //處理圖片
//     for(let i=0;i<text.length; i++){
        
//         //處理圖片
//         let img= document.createElement("img");
//         let imgurl ="https://"+ data[i]["file"].toLowerCase().split("https://")[1];
//          //處理文字
//         let p = document.createElement("p")
//         let p_value=document.createTextNode(data[i]["stitle"])
//         p.appendChild(p_value);
//         img.setAttribute("src", imgurl);
//         text[i].appendChild(img);
//         text[i].appendChild(p);
        

//         // console.log(imgurl);
//     }
//     //載入處理按鈕
//     let btn = document.querySelector(".btn")
//     let container = document.querySelector(".container");
    
//     btn.addEventListener("click",()=>{
//         let maxNum=data.length
//         // console.log(textNum)
//         let textall=document.querySelectorAll(".text");
//         let currentNum=textall.length    
//         for( let i= currentNum; i<currentNum+8;i++){
//             // console.log(currentNum)
//             if(i>maxNum){
//                break;
//             }
//             //處理圖片
//             let img= document.createElement("img");
//             let imgurl ="https://"+ data[i]["file"].toLowerCase().split("https://")[1];
//             //處理文字
//             let p = document.createElement("p")
//             let p_value=document.createTextNode(data[i]["stitle"])
//             //新增div
//             let newdiv= document.createElement("div");
//             newdiv.setAttribute("class","text");
//             p.appendChild(p_value);
//             img.setAttribute("src", imgurl);
//             newdiv.appendChild(img)
//             newdiv.appendChild(p);
//             container.appendChild(newdiv);         
//             // console.log(currentNum)
//         }
//         currentNum =textall.length;
//         console.log(currentNum);

//     })
   
// }).catch((res)=>{
//     console.error(res)
// })

//練習傳統xhr作法
// let xhr = new XMLHttpRequest();
// let url ="https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
// xhr.open("GET", url, true);
// xhr.send();
// //onload表示readystate=4後執行funciton
// xhr.onload= function(){
//     let response= JSON.parse(xhr.responseText);
//     let data =response["result"]["results"];
//     console.log(data)
// }



//fetch練習
let url ="https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
fetch(url).then((res)=>{
    return res.json();
}).then((data)=>{
    // console.log(data);
    result=data["result"]["results"];
    // console.log(result);
    let text = document.querySelectorAll(".text");
    let container = document.querySelector(".container");
    for (let i=0; i<8;i++){
        // console.log(result[i])
        // let stitle =result[i]["stitle"];
        let file="https://"+result[i]["file"].split("https://")[1].toLowerCase();
        let img = document.createElement("img");
        let p = document.createElement("p")
        let p_value=document.createTextNode(result[i]["stitle"])
        p.appendChild(p_value);
        img.setAttribute("src",file);
        text[i].appendChild(img);
        text[i].appendChild(p);
    }
    let btn= document.querySelector(".btn");
    btn.addEventListener("click",()=>{
        let maxnum=result.length;
        let currentNum=  document.querySelectorAll(".text").length
        console.log(currentNum)
        for(let i =currentNum;i<currentNum+8;i++){
            if(i>maxnum){
                break;
            }
            let newdiv =document.createElement("div");
            newdiv.setAttribute("class", "text");
            let file="https://"+result[i]["file"].split("https://")[1].toLowerCase();
            let p = document.createElement("p");
            let p_value=document.createTextNode(result[i]["stitle"])
            let img = document.createElement("img");
            p.appendChild(p_value);
            img.setAttribute("src",file)
            newdiv.appendChild(img);
            newdiv.appendChild(p);
            container.appendChild(newdiv);
        } 
    })
   

}).catch((e)=>{
    console.log(e);
})