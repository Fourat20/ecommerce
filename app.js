const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());

// parse application/x-www-form-urlencoded --by 4@
app.use(bodyParser.urlencoded({ extended: false }))

// default parser 
app.use(bodyParser.json());

//IMPORT ROUTE
const userRoute = require('./routes/user');
const ProductRoute = require('./routes/Product') ; 
const ProviderRoute = require('./routes/provider') ; 
const OfferRoute = require('./routes/offer') ; 
const GameRoute = require('./routes/game') ; 
// added category 17/01/2020
const CategoryRoute = require('./routes/category') ; 

const GameViewsRoute = require('./routes/game_views') ; 

const WinnerRoute = require('./routes/winner') ; 
const CouponRoute = require('./routes/coupon') ; 
const NotificationRoute = require('./routes/notification') ; 
const AdsRoute = require('./routes/ads') ; 




//INIT ROUTE
app.use('/user',userRoute)
app.use('/product', ProductRoute)
// ----
app.use('/provider', ProviderRoute)
app.use('/offer', OfferRoute)
app.use('/game', GameRoute)
// -----
app.use('/category', CategoryRoute)

// game views
app.use('/game_views', GameViewsRoute)

app.use('/winner', WinnerRoute)
app.use('/coupon', CouponRoute)
app.use('/notification', NotificationRoute)

app.use('/ads', AdsRoute)



//MONGODB CONNECTION as DEFAULT PATH 
mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser : true })
    .then(() => console.log("MongoDB conected ..."))
    .catch(err => console.log(err));
//START SERVER -- PORT 8000
app.listen(8000)