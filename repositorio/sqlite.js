const conexao = require('../fonte/database/bd_utils');

module.exports = {
  async recuperar_todas_perguntas() {
    return conexao.queryAll('SELECT * FROM perguntas ORDER BY id_pergunta DESC', []);
  },

  async recuperar_pergunta(id) {
    return conexao.query('SELECT * FROM perguntas WHERE id_pergunta = ?', [id]);
  },

  async recuperar_num_respostas(id_pergunta) {
    const resultado = conexao.query('SELECT count(*) FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
    return resultado['count(*)'];
  },

  async recuperar_todas_respostas(id_pergunta) {
    return conexao.queryAll('SELECT * FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
  },

  async criar_pergunta(texto) {
    const resultado = conexao.exec(
      'INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)',
      [texto, 1]
    );
    return resultado.lastInsertRowid;
  },

  async criar_resposta(id_pergunta, texto) {
    const resultado = conexao.exec(
      'INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)',
      [id_pergunta, texto]
    );
    return resultado.lastInsertRowid;
  },

  async atualizar_pergunta(id_pergunta, novo_texto) {
    return conexao.exec(
      'UPDATE perguntas SET texto = ? WHERE id_pergunta = ?',
      [novo_texto, id_pergunta]
    );
  },

  async atualizar_resposta(id_resposta, novo_texto) {
    return conexao.exec(
      'UPDATE respostas SET texto = ? WHERE id_resposta = ?',
      [novo_texto, id_resposta]
    );
  },

  async deletar_pergunta(id_pergunta) {
    conexao.exec('DELETE FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
    return conexao.exec('DELETE FROM perguntas WHERE id_pergunta = ?', [id_pergunta]);
  },

  async deletar_resposta(id_resposta) {
    return conexao.exec('DELETE FROM respostas WHERE id_resposta = ?', [id_resposta]);
  }
};
