const { comments } = require('../../models')

module.exports = (req, res) => {
    comments.destroy({
        where: {
            post_id: req.params.postId,
            id: req.params.commentsId
        }
    }).then(() => {
        res.json({ message: '삭제 완료' })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}