const { DataTypes } = require('sequelize')
const db = require('../config/database')

const User = db.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    primaryKey: true,
    autoIncrement: true
  },

  nickname: {
    type: DataTypes.STRING(120),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },

  passwordHash: {
    type: DataTypes.STRING(255),
    field: 'password_hash',
    allowNull: false
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: true,
    defaultValue: DataTypes.NOW
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    allowNull: false,
    defaultValue: true
  }

}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = User