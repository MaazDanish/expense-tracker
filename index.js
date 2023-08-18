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
	const userData = {
		amountData ,
		descData ,
		categoryData
	}
	if (amountData === '' || descData === '' || categoryData === '') {
		alert('Empty fields are not allowed');
	} else {
		// creating li for storing data
		const li = document.createElement('li');
		li.className = 'margin-top';
		li.textContent = userData.amountData + " : " + userData.descData + " : " + userData.categoryData;

		// SAVING DATA TO LOCAL STORAGE
		// const expenseData = userData.amountData + " : " + userData.descData + " : " + userData.categoryData;
		localStorage.setItem(userData.categoryData, userData);

		// adding data in crud crud 
		// axios.post('https://crudcrud.com/api/10fc0c18016d4677a699ae22d003d8c1/addData',userData)
		// 	.then( (res)=> console.log(res))
		// 	.catch( (err)=> console.log(err));


		//  DELETE BUTTON
		const deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Delete';
		deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

		deleteButton.onclick = () => {
			localStorage.removeItem(userData.categoryData);
			expenseList.removeChild(li);
		};
		// EDIT BUTTON
		const editButton = document.createElement('input');
		editButton.type = 'button';
		editButton.value = 'Edit';
		editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

		editButton.onclick = () => {
			localStorage.removeItem(userData.categoryData);
			expenseList.removeChild(li);
			document.querySelector('#amount').value = userData.amountData ;
 			document.querySelector('#desc').value = userData.descData ;
			document.querySelector('#category').value = userData.categoryData ;
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

// window.addEventListener('DOMContentLoaded', ()=> {
// 	axios.get('https://crudcrud.com/api/10fc0c18016d4677a699ae22d003d8c1/addData')
// 		.then( (res) => {
// 			console.log(res);
// 			display(res);
// 		})
// 		.catch( (err) => console.error(err));
// })