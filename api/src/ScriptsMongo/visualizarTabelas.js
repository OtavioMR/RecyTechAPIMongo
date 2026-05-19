use('RecyTech');

// Busca os dados (usei limit 3 para não lotar a tela)
const catadores = db.catadors.find().toArray();
const usuarios = db.usuarios.find().toArray();

// Exibe as duas listas no painel de resultados
({
  "=== COLEÇÃO CATADORES ===": catadores,
  "=== COLEÇÃO USUÁRIOS ===": usuarios
});