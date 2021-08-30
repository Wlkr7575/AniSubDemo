/*eslint-disable*/
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import user from '../user'
module.exports.signup = async (req, res) => {
  const { email, password, Name } = req.body
  try {
    const existingUser = await user.findOne({ email })
    if (existingUser) { return res.status(400).json({ message: 'User already exist' }) }
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await user.create({ email, password: hashedPassword, name: Name })
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
    this.$axios.setHeaders('authorization', token)
    res.status(200).json({ result, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports.signin = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    const existingUser = await user.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" })
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordCorrect) {
        return res.status(404).json({ message: 'invalid credentials' })
      } else {
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        console.log(token)
        res.status(200).json({ result: existingUser, token })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something  went wrong' })
  }
}
module.exports.addmylist = async (req, res) => {
  const { id } = req.params
  const post = req.body
  console.log(post.id)
  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('No post with this id') }
  const users = await user.findById(id)
  const index = users.mylist.findIndex(id => id === String(post.id))
  if (index === -1) {
    users.mylist.push(post.id)
  } else {
    users.mylist = users.mylist.filter(id => id !== post.id)
  }
  const updatePost = await user.findByIdAndUpdate(id, users, { new: true })
  res.json(updatePost)
}
module.exports.fetchmylist = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('No user with this id') }
  try {
    const list = await user.findById(id)
    const mylist = await list.mylist
    res.status(200).json({ list: mylist })
  } catch (error) {
    console.log(error)
  }
}
module.exports.tokenVerfiry = async(req, res)=>{
  res.status(400).send({message:'Done'})
}
