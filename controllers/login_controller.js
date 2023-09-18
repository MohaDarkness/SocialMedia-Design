import checkEmail from "../modules/authentication.js";

document.getElementById("loginBtn").addEventListener("click", async (e) => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const authorized = await checkEmail(email, password);
    if (authorized)
        routeHomePage();
    else
        preventAccess();

});

const routeHomePage = () => {
    location.replace("http://127.0.0.1:5501/view/discover.html");
}

const preventAccess = () => {
    document.getElementById("loginEmail").classList.add("prevent-access");
    document.getElementById("loginPassword").classList.add("prevent-access");
}