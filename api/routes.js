const express = require('express');

const router = express.Router();

// const dbFunc = require('../db/db.js')
const welcomeRoutes = require('./welcomeRoutes.js')
const notesRoutes = require('./notesRoutes.js')
const authRoutes = require('./authRoutes.js')
const userRoutes = require('./userRoutes.js')

const { protect } = require('./middleware')

router.use(express.json());

// from api
router.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN Backend API is running."})
})

router.use('/welcome/', welcomeRoutes);
router.use('/notes/', protect, notesRoutes);
router.use('/user/', protect, userRoutes);

router.use('/auth/', authRoutes);

module.exports = router