const { users } = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    users.findOrCreate({
        where: {
            email: req.body.data.email,
            name: req.body.data.profile.nickname
        },
        defaults: {
            password: null
        }
    }).then(([result, created]) => {
        const token = jwt.sign(result.dataValues, process.env.ACCESS_SECRET, { expiresIn: '20m' })

        res.cookie('token', token) /** httpOnly: 자바스크립트 접근 불가 */
        res.json({ data: result.dataValues })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}