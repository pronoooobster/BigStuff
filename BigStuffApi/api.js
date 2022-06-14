                                        // variables and constants declaration
var mysql = require('mysql');
const Joi = require('joi');
const http = require('http');
const { use } = require('express/lib/application');
const express = require('express');
const app = express();
const apiPort = process.env.PORT || 3000;
const cors = require('cors');


app.use(express.json());

const corsOptions = {
    origin: ["https://bigstuff.vercel.app/dashboard", "https://bigstuff-pronoooobster.vercel.app", "https://bigstuff-git-main-pronoooobster.vercel.app"]
};

app.use(cors(corsOptions));

                                                // database connection configuration
var db_con = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    port: 3306,
    user: 'sql11492651',
    password: 'MNWfwHezZk',
    database: "sql11492651"
});
                                        // connection to the database
db_con.connect((err) => {
    if(err) throw err;
    console.log("Connected!");
});

function validateTask(task) {
    const schema = Joi.object({
        task_id: Joi.number(),
        user_id: Joi.string().required(),
        task_name: Joi.string().max(100),
        deadline: Joi.string(),
        reminder: Joi.boolean(),
        priority: Joi.number()
    });
    return schema.validate(task);
}

                                        // GET requests 
app.get('/', (req, res) => {
    
    res.send('It works!');
    res.end();
});
                                            // reqests in format 
                                            // /api/tasks?user_id=0
app.get('/api/tasks', (req, res) => {
    
    let user_id = req.query.user_id;
    console.log(`GET Request for list of tasks detected with user_id=${user_id};`); 
    let curr_querry = `SELECT * FROM Tasks WHERE user_id = '${user_id}' ORDER BY priority DESC;`;

    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
        res.send(JSON.parse( JSON.stringify(result) ));
    });
});
                                            // requests for specific tasks in format
                                            // /api/tasks/1
app.get('/api/tasks/:task_id', (req, res) => {
    
    let task_id = parseInt( req.params.task_id );
    console.log(`GET Request for task detected with task_id=${task_id};`); 
    let curr_querry = `SELECT * FROM Tasks WHERE task_id = ${task_id} ORDER BY priority DESC;`;

    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
        res.send(JSON.parse( JSON.stringify(result) ));
    });
});

                                            // POST requests
app.post('/api/tasks', (req, res) => {
    
    const { error } = validateTask(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const task ={
        task_id: null,
        user_id: req.body.user_id,
        task_name: req.body.task_name,
        deadline: req.body.deadline,
        reminder: req.body.reminder,
        priority: req.body.priority
    };

    let curr_querry = `INSERT INTO Tasks (task_id, user_id, task_name, deadline, reminder, priority) 
                        VALUES (null, '${req.body.user_id}', '${req.body.task_name}', '${req.body.deadline}', ${req.body.reminder}, ${req.body.priority});`;

    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
    });

    curr_querry = `SELECT LAST_INSERT_ID() as res;`;
    db_con.query(curr_querry, (err, result, fields) => {
        if(err) throw err;
        task.task_id = result[0].res;
        res.send(task);
    })
});

                                        // PUT reqests
                                        // reqests in format
                                        // /api/tasks/0
app.put('/api/tasks/:task_id', (req, res) => {
    
    let task_id = parseInt( req.params.task_id );
    console.log(`PUT Request for task detected with task_id=${task_id};`); 
    let curr_querry = `SELECT EXISTS (SELECT task_id FROM Tasks WHERE task_id = ${task_id}) as output;`;

    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
        if( JSON.parse( JSON.stringify(result) )[0].output == 0 ) {
            res.status(404).send('The task with the given ID was not found!');
            return;
        }
    });

    const { error } = validateTask(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    curr_querry = `UPDATE Tasks SET user_id = '${req.body.user_id}',
                     task_name = '${req.body.task_name}', deadline = '${req.body.deadline}', 
                     reminder = ${req.body.reminder}, priority = ${req.body.priority} WHERE task_id = ${task_id};`;
    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
    });
    res.send(req.body);
});

                                        // DELETE requests
                                        // reqests in format
                                        // /api/tasks/0
app.delete('/api/tasks/:task_id', (req, res) => {
    
    let task_id = parseInt( req.params.task_id );
    console.log(`DELETE Request for task detected with task_id=${task_id};`); 
    let curr_querry = `SELECT EXISTS (SELECT task_id FROM Tasks WHERE task_id = ${task_id}) as output;`;

    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
        if( JSON.parse( JSON.stringify(result) )[0].output == 0 ) {
            res.status(404).send('The task with the given ID was not found!');
            return;
        }
    });

    curr_querry = `DELETE FROM Tasks WHERE task_id = ${task_id};`;
    db_con.query(curr_querry, function(err, result, fields) {
        if(err) throw err;
    });
    res.send({ });
});

app.listen(apiPort, () => { console.log(`Listening on ${apiPort}`); });

module.exports = app;