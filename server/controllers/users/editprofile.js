/** 마이페이지 수정 요청 */
const { users } = require('../../models')

module.exports = (req, res) => {
    users.update({
        name: req.body.name,
        password: req.body.password
    }, {
        where: {
            id: req.params.userId
        }
    }).then((result) => {
        if (!result) {
            res.status(400).json({ message: '잘못 적으셨네요' })
        } else {
            res.json({ message: '수정 완료' })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}