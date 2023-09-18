export const fetchAllPosts = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        return await response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const fetchPostById = async (id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return await response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const fetchUserById = async (id) => {
    const id_usersinfo = {}
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user = await response.json();
        id_usersinfo[user['id']] = {
            "name": user['name'],
            "username": user['username']
        };
        return id_usersinfo;
    }
    catch (e) {
        console.log(e);
    }
}

export const fetchAllUsers = async () =>{
    const id_usersinfo = {}
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const users = await response.json();
        for (let user of users) {
            const info = {
                "name": user['name'],
                "username": user['username']
            };
            id_usersinfo[user["id"]] = info;
        }
        return id_usersinfo;
    }
    catch (e) {
        console.log(e);
    }
}

export const fetchAllComments = async ()=>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        return await response.json();
    }
    catch(e){
        console.log(e);
    }
}


export const fetchCommentsByPostId = async (postId)=>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return await response.json();
    }
    catch(e){
        console.log(e);
    }
}