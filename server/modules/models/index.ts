import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import constant from '../../config/constant';


import path from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// Define the database connection
const sequelize = new Sequelize(
  constant.database,
  constant.username,
  constant.password,
  {
    host: constant.db_host.host,
    dialect: constant.db_host.dialect as any,
    port: Number(constant.db_host.port),
  }
);

const db: { [key: string]: any } = {};
// Read and import all model files
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.ts')
  .map(file => path.join(__dirname, file));

Promise.all(modelFiles.map(async (file) => {
  const model = await import(file);
  const modelInstance = model.default(sequelize, DataTypes);
  db[modelInstance.name] = modelInstance;
}))
.then(() => {
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return sequelize.authenticate();
})
.then(() => {
  console.log('DB Connection has been established successfully.');
})
.catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
