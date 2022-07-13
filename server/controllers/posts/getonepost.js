/** 게시물 하나 가져오기 */
const { posts, comments } = require('../../models')

module.exports = (req, res) => {
    posts.findOne({
        attributes: {
            exclude: ['postId', 'userId']
        }, /** params로 받은 postId에 해당하는 게시물 하나 고르기 */
        where: {
            id: req.params.postId
        }
    }).then((result) => {
        comments.findAll({
            attributes: {
                exclude: ['postId', 'userId']
            },/** comments의 post_id와 일치하는 comments들을 찾아서 보여준다 */
            where: {
                post_id: result.dataValues.id
            }
        }).then((result2) => {
            if (!result2) {
                res.json({ data: result }); /** comments가 없으면 posts만 보여준다 */
            } else {
                res.json({ data: result, result2 }); /** comments가 있으면 post랑 같이 보여준다 */
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}