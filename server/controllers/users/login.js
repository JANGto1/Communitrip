/** 로그인 요청 */
const { users } = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    console.log(req.body)
    users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((result) => {
        if (!result) {
            res.status(401).json({ message: '잘못 적으셨네요' })
        } else {
            delete result.dataValues.password

            const token = jwt.sign(result.dataValues, process.env.ACCESS_SECRET, { expiresIn: '20m'})

            res.cookie('token', token) /** httpOnly: 자바스크립트 접근 불가 */
            res.json({ data: result.dataValues })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}