# Chatbot com NodeJS
Chatbot criado com NodeJS integrado com a plataforma BLIP e que usa o Algorithmia para fazer buscas no Wikipedia.

# Como funciona o Chatbot?
O chatbot filtra a mensagem recebida e envia ao Wikipedia, a resposta passa por uma higienização de conteúdo, o mesmo conteúdo é quebrado em sentenças que melhor definem a mensagem recebida, e essas sentenças são devolvidas ao usuário como uma resposta.
PS: O Chatbot está em inglês.

# Instalando as dependências
$ npm install

# Criando o Bot
Acessar blip.ai
Fazer o cadastro e criar bot.
Pegar as credenciais do bot.

# Adicionando as credenciais  do Bot no código
Adicionar o identificador e a chave de acesso do blip no arquivo index.js

# Rodando o Bot
$ node index.js




