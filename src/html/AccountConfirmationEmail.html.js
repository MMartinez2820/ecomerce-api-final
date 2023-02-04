const jwt = require("jsonwebtoken");
require("dotenv").config();

const HTML =  (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "1d", algorithm: "HS512"});
    console.log(token);
    return (
        `
        <!DOCTYPE html>
        <html lang="en">
            
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
            
        <body>
            <div class="container">
                <h2>Confirm your account</h2>
                <p>This is only a message for user confirmation please click on the button to confirm, this token will expire,
                    you can request another on the page</p>
                <button class="updateComfirm" onclick="updateComfirm()">click</button>
            </div>
        </body>
        <style>
            * {
                color: aliceblue;
                padding: 0;
                margin: 0;
            }
        
            body {
                background-color: rgba(0, 0, 0, 0.809)
            }
        
            .container {
                height: 100vh;
                display: flex;
                justify-content: center;
                justify-items: center;
                align-items: center;
                gap: 5vw;
                flex-direction: column;
            }
        
            .updateComfirm {
                background-color: black;
                padding: 10px;
                border-radius: 10px;
            }
        </style>
        <script>
        
            const updateComfirm = () => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "https://entregable-final-ecommerce-api-production.up.railway.app/auth/confirm");
                // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
                const body = JSON.stringify({
                    userId: ${data.id},
                    token: '${token}',
                });
                xhr.onload = () => {
                    var data = JSON.parse(xhr.responseText);
                    if (xhr.readyState == 4 && xhr.status == "200") {
                        console.log(data);
                    } else {
                        console.log(data);
                    }
                };
                xhr.send(body);
            };
        
        </script>
        
        </html>
        `
    );
};

module.exports = HTML