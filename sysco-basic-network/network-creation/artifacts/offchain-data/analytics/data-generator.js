const axios = require("axios");
const url = "http://localhost:4000/channels/mychannel/chaincodes/loyaltyToken";
let pk = null;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njg2NTIwNjgsInVzZXJuYW1lIjoidGVzdF91c2VyIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1Njg2MTYwNjh9.g9NZnhY3G2MHub9I8iH17npWONcZKHcUiUk7Cnifbkw"
let conf = {
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
};

const { nanoid } = require('nanoid')


let rates = ['10 points= 1 token', '20 points= 1 token', '15 points= 1 token', '5 points = 1 token', '2 points = 1 token', '3 points = 1 token', '4 points = 1 token']
let owners = ['owner1', 'owner2', 'owner3', 'owner4', 'owner5', 'owner6', 'owner7']
let type = ['model1', 'model2', 'model3', 'model4', 'model5', 'model6', 'model7', 'model8', 'model9', 'model10', 'model11', 'model12']
let name = ['Audi', 'BMW', 'Tesla', 'ferrari', 'Dodge', 'Genesis', 'Hyundai', 'Kia', 'Land Rover', 'Lexus', 'Mazda', 'McLaren', 'Mercedes', 'Mini', 'Nissan', 'Porsche', 'Skoda', 'Volkswagen', 'Suzuki', 'Volvo']

const createPostData = async (pk, data) => {
	// console.log("Inside createPostData: DATA", data)
	// console.log("Inside createPostData: JSON DATA", JSON.stringify(data))
	return {
		fcn: "createToken",
		chaincodeName: "",
		channelName: "mychannel",
		args: [JSON.stringify(data), pk]
	}
}

const login = async () => {
	let d = {
		"username": "pavan1",
		"orgName": "Org1"
	}
	try {
		let resp = await axios.post("http://localhost:4000/users", d, { headers: { "Content-Type": "application/json" } })
		return resp.data.token
	} catch (error) {
		return error
	}
}


const test = async () => {
	let token = await login()
	console.log(token)
}

// test()



const addTokens = async (pk) => {

	let token = await login()
	console.log(token)

	setInterval(() => {
		console.log("inside")
		for (let i=0; i < 10; i++) {
			args = [
				nanoid(12),
				name[Math.floor(Math.random() * namelength)],
				type[Math.floor(Math.random() * type.length)],
				rates[Math.floor(Math.random() * rates.length)],
				owners[Math.floor(Math.random() * owners.length)]
			]
			// console.log("Args are", args)

			let data = {
				"fcn": "createToken",
				"chaincodeName": "loyaltyToken",
				"channelName": "mychannel",
				"args": args
			}


			return axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			}
			).then(resp => {
				console.log(resp.data.result)
			}
			).catch(function (error) { console.log(error); });

		}

	}, 1000)

};

addTokens()
