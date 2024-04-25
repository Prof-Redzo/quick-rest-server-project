import fs from "fs";

export const getMethod = (req, res) => {
  
  try {
    const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const { cars } = db;
    res.status(200).send(cars);
  } catch (e) {
    res.status(500).send("Error");
  }
};

export const postMethod = (req, res) => {

  try {
    const data = req.body;
    const newValue = { ...data };
    const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const { cars } = db;
    cars.push(newValue);

    fs.writeFileSync("./db.json", JSON.stringify(db, null, "\t"));
    res.status(201).send(newValue);
  } catch (e) {
    res.status(500).send("You have not added elements to the array");
  }
};