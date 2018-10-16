const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'dd7fb3a52ef94442b2a3d7eb501f882b'
});

const handleApiCall = (req,res) => {
	app.models  
      .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data => {
      	res.json(data);
      })
     .catch(err => res.status(400).json(err))
}

const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('users')
	.where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.json("Unable to get entries"))
}

module.exports = {
	handleImage,
	handleApiCall
}