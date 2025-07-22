const fs = require('fs');
const path = require('path');

const diretorioRaiz = '.'; // Diretório raiz do projeto
const saida = 'estrutura_projeto.txt';

// Lista de pastas a serem ignoradas
const ignorarPastas = ['node_modules', '.git', 'dist', 'build', '.next'];

function listarArquivos(diretorio, prefixo = '') {
  const itens = fs.readdirSync(diretorio);
  let resultado = '';

  itens.forEach((item) => {
    if (ignorarPastas.includes(item)) return;

    const caminhoCompleto = path.join(diretorio, item);
    const stats = fs.statSync(caminhoCompleto);
    const linha = `${prefixo}${item}${stats.isDirectory() ? '/' : ''}\n`;

    resultado += linha;

    if (stats.isDirectory()) {
      resultado += listarArquivos(caminhoCompleto, prefixo + '  ');
    }
  });

  return resultado;
}

function gerarEstruturaProjeto() {
  const estrutura = listarArquivos(diretorioRaiz);
  fs.writeFileSync(saida, estrutura);
  console.log(`✅ Estrutura do projeto salva em: ${saida}`);
}

gerarEstruturaProjeto();
