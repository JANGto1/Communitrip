const { comments } = require('../../models')

module.exports = (req, res) => {
    comments.findAll({
        attributes: {
            exclude: ['postId', 'userId']
        },
        where: {
            post_id: req.params.postId
        }
    }).then((results) => {
        res.json({ comments: results });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}