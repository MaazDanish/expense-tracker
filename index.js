//  getting all elements
const addItem = document.querySelector('#add-expense-btn');
const amount = document.querySelector('#amount');
const desc = document.querySelector('#desc');
const category = document.querySelector('#category');
const itemList = document.querySelector('#items');
const categoryInput = amount.value;

//  event listner on add expense button
addItem.addEventListener('click', display);

// function to display data on screen
function display() {

	const ItemName = amount.value;
	const itemDesc = desc.value;
	const itemPrice = category.value;
	const itemData = {
		ItemName ,
		itemDesc ,
		itemPrice
	}
	if (ItemName === '' || itemDesc === '' || itemPrice === '') {
		alert('Empty fields are not allowed');
	} else {
		// creating li for storing data
		const li = document.createElement('li');
		li.className = 'margin-top';
		li.textContent = itemData.ItemName + " : " + itemData.itemDesc + " : " + itemData.itemPrice;

		// SAVING DATA TO LOCAL STORAGE
		// const expenseData = itemData.ItemName + " : " + itemData.itemDesc + " : " + itemData.itemPrice;
		localStorage.setItem(itemData.itemPrice, itemData);

		// adding data in crud crud 
		// axios.post('https://crudcrud.com/api/10fc0c18016d4677a699ae22d003d8c1/addData',itemData)
		// 	.then( (res)=> console.log(res))
		// 	.catch( (err)=> console.log(err));


		//  DELETE BUTTON
		const deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

		deleteButton.onclick = () => {
			localStorage.removeItem(itemData.itemPrice);
			itemList.removeChild(li);
		};
		// EDIT BUTTON
		const editButton = document.createElement('input');
		editButton.type = 'button';
		editButton.value = 'Edit';
		editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

		editButton.onclick = () => {
			localStorage.removeItem(itemData.itemPrice);
			itemList.removeChild(li);
			document.querySelector('#amount').value = itemData.ItemName ;
 			document.querySelector('#desc').value = itemData.itemDesc ;
			document.querySelector('#category').value = itemData.itemPrice ;
		};


		// appending the child element
		li.appendChild(deleteButton);
		li.appendChild(editButton);
		itemList.appendChild(li);

		// clear all fields
		amount.value = '';
		desc.value = '';
		category.value = '';
	}
}

// window.addEventListener('DOMContentLoaded', ()=> {
// 	axios.get('https://crudcrud.com/api/10fc0c18016d4677a699ae22d003d8c1/addData')
// 		.then( (res) => {
// 			console.log(res);
// 			display(res);
// 		})
// 		.catch( (err) => console.error(err));
// })