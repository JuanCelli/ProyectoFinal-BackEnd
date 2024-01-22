const form = document.getElementById("registerForm")

form.addEventListener("submit",async event =>{
    event.preventDefault()

    const data = new FormData(form)
    const object = {}
    data.forEach((value,key) =>object[key]=value)

    const response = await fetch("/api/sessions/register",{
        method: "POST",
        body: JSON.stringify(object),
        headers:{
            "Content-Type": "application/json"
        }
    })

    if(response.status===201){
        window.location.replace("/users/login")
        return
    }

    alert(`Error: ${response.status}`)


})