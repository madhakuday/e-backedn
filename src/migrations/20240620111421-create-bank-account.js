'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('bank_accounts', {
      bank_account_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      
      bank_account_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank_account_holder_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank_account_routing_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank_account_is_default: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      bank_account_status: {
        type: Sequelize.SMALLINT,
        defaultValue:1,
      },
      od_id: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: "order_defects",
          },
          key: "od_id",
        },
      },
      customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate : Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('bank_accounts');
  }
};
