'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('TodoItem', {
            id             : {
                type         : Sequelize.DataTypes.INTEGER,
                primaryKey   : true,
                autoIncrement: true,
                allowNull    : false
            },
            title          : {
                type     : Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            description    : {
                type     : Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            completion_date: {
                type     : Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            status         : {
                type        : Sequelize.DataTypes.BOOLEAN,
                allowNull   : false,
                defaultValue: false,
            },
            user_id        : {
                type      : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                references: {
                    model: {
                        tableName: 'user',
                        schema   : 'schema',
                    },
                    key  : 'id'
                }
            },
            todo_list_id   : {
                type      : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                references: {
                    model: {
                        tableName: 'todo_list',
                        schema   : 'schema',
                    },
                    key  : 'id'
                }
            },
        })
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
