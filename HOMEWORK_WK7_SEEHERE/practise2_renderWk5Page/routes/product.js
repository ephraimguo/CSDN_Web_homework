const exp = require('express');
const r = exp.Router();


let prod = `
<div class="product">
    <h2>Display Gallery</h2>
    <div class="list">
        <h4>Product Name</h4>
        <img src="../public/images/bird.jpeg" alt="this is a bird pictures">
        <p>Some Descriptions</p>
    </div>
</div>
`;

r.get("/", function(req, res, next){
    res.render("product", {card: '<div class="product"> <h2>Display Gallery</h2> <div class="list"> <h4>Product Name</h4> <img src="../public/images/bird.jpeg" alt="this is a bird pictures"> <p>Some Descriptions</p> </div> </div>'});
});

module.exports = r;