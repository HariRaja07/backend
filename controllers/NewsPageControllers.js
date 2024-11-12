const models = require('../models/NewsPageModels');

// News Controller
const createNews = async (req, res) => {
    const news = new models.News(req.body);
    await news.save();
    res.send(news);
};

const getNews = async (req, res) => {
    const news = await models.News.find().sort({ createdAt: -1 });
    res.send(news);
};

const updateNews = async (req, res) => {
    const { id } = req.params;
    const updatedNews = await models.News.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedNews);
};

const deleteNews = async (req, res) => {
    const { id } = req.params;
    await models.News.findByIdAndDelete(id);
    res.send({ message: 'News deleted successfully' });
};

// Export all controllers in a single object
module.exports = {
    createNews,
    getNews,
    updateNews,
    deleteNews,
};
