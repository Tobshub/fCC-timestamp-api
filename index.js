const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const { parse } = require('dotenv');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});





app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.use("/api/:date", (req, res) => {
  try {
    let { date } = req.params;
    date = (parseInt(date) == date) ? parseInt(date) : date;

    const ret = new Date(date)
    if (ret == 'Invalid Date') {
      res.send({
        error: 'Invalid Date'
      })
    }
    res.json({
      unix: ret.getTime(),
      utc: ret.toUTCString()
    })
  } catch (e) {
    console.error(e);
    res.send({
      error: e.message
    })
  }
})

app.use("/api", (req, res) => {
  try {
    const ret = new Date()
    res.json({
      unix: ret.getTime(),
      utc: ret.toUTCString()
    })
  } catch (e) {
    console.error(e);
    res.send({
      error: e.message
    })
  }
})


const listener = app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${listener.address().port}`);
});
