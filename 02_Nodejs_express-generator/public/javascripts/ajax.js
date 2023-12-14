let API = '/ajax/queryTest'
$().ready(function(){
    $("#submit").on("click", function(){
        console.log("Click!");
        let payload = {
            name: "Kevin"
        }
        $.post(API, payload, function(data, stayus){
            console.log("Front-end: Get response success!");
            console.log("Front-end: Data from backend: "+data); // 取得回傳內容
        })
    })
})