db_username = process.env.dbUsername
db_password = process.env.dbPassword
console.log(db_password, db_username)

module.exports = {
    dbUrl: `mongodb+srv://${db_username}:${db_password}@cluster0.2ip3w.mongodb.net/hspcare?retryWrites=true&w=majority`
}