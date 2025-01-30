const express = require("express");
const mysql = require("mysql2/promise"); // TAKE A NOTE "PROMISE"


const app = express();
const port = 3000;

const dbConfig = {
    host: "localhost",
    port: 3307,
    user : "root",
    password: "123456",
    database: "in-class-db"
};

app.use(express.json());

// when we send to create a new resource we use POST

/*

{
    message: "lorem ipsum",
    name: "John Doe",
    email: "john@mail.com"
}

*/
app.post("/api/message", async (req, res) => {
    const { name, email, message } = req.body;
    if(!name || !email || !message ){
        return res.status(400).json({ error: "All fields are required "});
    }
    try {
        const conn = await mysql.createConnection(dbConfig);
        const query = " INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
        await conn.execute(query, [name, email, message]);
        await conn.end();
    } catch (error) {
        res.status(500).json({ error: "Somenthing happens in the server"});
    }
});


app.get("/api/messages", async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute("SELECT * FROM users");
        await conn.end();
        res.status(200).json(rows); // array of messages objects
    } catch (error) {
        res.status(500).json({ error: "Fail" });
    }
})

async function initDatabase() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [tables] = await conn.query("SHOW TABLES like 'messages'"); 

        if(tables.length === 0){
            const createTableQuery = `
                CREATE TABLE messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(200) NOT NULL,
                    email VARCHAR(200) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            await conn.query(createTableQuery);
            console.log('Table created');
            
        }

        await conn.end();
        

    } catch (error) {
        console.error("Database ERROR", error);
        process.exit(1);
        
    }
}


initDatabase().then(() => {
    app.listen(port, () => {
        console.log(`The server is runnin, PORT: ${port}`);
    })
})

// app.listen(port, () => {
//     console.log(`The server is runnin, PORT: ${port}`);
// })