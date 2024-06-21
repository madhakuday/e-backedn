'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_defects', {
      od_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      od_customer_name: {
        type: Sequelize.STRING
      },
      delivery_partner_id:{
        type: Sequelize.INTEGER
      },
      od_order_number:{
        type: Sequelize.INTEGER
      },
      od_shipping_address: {
        type: Sequelize.STRING
      },
      od_invoice: {
        type: Sequelize.STRING
      },
      od_damage_grade: {
        type: Sequelize.STRING
      },
      od_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      device_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      od_defect_damage_details: {
        type: Sequelize.TEXT
      },
      od_customer_email: {
        type: Sequelize.STRING
      },
      od_customer_number: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_defects');
  }
};