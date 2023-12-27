export const setPaginationOptions = (limit, page, sort) => {
    const paginationOptions = {
        limit: limit || 10,
        page: page || 1
    }
    if(sort==="asc"){
        paginationOptions.sort = {price:1}
    }
    if(sort==="desc"){
        paginationOptions.sort = {price:-1}
    }

    return paginationOptions
}
