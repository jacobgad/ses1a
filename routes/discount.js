// let isExistDiscount = false
// do {
//     let myDiscountCode = coupongenerator()
//     let newDiscountCode = new DiscountCode({
//         code: myDiscountCode,
//         isPercent: false,
//         amount: [{ IRT: 5000 }, { USD: 5 }, { EUR: 5 }],
//         expireDate: '',
//     isActive: true
// })
//     newDiscountCode.save(function (err) {
//         if (err) {
//             if (err.name === 'MongoError' && err.code === 11000) {
// // Duplicate code detected
//                 isExistDiscount = true;
//             }
//         }
//         res.send({
// //success message render
//         })
//     })
// }
// while (isExistDiscount);

const express = require('express');
const router = express.Router();

const Discount = require('../models/discount');
const coupGen = require('../models/codeGen');

const admin = require('../controllers/admin');
const { isNotUser } = require('../middleware/admin')
const { isLoggedIn } = require('../middleware/users');

router.get('/', async (req, res) => {
    const discounts = await Discount.find({});
    res.render('admin/discount', { discounts });
})

router.post('/', async (req, res) => {
    const { code, percentage } = req.body;
    // const coup = coupGen();
    const discount = new Discount({
        code: code,
        amount: percentage
    });
    await discount.save();
    res.redirect('/discount');
})

// router.route('/')
//     .get(isLoggedIn, isNotUser, admin.renderIndex)
//     .post(admin.firstAdmin);
//
// router.get('/new', admin.renderFirstAdmin);
//
// router.delete(admin.deleteDiscount)

// router.route('/discount')
//     .delete(isLoggedIn, isNotUser, admin.deleteDiscount)

module.exports = router;