const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { sign } = require('../helpers/jwt')
const user = require('../models/user')

class googleSignInController{
    static loginFromGoogle(req, res, next){
        console.log('login dari google')
        const token = req.body.idToken
        console.log(token, 'ini token anda')
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((ticket) => {
            console.log(ticket, 'console log tikett')
            const { name, email, picture } = ticket.getPayload()
            // const a =  { name, email, picture }
            return user.findOne({email})
            .then((found) => {
                if(found){
                    // console.log('email found')
                    const tokenJWT = sign({ name ,email, picture })
                    res.status(200).json({
                        token: tokenJWT,
                        email,
                        name,
                        picture
                    })
                }else{
                    // console.log('email not found')
                    let password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    console.log(password)
                    return user.create({name, email, password})
                    .then((newUser) => {
                        const tokenJWT = sign({ name ,email, picture })
                        res.status(200).json({
                            token: tokenJWT,
                            email,
                            name,
                            picture
                        })  
                    })
                }
            })
        })
        .catch(next)
    }
}

module.exports = googleSignInController