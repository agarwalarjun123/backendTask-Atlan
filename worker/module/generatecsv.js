const createCsvWriter = require("csv-writer").createObjectCsvWriter

const csvWriter = createCsvWriter({
	path: "./task.csv",
	header: [
		{id: "name", title: "Name"},
		{id: "surname", title: "Surname"},
		{id: "age", title: "Age"},
		{id: "gender", title: "Gender"},
	]
})

const data = [
	{
		name: "John",
		surname: "Snow",
		age: 26,
		gender: "M"
	}, {
		name: "Clair",
		surname: "White",
		age: 33,
		gender: "F",
	}, {
		name: "Fancy",
		surname: "Brown",
		age: 78,
		gender: "F"
	}
]
const write = async ()=>{
	for(let i=0;i<40000;i++)
		await csvWriter
			.writeRecords(data)

}

write()

module.exports = write