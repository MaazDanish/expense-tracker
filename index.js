//  getting all elements
const addAnExpenseBtn = document.querySelector('#add-expense-btn');
const amount = document.querySelector('#amount');
const desc = document.querySelector('#desc');
const category = document.querySelector('#category');
const expenseList = document.querySelector('#items');
const categoryInput = amount.value;

//  event listner on add expense button
addAnExpenseBtn.addEventListener('click', display);

// function to display data on screen
function display() {
	const amountData = amount.value;
	const descData = desc.value;
	const categoryData = category.value;

	if (amountData === '' || descData === '' || categoryData === '') {
		alert('Empty fields are not allowed');
	} else {
		// creating li for storing data
		const li = document.createElement('li');
		li.className = 'margin-top';
		li.textContent = amountData + " : " + descData + " : " + categoryData;

		// SAVING DATA TO LOCAL STORAGE
		const expenseData = amountData + " : " + descData + " : " + categoryData;
		localStorage.setItem(categoryData, expenseData);

		//  DELETE BUTTON
		const deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

		deleteButton.onclick = () => {
			localStorage.removeItem(categoryData);
			expenseList.removeChild(li);
		};
		// EDIT BUTTON
		const editButton = document.createElement('input');
		editButton.type = 'button';
		editButton.value = 'Edit';
		editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

		editButton.onclick = () => {
			localStorage.removeItem(categoryData);
			expenseList.removeChild(li);
			document.querySelector('#amount').value = amountData ;
 			document.querySelector('#desc').value = descData ;
			document.querySelector('#category').value = categoryData ;
		};


		// appending the child element
		li.appendChild(deleteButton);
		li.appendChild(editButton);
		expenseList.appendChild(li);

		// clear all fields
		amount.value = '';
		desc.value = '';
		category.value = '';
	}
}
