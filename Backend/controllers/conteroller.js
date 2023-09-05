const Expense = require('../Models/expense');

exports.AddExpense = (req, res, next) => {
    const Name = req.body.Name;
    const Desc = req.body.Desc;
    const Price = req.body.Price;
    return Expense.create({
        Name: Name,
        Desc: Desc,
        Price: Price

    }).then(data => {
        console.log('Successfully added to the database from the page');
        return res.json(data);
    }).catch(err => console.log(err));
}

exports.getExpense = (req, res, next) => {
    Expense.findAll()
        .then(ExpenseRowData => {
            res.json(ExpenseRowData);
        })
        .catch(err => console.log(err));
}

exports.DeleteExpense = (req, res, next) => {
    const id = req.body.id;
    Expense.findByPk(id)
        .then(Row => {
            return Row.destroy();
        }).then(() => {
            console.log('Succesfully deleted ---------------');
            res.redirect('/add-expense');
        }).catch(err => console.log(err));
}
exports.editingExpense = (req, res, next) => {
    const id = req.params.id;
    const Name = req.body.Name;
    const Desc = req.body.Desc;
    const Price = req.body.Price;
    Expense.findByPk(id)
        .then(Row => {
            Row.Name = Name;
            Row.Desc = Desc;
            Row.Price = Price;
            return Row.save();
        })
        .then(data => {
            console.log('Succesfullyd Updated ------');
            res.json(data);
        })
        .catch(err => console.log(err))
}