const express = require( 'express' );
const { compileAndRunCode } = require( '../controllers/code' );
const router = express.Router();

router.post( '/', compileAndRunCode );

module.exports = router;