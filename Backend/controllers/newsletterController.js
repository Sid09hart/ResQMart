// controllers/newsletterController.js
const NewsletterSubscription = require('../models/newsletterSubscription');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const existingSubscription = await NewsletterSubscription.findOne({ email });
    if (existingSubscription) {
      return res.status(200).json({ message: 'You are already subscribed!' });
    }

    const newSubscription = new NewsletterSubscription({ email });
    await newSubscription.save();

    return res.status(201).json({ message: 'Thank you for subscribing!' });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};