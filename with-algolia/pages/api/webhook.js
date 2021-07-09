const algoliasearch = require('algoliasearch');

const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);

const index = algolia.initIndex('products');

export default async (req, res) => {
  if (req.method !== 'POST') return res.end();

  if (req.headers['authorization'] !== process.env.WEBHOOK_SECRET_KEY)
    return res.status(401).end();

  try {
    const {
      data: { PUBLISHED },
    } = req.body;

    const { id: objectID, ...data } = PUBLISHED;

    await index.saveObject({ objectID, ...data });

    res.send(201);
  } catch (err) {
    res.status(400).send(err?.message);
  }
};
