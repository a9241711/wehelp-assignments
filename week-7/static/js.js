
let search=document.querySelector(".search")
let inputchange =document.querySelector(".inputchange")
search.addEventListener("click",(e)=>{
    e.preventDefault();
    let txt=document.querySelector(".txt").value;
    let showperson = document.querySelector(".showperson")
    let showresult =document.querySelector(".showresult")
    fetch(`http://127.0.0.1:3000/api/members?username=${txt}`).then((response)=>{
        return response.json();
    }).then((myJson)=>{
        result=myJson.data.name //練習用.取值
        showperson.textContent=result
        showresult.append(showperson)
        // console.log(showperson)
    }).catch((err)=>{
        let message="查無此人"
        showperson.textContent=message
        showresult.append(showperson)
        console.log('There was an error!', err);
    });

})

inputchange.addEventListener("click",(e)=>{
    e.preventDefault();
    let changename=document.querySelector(".changename").value
    let change =document.querySelector(".change")
    let changemessage = document.querySelector(".changemessage")
    console.log(changename)
    fetch("http://127.0.0.1:3000/api/member",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ name:changename}) //轉換JSON字串
    }).then((response)=>{//取得response
        return response.json();// ==json.loads 把JSON轉換回dict
    }).then((jsonData)=>{
        console.log(jsonData)
        if(jsonData["ok"]==true){//練習用[]取值
        let titlename=document.querySelector(".titlename")
        change.textContent = "更新成功"
        titlename.textContent= `恭喜您${changename}，成功登入系統`
        changemessage.append(change)
        console.log("success");
        } 
        else{change.textContent = "請輸入其他姓名或重新登入"
        changemessage.append(change)}
    }).catch((err)=>{
        console.log('There was an error!', err);
    })
})