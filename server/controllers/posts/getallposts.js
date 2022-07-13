/** 전체 게시글 가져오기 */
const { posts } = require('../../models')

module.exports = (req, res) => {
    posts.findAll({
        attributes: {
            exclude: ['userId']
        }
    }).then((results) => {
        res.json({ data: results, message: 'ok' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}