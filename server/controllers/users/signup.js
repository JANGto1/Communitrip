/** 회원가입 요청 */
const { users } = require('../../models')

module.exports = (req, res) => {
    if (
        req.body.name === '' || req.body.name === null ||
        req.body.email === '' || req.body.email === null ||
        req.body.password === '' || req.body.password === null
    ) {
        return res.status(403).send('잘못 적으셨네요');
    } else {
        users.findOrCreate({
            where: {
                email: req.body.email,
            },
            defaults: {
                name: req.body.name,
                password: req.body.password
            }
        }).then(([result, created]) => {
            if (!created) {
                res.status(400).json({ message: '이미 존재하는 유저입니다' })
            } else {
                res.json({ message: '회원가입 성공했습니다' })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
    }

}