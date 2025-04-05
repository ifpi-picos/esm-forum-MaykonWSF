const modelo = require('../../fonte/logica/modelo');
const memoria = require('../../repositorio/memoria');

beforeEach(() => {
  modelo.reconfig_repositorio(memoria);
});

test('cadastrar e recuperar respostas', async () => {
  const id = await modelo.cadastrar_pergunta('O que é JavaScript?');
  await modelo.cadastrar_resposta(id, 'Uma linguagem de programação.');
  await modelo.cadastrar_resposta(id, 'Executada no navegador.');

  const respostas = await modelo.get_respostas(id);
  expect(respostas.length).toBe(2);
  expect(respostas[0].texto).toBe('Uma linguagem de programação.');
  expect(respostas[1].texto).toBe('Executada no navegador.');
});

test('deletar uma resposta da memória', async () => {
  const id = await modelo.cadastrar_pergunta('Exemplo?');
  const idResp = await modelo.cadastrar_resposta(id, 'Sim.');

  const deletado = await modelo.deletar_resposta(idResp);
  expect(deletado).toBe(true);

  const respostas = await modelo.get_respostas(id);
  expect(respostas.length).toBe(0);
});
