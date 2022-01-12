function get(url){
    return new Promise((resolve,reject)=>{
        //定義http
    let req= new XMLHttpRequest();
    req.open("GET", url , true);
    req.onload=function(){
        if (req.status==200){
            resolve(JSON.parse(req.response))
        }else{
            reject(new Error(req))
        }
    };
    req.send();
    })

}

// let content = document.querySelector(".container-content")
get("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json").then((res)=>{
    // console.log(res.result.results)
    let data = res["result"]["results"];
    let text = document.querySelectorAll(".text");
    
    //處理圖片
    for(let i=0;i<text.length; i++){
        
        //處理圖片
        let img= document.createElement("img");
        let imgurl ="https://"+ data[i]["file"].toLowerCase().split("https://")[1];
         //處理文字
        let p = document.createElement("p")
        let p_value=document.createTextNode(data[i]["stitle"])
        p.appendChild(p_value);
        img.setAttribute("src", imgurl);
        text[i].appendChild(img);
        text[i].appendChild(p);
        

        // console.log(imgurl);
    }
    //載入處理按鈕
    let btn = document.querySelector(".btn")
    let container = document.querySelector(".container");
    
    btn.addEventListener("click",()=>{
        let maxNum=data.length
        // console.log(textNum)
        let textall=document.querySelectorAll(".text");
        let currentNum=textall.length    
        for( let i= currentNum; i<currentNum+8;i++){
            // console.log(currentNum)
            if(i>maxNum){
               break;
            }
            //處理圖片
            let img= document.createElement("img");
            let imgurl ="https://"+ data[i]["file"].toLowerCase().split("https://")[1];
            //處理文字
            let p = document.createElement("p")
            let p_value=document.createTextNode(data[i]["stitle"])
            //新增div
            let newdiv= document.createElement("div");
            newdiv.setAttribute("class","text");
            p.appendChild(p_value);
            img.setAttribute("src", imgurl);
            newdiv.appendChild(img)
            newdiv.appendChild(p);
            container.appendChild(newdiv);         
            // console.log(currentNum)
        }
        currentNum =textall.length;
        console.log(currentNum);

    })
   
}).catch((res)=>{
    console.error(res)
})

// xhr.send();
// xhr.onload=function(){
//     console.log(xhr)
//     if(this.readyState ===4 && this.status ==200){
//     let response = JSON.parse(this.response);
//     // console.log(response.result.results[0]);
//     let data = response.result;
    
    // for (let i=0;i<7;i++){
    //     h1.textContent= data.results[i].stitle;
    //     text.appendChild(h1)
    //     // console.log(title)
    // }
    
    
    // img.setAttribute("src", data.results[0].file)
    
//     }else{
//     console.log("error")
//     }
// }
