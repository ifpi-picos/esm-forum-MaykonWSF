const modelo = require('../../fonte/logica/modelo');
const memoria = require('../../repositorio/memoria');

beforeAll(() => {
  modelo.reconfig_repositorio(memoria);
});

test('listar perguntas de memória', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBeGreaterThan(0);
});
