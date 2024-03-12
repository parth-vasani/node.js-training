const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");

const sequelize = new Sequelize("Demo", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("connected to postgres database");

    await sequelize.sync({ force: true });
    console.log("SYNCED");

    await Bar.create({ name: "b1" });
    await Bar.create({ name: "abc" });

    let b = await Bar.findOne({
      where: { name: "abc" },
      include: "Foos",
    });

    let result = await b.createFoo({ name: "f1" });
    console.log("RRRRRRRRRR", result);

    await b.createFoo({ name: "f2" });
    await b.createFoo({ name: "f2" }, { name: "f3" }, { name: "f4" });

    await b.reload();

    console.log(b);

    console.log(
      "ZZZZZZZZZZ",
      await Bar.findAll({
        attributes: ["name"],
        raw: true,
        include: {
          model: Foo,
          attributes: ['name', 'createdAt'],
          // through:{
          //   attributes:[]
          // }
        },
      })
    );
  } catch (err) {
    throw err;
  }
}

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Bar = sequelize.define("Bar", {
  name: {
    type: DataTypes.STRING,
    // allowNull:false,
  },
});

const Foo = sequelize.define("Foo", {
  name: {
    type: DataTypes.STRING,
    // allowNull:false,
  },
});

Bar.belongsToMany(Foo, { through: "C" });
Foo.belongsToMany(Bar, { through: "C" });

module.exports = { connectToDB, Student };
