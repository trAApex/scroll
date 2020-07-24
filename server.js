const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(console.log("It's working fine!"));
});

app.listen(port, () => 
  console.log(`Lapozó app listening on port ${port}!`)
);