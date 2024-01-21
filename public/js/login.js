const form = document.getElementById("loginForm")

form.addEventListener("submit",async event =>{
    event.preventDefault()

    const data = new FormData(form)
    const object = {}
    data.forEach((value,key) =>object[key]=value)

    const response = await fetch("/api/sessions/login",{
        method: "POST",
        body: JSON.stringify(object),
        headers:{
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        window.location.replace("/products")
        return
    }

    alert(`Error: ${response.status}`)
})