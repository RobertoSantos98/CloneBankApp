
````markdown
# CloneBankApp

Um aplicativo mobile criado com **React Native + TypeScript**, inspirado em apps de banco digital. Desenvolvido como projeto de estudo e portfólio.

---

##  Tecnologias utilizadas

- React Native (via Expo)
- TypeScript
- React Navigation *(se estiver usando)*
- AsyncStorage *(caso use armazenamento local)*

---

##  Estrutura do projeto

```text
/assets
/src
.gitignore
App.tsx
app.json
index.ts
package.json
package-lock.json
tsconfig.json
````

---

## Funcionalidades implementadas

* [x] Configuração inicial com React Native + TypeScript
* [ ] Tela de Splash
* [x] Tela de Login
* [ ] Tela de Cadastro
* [x] Dashboard com saldo e movimentações
* [x] Transferências
* [ ] Histórico de transações

*(Atualizando os markdown conforme implemento as funcionalidades.)*

---

## 📖 Aprendizados importantes

### Uso do Context API

O **Context API** está sendo utilizado no projeto para gerenciar o estado global de autenticação.  

Ele é fundamental para:
- Manter o usuário logado enquanto navega no app;
- Controlar quais telas o usuário pode acessar (rotas públicas x privadas);
- Centralizar a lógica de login e logout em um único lugar (`AuthProvider`);
- Facilitar a integração com **AsyncStorage** para persistir o token e dados do usuário no dispositivo.

Dessa forma, mesmo que o app seja fechado, ao abrir novamente o **CloneBankApp** busca as informações salvas e mantém o usuário autenticado, melhorando a experiência de uso.

---

## Instalação e execução

```bash
git clone https://github.com/RobertoSantos98/CloneBankApp.git
cd CloneBankApp
npm install
# ou
yarn install
npx expo start
```

---

## Em desenvolvimento

* [x] Refinamento do design (UI/UX)
* [x] Push notifications (se aplicável)

---

## Demonstrações visuais

```markdown
![Tela de login](./assets/screenshot-login.jpeg)
![Dashboard](./assets/screenshot-dashboard.jpeg)
```

---

## Roadmap futuro

* [ ] Histórico detalhado de transações
* [ ] Geração de builds/APK para testes
* [ ] Otimizações de performance e usabilidade
