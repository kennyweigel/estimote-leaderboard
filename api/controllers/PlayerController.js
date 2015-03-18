/**
 * PlayerController
 *
 * @description :: Server-side logic for managing players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    return res.send("Hi there!");
  },

  admin: function(req, res) {
    Player.find({}, function(err, players) {
      res.view({players: players});
    });
  },

  create: function(req, res) {
    var params = null,
      displayName = req.param('displayName'),
      estimoteMinor = req.param('estimoteMinor'),
      score = req.param('score');

    if (req.method == 'POST' && displayName && estimoteMinor) {
      params = {
        displayName: displayName,
        estimoteMinor: estimoteMinor,
        score: score
      };

      Player.create(params, function(err, createdPlayer) {
        if (err) return res.send(err, 500);
        res.redirect('/player/admin');
      });
    } else {
      res.view({});
    }
  },

  edit: function(req, res) {
    var params = null,
      id = req.param('id'),
      displayName = req.param('displayName'),
      estimoteMinor = req.param('estimoteMinor'),
      score = req.param('score');

    if (!id) return res.send("No id specified.", 500);

    if (req.method == 'POST' && displayName && estimoteMinor && score) {
      params = {
        displayName: displayName,
        estimoteMinor: estimoteMinor,
        score: score
      };
      Player.update(id, params, function(err, updatedPlayer) {
        if (err) {
          res.redirect('/player/edit');
        }
        if(!updatedPlayer) {
          res.redirect('/player/edit');
        }
        res.redirect('/player/admin');
      });
    } else {
      Player.findOne(id, function(err, player) {
        if (err) return res.send(err, 500);
        if (!player) return res.send("Player "+id+" not found.",404);

        res.view({
          player: player
        });
      });
    }
  },

  destroy: function(req, res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);

    Player.findOne(id, function(err, player) {
      if (err) return res.send(err,500);
      if (!player) return res.send("No player with that id exists.",404);

      Player.destroy(id, function(err) {
        if (err) return res.send(err,500);

        return res.redirect('/player/admin');
      });
    });
  },

  addScore: function(req, res) {
    var params = null,
      estimoteMinor = req.param('estimoteMinor'),
      score = req.param('score');

    if (req.method == 'POST' && estimoteMinor && score) {
      params = {
        estimoteMinor: estimoteMinor,
        score: score
      };

      Player.findOne({estimoteMinor: estimoteMinor}, function(err, player) {
        if (err || !player) return res.send('err or couldnt find player', 500);

        player.score = player.score + parseInt(score, 10);
        player.save();
        return res.send(200);
      });
    } else {
      return res.send('error updating player score, not post or missing params', 500);
    }
  }
};

