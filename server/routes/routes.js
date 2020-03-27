const ContentHandler = require("../handler/ContentHandler");

function routes(app) {
    const contentHandler = new ContentHandler();

    app.route("/contents/:userID")
        .get(contentHandler.getAllContents)
        .post(contentHandler.postContents);
}

module.exports = routes;
