const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = mongoose.Schema({
    name: String,
    description: String,
    gift_number: { type: Number, min: 1, max: 65 },
    video_link: String,
    start_date: Date,
    /*     end_date:  {
            type: Date,
            set: d =>  Date(d * 1000)
          }, */

          end_date: { type: Date },
    // end_date: { type: Date, set: d => convertSecsToMs(d) },


    // created: { type: Date, default: Date.now }
    //    new ISODate("2020-10-01")
}, { timestamps: true })



//  Convert from date to Timestamp
function convertSecsToMs(d) {
    // if (!d || !isValidTimestamp(d)) return;
    console.log("----- date timestamp ---" + d);

    var mydate = new Date(d);
    // var mydate = new Date('2014-04-03');
    // console.log(mydate.toDateString());

    let y = Math.floor(+mydate / 1000)

    // console.log(y);
    return y;
    //return new Date(d * 1000);
}

/* function isValidTimestamp(date) {
    return new Date(date).getTime() > 0;
} */


module.exports = mongoose.model('Games', GameSchema);

