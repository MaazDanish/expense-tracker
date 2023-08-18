//  getting all elements
const addAnExpenseBtn = document.querySelector('#add-expense-btn');
const expenseList = document.querySelector('#items');
// const categoryInput = amount.value;


function saveData(event) {
    event.preventDefault();
    const amountData = event.target.amount.value;
    const descData = event.target.desc.value;
    const categoryData = event.target.category.value;
    const userData = {
        amountData,
        descData,
        categoryData
    }


    if (addAnExpenseBtn.id) {
        axios.put('https://crudcrud.com/api/e4e58abafd354202b35515094cecb533/addExpense/' + addAnExpenseBtn.id, userData)
            .then((res) => {
                userData._id = addAnExpenseBtn.id;
                display(userData)
            })
            .catch((err) => console.log(err));
        addAnExpenseBtn.id = '';
    } else {
        axios.post('https://crudcrud.com/api/e4e58abafd354202b35515094cecb533/addExpense', userData)
            .then((res) => display(res.data))
            .catch((err) => console.log(err));
    }
    // console.log(userData);
    // localStorage.setItem(userData.amountData, JSON.stringify(userData));
    // display(userData);

    event.target.amount.value = '';
    event.target.desc.value = '';
    event.target.category.value = '';
}

// function to display data on screen
function display(userData) {
    // console.log(userData);
    if (userData.amountData === '' || userData.descData === '' || userData.categoryData === '') {
        alert('Empty fields are not allowed');
    } else {
        // creating li for storing data
        const li = document.createElement('li');
        li.className = 'margin-top';
        li.textContent = userData.amountData + " : " + userData.descData + " : " + userData.categoryData;

        // SAVING DATA TO LOCAL STORAGE
        // const expenseData = userData.amountData + " : " + userData.descData + " : " + userData.categoryData;
        // localStorage.setItem(userData.categoryData, expenseData);

        // adding data in crud crud 


        //  DELETE BUTTON
        const deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Delete';
        deleteButton.className = 'btn btn-outline-danger float-end m-lg-1 delete';

        //  setting id with the data id
        let id = userData._id;
        deleteButton.onclick = () => {
            axios.delete('https://crudcrud.com/api/e4e58abafd354202b35515094cecb533/addExpense/' + id)
                .then(() => {
                    console.log(res);
                })
                .catch((error) => console.log(error));

            // localStorage.removeItem(userData.amountData);
            expenseList.removeChild(li);
        };
        // EDIT BUTTON
        const editButton = document.createElement('input');
        editButton.type = 'button';
        editButton.value = 'Edit';
        editButton.className = 'btn btn-outline-primary float-end m-lg-1 edit';

        editButton.onclick = () => {
            // localStorage.removeItem(userData.amountData);
            addAnExpenseBtn.id = id;
            expenseList.removeChild(li);
            document.querySelector('#amount').value = userData.amountData;
            document.querySelector('#desc').value = userData.descData;
            document.querySelector('#category').value = userData.categoryData;
        };


        // appending the child element
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        expenseList.appendChild(li);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/e4e58abafd354202b35515094cecb533/addExpense')
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