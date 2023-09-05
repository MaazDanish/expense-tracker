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
		axios.put('http://localhost:4000/add-expense/' + Button.id, expenseData)
			.then((res) => {
				expenseData.id = Button.id;
				display(expenseData);
			})
			.catch((err) => console.log(err));
			expenseData.id = '';
	} else {
		try {
			let res = await axios.post('http://localhost:4000/add-expense', expenseData);
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
async function display(expenseData) {
	const { Name, Desc, Price } = expenseData;

	// creating li for storing data
	const li = document.createElement('li');
	li.className = 'margin-top';
	li.textContent = Name + " : " + Desc + " : " + Price;

	//  DELETE BUTTON
	const deleteButton = document.createElement('input');
	deleteButton.type = 'button';
	deleteButton.value = 'Delete';
	deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

	//  setting id with the data id
	let id = expenseData.id;
	deleteButton.onclick = async () => {
		try {
			let res = await axios.post('http://localhost:4000/delete-expense/', { id });
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

	editButton.onclick = () => {
		Button.id = id;
		itemList.removeChild(li);
		document.querySelector('#Name').value = Name;
		document.querySelector('#Desc').value = Desc;
		document.querySelector('#Price').value = Price;
	};


	// appending the child element
	li.appendChild(deleteButton);
	li.appendChild(editButton);
	itemList.appendChild(li);

}

window.addEventListener('DOMContentLoaded', async () => {
	try {
		let res = await axios.get('http://localhost:4000/add-expense')
		for (var i = 0; i < res.data.length; i++) {
			display(res.data[i]);
		}
	} catch (err) {
		console.log(err);
	}
});