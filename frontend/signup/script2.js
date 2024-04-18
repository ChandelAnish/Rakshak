const form =document.getElementById("form")
const signupstatus =document.getElementById("signupstatus")

// console.log(form.elements)
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const firstname=form.elements.firstname.value;
    const lastname=form.elements.lastname.value;
    const email=form.elements.email.value;
    const password=form.elements.password.value;
    const usertype=form.elements.usertype.value;


    const userdata={firstname,lastname,email,password,usertype};
    const response=await signup(userdata);
    if(response.signup==false)
    {
        signupstatus.innerHTML=response.msg;
    }
    else if(response.signup==true)
    {   
        signupstatus.innerHTML='';
        console.log(response.msg);
        return window.open("../otpverification/index4.html","_parent");
    }
})

const signup=async(userdata)=>{
    const response=await fetch('http://localhost:5000/signup',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(userdata)
    });
    const data=await response.json();
    return data;
}