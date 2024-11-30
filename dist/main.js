"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./app/logging");
const web_1 = require("./app/web");
web_1.web.listen(3000, () => {
    logging_1.logger.info('Listening on port 3000');
});
