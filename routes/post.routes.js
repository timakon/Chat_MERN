const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
//const config = require('config')

router.post('/generate',auth, async (req,res) =>{
    try {

        const {title, body} = req.body

        const existing = await Post.findOne({title})

        if(existing){
            return res.json({message:'Такой пост уже существует, придумайте новый заголовок'})
        }

        if(title === '' || body === ''){
            return res.json({
                message:'Все поля должны быть заполнены'
            })
        }

        const post = new Post({
            title:title, body:body, owner: req.user.userId
        })
        await post.save()

        res.status(201).json({post})


    } catch (e) {
        res.status(500).json({message:'Что-то пошло не так, попробуйте снова // post.routes.js'})
    }
})
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find({ owner: req.user.userId })
        res.json(posts)
    } catch (e) {
        res.status(500).json({message:'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router
