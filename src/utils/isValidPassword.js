import bcrypt from "bcrypt"

const isValidPassword = (user,password) => {
    console.log("asdasdasdasd")
    const response = bcrypt.compareSync(password, user.password)
    console.log(response)
	return response
}

export default isValidPassword