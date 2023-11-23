export const generatorId = (items) =>{
    let id

    items.length===0 ? id = 1 : id = items[items.length-1].id + 1

    return id
}