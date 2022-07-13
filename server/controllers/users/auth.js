const { users } = require('../../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    /** 로그인 상태에서 나만의 명언 추가, 삭제, 수정 */
    if(!req.cookies['token']) { /** 쿠키가 없으면(로그인 된 상태가 아니면) 쿠키의 이름은 'token' */
        res.json({data:null, message: 'you should be logged in'})
    } else { /** 쿠키가 있으면(로그인 되어 있으면) */
        const auth = req.cookies['token']
        const tokenData = auth.split('.')[1]
        const userData = jwt.verify(auth, process.env.ACCESS_SECRET)

        if(!auth) {
            return null;
        }

        users.findOne({
            where: {
                id: userData.id
            }
        }).then((result) => {
            if(!result) {
                res.status(404).json({ message: '먼저 로그인 하세요' })
            } else {
                //delete result.dataValues.password
                
                res.status(200).send({data:{userInfo:result.dataValues},message:"ok"})
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json({ message: '서버에 문제가 있네요' })
        })
       
        
        
    }
}