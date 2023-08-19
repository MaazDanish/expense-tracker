//  getting all elements
const addItem = document.querySelector('#add-item-btn');
const itemList = document.querySelector('#items');
// const categoryInput = amount.value;


function saveData(event) {
	event.preventDefault();
	const ItemName = event.target.Name.value;
	const itemDesc = event.target.desc.value;
	const itemPrice = event.target.Price.value;
	const itemQuantity = event.target.quantity.value;

	const itemData = {
		ItemName,
		itemDesc,
		itemPrice,
		itemQuantity
	}
	if (addItem.id) {
		axios.put('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem/' + addItem.id, itemData)
			.then((res) => {
				itemData._id = addItem.id;
				display(itemData);
			})
			.catch((err) => console.log(err));
		addItem.id = '';
	} else {
		axios.post('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem', itemData)
			.then((res) => display(res.data))
			.catch((err) => console.log(err));
	}
	event.target.Name.value = '';
	event.target.desc.value = '';
	event.target.Price.value = '';
	event.target.quantity.value = '';
}

// function to display data on screen
function display(itemData) {
	// console.log(itemData);
	if (itemData.ItemName === '' || itemData.itemDesc === '' || itemData.itemPrice === '' || itemData.itemQuantity === '') {
		alert('Empty fields are not allowed');
	} else {
		// creating li for storing data
		const li = document.createElement('li');
		li.className = 'margin-top';
		li.textContent = itemData.ItemName + " : " + itemData.itemDesc + " : " + itemData.itemPrice + " : " + itemData.itemQuantity;

		// SAVING DATA TO LOCAL STORAGE
		// const expenseData = itemData.ItemName + " : " + itemData.itemDesc + " : " + itemData.itemPrice;
		// localStorage.setItem(itemData.itemPrice, expenseData);

		// adding data in crud crud 


		//  DELETE BUTTON
		const deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

		//  setting id with the data id
		let id = itemData._id;
		deleteButton.onclick = () => {
			axios.delete('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem/' + id)
				.then(() => {
					console.log(res);
				})
				.catch((error) => console.log(error));
			itemList.removeChild(li);
		};

		// EDIT BUTTON
		const editButton = document.createElement('input');
		editButton.type = 'button';
		editButton.value = 'Edit';
		editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

		//  Sold Products
		const buyProducts = document.createElement('input');
		buyProducts.type = 'button';
		buyProducts.value = '-1';
		buyProducts.className = 'btn btn-outline-primary float-end m-lg-1 edit';

		buyProducts.onclick = () => {
			axios.put('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem/' + addItem.id, itemData)
			.then((res) => {
				itemData.itemQuantity = itemData.itemQuantity-1;
				display(itemData);
			})
			.catch((err) => console.log(err));
		};
		editButton.onclick = () => {
			addItem.id = id;
			itemList.removeChild(li);
			document.querySelector('#Name').value = itemData.ItemName;
			document.querySelector('#desc').value = itemData.itemDesc;
			document.querySelector('#Price').value = itemData.itemPrice;
			document.querySelector('#quantity').value = itemData.itemQuantity;
		};


		// appending the child element
		li.appendChild(deleteButton);
		li.appendChild(editButton);
		li.appendChild(buyProducts);
		// li.appendChild(buyTwoProducts);
		// li.appendChild(buyFiveProducts);
		itemList.appendChild(li);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	axios.get('https://crudcrud.com/api/c945d72eab7847e99cc4d488701590bd/addItem')
		.then((res) => {
			for (var i = 0; i < res.data.length; i++) {
				display(res.data[i]);
			}
		})
		.catch((err) => console.log(err));
})
// window.addEventListener("DOMContentLoaded", ()=> {
// 	const localStorageObj = localStorage;
// 	const localStorageKeys = Object.keys(localStorageObj);

// 	for(var i=0; i<localStorageKeys.length; i++){
// 		const key = localStorageKeys[i];
// 		const localDeatilsString = localStorageObj[key];
// 		const userDatilsObj = JSON.parse(localDeatilsString);
// 		display(userDatilsObj);
// 	}i
// })