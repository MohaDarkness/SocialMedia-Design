import * as FetchData from "../modules/fetch_data.js";
import * as PostCreation from "../modules/postCreation.js";
import * as PostDisplay from "../modules/postDisplay.js";
import * as CommentsCreation from "../modules/commentCreation.js";

window.addEventListener("load", async (e) => {
    localStorage["maxId"] = 0;
    const postsData = await FetchData.fetchAllPosts();
    const usersInfo = await FetchData.fetchAllUsers();
    const commentsData = await FetchData.fetchAllComments();

    const posts = PostCreation.createPosts(postsData, usersInfo);
    CommentsCreation.appendOneAPIComment(posts, commentsData);
    PostDisplay.displayPosts(posts);
    addCommentListener();
});


document.getElementById("add-post-btn").addEventListener("click", (e) => {
    console.log(e.currentTarget);
    displayCommentSection();
});


document.getElementById("add-post-back").addEventListener('click', (btn) => {
    hideCommentSection()
});

document.getElementById("add-post-submit").addEventListener('click', (btn) => {
    const textbox = document.getElementById("new-post-textbox")
    const text = textbox.value;  // @@ WE DONT NEED THIS LINE??
    textbox.value = '';
    hideCommentSection();
    const newPostData = {
        'userId': localStorage['userId'],
        'id': ++localStorage['maxId'],
        'body': text,
    }
    const userInfo = {};
    userInfo[localStorage['userId']] = {
        'name': localStorage['name'],
        'username': localStorage['username']
    }
    const newPost = PostCreation.createPosts(new Array(newPostData), userInfo);
    PostDisplay.displayPosts(newPost);
    addCommentListener();
})


const displayCommentSection = () => {
    document.getElementById("add-post-btn").classList.add("hidden");
    document.getElementsByTagName("footer")[0].classList.add("hidden");
    document.getElementById("adding-post-form").classList.remove("hidden");
}

const hideCommentSection = () => {
    document.getElementById("add-post-btn").classList.remove("hidden");
    document.getElementsByTagName("footer")[0].classList.remove("hidden");
    document.getElementById("adding-post-form").classList.add("hidden");
}

const addCommentListener = () => {
    document.querySelectorAll('.add-comment-textbox').forEach(element => {
        element.addEventListener('keydown', (event) => {
            if(event.key !== 'Enter' || event.currentTarget.value.length === 0)
                return

            const post = event.currentTarget.parentNode.parentNode;
            const commentData = {
                'name' : localStorage['name'],
                'body' : event.currentTarget.value
            }
            CommentsCreation.appendOneComment(post, commentData);
            event.currentTarget.value = '';
        })
    });
}