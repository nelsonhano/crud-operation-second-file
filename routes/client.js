const { Router } = require('express');
const { resolve } = require('path');
const Plan = require('../models/Plan');
const Student = require('../models/student')

const router = Router();
router.get('/', (req, res) => {
    res.sendFile(resolve('views', 'index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(resolve('views', 'about.html'));
});
router.get('/contact', (req, res) => {
    res.sendFile(resolve('views', 'contact.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(resolve('views', 'register.html'));
});
router.post('/register-submit', async (req, res) => {
    let { surname, first_name, other_name, dob, plan, email, phone, disability, gender, password, address } = req.body;
    let student = new Student(req.body);
    await student.save();
})
router.get('/students', async (req, res) => {
    let students = await Student.fetch();    
    res.render('students', {students})
})
router.get('/edit-student/:student_id', async (req, res)=>{
    let plans = await Plan.fetch();
    let student = await Student.findById(req.params.student_id)
    if (student) {
        res.render('edit-student', {student , plans})
    } else {
        res.redirect('/students')
    }
})
router.post('/edit-student/:student_id', async (req, res)=>{
    let student = await Student.findById(req.params.student_id)
    let { surname, first_name, other_name, dob, date_joined, email, phone, disability, gender, address, password } = req.body
    student.surname = surname
    student.first_name = first_name
    student.other_name = other_name
    student.dob = dob
    student.date_joined = date_joined
    student.email = email
    student.phone = phone
    student.disability = disability
    student.gender = gender
    student.password = password
    student.address = address
    
    await student.update()
    res.redirect('/students')
})
router.get('/delete-student/:student_id', async (req, res)=>{
    let student = await Student.findById(req.params.student_id)
    await student.delete()
    res.redirect('/students')
});
router.get('/add-plan', (req, res) => {
    res.sendFile(resolve('views', 'add-plan.html'))
})
router.post('/add-plan', async (req, res) => {
    let {name, price, description} = req.body;
    let plan = new Plan(req.body)
    await plan.save()
    res.redirect("/plans")
})
router.get('/plans', async (req, res) => {
    let plans = await Plan.fetch();    
    res.render('plans', {plans})
})
router.get('/edit-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    if (plan) {
        res.render('edit-plan', {plan})
    } else {
        res.redirect('/plans')
    }
})
router.post('/edit-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    let { name, price, description } = req.body
    plan.name = name
    plan.price = price
    plan.description = description
    await plan.update()
    res.redirect('/plans')
})
router.get('/delete-plan/:plan_id', async (req, res)=>{
    let plan = await Plan.findById(req.params.plan_id)
    await plan.delete()
    res.redirect('/plans')
});
module.exports = router;