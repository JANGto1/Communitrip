/** 게시물 지우기 */
const { posts } = require('../../models')

module.exports = (req, res) => {
    /** 헤더에 post_id, user_id 날라온다 */
    /** params로도 post_id 날라온다 */
    posts.destroy({
        where: {
            id: req.params.postId
        }
    }).then(() => {
        res.json({ message: '게시물 삭제 성공' })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}