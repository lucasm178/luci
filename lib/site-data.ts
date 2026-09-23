export const products = [
  { id: 'camisa', name: 'Camisa do Tigre', tag: 'UNIFORME I · AMARELO', price: 19990, image: '/assets/shirt.jpg', description: 'As cores da nossa cidade, dentro e fora de campo. Camisa amarela para vestir a sua paixão.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'camisa-preta', name: 'Camisa de treino', tag: 'LINHA TREINO · PRETO', price: 14990, image: '', description: 'Conforto para acompanhar o Tigre em qualquer momento. Modelo demonstrativo da linha de treino.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'camisa-infantil', name: 'Camisa infantil', tag: 'PEQUENOS TIGRES · AMARELO', price: 12990, image: '/assets/shirt.jpg', description: 'A paixão começa cedo. Versão infantil demonstrativa nas cores do São Bernardo.', sizes: ['4', '6', '8', '10', '12'] },
];

export const sectors = [
  { id: 'a', name: 'Setor A · Arquibancada', short: 'ARQUIBANCADA A', capacity: 40 },
  { id: 'b', name: 'Setor B · Arquibancada', short: 'ARQUIBANCADA B', capacity: 30 },
  { id: 'c', name: 'Setor C · Cadeiras', short: 'CADEIRAS', capacity: 20 },
  { id: 'd', name: 'Setor D · Visitante', short: 'VISITANTE · ESGOTADO', capacity: 0 },
];

export const categories = [
  { id: 'inteira', name: 'Inteira', price: 6000, note: 'Entrada sem benefício.' },
  { id: 'infantil', name: 'Meia infantil · até 12 anos', price: 3000, note: 'Exclusiva para crianças de até 12 anos, conforme a regra deste projeto.' },
  { id: 'pcd', name: 'PCD', price: 3000, note: 'Apresentação de documento comprobatório na entrada.' },
  { id: 'estudante', name: 'Estudante', price: 3000, note: 'Apresentação de documento estudantil na entrada.' },
];

export const news = [
  { id: 'primeiro-de-maio', category: 'NOSSA CASA', title: 'Primeiro de Maio: onde a cidade encontra o Tigre', image: '/assets/stadium.jpg', body: ['Mais que o cenário de uma partida, o Primeiro de Maio é um ponto de encontro para quem carrega o preto e amarelo. A proximidade entre campo e arquibancada faz parte dessa experiência.', 'Neste protótipo, você pode explorar um mapa ilustrativo do estádio, escolher um setor e simular sua compra. Os setores e a disponibilidade apresentados são demonstrativos.'] },
  { id: 'cores-do-tigre', category: 'LOJA DO TIGRE', title: 'Preto e amarelo em todos os momentos', image: '/assets/shirt.jpg', body: ['A paixão pelo São Bernardo acompanha o torcedor para além das arquibancadas. A Loja do Tigre reúne modelos demonstrativos para adultos e crianças.', 'Escolha o tamanho, adicione ao carrinho e experimente a compra junto com seu ingresso. Nenhum pagamento ou envio real será realizado.'] },
  { id: 'dia-de-jogo', category: 'TORCIDA', title: 'Seu dia de jogo começa com a escolha do setor', image: '/assets/stadium.jpg', body: ['Para tornar a experiência de compra mais clara, o protótipo apresenta os setores de forma visual. Ao selecionar uma área, o resumo informa setor, categoria e valor.', 'O projeto usa os valores de R$ 60 para inteira e R$ 30 para meia infantil até 12 anos, PCD e estudante. Essas são regras acadêmicas do protótipo, sem representar uma política oficial de venda.'] },
] as const;

export const historyFacts = [['Fundação', '20 de dezembro de 2004'], ['Cidade', 'São Bernardo do Campo · SP'], ['Cores', 'Amarelo e preto'], ['Mascote', 'Tigre'], ['Apelidos', 'Bernô · Tigre do ABC · Tigrão'], ['Casa', 'Estádio Primeiro de Maio'], ['Capacidade liberada', '12.578 espectadores'], ['Capacidade estrutural', '15.759 espectadores'], ['Títulos reconhecidos', '5 conquistas oficiais'], ['Divisão em 2026', 'Campeonato Brasileiro Série B']];

export const historyTimeline = [
  { period: 'origem', year: '2004', title: 'Nasce o São Bernardo Futebol Clube', text: 'Fundado em 20 de dezembro, o clube assume o amarelo e o preto e adota o Tigre como símbolo de força para representar São Bernardo do Campo.' },
  { period: 'origem', year: '2005', title: 'Primeiro acesso estadual', text: 'Em sua temporada inicial no futebol profissional, o São Bernardo conquista o acesso à Série A3 do Campeonato Paulista.' },
  { period: 'origem', year: '2008', title: 'Da Série A3 para a Série A2', text: 'O vice-campeonato da Série A3 leva o Tigre à segunda divisão estadual.' },
  { period: 'origem', year: '2010', title: 'A caminho da elite', text: 'O acesso obtido na Série A2 coloca o clube no Paulistão de 2011, sua primeira participação na elite paulista.' },
  { period: 'conquistas', year: '2012', title: 'Primeiro título: Paulista A2', text: 'Depois de uma reação marcante na competição, o São Bernardo conquista seu primeiro troféu e retorna à primeira divisão estadual.' },
  { period: 'conquistas', year: '2013', title: 'Campeão da Copa Paulista', text: 'O segundo título da trajetória amplia a presença do Tigre no cenário estadual e acompanha sua entrada nas competições nacionais.' },
  { period: 'retomada', year: '2021', title: 'Dois troféus no mesmo ano', text: 'O clube vence novamente o Paulista A2 e também a Copa Paulista, consolidando uma temporada decisiva para a retomada esportiva.' },
  { period: 'retomada', year: '2022', title: 'Acesso à Série C', text: 'A campanha no Campeonato Brasileiro Série D garante a subida e estabelece o São Bernardo na terceira divisão nacional a partir de 2023.' },
  { period: 'retomada', year: '2023', title: 'Taça Independência', text: 'No Primeiro de Maio, o Tigre supera o Mirassol nos pênaltis e conquista a primeira edição da Taça Independência.' },
  { period: 'nacional', year: '2025', title: 'O salto para a Série B', text: 'Um empate com o Londrina na rodada final do quadrangular da Série C confirma o primeiro acesso do clube à Série B do Campeonato Brasileiro.' },
  { period: 'nacional', year: '2026', title: 'Estreia na segunda divisão nacional', text: 'O São Bernardo disputa a Série B pela primeira vez, abrindo um novo capítulo de sua trajetória no futebol brasileiro.' },
];

export const siteRoutes = [
  ['Início', '/'], ['História', '/historia'], ['Notícias', '/noticias'], ['Loja', '/loja'],
  ['Ingressos', '/ingressos'], ['Carrinho', '/carrinho'], ['Login', '/login'],
  ['Cadastro', '/cadastro'], ['Perfil', '/perfil'], ['Pedidos', '/pedidos'], ['Contato', '/contato'],
] as const;
