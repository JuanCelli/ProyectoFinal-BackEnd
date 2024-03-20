const form = document.getElementById("resetPasswordForm")


const url = window.location.pathname
const params = url.split('/')
const idToken = params[params.length - 1]


form.addEventListener("submit",async event =>{
    event.preventDefault()

    const data = new FormData(form)
    const object = {}
    data.forEach((value,key) =>object[key]=value)

    const response = await fetch(`/api/users/change-password/${idToken}`,{
        method: "POST",
        body: JSON.stringify(object),
        headers:{
            "Content-Type": "application/json"
        }
    })


    if(response.ok){
        alert(`Contraseña reestablecida correctamente.`)
        window.location.replace("/users/login")
        return
    }

    alert(`Error: ${response.status}, No se ha encontrado o a expirado el token para cambio de contraseña. También es posible que haya intentado colocar la misma contraseña que tenía anteriormente, en ese caso pruebe con otra.`)
})