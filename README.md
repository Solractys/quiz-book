# Quiz Book

**Quiz Book** é uma aplicação web interativa que desafia os usuários a identificar os autores de livros clássicos da literatura mundial. Com um design minimalista e intuitivo, a plataforma proporciona uma experiência envolvente para entusiastas da literatura e para aqueles que desejam expandir seus conhecimentos literários.


## Screenshots

![App Screenshot](sample1.png)

![App Screenshot](sample2.png)


## Funcionalidades Principais

- **Quiz de Literatura**: Exibe uma obra literária clássica e desafia o usuário a selecionar o autor correto.
- **Design Responsivo**: Interface otimizada para diferentes dispositivos, garantindo uma experiência fluida em desktops, tablets e smartphones.
- **Integração com API Externa**: Utiliza a [STANDS4 Literature API](https://www.literature.com/literature_api.php) para obter dados precisos sobre livros e seus autores.

## Tecnologias Utilizadas

- **Next.js**: Desenvolvido na versão mais recente, aproveitando os benefícios da renderização do lado do servidor e do roteamento baseado em pastas.
- **STANDS4 Literature API**: Fonte de dados confiável para informações sobre obras literárias e seus respectivos autores.
- **Tailwind CSS**: Utilizado para a estilização da interface, garantindo um design moderno e minimalista.
- **ESLint e Prettier**: Configurados para manter a qualidade do código e boas práticas de desenvolvimento.


## Testes

A aplicação conta com uma suíte de testes para validar componentes e funcionalidades críticas, garantindo robustez e prevenindo regressões.

## Como Executar o Projeto

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/Solractys/quiz-book.git
   cd quiz-book
   npm i
   ```
2. **Configurar Variáveis de Ambiente**:
   ```bash
   STANDS4_API_UID=seu_uid
   STANDS4_API_TOKEN=seu_token
   ```
3. **Iniciar o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

## Considerações Finais
O Quiz Book foi projetado com foco em performance e organização, utilizando práticas modernas de desenvolvimento web. A integração com a STANDS4 Literature API enriquece a experiência do usuário com dados confiáveis sobre a literatura mundial.

Para mais informações sobre a API utilizada, acesse: [STANDS4 Literature API](https://www.literature.com/literature_api.php).

Se desejar contribuir ou reportar problemas, sinta-se à vontade para abrir uma issue no repositório. 🚀


[def]: "./sample1.png"