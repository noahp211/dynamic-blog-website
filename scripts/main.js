document.addEventListener("DOMContentLoaded",function(){
    const  myform = document.getElementById("post-form");
    if(myform){
        myform.addEventListener("submit", function(e){
            e.preventDefault();
            const mytitle= document.getElementById("title").value;
            const   MyContent = document.getElementById("content").value;
            if(mytitle.trim()===""|| MyContent.trim()===""){
                alert("Fill out both fields, Please."); return;}
            const PostArray = JSON.parse(localStorage.getItem("posts"))||[];
            const Newentry={title:mytitle,content:MyContent,date:new Date().toLocaleString()};
            PostArray.push(Newentry);
            localStorage.setItem("posts",JSON.stringify(PostArray));
            alert("Success! post created.");
            window.location.href="index.html";
        });
    }
});
