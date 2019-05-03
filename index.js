const express = require('express');
const app = express();
const pages = require('./pages/links');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Link to Website',
    pages
  })
);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error'); // res.render to show page error in dev.
// });

// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// pages API Routes
// app.use('/api/links', require('./routes/api/links'));