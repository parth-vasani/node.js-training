const express = require("express");
const {
  MongoClient,
  MongoServerClosedError,
  TopologyDescription,
  ObjectId,
} = require("mongodb");

const uri = 'mongodb://adminUser:adminPass@127.0.0.1:27017/';

const client = new MongoClient(uri);
let db;

async function connectToDB() {
  try {
    db = await client.db("Demo");

    console.log("Database connected.");
  } catch (err) {
    console.log("Error:", err);
  }
}

connectToDB();


const app = express();
app.use(express.json())

app.get("/students", async (req, res) => {
  try {
    let result = await db.collection("students").find({}).toArray();
    res.status(200).json(result);
} catch (err) {
    throw err;
}
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await db.collection("students").findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
} catch (err) {
    console.log("Error:", err);
    throw err;
}
});

app.post("/students", async (req, res) => {
  let { name, age } = req.body;
  if (!name || !age) {
    res.status(200).json({ msg: "Missing some fields." });
    return;
  }

  try {
    let result = await db.collection("students").insertOne({ 'name':name, 'age':age });
    console.log(result);

} catch (err) {
    throw err;
}

res.status(200).json({msg:"Added."})
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  let { name, age } = req.body;

  let updateData = {};
  if (name) 
    updateData['name'] = name;
  if (age) 
    updateData['age'] = age;

  try {
    let result = await db.collection("students").updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    if (result.matchedCount == 0) {
      res.json({ msg: "Student not found." });
      return;
    }
    res.status(200).json({ msg: "Updated." });

} catch (err) {
    console.log("Error:", err);
    throw err;
}

});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.json({ msg: "Student not found" });
      return;
    }

    res.json({ msg: "Deleted." });
} catch (err) {
    console.log("Error:", err);
    throw err;
}
    
});

app.use((err,req,res,next)=>{
    res.status(err.status || 501).json({err:err.message || "error"});
})

app.listen(8000, () => {
  console.log("App running on 8000");
});
