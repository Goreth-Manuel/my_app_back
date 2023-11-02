const { request } = require("express");
const Usuario = require("../models/Usuario");

module.exports = {
  async createUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });

      if (usuario) {
        res
          .status(401)
          .json({ message: "Já existe um usuário com este email" });
      } else {
        const usuario = await Usuario.create({ nome, email, senha });

        res.status(200).json({ usuario });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;
      /*
      const usuarioEmail = await Usuario.findOne({
        where: { id: req.params.id }, email,
      });
      if (usuarioEmail != null) {
        res.status(400).json({ message: "Este email já existe" });
      } 
       */
      const usuario = await Usuario.findOne({ where: { id } });
      if (!usuario) {
        res.status(401).json({ message: "Este usuário não existe" });
      } else {
        const usuario = await Usuario.update(
          { nome, email, senha },
          { where: { id } }
        );
        res
          .status(200)
          .json({usuario, message: "Usuário atualizado com sucesso" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async listUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll()

      if (!usuarios) {
        res.status(401).json({ message: 'Não existe usuários cadastrados' });
      }
      res.status(200).json({ usuarios });
    } catch (error) {
      res.status(400).json({ error });
    }
    
  },
  async deleteUsuario(req, res) {
    const { id } = req.params

    const usuario = await Usuario.findOne({where: { id }})
    if(!usuario) {
      res.status(401).json({ message: 'Usuário não encontrado' });
    } else {
      await Usuario.destroy({ where: { id }})
      res.status(200).json({message: 'Usuário apagado com sucesso'})
    }
  }
};
