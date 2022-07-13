const { posts } = require('../../models')

module.exports = (req, res) => {
    posts.findAll({
        attributes: {
            exclude: ['userId']
        },
        where: {
            tag_id: req.params.tagId
        }
    }).then((results) => {
        if (!results) {
            res.status(400).json({ message: '태그에 맞는 게시글이 없어요' })
        } else {
            res.json({ results })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}