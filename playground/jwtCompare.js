const jwt = require('jsonwebtoken')

const jwtCompare = () => {
    const token = jwt.sign({ _id: 'abc123' }, 'mySecret', { expiresIn: '0 seconds' })
    console.log(token)
    const verifyToken = jwt.verify(token, 'mySecret')
    console.log(verifyToken)
}

jwtCompare()