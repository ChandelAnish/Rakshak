async function verifyotp(userotp) {
    let response =await fetch('http://localhost:5000/otpverification',
    {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({userotp:userotp})
    });
    const data = await response.json();
    console.log(data)
    return window.open("../login/index3.html","_parent");
}

let verifybtn=document.getElementById('verifybtn');
verifybtn.addEventListener('click',async(e)=>{
    let userotp=document.getElementById('userotp').value;
    console.log(userotp)
    e.preventDefault();
    await verifyotp(userotp);
})

