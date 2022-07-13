const { comments } = require('../../models')

module.exports = (req, res) => {
    comments.update({
        comment: req.body.comment
    }, {
        where: {
            id: req.params.commentsId
        }
    }).then(() => {
        res.json({ message: '수정 완료' })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}