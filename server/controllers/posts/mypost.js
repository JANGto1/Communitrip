/** 내가 좋아요 누른 게시글 */
const { posts, likes } = require('../../models')

module.exports = (req, res) => {
    likes.findOne({
        attributes: {
            exclude: ['postId', 'userId']
        }, /** params로 받은 userId에 해당하는 likes 모두 찾아라 */
        where: {
            user_id: req.params.userId
        }
    }).then((result) => {
        if (!result) {
            res.status(404).json({ message: '좋아요 누른 게시글이 없어요' })
        } else {
            posts.findAll({
                attributes: {
                    exclude: ['postId', 'userId']
                },
                where: {
                    id: result.dataValues.post_id
                }
            }).then((results) => {
                res.json({ data: results })
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })

}