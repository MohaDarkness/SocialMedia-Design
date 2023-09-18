import * as PostCreation from "../modules/postCreation.js";
import * as PostDisplay from "../modules/postDisplay.js";
import * as FetchData from "../modules/fetch_data.js";
import * as CommentCreation from "../modules/commentCreation.js";
const param = new URLSearchParams(window.location.search);

window.addEventListener("load", async (e) => {
    const postData = await FetchData.fetchPostById(param.get('id'));
    const comments = await FetchData.fetchCommentsByPostId(param.get('id'));
    const userInfo = await FetchData.fetchUserById(postData['userId']);
    const post = PostCreation.createPosts(new Array(postData), userInfo);
    CommentCreation.appendAllComments(post, comments);
    PostDisplay.displayPosts(post);
    addCommentListeners()
});

const addCommentListeners = () => {
    inlineAddCommentListeners();
}

const inlineAddCommentListeners = () => {
    document.querySelectorAll('.add-comment-textbox').forEach(element => {
        element.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter')
                return

            const post = event.currentTarget.parentNode.parentNode;
            const commentData = {
                'name': localStorage['name'],
                'body': event.currentTarget.value
            }
            CommentCreation.appendOneComment(post, commentData);
            event.currentTarget.value = '';
        })
    });
}

document.getElementById("add-comment-btn").addEventListener("click", (e) => {
    console.log("we are here!");
    displayCommentSection();
});


document.getElementById("add-comment-back").addEventListener('click', (btn) => {
    hideCommentSection()
});

document.getElementById("add-comment-submit").addEventListener('click', (event) => {
    const textbox = document.getElementById("new-comment-textbox");
    const text = textbox.value;  // @@ WE DONT NEED THIS LINE??
    textbox.value = '';
    hideCommentSection();
    
    const commentData = {
        'name': localStorage['name'],
        'body': text
    };
    
        
    const post  = document.getElementsByClassName('post')[0];
    CommentCreation.appendOneComment(post, commentData);
})

const displayCommentSection = () => {
    document.getElementById("add-comment-btn").classList.add("hidden");
    document.getElementsByTagName("footer")[0].classList.add("hidden");
    document.getElementById("adding-comment-form").classList.remove("hidden");
}

const hideCommentSection = () => {
    document.getElementById("add-comment-btn").classList.remove("hidden");
    document.getElementsByTagName("footer")[0].classList.remove("hidden");
    document.getElementById("adding-comment-form").classList.add("hidden");
}