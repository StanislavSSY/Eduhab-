// создание таблиц:
// User --> npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
// Category --> npx sequelize-cli model:generate --name Category --attributes name:string
// Question --> npx sequelize-cli model:generate --name Question --attributes questionTitle:string,questionAnswer:string,categoryId:integer,points:integer
// Result --> npx sequelize-cli model:generate --name Result --attributes userId:integer,score:integer,answers:integer,correctAnswers:integer

// накатывание таблиц:
// npx sequelize-cli db:migrate

// создание сидеров:
// npx sequelize-cli seed:generate --name User
// npx sequelize-cli seed:generate --name Category
// npx sequelize-cli seed:generate --name Question
// npx sequelize-cli seed:generate --name Result

// накатывание сидеров:
// npx sequelize-cli db:seed:all

// Дропнуть все миграции: 
// npx sequelize-cli db:migrate:undo:all

// снести и накатить всё заново
// "initdb": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all"