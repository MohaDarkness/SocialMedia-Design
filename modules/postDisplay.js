export const displayPosts = (posts)=>{
    for(let post of posts)
        document.getElementById("home-body").insertAdjacentElement('afterbegin', post);
}