export const appendOneAPIComment = (posts, commentsData) => {
    for (let post of posts) {
        const postId = post.getAttribute('id').split('-')[1];
        const commentData = commentsData.find((comment) => {
            return comment['postId'] == postId
        });
        if (commentData === undefined || commentData === null)
            continue;
        post.getElementsByClassName('comments-section')[0].style.display = 'flex';
        const newComment = post.getElementsByClassName('comment')[0].cloneNode(true);
        newComment.classList.remove("hidden");
        newComment.getElementsByClassName('comment-user-name')[0].innerHTML = commentData['name'];
        newComment.getElementsByClassName('comment-body')[0].innerHTML = commentData['body'];
        post.getElementsByClassName('comments-section')[0].appendChild(newComment);
    }
}

export const appendAllComments = (post, comments) => {

    if (comments.length === 0)
        return

    post[0].getElementsByClassName('comments-section')[0].style.display = 'flex';

    for (let commentData of comments) {
        const newComment = document.getElementById("template-comment").cloneNode(true);
        newComment.classList.remove("hidden");
        newComment.getElementsByClassName('comment-user-name')[0].innerHTML = commentData['name'];
        newComment.getElementsByClassName('comment-body')[0].innerHTML = commentData['body'];
        post[0].getElementsByClassName('comments-section')[0].appendChild(newComment);
        post[0].getElementsByClassName('see-comments-btn')[0].style.display = "none";
    }
    document.getElementsByClassName('see-comments-btn')[0].style.display = 'none';
}

export const appendOneComment = (post, commentData) => {
    post.getElementsByClassName('comments-section')[0].style.display = 'flex';
    const newComment = post.getElementsByClassName('comment')[0].cloneNode(true);
    newComment.classList.remove("hidden");
    newComment.getElementsByClassName('comment-user-name')[0].innerHTML = commentData['name'];
    newComment.getElementsByClassName('comment-body')[0].innerHTML = commentData['body'];
    post.getElementsByClassName('comments-section')[0].prepend(newComment); 
}