const { likes } = require('../../models')

module.exports = (req, res) => {
    likes.findOne({
        attributes: {
            exclude: ['userId', 'postId']
        },
        where: {
            post_id: req.params.postId,
            user_id: req.params.userId
        }
    }).then((result) => {
        if (!result) {
            res.json({ data : null })
        } else {
            res.json({ data : result.dataValues.user_id })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}