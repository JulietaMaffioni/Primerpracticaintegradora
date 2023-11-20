import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'
// import Message from './models/chat.models';
import __dirname from './utils.js'


const app = express()
const mongoURL = 'mongodb+srv://julietamaffioni:contrasenia1@cluster01.ujgs2fi.mongodb.net/'
const mongoDBName = 'Ecommerce' 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))


// app.get('/mensaje', async (req, res) => {
//     const messages = await Message.find().sort({ timestamp: -1 }).limit(10); 
//     res.render('chat', { messages });
//   });

app.get('/', (req, res) => res.render('index', {}))
app.get('/health', (req, res) => res.send('OK'))
app.use('/product', productRouter)

// app.post('/sendMessage', async (req, res) => {
//     const { user, message } = req.body;
  
//     try {
//       await Message.create({ user, message });
//       res.redirect('/');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error interno del servidor');
//     }
//   });


mongoose.connect(mongoURL, { dbName: mongoDBName })
    .then(() => {
        console.log('connected')
        app.listen(8080, () => console.log(`Listening`))
    })
    .catch(e => console.error('Error'))