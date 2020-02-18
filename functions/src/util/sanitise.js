
const sanitise = (req, key) => req.sanitize(req.body[key]);

module.exports = { sanitise };
