const form = document.getElementById("resetPasswordForm")


const url = window.location.pathname
const params = url.split('/')
const parametro = params[params.length - 1]


form.addEventListener("submit",async event =>{
    event.preventDefault()

    const data = new FormData(form)
    const object = {}
    data.forEach((value,key) =>object[key]=value)

    const response = await fetch(`/api/users/change-password/${parametro}`,{
        method: "POST",
        body: JSON.stringify(object),
        headers:{
            "Content-Type": "application/json"
        }
    })

    console.log(response)

    if(response.ok){
        alert(`Contraseña reestablecida correctamente.`)
        window.location.replace("/api/users/login")
        return
    }

    alert(`Error: ${response.status}`)
})