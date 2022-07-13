/** 게시물 태그 */
const { tags } = require('../../models')

module.exports = (req, res) => {
    tags.findAll().then((results) => {
        res.json({ data: results })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ message: '서버에 문제가 있네요' })
    })
}