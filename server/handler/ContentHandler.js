"use strict";

const userPool = require("../database/database");

class ContentHandler {
    getAllContents(req, res) {
        res.end("get contents");
    }

    async postContents(req, res) {
        const {
            content_id,
            content_description,
            created_on,
            created_by,
        } = req.body;
        try {
            const save = await userPool.query(
                "INSERT INTO idol_contents (content_id, content_description, created_on, created_by) VALUES($1, $2, $3, $4) RETURNING *",
                [content_id, content_description, created_on, created_by]
            );
            console.log("save", save.rows[0]);
        } catch (err) {
            // show error to user
            console.error(err.message);
        } finally {
            res.end();
        }
    }
}

module.exports = ContentHandler;
