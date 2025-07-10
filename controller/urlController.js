const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../model/Url');
require('dotenv').config();



const BASE_URL = process.env.BASE_URL;



const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  const url = new Url({ originalUrl, shortCode });
  await url.save();

  res.status(201).json({ originalUrl, shortUrl });
};



const redirectToOriginal = async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ shortCode });

  if (url) {
    url.visitCount += 1;
    await url.save();
    return res.redirect(url.originalUrl);
  }

  res.status(404).json({ error: 'Short URL not found' });
};



module.exports = { shortenUrl, redirectToOriginal };
