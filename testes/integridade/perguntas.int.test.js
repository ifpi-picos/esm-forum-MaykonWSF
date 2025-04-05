const modelo = require('../../fonte/logica/modelo');
const sqlite = require('../../repositorio/sqlite');
const bd = require('../../fonte/database/bd_utils');

beforeEach(() => {
  modelo.reconfig_repositorio(sqlite);
  bd.reconfig('./fonte/database/esmforum-teste.db');
  bd.exec('DELETE FROM respostas', []);
  bd.exec('DELETE FROM perguntas', []);
});

test('adiciona e lista perguntas no banco real', async () => {
  await modelo.cadastrar_pergunta('Exemplo de pergunta');
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(1);
});
