const config = require('../config');
const mysql = require('mysql2');
const pool = mysql.createPool(config.db);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getAll(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM todos
                `, 
                (err, results) => {
                if (err) throw err;
                res.send({
                    status: 'Success',
                    message: 'Success',
                    data: results
                })
            });
            connection.release();
        }
        );
    },
    getOne(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM todos WHERE id = ?
                `, 
                [req.params.id],
                (err, results) => {
                if (err) throw err;
                res.send({
                    status: 'Success',
                    message: 'Success',
                    data: results
                })
            });
            connection.release();
        }
        );
    },
    create(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO todos SET ?
                `, 
                req.body,
                (err, results) => {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM todos WHERE id = ?
                    `,
                    [results.insertId],
                    (err, results) => {
                    if (err) throw err;
                    res.send({
                        status: 'Success',
                        message: 'Success',
                        data: results,
                        
                    })
                });
            });
            connection.release();
        }
        );
    },
    delete(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM todos WHERE id = ?
                `, 
                [req.params.id],
                (err, results) => {
                if (err) throw err;
                if (results.affectedRows === 0) {
                    res.send({
                        status: 'Not Found',
                        message: `Todo with ID ${req.params.id} Not Found`,
                        data: {}
                    })
                } else {
                    res.send({
                        status: 'Success',
                        message: 'Success',
                        data: {}
                    })
                }
            });
            connection.release();
        }
        );
    },
    update(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `
                UPDATE todos SET ? WHERE id = ?
                `, 
                [req.body, req.params.id],
                (err, results) => {
                if (err) throw err;
                if (results.affectedRows === 0) {
                    res.send({
                        status: 'Not Found',
                        message: `Todo with ID ${req.params.id} Not Found`,
                        data: {}
                    })
                } else {
                    connection.query(
                        `
                        SELECT * FROM todos WHERE id = ?
                        `,
                        [req.params.id],
                        (err, results) => {
                        if (err) throw err;
                        res.send({
                            status: 'Success',
                            message: 'Success',
                            data: results
                        })
                    });
                }
            });
            connection.release();
        }
        );
    }
};
