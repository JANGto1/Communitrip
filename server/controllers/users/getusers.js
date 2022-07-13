/** 유저정보 get요청시 전달 */
const { users } = require('../../models')

module.exports = (req, res) => {
    users.findOne({
        where: {
            id: req.params.userId
        }
    }).then((result) => {
        if(!result) {
            res.status(404).json({ message: '먼저 로그인 하세요' })
        } else {
            delete result.dataValues.password
            res.json({ data: result.dataValues })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })

}