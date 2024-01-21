const socket = io()

let user

socket.on("update_messages",(data)=>{
    console.log("Se ha actualizado mensajes")
    renderMessages(data)
})


const renderMessages = (date) =>{
    const ul = document.querySelector(".messages")
    ul.innerHTML = ""
    date?.forEach(message => {
        ul.innerHTML += `<li><b>${message.user===user? "Yo": message.user} </b>: ${message.message}</li>`
    });
}


const form = document.querySelector(".form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message = {
        user: user,
        message: e.target[0].value
    }
    if(!message.message){
        return
    }
    console.log(message)
    socket.emit("message",message)
    e.target.reset()
})

const login = (e)=>{
    user = prompt("Ingrese su usuario")
    if(!user){
        console.log("Hola")
        alert("No se ha podido identificar")
        return
    }
}

login()