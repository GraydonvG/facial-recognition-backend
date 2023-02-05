const KEY = process.env.API_CLARIFAI;
const USER_ID = process.env.USER_ID;
const APP_ID = process.env.APP_ID;

const handleApiCall = (req, res) => {
  const { input } = req.body;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: KEY,
    },
    body: raw,
  };

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json('Unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
