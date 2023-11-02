const { Router } = require('express')

const UsuarioController = require('./controller/UsuarioController')

const router = Router()

//Criando as rotas
router.post('/usuarioCreate', UsuarioController.createUsuario)
router.put('/usuarioUpdate/:id', UsuarioController.updateUsuario)
router.get('/usuarioList', UsuarioController.listUsuarios)
router.delete('/usuarioDelete/:id', UsuarioController.deleteUsuario)

module.exports = router 