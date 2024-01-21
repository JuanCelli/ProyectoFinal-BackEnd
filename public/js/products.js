const button = document.querySelector(".logout-button")

button.addEventListener("click",(async event=>{
    const response = await fetch("/api/sessions/logout",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        window.location.replace("/products")
        return
    }

    alert(`Error: ${response.status}`)
}))