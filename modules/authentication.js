const checkEmail = async (email, password) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await (response.json());
    
    for (let user of users)
        if (user["email"] === email && password.length > 0) {
            localStoreUserData(user);
            return true;
        }
    return false;
}

const localStoreUserData = (user)=>{
    localStorage['userId'] = user['id'];
    localStorage['name'] = user['name'];
    localStorage['username'] = user['username'];
}

export default checkEmail;