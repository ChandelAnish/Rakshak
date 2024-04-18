const form =document.getElementById("form")
const loginstatus =document.getElementById("loginstatus")

// console.log(form.elements)
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email=form.elements.email.value;
    const password=form.elements.password.value;


    const userdata={email,password};
    const response=await login(userdata);
    if(response.login==false)
    {
        loginstatus.innerHTML=response.msg;
    }
    else if(response.login==true)
    {   
        // loginstatus.innerHTML=response.usertype;
        if(response.usertype=='user')
        {
          return window.open("../mainpage/user/index.html","_parent");
        }
        else
        {
          return window.open("../mainpage/volunteer/index.html","_parent");
        }
    }
})

const login=async(userdata)=>{
    const response=await fetch('http://localhost:5000/login',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(userdata)
    });
    const data=await response.json();
    return data;
}