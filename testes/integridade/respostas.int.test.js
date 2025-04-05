const modelo = require('../../fonte/logica/modelo');
const sqlite = require('../../repositorio/sqlite');
const bd = require('../../fonte/database/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(sqlite);
  bd.reconfig('./fonte/database/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
});

test('inserir e listar respostas no banco', async () => {
  const idPergunta = await modelo.cadastrar_pergunta('Teste integração');
  await modelo.cadastrar_resposta(idPergunta, 'Resposta 1');
  await modelo.cadastrar_resposta(idPergunta, 'Resposta 2');

  const respostas = await modelo.get_respostas(idPergunta);
  expect(respostas.length).toBe(2);
  expect(respostas[0].texto).toBe('Resposta 1');
});

test('editar resposta no banco', async () => {
  const idPergunta = await modelo.cadastrar_pergunta('Editar?');
  const idResposta = await modelo.cadastrar_resposta(idPergunta, 'Antigo texto');

  await modelo.atualizar_resposta(idResposta, 'Novo texto');

  const respostas = await modelo.get_respostas(idPergunta);
  expect(respostas[0].texto).toBe('Novo texto');
});
