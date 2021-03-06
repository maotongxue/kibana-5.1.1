'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _upgrade_config = require('./upgrade_config');

var _upgrade_config2 = _interopRequireDefault(_upgrade_config);

var _kibana_index_mappings = require('./kibana_index_mappings');

module.exports = function (server) {
  var config = server.config();
  var client = server.plugins.elasticsearch.client;
  var options = {
    index: config.get('kibana.index'),
    type: 'config',
    body: {
      size: 1000,
      sort: [{
        buildNum: {
          order: 'desc',
          unmapped_type: _kibana_index_mappings.mappings.config.properties.buildNum.type
        }
      }]
    }
  };

  return client.search(options).then((0, _upgrade_config2['default'])(server));
};
