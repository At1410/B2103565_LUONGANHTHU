const nodemailer = require("nodemailer")
const nodemailerFrom = ""
const nodemailerObject = {
	host: "",
	port: 465,
	secure: true,
	auth: {
		user: "",
		pass: ""
	}
}

global.sendMail = async function (to, subject, message, onSuccess = null) {
	const transporter = nodemailer.createTransport(nodemailerObject)

	transporter.sendMail({
		from: nodemailerFrom,
		to: to,
		subject: subject,
		text: message,
		html: message
	}, function (error, info) {
		if (error) {
			console.error(error);
		} else {
			console.log("Email gửi: " + info.response);
		}

		if (onSuccess != null) {
			onSuccess()
		}
	})
}

global.decrementItemsInStock = async function (items) {
	for (let a = 0; a < items.length; a++) {
		const product = await global.db.collection("products").findOne({
			_id: items[a]._id
		})
		if (product != null) {
			if (product.itemsInStock > 0 && product.itemsInStock < items[a].units) {
				return {
					status: "error",
					message: "Chỉ còn " + product.itemsInStock + " sản phẩm " + product.name
				}
			}

			const remainingUnits = product.itemsInStock - items[a].units
			if (remainingUnits < 0) {
				return {
					status: "error",
					message: "Không đủ hàng " + product.name
				}
			}

			await global.db.collection("products").findOneAndUpdate({
				_id: product._id
			}, {
				$set: {
					itemsInStock: remainingUnits
				}
			})
		}
	}

	return {
		status: "success",
		message: "Số lượng hàng trong kho giảm."
	}
}