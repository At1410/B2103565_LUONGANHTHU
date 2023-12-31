const jwt = require("jsonwebtoken")
const jwtSecret = "jwtSecret1234567890"
const ObjectId = require("mongodb").ObjectId
require("./globals")

module.exports = async function (request, result, next) {
    try {
        const accessToken = request.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(accessToken, jwtSecret)
        const userId = decoded.userId

        const user = await global.db.collection("users").findOne({
            accessToken: accessToken
        })

        if (user == null) {
            result.json({
                status: "error",
                message: "Người dùng đã đăng xuất."
            })
            return
        }

        request.user = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        next()
    } catch (exp) {
        result.json({
            status: "error",
            message: "Người dùng đã đăng xuất."
        })
    }
};