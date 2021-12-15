const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to mongoDB server
mongoose.connect(
	"mongodb+srv://suman:suman@cluster0.mlp5b.mongodb.net/newItemsDB?retryWrites=true&w=majority"
);

// Data Schema
const itemSchema = {
	title: String,
	description: String,
};

// Data Model
const Item = mongoose.model("Item", itemSchema);

//Read route
app.get("/items", (req, res) => {
	Item.find()
		.then((items) => res.json(items))
		.catch((err) => res.status(400).json("Error " + err));
});

//Create route
app.post("/newitem", (req, res) => {
	const newItem = new Item({
		title: req.body.title,
		description: req.body.description,
	});
	newItem
		.save()
		.then((item) => console.log("NewPostMDB:", item))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Delete route
app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;

	Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
		if (!err) {
			console.log("Item deleted");
		} else {
			console.log(err);
		}
	});
});

//Update route
app.put("/update/:id", (req, res) => {
	const updatedItem = {
		title: req.body.title,
		description: req.body.description,
	};

	Item.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: updatedItem },
		(req, res, err) => {
			if (!err) {
				console.log("Item Updated");
			} else {
				console.log(err);
			}
		}
	);
});

app.listen(port, () => {
	console.log(`Express isrunning on PORT: ${port}`);
});
