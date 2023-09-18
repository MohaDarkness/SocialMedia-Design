export const createPosts = (postsData, usersInfo) =>{
    const posts = [];
    for(let postData of postsData){
        postData["name"] = usersInfo[postData['userId']]['name'];
        postData["username"] = usersInfo[postData['userId']]['username'];
        const postId = postData['id'];
        localStorage['maxId'] = Math.max(postData['id'], localStorage['maxId']);
        const newPost = document.getElementById('template-post').cloneNode(true);
        newPost.setAttribute("id", `post-${postId}`);
        newPost.querySelector(`.post-user-name`).innerHTML = postData['name'];
        newPost.querySelector(`.post-user-account`).innerHTML = `@${postData['username']}`;
        newPost.querySelector(`.post-words`).innerHTML = postData['body'];
        addPostListeners(newPost);
        posts.push(newPost);
    }
    return posts;
}

const addPostListeners = (newPost) => {
    newPost.querySelectorAll(`.to-comment-section`).forEach(btn => {
        btn.addEventListener('click', (element) => {
            const post = element.currentTarget.closest(".post");
            const id = post.getAttribute('id').split('-')[1];
            const url = 'http://127.0.0.1:5501/view/comments.html';
            window.location.href = `${url}?id=${id}`;
        });
    })
};