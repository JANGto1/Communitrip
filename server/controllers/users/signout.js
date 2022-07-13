/** 회원탈퇴 요청 */
const { users } = require('../../models')

module.exports = (req,res) => {
    users.destroy({
        where: {
            id: req.params.userId
        }
    }).then((result) => {
        if(!result) {
            res.status(404).json({ message: '존재하지 않는 유저입니다' })
        } else {
            res.json({ message: '회원탈퇴 성공'})
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요'})
    })
}