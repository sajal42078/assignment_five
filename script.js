// console.log('hello from js')
document.getElementById("signin-btn").addEventListener("click", ()=>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // console.log(username, password);
    if(username === "admin" && password==="admin123"){
        document.getElementById("login_page").classList.add("hidden")
        document.getElementById("dashbord").classList.remove("hidden");
    }
})