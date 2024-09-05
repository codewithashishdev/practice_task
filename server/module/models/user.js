module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        "tbl_user",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING(255)
            },
            lastName: {
                type: DataTypes.STRING(255)
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            role: {
                type: DataTypes.STRING(500),
            },
            resetTokenExpiration: {
                type: DataTypes.DATE,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            }
        },
        {
            indexes: [
                {
                    fields: ["id", "firstName", "email"],
                },
            ],
            tableName: "tbl_user",
            timestamps: false
        }
    );
    User.sync();
    return User;
};