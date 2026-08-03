"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'elige-tu-ritmo-prod',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=typeorm-cli.config.js.map