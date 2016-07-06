export default (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Validation unique'},
      validate: {
        notEmpty: true,
        len: {args: [2, 10], msg: 'Validation len :min=2 :max=10'}
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {args: [2], msg: 'Validation len :min=2'}
      }
    }
  }, {
    timestamps: true,
    // classMethods: {
    //   associate(models) {
    //     post.belongsTo(models.user)
    //   }
    // }
  })

  return post
}
