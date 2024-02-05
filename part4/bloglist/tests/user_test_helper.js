const listOfUsers = [
  {
    _id: '65bc1315bbea404f5606a677',
    username: 'john123',
    name: 'John',
    passwordHash: '$2b$10$0uU.36M4e1HTXfE78Ekv4eL/K0ZkzXfaP1SynjxAwed7uTR3ri2Qq',
    __v: 15
  }
]
const userForLogin = [
  {     
    username: 'john123',
    password: 'john123'
      
  }
]
const newUser= [
  {
    username: 'admin123',
    name: 'Admin',
    password: 'admin123',
  }
]
const alreadyCreatedUser= [
  {
    username: 'john123',
    name: 'John',
    password: 'admin123',
  }
]
const userWithShortName= [
  {
    username: 'ad',
    name: 'Admin',
    password: 'admin123',
  }
]
const userWithShortPassword= [
  {
    username: 'adaaaa',
    name: 'Admin',
    password: 'ad',
  }
]
const userWithoutPassword= [
  {
    username: 'ad',
    name: 'Admin'
  }
]
module.exports = {
  listOfUsers, newUser,userWithShortName,userWithShortPassword,userWithoutPassword,alreadyCreatedUser,
  userForLogin
}