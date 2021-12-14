const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(hashedPassword)

    const isMatchPassword = await bcrypt.compare("raki1235", hashedPassword)
    console.log(isMatchPassword)
}

hashPassword("raki1234").catch(e => console.log(e))