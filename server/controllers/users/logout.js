/** 로그아웃 요청 */

module.exports = (req,res) => {
    if(req.cookies) {
        res.cookie('token', null, {
            maxAge: 0
        })
        res.json({message: '로그아웃 성공'})
    } else {
        res.status(500).json({message: '서버에 문제가 있네요'})
    }
}