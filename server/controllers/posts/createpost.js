/** 게시물 생성 */
const { posts, tags } = require('../../models')

module.exports = (req, res) => {
    if(req.body.tag_id === '1') {
        posts.create({
            user_id: req.body.user_id,
            contents: req.body.contents,
            title: req.body.title,
            tag_id: req.body.tag_id,
            total_likes: 0,
            image: 'https://postfiles.pstatic.net/MjAxNzA4MjlfMjYy/MDAxNTA0MDAyNzAzMDMw.8iROpylvtiRv9t_ziHydY3Zoa3s26zgmHVoIPDB9QHMg.Und9ywmrcu1-RKnzFCOQDkbtyKuc29nLMMUvqJpVjzMg.JPEG.hoban999/4.jpg?type=w2',
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        }).then((result) => {
            if (!result) {
                res.status(400).json({ message: '내용이 없어요' })
            } else {
                res.json({ message: '게시물 생성완료' })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
    } else if(req.body.tag_id === '2') {
        posts.create({
            user_id: req.body.user_id,
            contents: req.body.contents,
            title: req.body.title,
            tag_id: req.body.tag_id,
            total_likes: 0,
            image: 'http://tpholic.com/xe/files/attach/images/76/110/978/003/%EA%B0%95%20001.jpg',
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        }).then((result) => {
            if (!result) {
                res.status(400).json({ message: '내용이 없어요' })
            } else {
                res.json({ message: '게시물 생성완료' })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
    } else if(req.body.tag_id === '3') {
        posts.create({
            user_id: req.body.user_id,
            contents: req.body.contents,
            title: req.body.title,
            tag_id: req.body.tag_id,
            total_likes: 0,
            image: 'https://postfiles.pstatic.net/MjAxOTA3MjNfMzgg/MDAxNTYzODU0NTg4OTk1.W5wXNBwHDUZ_osdP0hw2GqeKjg5fZOrhZIUBH8Z6_HYg.RLf5_Ji8lsKJQzedDKj4OidAiNkp2w3ksjt_E0j38gAg.JPEG.ksjsoo34/1563853891357.jpg?type=w966',
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        }).then((result) => {
            if (!result) {
                res.status(400).json({ message: '내용이 없어요' })
            } else {
                res.json({ message: '게시물 생성완료' })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
    } else if(req.body.tag_id === '4') {
        posts.create({
            user_id: req.body.user_id,
            contents: req.body.contents,
            title: req.body.title,
            tag_id: req.body.tag_id,
            total_likes: 0,
            image: 'https://www.gimhae.go.kr/CmsMultiFile/view.do?multifileId=MF00000243&idx=22456&',
            address: req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
        }).then((result) => {
            if (!result) {
                res.status(400).json({ message: '내용이 없어요' })
            } else {
                res.json({ message: '게시물 생성완료' })
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
    }
    
}