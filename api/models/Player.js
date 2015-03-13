/**
* Player.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    estimoteMinor: {
      type: 'string',
      unique: true,
      required: true
    },
    displayName: {
      type: 'string',
      unique: true,
      required: true
    },
    score: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    }
  }
};

