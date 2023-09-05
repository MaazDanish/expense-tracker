//  getting all elements
const Button = document.querySelector('#add-item-btn');
const itemList = document.querySelector('#items');



async function saveData(event) {
	event.preventDefault();
	const Name = event.target.Name.value;
	const Desc = event.target.Desc.value;
	const Price = event.target.Price.value;

	const expenseData = {
		Name,
		Desc,
		Price
	}
	if (Name === '' || Desc === '' || Price === '') {
		alert('Empty fields are not allowed');
	}
	if (Button.id) {
		axios.put('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem/' + addItem.id, expenseData)
			.then((res) => {
				Button.id = addItem.id;
				display(expenseData);
			})
			.catch((err) => console.log(err));
		addItem.id = '';
	} else {
		try {
			let res = await axios.post('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem', expenseData);
			display(res.data);
		} catch (err) {
			console.log(err);
		}
	}
	event.target.Name.value = '';
	event.target.Desc.value = '';
	event.target.Price.value = '';
}

// function to display data on screen
async function display(itemData) {

	// creating li for storing data
	const li = document.createElement('li');
	li.className = 'margin-top';
	li.textContent = expenseData.ItemName + " : " + expenseData.itemDesc + " : " + expenseData.itemPrice;

	// adding data in crud crud 


	//  DELETE BUTTON
	const deleteButton = document.createElement('input');
	deleteButton.type = 'button';
	deleteButton.value = 'Delete';
	deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

	//  setting id with the data id
	let id = expenseData.id;
	deleteButton.onclick = async () => {
		try {
			let res = await axios.delete('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem/' + id);
			console.log(res);
		}
		catch (err) {
			console.log(err);
		}
		itemList.removeChild(li);
	};

	// EDIT BUTTON
	const editButton = document.createElement('input');
	editButton.type = 'button';
	editButton.value = 'Edit';
	editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

	editButton.onclick = async () => {
		try {
			expenseData.id = id;
		} catch (err) {
			console.log(err);
		}
		itemList.removeChild(li);
		document.querySelector('#Name').value = itemData.ItemName;
		document.querySelector('#desc').value = itemData.itemDesc;
		document.querySelector('#Price').value = itemData.itemPrice;
	};


	// appending the child element
	li.appendChild(deleteButton);
	li.appendChild(editButton);
	itemList.appendChild(li);

}

window.addEventListener('DOMContentLoaded', async () => {
	try {
		let res = await axios.get('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem')
		for (var i = 0; i < res.data.length; i++) {
			display(res.data[i]);
		}
	} catch (err) {
		console.log(err);
	}
});