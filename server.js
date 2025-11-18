let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// ✅ Ton URI de connexion à MongoDB Atlas
const uri = 'mongodb+srv://baamadoudiogo928_db_user:motdepasse123@cluster0.ybmk4av.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Ces options sont parfois obsolètes selon ta version de Mongoose :
  // useFindAndModify: false
};

// ✅ Connexion à MongoDB
mongoose.connect(uri, options)
  .then(() => {
    console.log("✅ Connecté à la base MongoDB assignments dans le cloud !");
    console.log("📡 URI = " + uri);
    console.log("🌐 Vérifiez sur : http://localhost:8010/api/assignments");
  })
  .catch(err => {
    console.error('❌ Erreur de connexion :', err);
  });

// ✅ Autoriser CORS (pour connexion Angular → Node)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// ✅ Pour lire le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;
const prefix = '/api';

// ✅ Routes REST
app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);
app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

// ✅ Démarrage du serveur
app.listen(port, "0.0.0.0", () => {
  console.log('🚀 Serveur démarré sur http://localhost:' + port);
});

module.exports = app;
