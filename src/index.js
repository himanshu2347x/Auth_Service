const express = require('express');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();

const db = require('./models/index');
const { User, Role } = require('./models/index'); 
const role = require('./models/role');

const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log("Server started on port ", PORT);
        
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }

        const u1 = await User.findByPk(3);
        const r1 = await Role.findByPk(2);

    });
}

prepareAndStartServer();