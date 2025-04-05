let repositorio = require('../../repositorio/memoria');

function reconfig_repositorio(novoRepositorio) {
  repositorio = novoRepositorio;
}

async function listar_perguntas() {
  const perguntas = await repositorio.recuperar_todas_perguntas();
  for (const pergunta of perguntas) {
    pergunta.num_respostas = await repositorio.recuperar_num_respostas(pergunta.id_pergunta);
  }
  return perguntas;
}

async function cadastrar_pergunta(texto) {
  return await repositorio.criar_pergunta(texto);
}

async function atualizar_pergunta(id_pergunta, novo_texto) {
  return await repositorio.atualizar_pergunta(id_pergunta, novo_texto);
}

async function deletar_pergunta(id_pergunta) {
  return await repositorio.deletar_pergunta(id_pergunta);
}

async function get_pergunta(id_pergunta) {
  return await repositorio.recuperar_pergunta(id_pergunta);
}

async function get_respostas(id_pergunta) {
  return await repositorio.recuperar_todas_respostas(id_pergunta);
}

async function get_num_respostas(id_pergunta) {
  return await repositorio.recuperar_num_respostas(id_pergunta);
}

async function cadastrar_resposta(id_pergunta, texto) {
  return await repositorio.criar_resposta(id_pergunta, texto);
}

async function atualizar_resposta(id_resposta, novo_texto) {
  return await repositorio.atualizar_resposta(id_resposta, novo_texto);
}

async function deletar_resposta(id_resposta) {
  return await repositorio.deletar_resposta(id_resposta);
}

module.exports = {
  reconfig_repositorio,
  listar_perguntas,
  cadastrar_pergunta,
  atualizar_pergunta,
  deletar_pergunta,
  get_pergunta,
  get_respostas,
  get_num_respostas,
  cadastrar_resposta,
  atualizar_resposta,
  deletar_resposta
};
