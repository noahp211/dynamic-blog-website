document.addEventListener("DOMContentLoaded", function(){
    const myform = document.getElementById("post-form");
    if(myform){
        myform.addEventListener("submit", function(e){
            e.preventDefault();
            const mytitle = document.getElementById("title").value;
            const MyContent = document.getElementById("content").value;
            if(mytitle.trim() === "" || MyContent.trim() === ""){
                alert("Fill out both fields, Please.");
                return;
            }
            const PostArray = JSON.parse(localStorage.getItem("posts")) || [];
            const Newentry = { title: mytitle, content: MyContent, date: new Date().toLocaleString() };
            PostArray.push(Newentry);
            localStorage.setItem("posts", JSON.stringify(PostArray));
            alert("Success! post created.");
            window.location.href = "index.html";
        });
    }

    function loadPost() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        if (postId !== null && posts[postId]) {
            const post = posts[postId];
            document.getElementById("post-details").innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><em>${post.timestamp}</em></p>
            `;
            document.getElementById("edit-title").value = post.title;
            document.getElementById("edit-content").value = post.content;
        } else {
            document.getElementById("post-details").innerHTML = `<p>Post not found.</p>`;
        }
    }

    function editPost(postId) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const updatedTitle = document.getElementById("edit-title").value;
        const updatedContent = document.getElementById("edit-content").value;
        posts[postId] = {
            title: updatedTitle,
            content: updatedContent,
            timestamp: new Date().toLocaleString()
        };
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("Post updated successfully!");
        window.location.href = "index.html";
    }

    function deletePost(postId) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(postId, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("Post deleted successfully!");
        window.location.href = "index.html";
    }

    const editButton = document.getElementById("edit-button");
    const deleteButton = document.getElementById("delete-button");
    const editForm = document.getElementById("edit-form");

    if (editButton) {
        editButton.addEventListener("click", function() {
            editForm.style.display = "block";
            editButton.style.display = "none";
        });
    }

    if (editForm) {
        editForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get("id");
            if (postId !== null) {
                editPost(postId);
            }
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", function() {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get("id");
            if (postId !== null && confirm("Are you sure you want to delete this post?")) {
                deletePost(postId);
            }
        });
    }

    if (window.location.pathname.includes("post.html")) {
        loadPost();
    }
});

