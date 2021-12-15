import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [item, setItem] = useState({
		title: "",
		description: "",
	});

	const [items, setItems] = useState([
		{
			_id: "",
			title: "",
			description: "",
		},
	]);

	const [isPut, setIsPut] = useState(false);
	const [updatedItem, setUpdatedItem] = useState({
		title: "",
		description: "",
		id: "",
	});

	useEffect(() => {
		fetch("/items")
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((jsonRes) => setItems(jsonRes))
			.catch((error) => console.log(error));
	}, [items]);

	function handleChange(event) {
		const { name, value } = event.target;
		setItem((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
		//console.log("object", item);
	}

	function addItem(event) {
		event.preventDefault();

		const newItem = {
			title: item.title,
			description: item.description,
		};
		axios.post("/newitem", newItem);
		console.log("Post Data:", newItem);

		alert("Item added!!");

		setItem({
			title: "",
			description: "",
		});
	}

	function deleteItem(id) {
		axios.delete("/delete/" + id);
		alert("Item Delete!");
		console.log(`Deleted item with id ${id}`);
	}

	function openUpdate(id) {
		setIsPut(true);
		setUpdatedItem((prevInput) => {
			return { ...prevInput, id: id };
		});
	}

	function updateItem(id) {
		axios.put("/update/" + id, updatedItem);
		alert("Item Updated");
		console.log(`Item with id ${id} updated.`);
	}

	function handleUpdate(event) {
		const { name, value } = event.target;
		setUpdatedItem((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
		//console.log(updatedItem);
	}

	return (
		<>
			<div className="container mt-5">
				{!isPut ? (
					<form>
						<div className="mb-3">
							<label className="form-label">Title</label>
							<input
								type="type"
								onChange={handleChange}
								value={item.title}
								className="form-control"
								placeholder="Enter an title"
								name="title"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Description</label>
							<textarea
								name="description"
								onChange={handleChange}
								value={item.description}
								className="form-control"
								rows="3"
							></textarea>
						</div>
						<div className="d-grid gap-2">
							<button
								type="button"
								className="btn btn-dark w-full"
								onClick={addItem}
							>
								Add Item
							</button>
						</div>
					</form>
				) : (
					<form>
						<div className="mb-3">
							<label className="form-label">Title</label>
							<input
								type="type"
								onChange={handleUpdate}
								value={updatedItem.title}
								className="form-control"
								placeholder="Enter an title"
								name="title"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Description</label>
							<textarea
								name="description"
								onChange={handleUpdate}
								value={updatedItem.description}
								className="form-control"
								rows="3"
							></textarea>
						</div>
						<div className="d-grid gap-2">
							<button
								type="button"
								className="btn btn-dark w-full"
								onClick={() => updateItem(updatedItem.id)}
							>
								Update Item
							</button>
						</div>
					</form>
				)}

				<table className="table table-striped mt-3">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Description</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => {
							return (
								<tr key={item._id}>
									<td>{item.title}</td>
									<td>{item.description}</td>
									<td>
										<button
											type="button"
											className="btn btn-primary mx-2"
											onClick={() => deleteItem(item._id)}
										>
											Delete
										</button>
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => openUpdate(item._id)}
										>
											Update
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{/* {items.map((item) => {
					return (
						<>
							<h1>{item.title}</h1>
							<p>{item.description}</p>
						</>
					);
				})} */}
			</div>
		</>
	);
}

export default App;
