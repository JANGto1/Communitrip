const { comments } = require('../../models')

module.exports = (req, res) => {
    if (!req.body.user_id) {
        res.status(401).json({ message: '로그인 정보가 없습니다' })
    }
    comments.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment
    }).then((result) => {
        if(!result) {
            res.status(404).json({ message: '내용이 없어요'})
        }
        res.status(201).json({ message: '생성 완료' })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}