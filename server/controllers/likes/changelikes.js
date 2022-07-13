const { posts, likes, sequelize } = require('../../models')

module.exports = (req, res) => {
    likes.findOrCreate({
        attributes: {
            exclude: ['postId', 'userId']
        },
        where: {
            user_id: req.body.user_id,
            post_id: req.body.post_id
        }
    }).then(([result, created]) => {
        if (!created) { /** 기존에 있던 유저가 다시 누른다면 */
            posts.findOne({
                attributes: {
                    exclude: ['userId']
                },
                where: {
                    id: req.body.post_id
                }
            }).then((result2) => {
                posts.update({
                    total_likes: result2.dataValues.total_likes - 1
                }, {
                    where: {
                        id: req.body.post_id
                    }
                }).then(() => {
                    res.json({ message: '좋아요 개수 감소' })
                    likes.destroy({
                        where: {
                            user_id: req.body.user_id,
                            post_id: req.body.post_id
                        }
                    })
                })
            })
        } else { /** 새로운 유저가 처음으로 누른다면 */
            posts.findOne({
                attributes: {
                    exclude: ['userId']
                },
                where: {
                    id: req.body.post_id
                }
            }).then((result2) => {
                posts.update({
                    total_likes: result2.dataValues.total_likes + 1
                }, {
                    where: {
                        id: req.body.post_id
                    }
                }).then(() => {
                    res.json({ data: [result.user_id, result.id] , message: '좋아요 개수 증가' })
                })
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}