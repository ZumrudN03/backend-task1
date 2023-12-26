import express from 'express';
import mongoose, { Schema } from 'mongoose';

const app = express()
const port = 3200
app.use(express.json())


const userSchema = new Schema({
    name: String,
    surname: String,
    age: Number,

});
const UserModel = mongoose.model('Users', userSchema);

app.get('/', async (req, res) => {
    const user = await UserModel.find({})
    res.send(user)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id);
    const user = await UserModel.findById(id)
    res.send(user)
})

app.post('/', async (req, res) => {
    const { name, surname, age } = req.body
    const newUser = new UserModel({ name, surname, age })
    await newUser.save()
    res.send('Ugurla yuklendi')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, surname, age } = req.body
    const user = await UserModel.findByIdAndUpdate(id)
    res.send(user)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { name, surname, age } = req.body
    const user = await UserModel.findByIdAndDelete(id)
    res.send(user)
})
mongoose.connect('mongodb+srv://Zumrud03:Durmuz2003@zumrud.qilshcl.mongodb.net/')
  .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

