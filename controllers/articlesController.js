const db = require("../models");

module.exports = {
  findAll: async (req, res) => {
    try {
      res.json(await db.Article.find({userId:req.user._id}).sort({ date: -1 }));
    } catch(err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const article = await db.Article.create(req.body);
      article.userId = req.user._id;
      res.json(article);
    } catch(err) {  
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const matchedArticle = await db.Article.findById({ _id: req.params.id });
      res.json(await matchedArticle.remove()); 
    } catch(err) {
      res.status(422).json(err);
    }
  }
}

