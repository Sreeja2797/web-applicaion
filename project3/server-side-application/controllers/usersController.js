const User = require("../models/user");
const httpStatus = require('http-status-codes')

module.exports = {
    index: (req, res, next) => {
        console.log(`usersController.index`);
        User.find()
            .then(users => {
                res.locals.users = users;
                console.log(`Inside User.find -usersController: ${res.locals.users}`);
                next();
            })
            .catch(error => {
                console.log(` Error fetching users: ${error.message}`);
                next(error);
            });
    },

    indexView: async (req, res, next) => {
        console.log(`usersController.indexView`);
        if (req.query.format === 'json') {
            res.json(res.locals.users);
        } else {
            try {
                console.info("Inside show users");
                const users = await User.find();
                res.render('users', { users: users, title: "List of Users" });
              } catch (error) {
                console.error('Error retrieving data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
              }
        }
    },

    respondJson: (req, res) => {
        console.log(`userController.respondJSON`);
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    errorJson: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: 500,
                message: error.message
            };
        } else {
            errorObject = {
                status: 200,
                message: 'Unknow Error.'
            };
        }
        res.json(errorObject);
    }


}
