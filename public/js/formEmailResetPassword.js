const form = document.getElementById("mailForm")

form.addEventListener("submit",async event =>{
    event.preventDefault()

    const data = new FormData(form)
    const object = {}
    data.forEach((value,key) =>object[key]=value)

    const response = await fetch(`/api/users/send-mail`,{
        method: "POST",
        body: JSON.stringify(object),
        headers:{
            "Content-Type": "application/json"
        }
    })


    if(response.ok){
        alert(`Se envió un email para reestablecer contraseña, por favor revice su casilla de mails.`)
        window.location.replace("/users/login")
        return
    }

    alert(`Error: ${response.status}`)
})