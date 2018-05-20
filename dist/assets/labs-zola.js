"use strict";



define('labs-zola/adapters/bookmark', ['exports', 'ember-local-storage/adapters/adapter'], function (exports, _adapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _adapter.default;
    }
  });
});
define('labs-zola/adapters/commercial-overlay', ['exports', 'ember-data', 'labs-zola/utils/carto'], function (exports, _emberData, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // const SQL = function(id) {
  //   return `SELECT *, overlay as id FROM commercial_overlays_v201804 WHERE overlay='${id}'`;
  // };

  var SQL = function SQL(id) {
    return 'SELECT * FROM (\n    SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, overlay as id, overlay FROM commercial_overlays_v201804 GROUP BY overlay\n  ) a WHERE id=\'' + id + '\'';
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(id) {
      return (0, _carto.buildSqlUrl)(SQL(id), 'geojson');
    }
  });
});
define('labs-zola/adapters/lot', ['exports', 'ember-data', 'labs-zola/utils/carto', 'labs-zola/models/lot'], function (exports, _emberData, _carto, _lot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SQL = function SQL(id) {
    return 'SELECT ' + _lot.LotColumnsSQL.join(',') + ', \n    st_x(st_centroid(the_geom)) as lon, st_y(st_centroid(the_geom)) as lat,\n    the_geom, bbl AS id FROM mappluto_v1711 WHERE bbl=' + id;
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(id) {
      return (0, _carto.buildSqlUrl)(SQL(id), 'geojson');
    }
  });
});
define('labs-zola/adapters/scraped-part', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({});
});
define('labs-zola/adapters/special-purpose-district', ['exports', 'ember-data', 'labs-zola/utils/carto'], function (exports, _emberData, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SQL = function SQL(id) {
    return 'SELECT cartodb_id as id, the_geom, sdname, sdlbl FROM special_purpose_districts_v201804 WHERE cartodb_id=\'' + id + '\'';
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(id) {
      return (0, _carto.buildSqlUrl)(SQL(id), 'geojson');
    }
  });
});
define('labs-zola/adapters/special-purpose-subdistrict', ['exports', 'ember-data', 'labs-zola/utils/carto'], function (exports, _emberData, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SQL = function SQL(id) {
    return 'SELECT cartodb_id as id, the_geom, spname, splbl, subdist, subsub FROM special_purpose_subdistricts_v201804 WHERE cartodb_id=\'' + id + '\'';
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(id) {
      return (0, _carto.buildSqlUrl)(SQL(id), 'geojson');
    }
  });
});
define('labs-zola/adapters/zma', ['exports', 'ember-data', 'labs-zola/utils/carto'], function (exports, _emberData, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SQL = function SQL(ulurpno) {
    return 'SELECT the_geom, ulurpno as id, project_na, effective, status, lucats FROM zoning_map_amendments_v201804 WHERE ulurpno=\'' + ulurpno + '\'';
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(ulurpno) {
      return (0, _carto.buildSqlUrl)(SQL(ulurpno), 'geojson');
    }
  });
});
define('labs-zola/adapters/zoning-district', ['exports', 'ember-data', 'labs-zola/utils/carto'], function (exports, _emberData, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SQL = function SQL(id) {
    return 'SELECT * FROM (\n  SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, zonedist as id FROM zoning_districts_v201804 GROUP BY zonedist\n) a WHERE id = \'' + id + '\'';
  };

  exports.default = _emberData.default.JSONAPIAdapter.extend({
    keyForAttribute: function keyForAttribute(key) {
      return key;
    },
    urlForFindRecord: function urlForFindRecord(id) {
      return (0, _carto.buildSqlUrl)(SQL(id), 'geojson');
    }
  });
});
define('labs-zola/app', ['exports', 'ember-load-initializers', 'ember-data', 'ember-data-tasks/mixins/task-model', 'labs-zola/resolver', 'labs-zola/config/environment'], function (exports, _emberLoadInitializers, _emberData, _taskModel, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  Ember.MODEL_FACTORY_INJECTIONS = true;

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  _emberData.default.Model.reopen(_taskModel.default);

  exports.default = App;
});
define('labs-zola/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('labs-zola/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('labs-zola/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('labs-zola/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('labs-zola/components/bbl-lookup', ['exports', 'labs-zola/utils/carto', 'ember-decorators/object', 'labs-zola/utils/track-event'], function (exports, _carto, _object, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  var service = Ember.inject.service;
  exports.default = Component.extend({
    classNames: ['bbl-lookup hide-for-print'],
    boroOptions: [{ name: 'Manhattan (1)', code: '1' }, { name: 'Bronx (2)', code: '2' }, { name: 'Brooklyn (3)', code: '3' }, { name: 'Queens (4)', code: '4' }, { name: 'Staten Island (5)', code: '5' }],
    boro: '',
    block: '',
    lot: '',
    mainMap: service(),
    metrics: service(),
    focused: false,
    errorMessage: '',
    closed: true,

    actions: {
      checkBBL: function checkBBL() {
        var _this = this;

        var _getProperties = this.getProperties('boro', 'block', 'lot'),
            code = _getProperties.boro.code,
            block = _getProperties.block,
            lot = _getProperties.lot;

        var uniqueSQL = 'select bbl from mappluto_v1711 where block= ' + block + ' and lot = ' + lot + ' and borocode = ' + code;
        _carto.default.SQL(uniqueSQL).then(function (response) {
          if (response[0]) {
            _this.set('errorMessage', '');
            _this.setProperties({
              selected: 0,
              focused: false,
              closed: true
            });

            _this.transitionTo('lot', code, block, lot);
          } else {
            _this.set('errorMessage', 'The BBL does not exist.');
          }
        });
      },
      setBorocode: function setBorocode(option) {
        this.set('boro', option);
      }
    }
  });
});
define('labs-zola/components/bookmark-button', ['exports', 'ember-decorators/object', 'labs-zola/utils/track-event'], function (exports, _object, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _dec2, _desc2, _value2, _obj2;

  var Component = Ember.Component;
  var get = Ember.get;
  exports.default = Component.extend((_dec = (0, _object.computed)('bookmark'), (_obj = {
    bookmark: null,

    saved: function saved(bookmark) {
      return !!get(bookmark, 'id');
    },


    actions: (_dec2 = (0, _trackEvent.default)('Bookmark', 'Toggle Saved', 'bookmark.id'), (_obj2 = {
      toggleSaved: function toggleSaved() {
        var _this = this;

        var bookmark = this.get('bookmark');
        bookmark.then(function (resolvedBookmark) {
          if (resolvedBookmark) {
            resolvedBookmark.deleteRecord();
            resolvedBookmark.save();
          } else {
            _this.createBookmark();
          }
        });
      }
    }, (_applyDecoratedDescriptor(_obj2, 'toggleSaved', [_dec2], Object.getOwnPropertyDescriptor(_obj2, 'toggleSaved'), _obj2)), _obj2))
  }, (_applyDecoratedDescriptor(_obj, 'saved', [_dec], Object.getOwnPropertyDescriptor(_obj, 'saved'), _obj)), _obj)));
});
define('labs-zola/components/cascading-checkbox', ['exports', 'ember-composability-tools', 'ember-decorators/object'], function (exports, _emberComposabilityTools, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _desc, _value, _obj;

  var Component = Ember.Component;
  exports.default = Component.extend(_emberComposabilityTools.ChildMixin, (_dec = (0, _object.computed)('parentComponent.childComponents', 'group'), _dec2 = (0, _object.computed)('childComponents.@each.checked'), _dec3 = (0, _object.computed)('childComponents.@each.checked'), (_obj = {
    classNames: 'flex-reverse',

    childComponents: function childComponents(_childComponents, group) {
      return _childComponents.filterBy('group', group).filter(function (el) {
        return !el.isWrapperComponent;
      });
    },

    get selected() {
      return this.get('childComponents').mapBy('checked').every(function (el) {
        return el;
      });
    },
    set selected(value) {
      if (value) return this.send('toggleChildren');
      return value;
    },

    indeterminate: function indeterminate(childComponents) {
      var allChecked = childComponents.filterBy('checked').length;
      var numberCheckboxes = childComponents.length;
      return allChecked < numberCheckboxes && allChecked > 0;
    },


    // required so childComponents ignores this component
    isWrapperComponent: true,

    actions: {
      toggleChildren: function toggleChildren() {
        var checked = this.get('selected');
        var childComponents = this.get('childComponents');
        if (checked) {
          childComponents.invoke('set', 'checked', false);
        } else {
          childComponents.invoke('set', 'checked', true);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'childComponents', [_dec], Object.getOwnPropertyDescriptor(_obj, 'childComponents'), _obj), _applyDecoratedDescriptor(_obj, 'selected', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'selected'), _obj), _applyDecoratedDescriptor(_obj, 'indeterminate', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'indeterminate'), _obj)), _obj)));
});
define('labs-zola/components/content-area', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    classNames: ['content-area large-6']
  });
});
define('labs-zola/components/content-placeholders-heading', ['exports', 'ember-content-placeholders/components/content-placeholders-heading'], function (exports, _contentPlaceholdersHeading) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentPlaceholdersHeading.default;
    }
  });
});
define('labs-zola/components/content-placeholders-img', ['exports', 'ember-content-placeholders/components/content-placeholders-img'], function (exports, _contentPlaceholdersImg) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentPlaceholdersImg.default;
    }
  });
});
define('labs-zola/components/content-placeholders-nav', ['exports', 'ember-content-placeholders/components/content-placeholders-nav'], function (exports, _contentPlaceholdersNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentPlaceholdersNav.default;
    }
  });
});
define('labs-zola/components/content-placeholders-text', ['exports', 'ember-content-placeholders/components/content-placeholders-text'], function (exports, _contentPlaceholdersText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentPlaceholdersText.default;
    }
  });
});
define('labs-zola/components/content-placeholders', ['exports', 'ember-content-placeholders/components/content-placeholders'], function (exports, _contentPlaceholders) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentPlaceholders.default;
    }
  });
});
define('labs-zola/components/ember-tether', ['exports', 'ember-tether/components/ember-tether'], function (exports, _emberTether) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberTether.default;
    }
  });
});
define('labs-zola/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('labs-zola/components/group-checkbox', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  var Checkbox = Ember.Checkbox;
  exports.default = Checkbox.extend((_dec = (0, _object.computed)('values.@each'), _dec2 = (0, _object.computed)('values.@each'), (_obj = {
    scope: function scope() {
      return this;
    },

    refs: [],
    values: [],

    get checked() {
      var values = this.get('values');
      return values.every(function (val) {
        return val;
      });
    },
    set checked(value) {
      var _getProperties = this.getProperties('scope', 'refs', 'values', 'indeterminate'),
          scope = _getProperties.scope,
          refs = _getProperties.refs,
          values = _getProperties.values,
          indeterminate = _getProperties.indeterminate;

      if (indeterminate) refs.forEach(function (ref) {
        return scope.set(ref, true);
      });
      if (values.every(function (val) {
        return val;
      })) refs.forEach(function (ref) {
        return scope.set(ref, false);
      });
      if (values.every(function (val) {
        return !val;
      })) refs.forEach(function (ref) {
        return scope.set(ref, true);
      });
    },

    indeterminate: function indeterminate(values) {
      var checked = this.get('checked');
      return values.some(function (val) {
        return val;
      }) && !checked;
    }
  }, (_applyDecoratedDescriptor(_obj, 'scope', [_object.computed], Object.getOwnPropertyDescriptor(_obj, 'scope'), _obj), _applyDecoratedDescriptor(_obj, 'checked', [_dec], Object.getOwnPropertyDescriptor(_obj, 'checked'), _obj), _applyDecoratedDescriptor(_obj, 'indeterminate', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'indeterminate'), _obj)), _obj)));
});
define('labs-zola/components/hover-tooltip', ['exports', 'ember-decorators/object', 'npm:mustache'], function (exports, _object, _npmMustache) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  var Component = Ember.Component;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var htmlSafe = Ember.String.htmlSafe;


  var offsetX = 30;
  var offsetY = 10;

  exports.default = Component.extend((_dec = (0, _object.computed)('mapMouseover.highlightedLotFeatures', 'mapMouseover.tooltipTemplate', 'mousePosition.x', 'mousePosition.y'), _dec2 = (0, _object.computed)('mapMouseover.highlightedLotFeatures', 'mousePosition.x', 'mousePosition.y'), _dec3 = (0, _object.computed)('mousePosition.x', 'mousePosition.y'), _dec4 = (0, _object.computed)('mousePosition.x', 'mousePosition.y'), (_obj = {
    mapMouseover: service(),
    mousePosition: alias('mapMouseover.mousePosition'),

    text: function text(highlightedFeatures, source) {
      var properties = highlightedFeatures[0].properties;

      return _npmMustache.default.render(source, properties);
    },
    visible: function visible(highlightedFeatures) {
      return highlightedFeatures.length > 0;
    },
    isReady: function isReady(x, y) {
      return !!(x && y);
    },
    style: function style(x, y) {
      return htmlSafe('\n      top: ' + (y + offsetY) + 'px;\n      left: ' + (x + offsetX) + 'px;\n    ');
    }
  }, (_applyDecoratedDescriptor(_obj, 'text', [_dec], Object.getOwnPropertyDescriptor(_obj, 'text'), _obj), _applyDecoratedDescriptor(_obj, 'visible', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'visible'), _obj), _applyDecoratedDescriptor(_obj, 'isReady', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'isReady'), _obj), _applyDecoratedDescriptor(_obj, 'style', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'style'), _obj)), _obj)));
});
define('labs-zola/components/info-tooltip', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    tagName: 'span',
    iconName: 'info-circle',
    tip: '',
    side: 'left'
  });
});
define('labs-zola/components/interactive-layers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    classNames: 'layers-menu'
  });
});
define('labs-zola/components/intersecting-layers', ['exports', 'ember-decorators/object', 'ember-concurrency', 'labs-zola/utils/carto'], function (exports, _object, _emberConcurrency, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  var Component = Ember.Component;
  var get = Ember.get;
  var RSVP = Ember.RSVP;


  var generateSQL = function generateSQL(table, bbl) {
    // special handling for tables where we don't want to SELECT *
    var intersectionTable = table;
    if (table === 'effective-flood-insurance-rate-2007') {
      intersectionTable = '(\n      SELECT the_geom\n      FROM floodplain_firm2007_v0\n      WHERE fld_zone IN (\'A\', \'A0\', \'AE\') OR fld_zone = \'VE\'\n    )';
    }

    if (table === 'floodplain_pfirm2015_v0') {
      intersectionTable = '(\n      SELECT the_geom\n      FROM floodplain_pfirm2015_v0\n      WHERE fld_zone IN (\'A\', \'A0\', \'AE\') OR fld_zone = \'VE\'\n    )';
    }

    return '\n    WITH lot AS (SELECT the_geom FROM mappluto_v1711 WHERE bbl = \'' + bbl + '\')\n\n    SELECT true as intersects FROM ' + intersectionTable + ' a, lot b WHERE ST_Intersects(a.the_geom, b.the_geom) LIMIT 1\n  ';
  };

  exports.default = Component.extend((_dec = (0, _object.computed)('tables.@each', 'bbl', 'responseIdentifier'), _dec2 = (0, _object.computed)('intersectingLayers.value'), (_obj = {
    responseIdentifier: 'intersects',
    tagName: '',
    bbl: null,
    tables: [],

    calculateIntersections: (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tables, bbl, responseIdentifier) {
      var hash;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              hash = {};


              tables.forEach(function (table) {
                hash[table] = _carto.default.SQL(generateSQL(table, bbl)).then(function (response) {
                  return get(response[0] || {}, responseIdentifier);
                });
              });

              _context.next = 4;
              return RSVP.hash(hash);

            case 4:
              return _context.abrupt('return', _context.sent);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    willDestroyElement: function willDestroyElement() {
      this.get('calculateIntersections').cancelAll();
    },
    willUpdate: function willUpdate() {
      this.get('calculateIntersections').cancelAll();
    },
    intersectingLayers: function intersectingLayers() {
      var _get;

      return (_get = this.get('calculateIntersections')).perform.apply(_get, arguments);
    },
    numberIntersecting: function numberIntersecting(intersectingLayers) {
      if (intersectingLayers) {
        var truthyValues = Object.values(intersectingLayers).filter(function (val) {
          return val;
        });

        return get(truthyValues, 'length');
      }

      return 0;
    }
  }, (_applyDecoratedDescriptor(_obj, 'intersectingLayers', [_dec], Object.getOwnPropertyDescriptor(_obj, 'intersectingLayers'), _obj), _applyDecoratedDescriptor(_obj, 'numberIntersecting', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'numberIntersecting'), _obj)), _obj)));
});
define('labs-zola/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, _labeledRadioButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _labeledRadioButton.default;
    }
  });
});
define('labs-zola/components/layer-checkbox', ['exports', 'ember-composability-tools'], function (exports, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var alias = Ember.computed.alias;
  var Checkbox = Ember.Checkbox;
  exports.default = Checkbox.extend(_emberComposabilityTools.ChildMixin, {
    selected: alias('checked'),
    checked: true,
    value: '',
    selectionChanged: function selectionChanged() {},
    didUpdate: function didUpdate() {
      this.selectionChanged();
    }
  });
});
define('labs-zola/components/layer-control-timeline', ['exports', 'ember-decorators/object', 'moment', 'ember-composability-tools', 'labs-zola/mixins/query-param-map'], function (exports, _object, _moment, _emberComposabilityTools, _queryParamMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var next = Ember.run.next;
  var Component = Ember.Component;


  var defaultFormat = 'YYYY-MM-DD';
  var defaultMax = new Date();
  var defaultStart = [1032370151000, defaultMax.getTime()];

  var fromEpoch = function fromEpoch(number) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFormat;

    return (0, _moment.default)(number).format(format);
  };

  exports.default = Component.extend(_emberComposabilityTools.ChildMixin, _queryParamMap.default, {
    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      var qps = this.get('parentComponent.qps');
      var queryParam = this.get('query-param');

      if (qps) {
        var qpValue = this.get('parentComponent.qps.' + queryParam);

        next(function () {
          _this.send('sliderChanged', qpValue);
        });
      }
    },


    format: {
      to: function to(number) {
        return fromEpoch(number, 'YYYY-MM');
      },
      from: function from(number) {
        return fromEpoch(number, 'YYYY-MM');
      }
    },

    column: '',
    start: defaultStart, // epoch time
    min: defaultStart[0],
    max: defaultStart[1],

    queryParamBoundKey: 'start',

    actions: {
      sliderChanged: function sliderChanged(value) {
        var range = value.map(function (epoch) {
          return fromEpoch(epoch);
        }).map(function (date, i) {
          // eslint-disable-line
          if (i === 0) {
            return (0, _moment.default)(date).startOf('month').format(defaultFormat);
          }
          return (0, _moment.default)(date).endOf('month').format(defaultFormat);
        });
        var column = this.get('column');
        var source = this.get('source');

        this.set('start', value);
        this.get('parentComponent').send('updateSql', 'buildRangeSQL', source, column, range);
      }
    }
  });
});
define('labs-zola/components/layer-group', ['exports', 'ember-decorators/object', 'ember-composability-tools', 'labs-zola/utils/carto', 'labs-zola/layer-groups', 'labs-zola/sources'], function (exports, _object, _emberComposabilityTools, _carto, _layerGroups, _sources) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _obj;

  var isEmpty = Ember.isEmpty;
  var Component = Ember.Component;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var copy = Ember.copy;
  var merge = Ember.merge;
  var set = Ember.set;
  var addObserver = Ember.addObserver;
  var warn = Ember.Logger.warn;
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, _emberComposabilityTools.ChildMixin, (_dec = (0, _object.computed)('config.layers'), _dec2 = (0, _object.computed)('config.layers.@each.id'), _dec3 = (0, _object.computed)('isCarto', 'configWithTemplate.isSuccessful', 'config', 'visible'), _dec4 = (0, _object.computed)('config.type'), _dec5 = (0, _object.computed)('registeredLayers.layers', 'visible'), _dec6 = (0, _object.computed)('config', 'isCarto', 'sql'), (_obj = {
    init: function init() {
      this._super.apply(this, arguments);

      var layerID = this.get('for');
      if (layerID) {
        this.set('config', _layerGroups.default[layerID.camelize()]);
      }

      if (this.get('childComponents.length') > 1) {
        warn('Only one layer-control per layer is supported.');
      }

      var didToggleVisibility = this.get('didToggleVisibility');
      if (didToggleVisibility) {
        addObserver(this, 'visible', this, 'fireVisibilityEvent');
      }
    },


    registeredLayers: service(),
    mainMap: service(),

    tagName: '',
    qps: null,
    config: {},
    sql: '',
    visible: false,

    minzoom: function minzoom(layers) {
      var allZooms = layers.map(function (layer) {
        return layer.layer.minzoom;
      }).filter(function (zoom) {
        return !!zoom;
      });
      if (allZooms.length) return Math.min.apply(Math, _toConsumableArray(allZooms));
      return false;
    },
    layerIds: function layerIds(layers) {
      return layers.mapBy('layer.id');
    },
    isReady: function isReady(isCarto, successful, config) {
      return !!((isCarto && successful || !isCarto) && config);
    },


    'query-param': alias('config.id'),
    queryParamBoundKey: 'visible',

    isCarto: function isCarto(type) {
      return type === 'carto';
    },
    before: function before(allLayerGroups) {
      // const allLayerGroups = this.get('registeredLayers.layers');
      var position = allLayerGroups.map(function (layerGroup) {
        return layerGroup.config.id;
      }).indexOf(this.get('config.id'));

      // walk all layergroups that should be displayed above this one
      for (var i = position - 1; i > 0; i -= 1) {
        var config = allLayerGroups[i].config;
        var bottomLayer = config.layers[0].layer.id;
        var map = this.get('mainMap.mapInstance');

        // if the bottom-most layer of the layergroup exists on the map, use it as the 'before'
        if (map.getLayer(bottomLayer)) {
          return bottomLayer;
        }
      }

      // if we can't find any before when walking the layergroups, use this 'global before'
      return 'place_other';
    },


    layers: alias('config.layers'),

    sourceOptions: function sourceOptions(config, isCarto) {
      if (isCarto) return this.get('configWithTemplate.value');

      if (config.type === 'raster') {
        return {
          type: 'raster',
          tiles: config.tiles,
          tileSize: config.tileSize
        };
      }

      return config;
    },
    fireVisibilityEvent: function fireVisibilityEvent() {
      var didToggleVisibility = this.get('didToggleVisibility');
      didToggleVisibility(this.get('visible'));
    },
    buildRangeSQL: function buildRangeSQL(sql) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 1] || ['a', 'b'];

      var newSql = sql;
      var cleanRange = range;

      if (typeof range[0] === 'string') {
        cleanRange = cleanRange.map(function (step) {
          return '\'' + step + '\'';
        });
      }

      newSql += ' WHERE ' + column + ' > ' + cleanRange[0] + ' AND ' + column + ' < ' + cleanRange[1];

      return newSql;
    },
    buildMultiSelectSQL: function buildMultiSelectSQL(sql) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 1] || ['a', 'b'];

      var newSql = sql;
      var valuesCleaned = values.map(function (value) {
        return '\'' + value + '\'';
      }).join(',');
      if (!isEmpty(values)) {
        newSql += ' WHERE ' + column + ' IN (' + valuesCleaned + ')';
      }
      return newSql;
    },


    actions: {
      toggleVisibility: function toggleVisibility() {
        this.toggleProperty('visible');
      },
      updateSql: function updateSql(method, sourceId, column, value) {
        var _this = this;

        var source = _sources.default[sourceId.camelize()];
        var sourceLayer = source['source-layers'][0];
        var sql = this[method](sourceLayer.sql, column, value);

        // get a new template and update the source tiles
        _carto.default.getVectorTileTemplate([{
          id: sourceLayer.id,
          sql: sql
        }]).then(function (template) {
          // replace this source's tiles
          var map = _this.get('mainMap.mapInstance');
          var newStyle = map.getStyle();
          newStyle.sources[sourceId].tiles = [template];
          map.setStyle(newStyle);
        });
      },
      updatePaintFor: function updatePaintFor(layerId, newPaintStyle) {
        var layers = this.get('config.layers');
        var targetLayerIndex = layers.findIndex(function (el) {
          return el.layer.id === layerId;
        });
        var targetLayer = layers.objectAt(targetLayerIndex);
        var copyTargetLayer = copy(targetLayer, true);
        copyTargetLayer.layer.paint = merge(copyTargetLayer.layer.paint, newPaintStyle);
        set(targetLayer, 'layer', copyTargetLayer.layer);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'minzoom', [_dec], Object.getOwnPropertyDescriptor(_obj, 'minzoom'), _obj), _applyDecoratedDescriptor(_obj, 'layerIds', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'layerIds'), _obj), _applyDecoratedDescriptor(_obj, 'isReady', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'isReady'), _obj), _applyDecoratedDescriptor(_obj, 'isCarto', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'isCarto'), _obj), _applyDecoratedDescriptor(_obj, 'before', [_dec5], Object.getOwnPropertyDescriptor(_obj, 'before'), _obj), _applyDecoratedDescriptor(_obj, 'sourceOptions', [_dec6], Object.getOwnPropertyDescriptor(_obj, 'sourceOptions'), _obj)), _obj)));
});
define('labs-zola/components/layer-menu-item', ['exports', 'ember-decorators/object', 'ember-composability-tools', 'labs-zola/utils/track-event'], function (exports, _object, _emberComposabilityTools, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj, _dec3, _desc2, _value2, _obj2;

  var Component = Ember.Component;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, _emberComposabilityTools.ChildMixin, (_dec = (0, _object.computed)('for', 'registeredLayers.layers.@each'), _dec2 = (0, _object.computed)('layer.minzoom', 'layer.visible', 'mainMap.currentZoom'), (_obj = {
    registeredLayers: service(),
    mainMap: service(),
    visible: alias('layer.visible'),
    tagName: 'li',

    layer: function layer(layerId, layers) {
      return layers.findBy('config.id', layerId);
    },


    title: alias('layer.config.title'),

    legendIcon: alias('layer.config.legendIcon'),

    legendColor: alias('layer.config.legendColor'),

    titleTooltip: alias('layer.config.titleTooltip'),

    warning: function warning(minzoom, visible, currentZoom) {
      return minzoom && visible && currentZoom < minzoom;
    },


    actions: (_dec3 = (0, _trackEvent.default)('Toggle Layer', 'title', 'visible'), (_obj2 = {
      toggleVisibility: function toggleVisibility() {
        this.toggleProperty('visible');
      },
      updateSql: function updateSql(method, column, value) {
        var layer = this.get('layer');
        layer.send('updateSql', method, column, value);
      },
      updatePaintFor: function updatePaintFor(id, paintObject) {
        var layer = this.get('layer');
        layer.send('updatePaintFor', id, paintObject);
      }
    }, (_applyDecoratedDescriptor(_obj2, 'toggleVisibility', [_dec3], Object.getOwnPropertyDescriptor(_obj2, 'toggleVisibility'), _obj2)), _obj2))
  }, (_applyDecoratedDescriptor(_obj, 'layer', [_dec], Object.getOwnPropertyDescriptor(_obj, 'layer'), _obj), _applyDecoratedDescriptor(_obj, 'warning', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'warning'), _obj)), _obj)));
});
define('labs-zola/components/layer-multi-select-control', ['exports', 'ember-composability-tools', 'ember-decorators/object'], function (exports, _emberComposabilityTools, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var Component = Ember.Component;
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, (_dec = (0, _object.computed)('childComponents.@each.selected'), (_obj = {
    allChecked: function allChecked() {
      return this.get('childComponents').filterBy('selected').mapBy('value');
    },


    values: [],

    didInsertElement: function didInsertElement() {
      this.send('selectionChanged');
    },


    queryParamBoundKey: 'allChecked',

    actions: {
      selectionChanged: function selectionChanged() {
        var values = this.get('allChecked');
        var source = this.get('source');
        var column = this.get('column');

        var previousValues = this.get('values');
        if (JSON.stringify(values) !== JSON.stringify(previousValues)) {
          this.get('parentComponent').send('updateSql', 'buildMultiSelectSQL', source, column, values);
        }

        this.set('values', values);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'allChecked', [_dec], Object.getOwnPropertyDescriptor(_obj, 'allChecked'), _obj)), _obj)));
});
define('labs-zola/components/layer-palette-accordion', ['exports', 'ember-composability-tools', 'labs-zola/utils/track-event'], function (exports, _emberComposabilityTools, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var computed = Ember.computed;
  var Component = Ember.Component;
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, {
    classNames: ['layer-palette-accordion'],
    closed: true,
    title: '',

    didInsertElement: function didInsertElement() {
      this.set('numberVisible', computed('childComponents.@each.visible', function () {
        var childComponents = this.get('childComponents');
        return childComponents.filterBy('visible', true).length;
      }));
    },


    actions: (_dec = (0, _trackEvent.default)('Toggle Accordion', 'title', 'closed'), (_obj = {
      toggleClosed: function toggleClosed() {
        this.toggleProperty('closed');
      }
    }, (_applyDecoratedDescriptor(_obj, 'toggleClosed', [_dec], Object.getOwnPropertyDescriptor(_obj, 'toggleClosed'), _obj)), _obj))
  });
});
define('labs-zola/components/layer-palette', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  var aerialYears = [16, 1996, 1951, 1924];

  exports.default = Component.extend({
    classNames: ['layer-palette hide-for-print'],
    closed: true,
    plutoFill: false,

    // required
    qps: null,
    aerialYears: aerialYears,

    actions: {
      toggleFill: function toggleFill() {
        this.toggleProperty('plutoFill');
      },
      switchAerial: function switchAerial(year) {
        var mainToggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var formattedYear = 'aerials-' + year;
        var propNames = aerialYears.map(function (aYear) {
          return 'aerials-' + aYear;
        });
        var qps = this.get('qps');
        var isAnyLayerSelected = propNames.any(function (prop) {
          return qps.get(prop);
        });

        // turn off all aerial layers
        propNames.forEach(function (aerialYear) {
          qps.set(aerialYear, false);
        });

        // if it's the main switch and any are visible, turn them all off
        // otherwise, switch to the selected aerial
        if (!(mainToggle && isAnyLayerSelected)) {
          qps.toggleProperty(formattedYear);
        }
      }
    }
  });
});
define('labs-zola/components/layer-static-legend', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({});
});
define('labs-zola/components/layer-tooltip', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({});
});
define('labs-zola/components/link-to-intersecting', ['exports', 'ember-decorators/object', 'labs-zola/utils/carto'], function (exports, _object, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var Component = Ember.Component;
  var get = Ember.get;


  var SQL = function SQL(table, geometry) {
    return 'SELECT * FROM ' + table + ' \n          WHERE \n            ST_Intersects(\n              ST_SetSRID(\n                ST_GeomFromGeoJSON(\'' + JSON.stringify(geometry) + '\'), 4326), \n                ' + table + '.the_geom) LIMIT 1';
  };

  var LinkToIntersectingComponent = Component.extend((_dec = (0, _object.computed)('table', 'geometry', 'responseIdentifier'), (_obj = {
    responseIdentifier: 'cartodb_id',
    tagName: '',

    resultingFeature: function resultingFeature(table, geometry, responseIdentifier) {
      return _carto.default.SQL(SQL(table, geometry)).then(function (response) {
        return get(response[0], responseIdentifier);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, 'resultingFeature', [_dec], Object.getOwnPropertyDescriptor(_obj, 'resultingFeature'), _obj)), _obj)));

  LinkToIntersectingComponent.reopenClass({
    positionalParams: ['string', 'route', 'table', 'geometry']
  });

  exports.default = LinkToIntersectingComponent;
});
define('labs-zola/components/lot-bookmark-item', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  exports.default = Ember.Component.extend({
    mainMap: service(),
    mapMouseover: service(),

    mouseEnter: function mouseEnter() {
      var bbl = this.get('lot.bookmark.bbl');
      var map = this.get('mainMap').mapInstance;

      var feature = map.querySourceFeatures('pluto', {
        sourceLayer: 'pluto',
        filter: ['==', 'bbl', bbl]
      })[0];

      this.set('mapMouseover.highlightedLotFeatures', [feature]);
    },
    mouseLeave: function mouseLeave() {
      this.set('mapMouseover.highlightedLotFeatures', []);
    },


    actions: {
      deleteBookmark: function deleteBookmark(e) {
        this.attrs.deleteBookmark(e);
      }
    }
  });
});
define('labs-zola/components/main-map', ['exports', 'mapbox-gl', 'mapbox-gl-draw', 'ember-decorators/object', 'npm:@turf/area', 'npm:@turf/line-distance', 'npm:numeral', 'labs-zola/sources', 'labs-zola/layer-groups', 'labs-zola/layers/draw-styles', 'labs-zola/layers/drawn-feature', 'labs-zola/layers/highlighted-lot', 'labs-zola/layers/selected-lot'], function (exports, _mapboxGl, _mapboxGlDraw, _object, _area, _lineDistance, _npmNumeral, _sources, _layerGroups, _drawStyles, _drawnFeature, _highlightedLot, _selectedLot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  var Component = Ember.Component;
  var service = Ember.inject.service;
  var alias = Ember.computed.alias;


  var selectedFillLayer = _selectedLot.default.fill;
  var selectedLineLayer = _selectedLot.default.line;

  // Custom Control
  var MeasurementText = function MeasurementText() {};

  MeasurementText.prototype.onAdd = function (map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.id = 'measurement-text';
    return this._container;
  };

  MeasurementText.prototype.onRemove = function () {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  };

  var draw = new _mapboxGlDraw.default({
    displayControlsDefault: false,
    styles: _drawStyles.default
  });

  exports.default = Component.extend((_dec = (0, _object.computed)('mainMap.isSelectedBoundsOptions'), _dec2 = (0, _object.computed)('highlightedLotFeatures'), _dec3 = (0, _object.computed)('bookmarks.[]'), _dec4 = (0, _object.computed)('mainMap.selected'), (_obj = {

    mainMap: service(),
    mapMouseover: service(),
    metrics: service(),
    store: service(),

    classNames: ['map-container'],

    lat: 40.7125,
    lng: function lng(boundsOptions) {
      return boundsOptions.offset[0] === 0 ? -73.9022 : -73.733;
    },

    zoom: 9.72,
    menuTo: 'layers-menu',

    layerGroups: _layerGroups.default,

    mapConfig: Object.keys(_layerGroups.default).map(function (key) {
      return _layerGroups.default[key];
    }),

    loading: true,
    findMeDismissed: false,
    sourcesLoaded: true,
    measurementUnitType: 'standard',
    drawnMeasurements: null,
    measurementMenuOpen: false,
    drawToolsOpen: false,

    cartoSources: [],

    drawnFeatureLayers: _drawnFeature.default,

    highlightedLotFeatures: [],

    highlightedLotSource: function highlightedLotSource(features) {
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      };
    },

    highlightedLotLayer: _highlightedLot.default,

    bookmarkedLotsLayer: function bookmarkedLotsLayer(bookmarks) {
      var lotBookmarks = bookmarks.getEach('bookmark.bbl').filter(function (d) {
        return d;
      }); // filter out bookmarks with undefined bbl

      var filter = ['match', ['get', 'bbl'], lotBookmarks, true, false];

      var layer = {
        id: 'bookmarked-lots',
        type: 'line',
        source: 'pluto',
        'source-layer': 'pluto',
        layout: {
          'line-cap': 'round'
        },
        paint: {
          'line-opacity': 0.8,
          'line-color': 'rgba(0, 25, 160, 1)',
          'line-width': {
            stops: [[13, 1.5], [15, 8]]
          }
        },
        filter: filter
      };

      return lotBookmarks.length > 0 ? layer : null;
    },


    shouldFitBounds: alias('mainMap.shouldFitBounds'),

    selectedLotSource: function selectedLotSource(selected) {
      return {
        type: 'geojson',
        data: selected.get('geometry')
      };
    },


    selectedFillLayer: selectedFillLayer,
    selectedLineLayer: selectedLineLayer,

    actions: {
      adjustBuildingsLayer: function adjustBuildingsLayer(visible) {
        var map = this.get('mainMap.mapInstance');
        if (visible) {
          map.flyTo({ pitch: 45 });
        } else {
          map.flyTo({ pitch: 0 });
        }
      },
      locateMe: function locateMe() {
        var geolocateButton = document.querySelectorAll('.mapboxgl-ctrl-geolocate')[0];

        if (geolocateButton) {
          geolocateButton.click();
          this.set('findMeDismissed', true);
        }
      },
      dismissFindMe: function dismissFindMe() {
        this.set('findMeDismissed', true);
      },
      handleMapLoad: function handleMapLoad(map) {
        var _this = this;

        window.map = map;
        var mainMap = this.get('mainMap');
        mainMap.set('mapInstance', map);

        // add carto sources
        this.get('cartoSources').forEach(function (sourceConfig) {
          map.addSource(sourceConfig.id, sourceConfig);
        });

        // add raster sources
        Object.keys(_sources.default).filter(function (key) {
          return _sources.default[key].type === 'raster';
        }).forEach(function (key) {
          var source = _sources.default[key];
          map.addSource(source.id, source);
        });

        // setup controls
        var navigationControl = new _mapboxGl.default.NavigationControl();
        var geoLocateControl = new _mapboxGl.default.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });

        // GA
        geoLocateControl.on('trackuserlocationstart', function () {
          _this.get('metrics').trackEvent('GoogleAnalytics', { eventCategory: 'Map', eventAction: 'Geolocate' });
        });

        map.addControl(navigationControl, 'top-left');
        map.addControl(new _mapboxGl.default.ScaleControl({ unit: 'imperial' }), 'bottom-left');
        map.addControl(geoLocateControl, 'top-left');
        map.addControl(new MeasurementText(), 'top-left');

        // get rid of default building layer
        map.removeLayer('building');

        map.addSource('ee', {
          type: 'image',
          url: '/img/ht.png',
          coordinates: [[-74.0030685, 40.7335205], [-74.0030515, 40.7335205], [-74.0030515, 40.7335085], [-74.0030685, 40.7335085]]
        });

        map.addLayer({
          id: 'ee',
          source: 'ee',
          type: 'raster',
          minzoom: 17
        });
      },
      handleMousemove: function handleMousemove(e) {
        var mapMouseover = this.get('mapMouseover');
        if (!this.get('mainMap').drawMode) mapMouseover.highlighter(e);
      },
      handleMouseleave: function handleMouseleave() {
        var mapMouseover = this.get('mapMouseover');
        mapMouseover.set('highlightedLotFeatures', []);
        mapMouseover.set('currentEvent', null);
      },
      handleZoomend: function handleZoomend(event) {
        var mainMap = this.get('mainMap');
        mainMap.set('currentZoom', event.target.getZoom());
      },
      startDraw: function startDraw(type) {
        var drawMode = type === 'line' ? 'draw_line_string' : 'draw_polygon';
        var mainMap = this.get('mainMap');
        if (mainMap.get('drawMode')) {
          draw.deleteAll();
        } else {
          mainMap.mapInstance.addControl(draw);
          this.set('mainMap.drawnFeature', null);
          this.set('drawnMeasurements', null);
        }
        mainMap.set('drawMode', drawMode);
        draw.changeMode(drawMode);
      },
      clearDraw: function clearDraw() {
        var mainMap = this.get('mainMap');
        if (mainMap.get('drawMode')) {
          mainMap.mapInstance.removeControl(draw);
        }

        mainMap.set('drawMode', null);
        this.set('mainMap.drawnFeature', null);
        this.set('drawnMeasurements', null);
      },
      handleDrawCreate: function handleDrawCreate(e) {
        var _this2 = this;

        this.set('mainMap.drawnFeature', e.features[0].geometry);
        setTimeout(function () {
          _this2.get('mainMap').mapInstance.removeControl(draw);
          _this2.get('mainMap').set('drawMode', null);
        }, 100);
      },
      handleMeasurement: function handleMeasurement() {
        // should log both metric and standard display strings for the current drawn feature
        var features = draw.getAll().features;

        if (features.length > 0) {
          var feature = features[0];
          // metric calculation
          var drawnLength = (0, _lineDistance.default)(feature) * 1000; // meters
          var drawnArea = (0, _area.default)(feature); // square meters

          var metricUnits = 'm';
          var metricFormat = '0,0';
          var metricMeasurement = void 0;

          var standardUnits = 'feet';
          var standardFormat = '0,0';
          var standardMeasurement = void 0;

          if (drawnLength > drawnArea) {
            // user is drawing a line
            metricMeasurement = drawnLength;
            if (drawnLength >= 1000) {
              // if over 1000 meters, upgrade metric
              metricMeasurement = drawnLength / 1000;
              metricUnits = 'km';
              metricFormat = '0.00';
            }

            standardMeasurement = drawnLength * 3.28084;
            if (standardMeasurement >= 5280) {
              // if over 5280 feet, upgrade standard
              standardMeasurement /= 5280;
              standardUnits = 'mi';
              standardFormat = '0.00';
            }
          } else {
            // user is drawing a polygon
            metricUnits = 'm²';
            metricFormat = '0,0';
            metricMeasurement = drawnArea;

            standardUnits = 'ft²';
            standardFormat = '0,0';
            standardMeasurement = drawnArea * 10.7639;

            if (drawnArea >= 1000000) {
              // if over 1,000,000 meters, upgrade metric
              metricMeasurement = drawnArea / 1000000;
              metricUnits = 'km²';
              metricFormat = '0.00';
            }

            if (standardMeasurement >= 27878400) {
              // if over 27878400 sf, upgrade standard
              standardMeasurement /= 27878400;
              standardUnits = 'mi²';
              standardFormat = '0.00';
            }
          }

          var drawnMeasurements = {
            metric: (0, _npmNumeral.default)(metricMeasurement).format(metricFormat) + ' ' + metricUnits,
            standard: (0, _npmNumeral.default)(standardMeasurement).format(standardFormat) + ' ' + standardUnits
          };

          this.set('drawnMeasurements', drawnMeasurements);
        }
      },
      mapLoading: function mapLoading(data) {
        var localConfig = this.get('mapConfig');
        var sourceIds = localConfig.mapBy('id');
        var localSource = localConfig.findBy('id', data.sourceId);

        if (localSource) {
          if (data.dataType === 'source' && data.isSourceLoaded && sourceIds.includes(data.sourceId)) {
            this.set('loading', false);
          } else {
            this.set('loading', true);
          }
        }
      },
      handleUnitsToggle: function handleUnitsToggle(type) {
        this.set('measurementUnitType', type);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'lng', [_dec], Object.getOwnPropertyDescriptor(_obj, 'lng'), _obj), _applyDecoratedDescriptor(_obj, 'highlightedLotSource', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'highlightedLotSource'), _obj), _applyDecoratedDescriptor(_obj, 'bookmarkedLotsLayer', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'bookmarkedLotsLayer'), _obj), _applyDecoratedDescriptor(_obj, 'selectedLotSource', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'selectedLotSource'), _obj)), _obj)));
});
define('labs-zola/components/map-search', ['exports', 'fetch', 'ember-decorators/object', 'ember-concurrency', 'labs-zola/utils/bbl-demux', 'labs-zola/utils/track-event'], function (exports, _fetch, _object, _emberConcurrency, _bblDemux2, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj, _dec3, _dec4, _dec5, _desc2, _value2, _obj2;

  var Component = Ember.Component;
  var isEmpty = Ember.isEmpty;
  var service = Ember.inject.service;
  // eslint-disable-line


  var DEBOUNCE_MS = 100;

  exports.default = Component.extend((_dec = (0, _object.computed)('searchTerms'), _dec2 = (0, _object.computed)('results.value'), (_obj = {
    classNames: ['search'],
    searchTerms: '',
    transitionTo: null,
    selected: 0,
    mainMap: service(),
    metrics: service(),
    focused: false,
    prevResults: null,
    loading: null,

    results: function results(searchTerms) {
      return this.get('debouncedResults').perform(searchTerms);
    },


    debouncedResults: (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchTerms) {
      var _this = this;

      var URL;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (searchTerms.length < 3) this.cancel();
              _context.next = 3;
              return (0, _emberConcurrency.timeout)(DEBOUNCE_MS);

            case 3:
              URL = 'https://zola-search-api.planninglabs.nyc/search?q=' + searchTerms;


              this.set('loading', new Promise(function (resolve) {
                setTimeout(resolve, 500);
              }));

              this.get('metrics').trackEvent('GoogleAnalytics', {
                eventCategory: 'Search',
                eventAction: 'Received Results for Search Terms',
                eventLabel: searchTerms
              });

              _context.next = 8;
              return (0, _fetch.default)(URL).then(function (data) {
                return data.json();
              }).then(function (json) {
                return json.map(function (result, index) {
                  var newResult = result;
                  newResult.id = index;
                  newResult.demuxedBbl = (0, _bblDemux2.default)(result.bbl);
                  return newResult;
                });
              }).then(function (resultList) {
                if (isEmpty(resultList)) {
                  _this.get('metrics').trackEvent('GoogleAnalytics', {
                    eventCategory: 'Search',
                    eventAction: 'No results found for search terms',
                    eventLabel: searchTerms
                  });
                }
                _this.set('prevResults', resultList);

                _this.set('loading', null);
                return resultList;
              });

            case 8:
              return _context.abrupt('return', _context.sent);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).keepLatest(),

    resultsCount: function resultsCount(results) {
      if (results) return results.length;
      return 0;
    },
    keyPress: function keyPress(event) {
      var selected = this.get('selected');
      var keyCode = event.keyCode;

      // enter

      if (keyCode === 13) {
        var results = this.get('results.value');
        if (results && results.get('length')) {
          var selectedResult = results.objectAt(selected);
          this.send('goTo', selectedResult);
        }
      }
    },
    keyUp: function keyUp(event) {
      var _this2 = this;

      var selected = this.get('selected');
      var resultsCount = this.get('resultsCount');
      var keyCode = event.keyCode;


      var incSelected = function incSelected() {
        _this2.set('selected', selected + 1);
      };
      var decSelected = function decSelected() {
        _this2.set('selected', selected - 1);
      };

      if ([38, 40, 27].includes(keyCode)) {
        var results = this.get('results.value');

        // up
        if (keyCode === 38) {
          if (results) {
            if (selected > 0) decSelected();
          }
        }

        // down
        if (keyCode === 40) {
          if (results) {
            if (selected < resultsCount - 1) incSelected();
          }
        }

        // down
        if (keyCode === 27) {
          this.set('searchTerms', '');
        }
      }
    },


    actions: (_dec3 = (0, _trackEvent.default)('Map Search', 'Clicked result', 'searchTerms'), _dec4 = (0, _trackEvent.default)('Search', 'Focused In', 'searchTerms'), _dec5 = (0, _trackEvent.default)('Search', 'Focused Out', 'searchTerms'), (_obj2 = {
      clear: function clear() {
        var mainMap = this.get('mainMap');
        this.set('searchTerms', '');
        // clear address marker
        mainMap.set('currentAddress', null);
      },
      goTo: function goTo(result) {
        var _this3 = this;

        var mainMap = this.get('mainMap');
        var mapInstance = mainMap.get('mapInstance');
        var type = result.type;


        this.$('.map-search-input').blur();
        // clear address marker
        mainMap.set('currentAddress', null);

        this.setProperties({
          selected: 0,
          focused: false
        });

        if (type === 'lot') {
          var _bblDemux = (0, _bblDemux2.default)(result.bbl),
              boro = _bblDemux.boro,
              block = _bblDemux.block,
              lot = _bblDemux.lot;

          this.set('searchTerms', result.label);
          this.transitionTo('lot', boro, block, lot);
        }

        if (type === 'zma') {
          this.set('searchTerms', result.label);
          this.transitionTo('zma', result.ulurpno);
        }

        if (type === 'zoning-district') {
          mainMap.set('shouldFitBounds', true);
          this.transitionTo('zoning-district', result.label);
        }

        if (type === 'neighborhood') {
          this.set('searchTerms', result.neighbourhood);
          var center = result.coordinates;
          mapInstance.flyTo({
            center: center,
            zoom: 13
          });
        }

        if (type === 'address') {
          var _center = result.coordinates;
          mainMap.set('currentAddress', _center);

          this.set('searchTerms', result.label);
          this.saveAddress({ address: result.label, coordinates: result.coordinates });

          if (mapInstance) {
            mapInstance.flyTo({
              center: _center,
              zoom: 15
            });
            mapInstance.once('moveend', function () {
              _this3.transitionTo('index');
            });
          }
        }

        if (type === 'special-purpose-district') {
          this.set('searchTerms', result.sdname);
          this.transitionTo('special-purpose-district', result.cartodb_id);
        }

        if (type === 'commercial-overlay') {
          this.set('searchTerms', result.label);
          this.transitionTo('commercial-overlay', result.overlay);
        }
      },
      handleFocusIn: function handleFocusIn() {
        this.set('focused', true);
      },
      handleFocusOut: function handleFocusOut() {
        this.set('focused', false);
      }
    }, (_applyDecoratedDescriptor(_obj2, 'goTo', [_dec3], Object.getOwnPropertyDescriptor(_obj2, 'goTo'), _obj2), _applyDecoratedDescriptor(_obj2, 'handleFocusIn', [_dec4], Object.getOwnPropertyDescriptor(_obj2, 'handleFocusIn'), _obj2), _applyDecoratedDescriptor(_obj2, 'handleFocusOut', [_dec5], Object.getOwnPropertyDescriptor(_obj2, 'handleFocusOut'), _obj2)), _obj2))
  }, (_applyDecoratedDescriptor(_obj, 'results', [_dec], Object.getOwnPropertyDescriptor(_obj, 'results'), _obj), _applyDecoratedDescriptor(_obj, 'resultsCount', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'resultsCount'), _obj)), _obj)));
});
define('labs-zola/components/mapbox-gl-call', ['exports', 'ember-mapbox-gl/components/mapbox-gl-call'], function (exports, _mapboxGlCall) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var schedule = Ember.run.schedule;
  var getProperties = Ember.getProperties;
  exports.default = _mapboxGlCall.default.extend({
    didReceiveAttrs: function didReceiveAttrs() {
      var _this = this;

      var _getProperties = getProperties(this, 'obj', 'func', 'args', 'params'),
          obj = _getProperties.obj,
          params = _getProperties.params;

      var _getProperties2 = getProperties(this, 'func', 'args'),
          func = _getProperties2.func,
          args = _getProperties2.args;

      if (args === null && params !== null) {
        if (func !== null) {
          args = params;
        } else {
          var _params = _toArray(params);

          func = _params[0];
          args = _params.slice(1);
        }
      }

      schedule('afterRender', function () {
        // if (func === 'fitBounds') { obj.resize(); } // uncomment to resize correctly
        _this.sendAction('onResp', obj[func].apply(obj, args)); // eslint-disable-line
      });
    }
  });
});
define('labs-zola/components/mapbox-gl-control', ['exports', 'ember-mapbox-gl/components/mapbox-gl-control'], function (exports, _mapboxGlControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlControl.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-image', ['exports', 'ember-mapbox-gl/components/mapbox-gl-image'], function (exports, _mapboxGlImage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlImage.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-layer', ['exports', 'ember-mapbox-gl/components/mapbox-gl-layer'], function (exports, _mapboxGlLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlLayer.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-marker', ['exports', 'ember-mapbox-gl/components/mapbox-gl-marker'], function (exports, _mapboxGlMarker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlMarker.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-on', ['exports', 'ember-mapbox-gl/components/mapbox-gl-on'], function (exports, _mapboxGlOn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlOn.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-popup', ['exports', 'ember-mapbox-gl/components/mapbox-gl-popup'], function (exports, _mapboxGlPopup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlPopup.default;
    }
  });
});
define('labs-zola/components/mapbox-gl-source', ['exports', 'ember-mapbox-gl/components/mapbox-gl-source'], function (exports, _mapboxGlSource) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapboxGlSource.default;
    }
  });
});
define('labs-zola/components/mapbox-gl', ['exports', 'ember-mapbox-gl/components/mapbox-gl', 'ember-composability-tools'], function (exports, _mapboxGl, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  exports.default = _mapboxGl.default.extend(_emberComposabilityTools.ParentMixin, {
    init: function init() {
      this._super.apply(this, arguments);

      this.set('registeredLayers.layers', this.get('childComponents'));
    },

    registeredLayers: service()
  });
});
define('labs-zola/components/popover-on-component', ['exports', 'ember-tooltips/components/popover-on-component'], function (exports, _popoverOnComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popoverOnComponent.default;
    }
  });
});
define('labs-zola/components/popover-on-element', ['exports', 'ember-tooltips/components/popover-on-element'], function (exports, _popoverOnElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popoverOnElement.default;
    }
  });
});
define('labs-zola/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('labs-zola/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('labs-zola/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('labs-zola/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('labs-zola/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('labs-zola/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('labs-zola/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('labs-zola/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('labs-zola/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('labs-zola/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, _radioButtonInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radioButtonInput.default;
    }
  });
});
define('labs-zola/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, _radioButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radioButton.default;
    }
  });
});
define('labs-zola/components/radio-selector', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var set = Ember.set;
  var copy = Ember.copy;
  var merge = Ember.merge;
  var next = Ember.run.next;


  var hideLayer = function hideLayer(layer) {
    var layerCopy = copy(layer, true);
    layerCopy.layer.layout = merge(layerCopy.layer.layout, { visibility: 'none' });
    set(layer, 'layer', layerCopy.layer);
  };

  var showLayer = function showLayer(layer) {
    var layerCopy = copy(layer, true);
    layerCopy.layer.layout = merge(layerCopy.layer.layout, { visibility: 'visible' });
    set(layer, 'layer', layerCopy.layer);
  };

  exports.default = Ember.Component.extend({
    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      next(function () {
        var layers = _this.get('layers');
        var qps = _this.get('qps');

        var matchedLayer = layers.find(function (layer) {
          return qps.get(layer.layer.id) === true;
        });

        if (matchedLayer) {
          _this.send('switchLayer', matchedLayer.layer.id);
        }
      });
    },


    layers: [],
    qps: null,
    actions: {
      switchLayer: function switchLayer(id) {
        var layers = this.get('layers');
        var qps = this.get('qps');

        // turn all layers off, reset query params
        layers.forEach(function (layer) {
          // show the selected layer
          if (layer.layer.id === id) {
            showLayer(layer);

            qps.set(layer.layer.id, true);
          } else {
            // hide all other layers
            hideLayer(layer);

            qps.set(layer.layer.id, false);
          }
        });
      }
    }
  });
});
define('labs-zola/components/range-slider', ['exports', 'ember-cli-nouislider/components/range-slider'], function (exports, _rangeSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _rangeSlider.default;
});
define('labs-zola/components/resize-detector', ['exports', 'ember-element-resize-detector/components/resize-detector'], function (exports, _resizeDetector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _resizeDetector.default;
    }
  });
});
define('labs-zola/components/scraped-part', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  // eslint-disable-line

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + ';domain=.nyc.gov;path=/';
    // document.cookie = (name + '=' + (value || '') + expires + 'nycprop.nyc.gov;path=/');
  }

  exports.default = Ember.Component.extend((_dec = (0, _object.computed)('lot.borough', 'lot.lot', 'lot.block'), (_obj = {
    ajax: Ember.inject.service(),
    scrape_link: '',

    get lotdata() {
      var data = [6];

      data[0] = this.get('lot.borocode');
      data[1] = this.get('lot.block');
      data[2] = this.get('lot.lot');

      return data;
    },

    actions: {
      NYCsearchBBL: function NYCsearchBBL() {
        var dataparam = this.get('lotdata');
        var addStr = 'boro=' + dataparam[0] + '&';
        addStr += 'block=' + dataparam[1] + '&';
        addStr += 'lot=' + dataparam[2];
        $.scrape_link = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?' + addStr + '&go3=+GO+&requestid=0';
        console.log($.scrape_link);
        document.getElementById('new-Page1').href = $.scrape_link;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'lotdata', [_dec], Object.getOwnPropertyDescriptor(_obj, 'lotdata'), _obj)), _obj)));
});
define('labs-zola/components/site-header', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    classNames: ['site-header'],
    closed: true
  });
});
define('labs-zola/components/switch-toggle', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({});
});
define('labs-zola/components/tether-popover-on-component', ['exports', 'ember-tooltips/components/tether-popover-on-component'], function (exports, _tetherPopoverOnComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherPopoverOnComponent.default;
    }
  });
});
define('labs-zola/components/tether-popover-on-element', ['exports', 'ember-tooltips/components/tether-popover-on-element'], function (exports, _tetherPopoverOnElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherPopoverOnElement.default;
    }
  });
});
define('labs-zola/components/tether-tooltip-on-component', ['exports', 'ember-tooltips/components/tether-tooltip-on-component'], function (exports, _tetherTooltipOnComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherTooltipOnComponent.default;
    }
  });
});
define('labs-zola/components/tether-tooltip-on-element', ['exports', 'ember-tooltips/components/tether-tooltip-on-element'], function (exports, _tetherTooltipOnElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherTooltipOnElement.default;
    }
  });
});
define('labs-zola/components/tooltip-on-component', ['exports', 'ember-tooltips/components/tooltip-on-component'], function (exports, _tooltipOnComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tooltipOnComponent.default;
    }
  });
});
define('labs-zola/components/tooltip-on-element', ['exports', 'ember-tooltips/components/tooltip-on-element'], function (exports, _tooltipOnElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _tooltipOnElement.default.extend({
    side: 'left'
  });
});
define('labs-zola/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('labs-zola/components/zf-accordion-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion-menu'], function (exports, _zfAccordionMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfAccordionMenu.default;
    }
  });
});
define('labs-zola/components/zf-accordion', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion'], function (exports, _zfAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfAccordion.default;
    }
  });
});
define('labs-zola/components/zf-callout', ['exports', 'ember-cli-foundation-6-sass/components/zf-callout'], function (exports, _zfCallout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfCallout.default;
    }
  });
});
define('labs-zola/components/zf-drilldown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-drilldown-menu'], function (exports, _zfDrilldownMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDrilldownMenu.default;
    }
  });
});
define('labs-zola/components/zf-dropdown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown-menu'], function (exports, _zfDropdownMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDropdownMenu.default;
    }
  });
});
define('labs-zola/components/zf-dropdown', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown'], function (exports, _zfDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDropdown.default;
    }
  });
});
define('labs-zola/components/zf-magellan', ['exports', 'ember-cli-foundation-6-sass/components/zf-magellan'], function (exports, _zfMagellan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfMagellan.default;
    }
  });
});
define('labs-zola/components/zf-off-canvas', ['exports', 'ember-cli-foundation-6-sass/components/zf-off-canvas'], function (exports, _zfOffCanvas) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfOffCanvas.default;
    }
  });
});
define('labs-zola/components/zf-orbit', ['exports', 'ember-cli-foundation-6-sass/components/zf-orbit'], function (exports, _zfOrbit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfOrbit.default;
    }
  });
});
define('labs-zola/components/zf-reveal', ['exports', 'ember-cli-foundation-6-sass/components/zf-reveal'], function (exports, _zfReveal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfReveal.default;
    }
  });
});
define('labs-zola/components/zf-slider', ['exports', 'ember-cli-foundation-6-sass/components/zf-slider'], function (exports, _zfSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfSlider.default;
    }
  });
});
define('labs-zola/components/zf-tabs', ['exports', 'ember-cli-foundation-6-sass/components/zf-tabs'], function (exports, _zfTabs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfTabs.default;
    }
  });
});
define('labs-zola/components/zf-tooltip', ['exports', 'ember-cli-foundation-6-sass/components/zf-tooltip'], function (exports, _zfTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfTooltip.default;
    }
  });
});
define('labs-zola/controllers/application', ['exports', 'ember-parachute', 'labs-zola/utils/bbl-demux', 'ember-decorators/object', 'labs-zola/mixins/geometric', 'labs-zola/utils/track-event', 'labs-zola/layer-groups'], function (exports, _emberParachute, _bblDemux2, _object, _geometric, _trackEvent, _layerGroups) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mapQueryParams = undefined;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _dec2, _desc2, _value2, _obj2;

  var ObjectProxy = Ember.ObjectProxy;
  var Controller = Ember.Controller;
  var merge = Ember.merge;
  var EmberObject = Ember.Object;
  var set = Ember.set;
  var service = Ember.inject.service;


  var queryParams = Object.keys(_layerGroups.default).reduce(function (acc, cur) {
    acc[_layerGroups.default[cur].id] = {
      defaultValue: _layerGroups.default[cur].visible === undefined ? true : !!_layerGroups.default[cur].visible
    };
    return acc;
  }, {});

  // define new query params here:
  var mapQueryParams = exports.mapQueryParams = new _emberParachute.default(merge(queryParams, {
    'comm-type': { defaultValue: '' },
    BP: { defaultValue: true },
    C1: { defaultValue: true },
    C2: { defaultValue: true },
    C3: { defaultValue: true },
    C4: { defaultValue: true },
    C5: { defaultValue: true },
    C6: { defaultValue: true },
    C7: { defaultValue: true },
    C8: { defaultValue: true },
    M1: { defaultValue: true },
    M2: { defaultValue: true },
    M3: { defaultValue: true },
    PA: { defaultValue: true },
    R1: { defaultValue: true },
    R2: { defaultValue: true },
    R3: { defaultValue: true },
    R4: { defaultValue: true },
    R5: { defaultValue: true },
    R6: { defaultValue: true },
    R7: { defaultValue: true },
    R8: { defaultValue: true },
    R9: { defaultValue: true },
    R10: { defaultValue: true },
    c11: { defaultValue: true },
    c12: { defaultValue: true },
    c13: { defaultValue: true },
    c14: { defaultValue: true },
    c15: { defaultValue: true },
    c21: { defaultValue: true },
    c22: { defaultValue: true },
    c23: { defaultValue: true },
    c24: { defaultValue: true },
    c25: { defaultValue: true },
    allChecked: { defaultValue: [] },
    'aerials-2016': { defaultValue: true },
    'aerials-1924': { defaultValue: false },
    'aerials-2014': { defaultValue: false },
    'aerials-2012': { defaultValue: false },
    'aerials-2010': { defaultValue: false },
    'aerials-2008': { defaultValue: false },
    'aerials-2006': { defaultValue: false },
    'aerials-2004': { defaultValue: false },
    'aerials-20012': { defaultValue: false },
    'aerials-1996': { defaultValue: false },
    'aerials-1951': { defaultValue: false }
  }));

  exports.default = Controller.extend(mapQueryParams.Mixin, (_dec = (0, _object.computed)('queryParamsState'), (_obj = {
    init: function init() {
      this._super.apply(this, arguments);

      var proxy = ObjectProxy.create({
        content: this
      });

      this.set('qps', proxy);
    },


    mainMap: service(),
    registeredLayers: service(),
    mapMouseover: service(),

    isDefault: function isDefault(state) {
      var values = Object.values(state);

      return values.isEvery('changed', false);
    },


    actions: (_dec2 = (0, _trackEvent.default)('Layer Palette', 'Reset query params', 'isDefault'), (_obj2 = {
      transitionTo: function transitionTo() {
        this.transitionToRoute.apply(this, arguments);
      },
      saveAddress: function saveAddress(address) {
        var bookmarks = this.store.peekAll('bookmark');

        var isUnique = bookmarks.every(function (bookmark) {
          return bookmark.get('address') !== address.address;
        });

        set(address, 'type', 'address');

        if (isUnique) {
          this.store.createRecord('bookmark', address).save();
        }
      },
      routeToLot: function routeToLot(e) {
        var map = e.target;
        var mainMap = this.get('mainMap');

        if (mainMap.get('drawMode')) return;

        // only query layers that are available in the map
        var layers = this.get('registeredLayers.clickableAndVisibleLayerIds');
        var feature = map.queryRenderedFeatures(e.point, { layers: layers })[0];

        var highlightedLayer = this.get('mapMouseover.highlightedLayer');

        if (feature) {
          if (highlightedLayer === feature.layer.id) {
            var _feature$properties = feature.properties,
                bbl = _feature$properties.bbl,
                ulurpno = _feature$properties.ulurpno,
                zonedist = _feature$properties.zonedist,
                sdlbl = _feature$properties.sdlbl,
                splbl = _feature$properties.splbl,
                overlay = _feature$properties.overlay,
                cartodb_id = _feature$properties.cartodb_id;


            var featureFragment = EmberObject.extend(_geometric.default, {
              geometry: feature.geometry
            }).create();

            mainMap.set('selected', featureFragment);

            if (bbl) {
              var _bblDemux = (0, _bblDemux2.default)(bbl),
                  boro = _bblDemux.boro,
                  block = _bblDemux.block,
                  lot = _bblDemux.lot;

              this.transitionToRoute('lot', boro, block, lot);
            }

            if (ulurpno) {
              this.transitionToRoute('zma', ulurpno);
            }

            if (zonedist) {
              mainMap.set('shouldFitBounds', false);
              this.transitionToRoute('zoning-district', zonedist);
            }

            if (sdlbl) {
              this.transitionToRoute('special-purpose-district', cartodb_id);
            }

            if (splbl) {
              this.transitionToRoute('special-purpose-subdistricts', cartodb_id);
            }

            if (overlay) {
              mainMap.set('shouldFitBounds', false);
              this.transitionToRoute('commercial-overlay', overlay);
            }
          }
        }
      },
      setQueryParam: function setQueryParam(property, value) {
        this.set(property, value);
      },
      resetQueryParams: function resetQueryParams() {
        this.resetQueryParams();
      }
    }, (_applyDecoratedDescriptor(_obj2, 'resetQueryParams', [_dec2], Object.getOwnPropertyDescriptor(_obj2, 'resetQueryParams'), _obj2)), _obj2))
  }, (_applyDecoratedDescriptor(_obj, 'isDefault', [_dec], Object.getOwnPropertyDescriptor(_obj, 'isDefault'), _obj)), _obj)));
});
define('labs-zola/controllers/bookmarks', ['exports', 'ember-decorators/object', 'labs-zola/utils/track-event'], function (exports, _object, _trackEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj, _dec2, _desc2, _value2, _obj2;

  var Controller = Ember.Controller;
  var service = Ember.inject.service;
  var Promise = Ember.RSVP.Promise;
  exports.default = Controller.extend((_dec = (0, _object.computed)('model.[]'), (_obj = {
    mainMap: service(),
    bookmarksSettled: function bookmarksSettled(bookmarks) {
      var promises = bookmarks.mapBy('recordType');

      return Promise.all(promises);
    },


    actions: (_dec2 = (0, _trackEvent.default)('Bookmark', 'Delete'), (_obj2 = {
      deleteBookmark: function deleteBookmark(record) {
        record.deleteRecord();
        record.save();
      },
      flyTo: function flyTo() {
        var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0];

        var mapInstance = this.get('mainMap.mapInstance');
        mapInstance.flyTo({
          center: center,
          zoom: 15
        });
      }
    }, (_applyDecoratedDescriptor(_obj2, 'deleteBookmark', [_dec2], Object.getOwnPropertyDescriptor(_obj2, 'deleteBookmark'), _obj2)), _obj2))
  }, (_applyDecoratedDescriptor(_obj, 'bookmarksSettled', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bookmarksSettled'), _obj)), _obj)));
});
define('labs-zola/controllers/lot', ['exports', 'ember-decorators/object', 'labs-zola/mixins/bookmarkable', 'labs-zola/utils/carto', 'labs-zola/utils/special-purpose-crosswalk'], function (exports, _object, _bookmarkable, _carto, _specialPurposeCrosswalk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  var Controller = Ember.Controller;


  var SQL = function SQL(table, geometry) {
    return 'SELECT * FROM ' + table + '\n          WHERE\n            ST_Intersects(\n              ST_SetSRID(\n                ST_GeomFromGeoJSON(\'' + JSON.stringify(geometry) + '\'), 4326),\n                ' + table + '.the_geom);';
  };

  var intializeDatas = function intializeDatas(self) {
    self.set('main_title', '');
    self.set('main_array', null);
    self.set('sub_array1', null);
    self.set('sub_array2', null);
  };

  exports.default = Controller.extend(_bookmarkable.default, (_dec = (0, _object.computed)('lot.zonemap'), _dec2 = (0, _object.computed)('lot.borocode', 'lot.lot', 'lot.block', 'lot.address', 'lot.zipcode', 'lot.ownername'), _dec3 = (0, _object.computed)('lot.borocode', 'lot.lot', 'lot.block'), _dec4 = (0, _object.computed)('lot.borocode', 'lot.lot', 'lot.block'), _dec5 = (0, _object.computed)('lot.geometry'), (_obj = {
    sub_title1: '',
    sub_title2: '',
    main_title: '',
    sub_array1: [],
    sub_array2: [],
    main_array: [],

    paddedZonemap: function paddedZonemap(zonemap) {
      return ('0' + zonemap).slice(-3);
    },
    crawledFunc: function crawledFunc() {
      var data = [6];

      data[0] = this.get('lot.borocode');
      data[1] = this.get('lot.block');
      data[2] = this.get('lot.lot');
      data[3] = this.get('lot.address');
      data[4] = this.get('lot.zipcode');
      data[5] = this.get('lot.ownername');

      var param = {
        borocode: data[0],
        block: data[1],
        lot: data[2],
        address: data[3],
        zipcode: data[4],
        ownername: data[5]
      };

      var self = this;
      var result = {};

      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/api/crawl-data',
        async: false,
        data: JSON.stringify(param),
        success: function success(response) {
          console.log(result);
          self.set('crawl', response);
        }
      });
    },
    NYC_func: function NYC_func() {
      var param = {
        borocode: this.get('lot.borocode'),
        block: this.get('lot.block'),
        lot: this.get('lot.lot')
      };

      var self = this;

      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/api/getCertUrl',
        async: false,
        data: JSON.stringify(param),
        success: function success(response) {
          console.log(response);
          self.set('ppo', response);
          $.scrape_link = response.cUrl;
          console.log($.scrape_link);
        }
      });
      // el.onclick = true;
    },
    crawledFunc1: function crawledFunc1() {
      var param = {
        borocode: this.get('lot.borocode'),
        block: this.get('lot.block'),
        lot: this.get('lot.lot')
      };

      var self = this;

      intializeDatas(this);

      $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/api/crawl-propertyportal',
        async: false,
        data: JSON.stringify(param),
        success: function success(response) {
          console.log(response);
          self.set('main_title', response[response.title1][0]['sub_title']);
          self.set('main_array', response[response.title1][0][self.main_title]);
          if (response[response.title2].length !== 0) {
            self.set('sub_array1', response[response.title2]);
          }
          if (response[response.title3].length !== 0) {
            self.set('sub_array2', response[response.title3]);
          }
          self.set('crawl_pty', response);
          console.log(self.get('crawl_pty'));
        }
      });
    },
    parentSpecialPurposeDistricts: function parentSpecialPurposeDistricts(geometry) {
      return _carto.default.SQL(SQL('special_purpose_districts_v201804', geometry)).then(function (response) {
        return response.map(function (item) {
          var _specialPurposeCrossw = _specialPurposeCrosswalk.default.find(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                dist = _ref2[0];

            return dist === item.sdname;
          }),
              _specialPurposeCrossw2 = _slicedToArray(_specialPurposeCrossw, 2),
              _specialPurposeCrossw3 = _slicedToArray(_specialPurposeCrossw2[1], 2),
              anchorName = _specialPurposeCrossw3[0],
              boroName = _specialPurposeCrossw3[1];

          return {
            id: item.cartodb_id,
            label: item.sdlbl.toUpperCase(),
            name: item.sdname,
            anchorName: anchorName,
            boroName: boroName
          };
        });
      });
    }
  }, (_applyDecoratedDescriptor(_obj, 'paddedZonemap', [_dec], Object.getOwnPropertyDescriptor(_obj, 'paddedZonemap'), _obj), _applyDecoratedDescriptor(_obj, 'crawledFunc', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'crawledFunc'), _obj), _applyDecoratedDescriptor(_obj, 'NYC_func', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'NYC_func'), _obj), _applyDecoratedDescriptor(_obj, 'crawledFunc1', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'crawledFunc1'), _obj), _applyDecoratedDescriptor(_obj, 'parentSpecialPurposeDistricts', [_dec5], Object.getOwnPropertyDescriptor(_obj, 'parentSpecialPurposeDistricts'), _obj)), _obj)));
});
define('labs-zola/controllers/special-purpose-district', ['exports', 'labs-zola/mixins/bookmarkable', 'ember-decorators/object', 'labs-zola/utils/special-purpose-crosswalk'], function (exports, _bookmarkable, _object, _specialPurposeCrosswalk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var Controller = Ember.Controller;
  exports.default = Controller.extend(_bookmarkable.default, (_dec = (0, _object.computed)('model.value.sdname'), (_obj = {
    readMoreLink: function readMoreLink(name) {
      var _ref = _specialPurposeCrosswalk.default.find(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            dist = _ref4[0];

        return dist === name;
      }) || [[], []],
          _ref2 = _slicedToArray(_ref, 2),
          _ref2$ = _slicedToArray(_ref2[1], 2),
          anchorName = _ref2$[0],
          boroName = _ref2$[1];

      return 'https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-' + boroName + '.page#' + anchorName;
    }
  }, (_applyDecoratedDescriptor(_obj, 'readMoreLink', [_dec], Object.getOwnPropertyDescriptor(_obj, 'readMoreLink'), _obj)), _obj)));
});
define('labs-zola/controllers/special-purpose-subdistricts', ['exports', 'labs-zola/mixins/bookmarkable'], function (exports, _bookmarkable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend(_bookmarkable.default, {});
});
define('labs-zola/controllers/zma', ['exports', 'labs-zola/mixins/bookmarkable'], function (exports, _bookmarkable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend(_bookmarkable.default, {});
});
define('labs-zola/controllers/zoning-district', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var Controller = Ember.Controller;
  exports.default = Controller.extend((_dec = (0, _object.computed)('model.primaryzone'), (_obj = {
    primaryzoneURL: function primaryzoneURL(primaryzone) {
      var url = '';
      if (primaryzone === 'c1' || primaryzone === 'c2') {
        url = 'c1-c2';
      } else if (primaryzone === 'c3') {
        url = 'c3-c3a';
      } else {
        url = primaryzone;
      }
      return url;
    }
  }, (_applyDecoratedDescriptor(_obj, 'primaryzoneURL', [_dec], Object.getOwnPropertyDescriptor(_obj, 'primaryzoneURL'), _obj)), _obj)));
});
define("labs-zola/ember-content-placeholders/tests/addon.lint-test", [], function () {
  "use strict";
});
define('labs-zola/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_and.andHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_and.andHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/app-version', ['exports', 'labs-zola/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('labs-zola/helpers/append', ['exports', 'ember-composable-helpers/helpers/append'], function (exports, _append) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(exports, 'append', {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
define('labs-zola/helpers/array', ['exports', 'ember-composable-helpers/helpers/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(exports, 'array', {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
define('labs-zola/helpers/await', ['exports', 'ember-promise-helpers/helpers/await'], function (exports, _await) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _await.default;
    }
  });
});
define('labs-zola/helpers/bbl-demux', ['exports', 'labs-zola/utils/bbl-demux'], function (exports, _bblDemux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.bblDemux = bblDemux;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function bblDemux(params) {
    var _params = _slicedToArray(params, 1),
        bbl = _params[0];

    return (0, _bblDemux.default)(bbl);
  }

  exports.default = helper(bblDemux);
});
define('labs-zola/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  Object.defineProperty(exports, 'cancelAll', {
    enumerable: true,
    get: function () {
      return _cancelAll.cancelAll;
    }
  });
});
define('labs-zola/helpers/carto-download-link', ['exports', 'labs-zola/utils/carto'], function (exports, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cartoDownloadLink = cartoDownloadLink;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function cartoDownloadLink(_ref) {
    var _ref2 = _slicedToArray(_ref, 4),
        table = _ref2[0],
        identifier = _ref2[1],
        ids = _ref2[2],
        format = _ref2[3];

    var query = 'SELECT * FROM ' + table + ' WHERE ' + identifier + ' IN (' + ids.join(',') + ')';
    return (0, _carto.buildSqlUrl)(query, format) + '&filename=' + table;
  }

  exports.default = helper(cartoDownloadLink);
});
define('labs-zola/helpers/chunk', ['exports', 'ember-composable-helpers/helpers/chunk'], function (exports, _chunk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(exports, 'chunk', {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
define('labs-zola/helpers/compact', ['exports', 'ember-composable-helpers/helpers/compact'], function (exports, _compact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
  Object.defineProperty(exports, 'compact', {
    enumerable: true,
    get: function () {
      return _compact.compact;
    }
  });
});
define('labs-zola/helpers/compute', ['exports', 'ember-composable-helpers/helpers/compute'], function (exports, _compute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(exports, 'compute', {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
define('labs-zola/helpers/contains', ['exports', 'ember-composable-helpers/helpers/contains'], function (exports, _contains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(exports, 'contains', {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
define('labs-zola/helpers/dec', ['exports', 'ember-composable-helpers/helpers/dec'], function (exports, _dec) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(exports, 'dec', {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
define('labs-zola/helpers/draw-control', ['exports', 'ember-mapbox-gl-draw/helpers/draw-control'], function (exports, _drawControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drawControl.default;
    }
  });
  Object.defineProperty(exports, 'drawControl', {
    enumerable: true,
    get: function () {
      return _drawControl.drawControl;
    }
  });
});
define('labs-zola/helpers/drop', ['exports', 'ember-composable-helpers/helpers/drop'], function (exports, _drop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
  Object.defineProperty(exports, 'drop', {
    enumerable: true,
    get: function () {
      return _drop.drop;
    }
  });
});
define('labs-zola/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('labs-zola/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('labs-zola/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('labs-zola/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_equal.equalHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_equal.equalHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/extract-layer-stops-for', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.extractLayerStopsFor = extractLayerStopsFor;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  var get = Ember.get;
  function extractLayerStopsFor(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        layerConfig = _ref2[1];

    if (!layerConfig.layers) return layerConfig;
    return get(layerConfig.layers.findBy('layer.id', id), 'layer.paint.fill-color.stops');
  }

  exports.default = helper(extractLayerStopsFor);
});
define('labs-zola/helpers/filter-by', ['exports', 'ember-composable-helpers/helpers/filter-by'], function (exports, _filterBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
  Object.defineProperty(exports, 'filterBy', {
    enumerable: true,
    get: function () {
      return _filterBy.filterBy;
    }
  });
});
define('labs-zola/helpers/filter', ['exports', 'ember-composable-helpers/helpers/filter'], function (exports, _filter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
  Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function () {
      return _filter.filter;
    }
  });
});
define('labs-zola/helpers/find-by', ['exports', 'ember-composable-helpers/helpers/find-by'], function (exports, _findBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
  Object.defineProperty(exports, 'findBy', {
    enumerable: true,
    get: function () {
      return _findBy.findBy;
    }
  });
});
define('labs-zola/helpers/flatten', ['exports', 'ember-composable-helpers/helpers/flatten'], function (exports, _flatten) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(exports, 'flatten', {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
define('labs-zola/helpers/get-unique-options-for', ['exports', 'labs-zola/utils/carto'], function (exports, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getUniqueOptionsFor = getUniqueOptionsFor;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function getUniqueOptionsFor(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        column = _ref2[0],
        sql = _ref2[1];

    var uniqueSQL = 'select distinct(' + column + ') as option from (' + sql + ') a ORDER BY option ASC';
    return _carto.default.SQL(uniqueSQL).then(function (response) {
      return response.map(function (row) {
        return row.option;
      });
    });
  }

  exports.default = helper(getUniqueOptionsFor);
});
define('labs-zola/helpers/group-by', ['exports', 'ember-composable-helpers/helpers/group-by'], function (exports, _groupBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
  Object.defineProperty(exports, 'groupBy', {
    enumerable: true,
    get: function () {
      return _groupBy.groupBy;
    }
  });
});
define('labs-zola/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_gt.gtHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_gt.gtHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_gte.gteHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_gte.gteHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/has-next', ['exports', 'ember-composable-helpers/helpers/has-next'], function (exports, _hasNext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(exports, 'hasNext', {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
define('labs-zola/helpers/has-previous', ['exports', 'ember-composable-helpers/helpers/has-previous'], function (exports, _hasPrevious) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(exports, 'hasPrevious', {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
define('labs-zola/helpers/inc', ['exports', 'ember-composable-helpers/helpers/inc'], function (exports, _inc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(exports, 'inc', {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
define('labs-zola/helpers/intersect', ['exports', 'ember-composable-helpers/helpers/intersect'], function (exports, _intersect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
  Object.defineProperty(exports, 'intersect', {
    enumerable: true,
    get: function () {
      return _intersect.intersect;
    }
  });
});
define('labs-zola/helpers/invoke', ['exports', 'ember-composable-helpers/helpers/invoke'], function (exports, _invoke) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(exports, 'invoke', {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
define('labs-zola/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_isArray.isArrayHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_isArray.isArrayHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('labs-zola/helpers/is-fulfilled', ['exports', 'ember-promise-helpers/helpers/is-fulfilled'], function (exports, _isFulfilled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isFulfilled.default;
    }
  });
  Object.defineProperty(exports, 'isFulfilled', {
    enumerable: true,
    get: function () {
      return _isFulfilled.isFulfilled;
    }
  });
});
define('labs-zola/helpers/is-pending', ['exports', 'ember-promise-helpers/helpers/is-pending'], function (exports, _isPending) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isPending.default;
    }
  });
  Object.defineProperty(exports, 'isPending', {
    enumerable: true,
    get: function () {
      return _isPending.isPending;
    }
  });
});
define('labs-zola/helpers/is-rejected', ['exports', 'ember-promise-helpers/helpers/is-rejected'], function (exports, _isRejected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isRejected.default;
    }
  });
  Object.defineProperty(exports, 'isRejected', {
    enumerable: true,
    get: function () {
      return _isRejected.isRejected;
    }
  });
});
define('labs-zola/helpers/join', ['exports', 'ember-composable-helpers/helpers/join'], function (exports, _join) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
  Object.defineProperty(exports, 'join', {
    enumerable: true,
    get: function () {
      return _join.join;
    }
  });
});
define('labs-zola/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_lt.ltHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_lt.ltHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_lte.lteHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_lte.lteHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/make-special-purpose-district-link', ['exports', 'labs-zola/utils/special-purpose-crosswalk'], function (exports, _specialPurposeCrosswalk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.makeSpecialPurposeDistrictLink = makeSpecialPurposeDistrictLink;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function makeSpecialPurposeDistrictLink(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        specialPurposeDistrictName = _ref2[0];

    var _ref3 = _specialPurposeCrosswalk.default.find(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          dist = _ref6[0];

      return dist === specialPurposeDistrictName;
    }) || [null, []],
        _ref4 = _slicedToArray(_ref3, 2),
        _ref4$ = _slicedToArray(_ref4[1], 2),
        name = _ref4$[0],
        borough = _ref4$[1];

    var result = 'https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-' + borough + '.page#' + name;
    return result;
  }

  exports.default = Ember.Helper.helper(makeSpecialPurposeDistrictLink);
});
define('labs-zola/helpers/map-by', ['exports', 'ember-composable-helpers/helpers/map-by'], function (exports, _mapBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
  Object.defineProperty(exports, 'mapBy', {
    enumerable: true,
    get: function () {
      return _mapBy.mapBy;
    }
  });
});
define('labs-zola/helpers/map', ['exports', 'ember-composable-helpers/helpers/map'], function (exports, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
  Object.defineProperty(exports, 'map', {
    enumerable: true,
    get: function () {
      return _map.map;
    }
  });
});
define('labs-zola/helpers/next', ['exports', 'ember-composable-helpers/helpers/next'], function (exports, _next) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(exports, 'next', {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
define('labs-zola/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_notEqual.notEqualHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_notEqual.notEqualHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_not.notHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_not.notHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/numeral-format', ['exports', 'npm:numeral'], function (exports, _npmNumeral) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.numeralFormat = numeralFormat;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;
  function numeralFormat(params) {
    var _params = _slicedToArray(params, 2),
        number = _params[0],
        template = _params[1];

    return (0, _npmNumeral.default)(number).format(template);
  }

  exports.default = helper(numeralFormat);
});
define('labs-zola/helpers/object-at', ['exports', 'ember-composable-helpers/helpers/object-at'], function (exports, _objectAt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(exports, 'objectAt', {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
define('labs-zola/helpers/optional', ['exports', 'ember-composable-helpers/helpers/optional'], function (exports, _optional) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(exports, 'optional', {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
define('labs-zola/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_or.orHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_or.orHelper);
  }

  exports.default = forExport;
});
define('labs-zola/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  Object.defineProperty(exports, 'perform', {
    enumerable: true,
    get: function () {
      return _perform.perform;
    }
  });
});
define('labs-zola/helpers/pipe-action', ['exports', 'ember-composable-helpers/helpers/pipe-action'], function (exports, _pipeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
define('labs-zola/helpers/pipe', ['exports', 'ember-composable-helpers/helpers/pipe'], function (exports, _pipe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(exports, 'pipe', {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
define('labs-zola/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('labs-zola/helpers/previous', ['exports', 'ember-composable-helpers/helpers/previous'], function (exports, _previous) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(exports, 'previous', {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
define('labs-zola/helpers/promise-all', ['exports', 'ember-promise-helpers/helpers/promise-all'], function (exports, _promiseAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseAll.default;
    }
  });
  Object.defineProperty(exports, 'promiseAll', {
    enumerable: true,
    get: function () {
      return _promiseAll.promiseAll;
    }
  });
});
define('labs-zola/helpers/promise-hash', ['exports', 'ember-promise-helpers/helpers/promise-hash'], function (exports, _promiseHash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseHash.default;
    }
  });
  Object.defineProperty(exports, 'promiseHash', {
    enumerable: true,
    get: function () {
      return _promiseHash.promiseHash;
    }
  });
});
define('labs-zola/helpers/promise-rejected-reason', ['exports', 'ember-promise-helpers/helpers/promise-rejected-reason'], function (exports, _promiseRejectedReason) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseRejectedReason.default;
    }
  });
});
define('labs-zola/helpers/queue', ['exports', 'ember-composable-helpers/helpers/queue'], function (exports, _queue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(exports, 'queue', {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
define('labs-zola/helpers/range', ['exports', 'ember-composable-helpers/helpers/range'], function (exports, _range) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(exports, 'range', {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
define('labs-zola/helpers/reduce', ['exports', 'ember-composable-helpers/helpers/reduce'], function (exports, _reduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
  Object.defineProperty(exports, 'reduce', {
    enumerable: true,
    get: function () {
      return _reduce.reduce;
    }
  });
});
define('labs-zola/helpers/reject-by', ['exports', 'ember-composable-helpers/helpers/reject-by'], function (exports, _rejectBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
  Object.defineProperty(exports, 'rejectBy', {
    enumerable: true,
    get: function () {
      return _rejectBy.rejectBy;
    }
  });
});
define('labs-zola/helpers/repeat', ['exports', 'ember-composable-helpers/helpers/repeat'], function (exports, _repeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(exports, 'repeat', {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
define('labs-zola/helpers/reverse', ['exports', 'ember-composable-helpers/helpers/reverse'], function (exports, _reverse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _reverse.reverse;
    }
  });
});
define('labs-zola/helpers/shuffle', ['exports', 'ember-composable-helpers/helpers/shuffle'], function (exports, _shuffle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(exports, 'shuffle', {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
define('labs-zola/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('labs-zola/helpers/slice', ['exports', 'ember-composable-helpers/helpers/slice'], function (exports, _slice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
  Object.defineProperty(exports, 'slice', {
    enumerable: true,
    get: function () {
      return _slice.slice;
    }
  });
});
define('labs-zola/helpers/sort-by', ['exports', 'ember-composable-helpers/helpers/sort-by'], function (exports, _sortBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
  Object.defineProperty(exports, 'sortBy', {
    enumerable: true,
    get: function () {
      return _sortBy.sortBy;
    }
  });
});
define('labs-zola/helpers/take', ['exports', 'ember-composable-helpers/helpers/take'], function (exports, _take) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
  Object.defineProperty(exports, 'take', {
    enumerable: true,
    get: function () {
      return _take.take;
    }
  });
});
define('labs-zola/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  Object.defineProperty(exports, 'task', {
    enumerable: true,
    get: function () {
      return _task.task;
    }
  });
});
define('labs-zola/helpers/to-title-case', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var helper = Ember.Helper.helper;


  function toTitleCase(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        str = _ref2[0];

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  exports.default = helper(toTitleCase);
});
define('labs-zola/helpers/toggle-action', ['exports', 'ember-composable-helpers/helpers/toggle-action'], function (exports, _toggleAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
define('labs-zola/helpers/toggle', ['exports', 'ember-composable-helpers/helpers/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(exports, 'toggle', {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
define('labs-zola/helpers/union', ['exports', 'ember-composable-helpers/helpers/union'], function (exports, _union) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
  Object.defineProperty(exports, 'union', {
    enumerable: true,
    get: function () {
      return _union.union;
    }
  });
});
define('labs-zola/helpers/without', ['exports', 'ember-composable-helpers/helpers/without'], function (exports, _without) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(exports, 'without', {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
define('labs-zola/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_xor.xorHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_xor.xorHelper);
  }

  exports.default = forExport;
});
define('labs-zola/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'labs-zola/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('labs-zola/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('labs-zola/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('labs-zola/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.initialize;
    }
  });
});
define('labs-zola/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('labs-zola/initializers/ember-parachute', ['exports', 'ember-parachute/initializers/ember-parachute'], function (exports, _emberParachute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberParachute.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberParachute.initialize;
    }
  });
});
define('labs-zola/initializers/export-application-global', ['exports', 'labs-zola/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('labs-zola/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('labs-zola/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _localStorageAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _localStorageAdapter.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _localStorageAdapter.initialize;
    }
  });
});
define('labs-zola/initializers/metrics', ['exports', 'labs-zola/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    var _config$metricsAdapte = _environment.default.metricsAdapters,
        metricsAdapters = _config$metricsAdapte === undefined ? [] : _config$metricsAdapte;
    var _config$environment = _environment.default.environment,
        environment = _config$environment === undefined ? 'development' : _config$environment;

    var options = { metricsAdapters: metricsAdapters, environment: environment };

    application.register('config:metrics', options, { instantiate: false });
    application.inject('service:metrics', 'options', 'config:metrics');
  }

  exports.default = {
    name: 'metrics',
    initialize: initialize
  };
});
define('labs-zola/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('labs-zola/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('labs-zola/initializers/truth-helpers', ['exports', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _registerHelper, _and, _or, _equal, _not, _isArray, _notEqual, _gt, _gte, _lt, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (Ember.Helper) {
      return;
    }

    (0, _registerHelper.registerHelper)('and', _and.andHelper);
    (0, _registerHelper.registerHelper)('or', _or.orHelper);
    (0, _registerHelper.registerHelper)('eq', _equal.equalHelper);
    (0, _registerHelper.registerHelper)('not', _not.notHelper);
    (0, _registerHelper.registerHelper)('is-array', _isArray.isArrayHelper);
    (0, _registerHelper.registerHelper)('not-eq', _notEqual.notEqualHelper);
    (0, _registerHelper.registerHelper)('gt', _gt.gtHelper);
    (0, _registerHelper.registerHelper)('gte', _gte.gteHelper);
    (0, _registerHelper.registerHelper)('lt', _lt.ltHelper);
    (0, _registerHelper.registerHelper)('lte', _lte.lteHelper);
  }

  exports.default = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define('labs-zola/initializers/zf-widget', ['exports', 'ember-cli-foundation-6-sass/initializers/zf-widget'], function (exports, _zfWidget) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfWidget.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _zfWidget.initialize;
    }
  });
});
define("labs-zola/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('labs-zola/layer-groups/aerials', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'aerials',
    title: 'Aerial Imagery',
    titleTooltip: 'Aerial Photos Raster Tiles provided by DoITT GIS',
    visible: false,
    meta: {
      description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
      url: ['https://maps.nyc.gov/tiles/'],
      updated_at: 'n/a'
    },
    layers: [{
      displayName: '2016',
      layer: {
        id: 'aerials-2016',
        layout: {
          visibility: 'visible'
        },
        source: 'aerials-2016',
        type: 'raster'
      }
    }, {
      displayName: '2014',
      layer: {
        id: 'aerials-2014',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2014',
        type: 'raster'
      }
    }, {
      displayName: '2012',
      layer: {
        id: 'aerials-2012',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2012',
        type: 'raster'
      }
    }, {
      displayName: '2010',
      layer: {
        id: 'aerials-2010',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2010',
        type: 'raster'
      }
    }, {
      displayName: '2008',
      layer: {
        id: 'aerials-2008',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2008',
        type: 'raster'
      }
    }, {
      displayName: '2006',
      layer: {
        id: 'aerials-2006',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2006',
        type: 'raster'
      }
    }, {
      displayName: '2004',
      layer: {
        id: 'aerials-2004',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-2004',
        type: 'raster'
      }
    }, {
      displayName: '2001-2',
      layer: {
        id: 'aerials-20012',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-20012',
        type: 'raster'
      }
    }, {
      displayName: '1996',
      layer: {
        id: 'aerials-1996',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-1996',
        type: 'raster'
      }
    }, {
      displayName: '1951',
      layer: {
        id: 'aerials-1951',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-1951',
        type: 'raster'
      }
    }, {
      displayName: '1924',
      layer: {
        id: 'aerials-1924',
        layout: {
          visibility: 'none'
        },
        source: 'aerials-1924',
        type: 'raster'
      }
    }]
  };
});
define('labs-zola/layer-groups/assemblydistricts', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout,
      labelLayout = _adminBoundaryStyles.default.labelLayout;
  exports.default = {
    id: 'assemblydistricts',
    title: 'NY State Assembly Districts',
    legendIcon: 'admin-line',
    legendColor: '#8A76F5',
    visible: false,
    meta: {
      description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'assemblydistricts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-assembly-districts',
        paint: {
          'line-color': '#8A76F5',
          'line-opacity': 0.2,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'assemblydistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-assembly-districts',
        paint: paint.lines,
        layout: layout.lines
      }
    }, {
      layer: {
        id: 'assemblydistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'ny-assembly-districts',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('assemdist')
      }
    }]
  };
});
define('labs-zola/layer-groups/boroughs', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout;
  exports.default = {
    id: 'boroughs',
    title: 'Boroughs',
    legendIcon: 'admin-line',
    legendColor: '#F5B176',
    visible: false,
    meta: {
      description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'boroughs-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'boroughs',
        paint: {
          'line-color': '#F5B176',
          'line-opacity': 0.2,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'boroughs-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'boroughs',
        paint: paint.lines,
        layout: layout.lines
      }
    }]
  };
});
define('labs-zola/layer-groups/building-footprints', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'building-footprints',
    title: 'Building Footprints',
    titleTooltip: 'Building footprints based on OpenStreetMap data',
    visible: true,
    meta: {
      description: 'OpenStreetMap Building Footprints via Mapbox Vector Tile Service',
      url: ['https://www.openstreetmap.org/'],
      updated_at: null
    },
    layers: [{
      layer: {
        id: 'building',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'building',
        minzoom: 15,
        paint: {
          'fill-opacity': {
            stops: [[15, 0], [16, 0.3]]
          },
          'fill-color': 'rgba(175, 175, 175, 1)'
        },
        layout: {}
      }
    }]
  };
});
define('labs-zola/layer-groups/business-improvement-districts', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#76420a';

  exports.default = {
    id: 'business-improvement-districts',
    title: 'Business Improvement Districts',
    titleTooltip: 'A Business Improvement District (BID) is a geographical area where local stakeholders oversee and fund the maintenance, improvement, and promotion of their commercial district.',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Business Improvement Districts Shapefile on the NYC Open Data Portal',
      url: ['https://data.cityofnewyork.us/Business/Business-Improvement-Districts/ejxk-d93y/data'],
      updated_at: '20 November 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('business-improvement-districts-line', 'supporting-zoning', 'business-improvement-districts', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('business-improvement-districts-fill', 'supporting-zoning', 'business-improvement-districts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{bid}}}'
    }]
  };
});
define('labs-zola/layer-groups/coastal-zone-boundary', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#5DC6E4';

  exports.default = {
    id: 'coastal-zone-boundary',
    title: 'Coastal Zone Boundary',
    titleTooltip: 'Projects within the coastal zone boundary are subject to additional review under the Waterfront Revitalization Program',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'WRP Coastal Zone Boundary v2016.1, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('coastal-zone-boundary-line', 'supporting-zoning', 'coastal-zone-boundary', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('coastal-zone-boundary-fill', 'supporting-zoning', 'coastal-zone-boundary', legendColor),
      highlightable: true,
      tooltipTemplate: 'Coastal Zone Boundary'
    }]
  };
});
define('labs-zola/layer-groups/commercial-overlays', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'commercial-overlays',
    title: 'Commercial Overlays',
    titleTooltip: 'A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs.',
    visible: true,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: {
        id: 'co-fill',
        type: 'fill',
        source: 'commercial-overlays',
        minzoom: 12,
        'source-layer': 'commercial-overlays',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-opacity': 0
        }
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{overlay}}'
    }, {
      layer: {
        id: 'co',
        type: 'line',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'line-width': {
            stops: [[12, 0.1], [15, 2]]
          },
          'line-opacity': 0.75,
          'line-color': 'rgba(220, 10, 10, 1)'
        }
      }
    }, {
      layer: {
        id: 'co_labels',
        type: 'symbol',
        source: 'commercial-overlays',
        'source-layer': 'commercial-overlays',
        paint: {
          'text-color': 'rgba(200, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': 0.9
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}'
        },
        minzoom: 14
      }
    }]
  };
});
define('labs-zola/layer-groups/communitydistricts', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout,
      labelLayout = _adminBoundaryStyles.default.labelLayout;
  exports.default = {
    id: 'community-districts',
    title: 'Community Districts',
    legendIcon: 'admin-line',
    legendColor: '#76F578',
    visible: false,
    meta: {
      description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'community-districts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        paint: {
          'line-color': '#76F578',
          'line-opacity': 0.2,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'community-districts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        paint: paint.lines,
        layout: layout.lines
      }
    }, {
      layer: {
        id: 'community-districts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'community-districts',
        minzoom: 11,
        paint: paint.labels,
        layout: labelLayout('boro_district')
      }
    }]
  };
});
define('labs-zola/layer-groups/e-designations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'e-designations',
    title: 'Environmental Designations',
    titleTooltip: 'An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot.',
    meta: {
      description: '(E) Designations release March 22, 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-edesignations.page'],
      updated_at: 'April 5th, 2018'
    },
    visible: false,
    layers: [{
      layer: {
        id: 'e-designations-circle',
        type: 'circle',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        minzoom: 15,
        paint: {
          'circle-radius': {
            stops: [[16, 2], [17, 5]]
          },
          'circle-color': 'rgba(255, 255, 255, 0.65)',
          'circle-stroke-opacity': {
            stops: [[15, 0], [16, 1]]
          },
          'circle-stroke-color': 'rgba(52, 33, 220, 1)',
          'circle-pitch-scale': 'map',
          'circle-stroke-width': 1.5,
          'circle-opacity': 1
        }
      },
      highlightable: true,
      tooltipTemplate: 'E-designation<br/>E-Number: {{enumber}}<br/>CEQR: {{ceqr_num}}<br/>ULURP: {{ulurp_num}}'
    }, {
      layer: {
        id: 'e-designations-label',
        type: 'symbol',
        source: 'supporting-zoning',
        'source-layer': 'e-designations',
        minzoom: 16,
        layout: {
          'text-field': 'E',
          'text-size': 8,
          'text-allow-overlap': true,
          visibility: 'visible'
        },
        paint: {
          'text-opacity': {
            stops: [[16, 0], [17, 1]]
          }
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/effective-flood-insurance-rate-2007', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'effective-flood-insurance-rate-2007',
    title: 'Effective Flood Insurance Rate Maps 2007',
    titleTooltip: 'The Effective Flood Insurance Rate Maps (FIRMs), first adopted by New York City in 1983 and last updated in 2007, establish the floodplain currently subject to the National Flood Insurance Program purchase requirements.',
    visible: false,
    meta: {
      description: 'Effective Flood Insurance Rate Maps (FIRMs) data are available at FEMA Flood Map Service Center',
      url: ['https://msc.fema.gov/portal'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: {
        id: 'effective-flood-insurance-rate-2007',
        type: 'fill',
        source: 'effective-flood-insurance-rate-2007',
        'source-layer': 'effective-flood-insurance-rate-2007',
        paint: {
          'fill-color': {
            property: 'fld_zone',
            type: 'categorical',
            stops: [['V', '#0084a8'], ['A', '#00a9e6']]
          },
          'fill-opacity': 0.7
        }
      },
      highlightable: true,
      tooltipTemplate: '2007 {{fld_zone}} Zone'
    }]
  };
});
define('labs-zola/layer-groups/fresh', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'fresh',
    title: 'FRESH Zones',
    titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives',
    visible: false,
    meta: {
      description: 'FRESH Food Stores Zoning Boundaries release 2016.1, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('fresh-line', 'supporting-zoning', 'fresh', '#30BF4E')
    }, {
      layer: {
        id: 'fresh-fill-zoning-and-tax',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#30BF4E',
          'fill-opacity': 0.2
        },
        filter: ['all', ['==', 'name', 'Zoning and discretionary tax incentives']],
        layout: {}
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}'
    }, {
      layer: {
        id: 'fresh-fill-zoning',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#0B9390',
          'fill-opacity': 0.2
        },
        filter: ['all', ['==', 'name', 'Zoning incentives']],
        layout: {}
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}'
    }, {
      layer: {
        id: 'fresh-fill-tax',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#8FE339',
          'fill-opacity': 0.2
        },
        filter: ['all', ['==', 'name', 'Discretionary tax incentives']],
        layout: {}
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}'
    }]
  };
});
define('labs-zola/layer-groups/historic-districts', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = 'steelblue';

  exports.default = {
    id: 'historic-districts',
    title: 'Historic Districts',
    titleTooltip: 'Areas designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Historic Districts Shapefile, NYC Open Data Portal',
      url: ['https://data.cityofnewyork.us/Housing-Development/Historic-Districts/xbvj-gfnw/data'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('historic-districts-line', 'landmark-historic', 'historic-districts', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('historic-districts-fill', 'landmark-historic', 'historic-districts', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{area_name}}}'
    }]
  };
});
define('labs-zola/layer-groups/inclusionary-housing', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#E57300';

  exports.default = {
    id: 'inclusionary-housing',
    title: 'Inclusionary Housing Designated Areas',
    titleTooltip: 'Areas where zoning incentives are offered to encourage the creation of permanently affordable housing',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Inclusionary Housing Designated Areas release 2017.7, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('inclusionary-housing-line', 'supporting-zoning', 'inclusionary-housing', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('inclusionary-housing-fill', 'supporting-zoning', 'inclusionary-housing', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{projectnam}}}'
    }]
  };
});
define('labs-zola/layer-groups/index', ['exports', 'labs-zola/layer-groups/aerials', 'labs-zola/layer-groups/assemblydistricts', 'labs-zola/layer-groups/boroughs', 'labs-zola/layer-groups/building-footprints', 'labs-zola/layer-groups/business-improvement-districts', 'labs-zola/layer-groups/commercial-overlays', 'labs-zola/layer-groups/communitydistricts', 'labs-zola/layer-groups/coastal-zone-boundary', 'labs-zola/layer-groups/e-designations', 'labs-zola/layer-groups/effective-flood-insurance-rate-2007', 'labs-zola/layer-groups/fresh', 'labs-zola/layer-groups/historic-districts', 'labs-zola/layer-groups/inclusionary-housing', 'labs-zola/layer-groups/landmarks', 'labs-zola/layer-groups/limited-height-districts', 'labs-zola/layer-groups/low-density-growth-mgmt-areas', 'labs-zola/layer-groups/mandatory-inclusionary-housing', 'labs-zola/layer-groups/neighborhood-tabulation-areas', 'labs-zola/layer-groups/nysenatedistricts', 'labs-zola/layer-groups/nyccouncildistricts', 'labs-zola/layer-groups/sidewalkcafes', 'labs-zola/layer-groups/special-purpose-districts', 'labs-zola/layer-groups/pluto', 'labs-zola/layer-groups/preliminary-flood-insurance-rate', 'labs-zola/layer-groups/special-purpose-subdistricts', 'labs-zola/layer-groups/subway', 'labs-zola/layer-groups/threed-buildings', 'labs-zola/layer-groups/transit-zones', 'labs-zola/layer-groups/waterfront-access-plan', 'labs-zola/layer-groups/zoning-districts', 'labs-zola/layer-groups/zoning-map-amendments', 'labs-zola/layer-groups/zoning-map-amendments-pending'], function (exports, _aerials, _assemblydistricts, _boroughs, _buildingFootprints, _businessImprovementDistricts, _commercialOverlays, _communitydistricts, _coastalZoneBoundary, _eDesignations, _effectiveFloodInsuranceRate, _fresh, _historicDistricts, _inclusionaryHousing, _landmarks, _limitedHeightDistricts, _lowDensityGrowthMgmtAreas, _mandatoryInclusionaryHousing, _neighborhoodTabulationAreas, _nysenatedistricts, _nyccouncildistricts, _sidewalkcafes, _specialPurposeDistricts, _pluto, _preliminaryFloodInsuranceRate, _specialPurposeSubdistricts, _subway, _threedBuildings, _transitZones, _waterfrontAccessPlan, _zoningDistricts, _zoningMapAmendments, _zoningMapAmendmentsPending) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    aerials: _aerials.default,
    assemblydistricts: _assemblydistricts.default,
    boroughs: _boroughs.default,
    buildingFootprints: _buildingFootprints.default,
    businessImprovementDistricts: _businessImprovementDistricts.default,
    commercialOverlays: _commercialOverlays.default,
    communityDistricts: _communitydistricts.default,
    coastalZoneBoundary: _coastalZoneBoundary.default,
    eDesignations: _eDesignations.default,
    effectiveFloodInsuranceRate2007: _effectiveFloodInsuranceRate.default,
    fresh: _fresh.default,
    historicDistricts: _historicDistricts.default,
    inclusionaryHousing: _inclusionaryHousing.default,
    landmarks: _landmarks.default,
    limitedHeightDistricts: _limitedHeightDistricts.default,
    lowDensityGrowthMgmtAreas: _lowDensityGrowthMgmtAreas.default,
    mandatoryInclusionaryHousing: _mandatoryInclusionaryHousing.default,
    neighborhoodTabulationAreas: _neighborhoodTabulationAreas.default,
    nysenatedistricts: _nysenatedistricts.default,
    nyccouncildistricts: _nyccouncildistricts.default,
    sidewalkcafes: _sidewalkcafes.default,
    specialPurposeDistricts: _specialPurposeDistricts.default,
    pluto: _pluto.default,
    preliminaryFloodInsuranceRate: _preliminaryFloodInsuranceRate.default,
    specialPurposeSubdistricts: _specialPurposeSubdistricts.default,
    subway: _subway.default,
    threedBuildings: _threedBuildings.default,
    transitZones: _transitZones.default,
    waterfrontAccessPlan: _waterfrontAccessPlan.default,
    zoningDistricts: _zoningDistricts.default,
    zoningMapAmendments: _zoningMapAmendments.default,
    zoningMapAmendmentsPending: _zoningMapAmendmentsPending.default
  };
});
define('labs-zola/layer-groups/landmarks', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = 'purple';

  exports.default = {
    id: 'landmarks',
    title: 'Landmarks',
    titleTooltip: 'Sites designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
    visible: false,
    meta: {
      description: 'Individual Landmarks Shapefile, NYC Open Data Portal',
      url: ['https://data.cityofnewyork.us/Housing-Development/Individual-Landmarks/ch5p-r223/data'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'landmarks_v0-circle-outline',
        type: 'circle',
        source: 'landmark-historic',
        'source-layer': 'landmarks',
        paint: {
          'circle-radius': { stops: [[10, 3], [15, 7]] },
          'circle-color': '#012700',
          'circle-opacity': 0.7
        }
      }
    }, {
      layer: {
        id: 'landmarks_v0-circle',
        type: 'circle',
        source: 'landmark-historic',
        'source-layer': 'landmarks',
        paint: {
          'circle-radius': { stops: [[10, 1], [15, 5]] },
          'circle-color': {
            property: 'lm_type',
            type: 'categorical',
            stops: [['Individual Landmark', 'rgba(147, 245, 201, 1)'], ['Interior Landmark', 'rgba(152, 152, 247, 1)']]
          },
          'circle-opacity': 0.7
        }
      },
      highlightable: true,
      tooltipTemplate: '{{{lm_name}}}'
    }, {
      layer: (0, _polygonLayerStyles.lineStyle)('scenic-landmarks-line', 'landmark-historic', 'scenic-landmarks', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('scenic-landmarks-fill', 'landmark-historic', 'scenic-landmarks', legendColor),
      highlightable: true,
      tooltipTemplate: '{{{scen_lm_na}}}'
    }]
  };
});
define('labs-zola/layer-groups/limited-height-districts', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#76420a';

  exports.default = {
    id: 'limited-height-districts',
    title: 'Limited Height Districts',
    titleTooltip: 'A limited height district may be superimposed on an area designated as an historic district by the Landmarks Preservation Commission. It is mapped in areas of the Upper East Side, Gramercy Park, Brooklyn Heights and Cobble Hill. The maximum building height is 50 feet in a LH-1 district, 60 feet in a LH-1A district, 70 feet in a LH-2 district and 100 feet in a LH-3 district.',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('limited-height-districts-line', 'supporting-zoning', 'limited-height-districts', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('limited-height-districts-fill', 'supporting-zoning', 'limited-height-districts', legendColor),
      highlightable: true,
      tooltipTemplate: 'Limited height district - {{lhlbl}}'
    }]
  };
});
define('labs-zola/layer-groups/low-density-growth-mgmt-areas', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#9D47B2';

  exports.default = {
    id: 'low-density-growth-mgmt-areas',
    title: 'Lower Density Growth Management Areas',
    titleTooltip: 'Areas where special zoning controls intend to limit growth and better match available infrastructure and services in lower-density areas experiencing rapid development',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Lower Density Growth Management Area release 2011.1, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('low-density-growth-mgmt-areas-line', 'supporting-zoning', 'low-density-growth-mgmt-areas', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('low-density-growth-mgmt-areas-fill', 'supporting-zoning', 'low-density-growth-mgmt-areas', legendColor),
      highlightable: true,
      tooltipTemplate: 'Lower Density Growth Management Area'
    }]
  };
});
define('labs-zola/layer-groups/mandatory-inclusionary-housing', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#CC3D5D';

  exports.default = {
    id: 'mandatory-inclusionary-housing',
    title: 'Mandatory Inclusionary Housing Areas',
    titleTooltip: 'Areas where developments, enlargements and conversions over a certain size are required to set aside a percentage of floor area for permanently affordable housing',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Mandatory Inclusionary Housing (MIH) release March 22, 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('mandatory-inclusionary-housing-line', 'supporting-zoning', 'mandatory-inclusionary-housing', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('mandatory-inclusionary-housing-fill', 'supporting-zoning', 'mandatory-inclusionary-housing', legendColor),
      highlightable: true,
      tooltipTemplate: '{{projectnam}} - {{mih_option}}'
    }]
  };
});
define('labs-zola/layer-groups/neighborhood-tabulation-areas', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout,
      labelLayout = _adminBoundaryStyles.default.labelLayout;
  exports.default = {
    id: 'neighborhood-tabulation-areas',
    title: 'Neighborhood Tabulation Areas',
    legendIcon: 'admin-line',
    legendColor: '#F576CC',
    visible: false,
    meta: {
      description: 'Neighborhood Tabulation Areas v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'nta-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: {
          'line-color': '#F576CC',
          'line-opacity': 0.2,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'nta-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas',
        paint: paint.lines,
        layout: layout.lines
      }
    }, {
      layer: {
        id: 'nta-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'neighborhood-tabulation-areas-centroids',
        minzoom: 12,
        paint: paint.labels,
        layout: labelLayout('ntaname')
      }
    }]
  };
});
define('labs-zola/layer-groups/nyccouncildistricts', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout,
      labelLayout = _adminBoundaryStyles.default.labelLayout;
  exports.default = {
    id: 'nyccouncildistricts',
    title: 'NYC Council Districts',
    legendIcon: 'admin-line',
    legendColor: '#76CAF5',
    visible: false,
    meta: {
      description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'nyccouncildistricts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: {
          'line-color': '#76CAF5',
          'line-opacity': 1,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'nyccouncildistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.lines,
        layout: layout.lines
      }
    }, {
      layer: {
        id: 'nyccouncildistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'nyc-council-districts',
        paint: paint.labels,
        layout: labelLayout('coundist')
      }
    }]
  };
});
define('labs-zola/layer-groups/nysenatedistricts', ['exports', 'labs-zola/utils/admin-boundary-styles'], function (exports, _adminBoundaryStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var paint = _adminBoundaryStyles.default.paint,
      layout = _adminBoundaryStyles.default.layout,
      labelLayout = _adminBoundaryStyles.default.labelLayout;
  exports.default = {
    id: 'nysenatedistricts',
    title: 'NY State Senate Districts',
    legendIcon: 'admin-line',
    legendColor: '#E4F576',
    visible: false,
    meta: {
      description: 'Administrative and Political Districts v17D, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'nysenatedistricts-line-glow',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        paint: {
          'line-color': '#E4F576',
          'line-opacity': 1,
          'line-width': {
            stops: [[11, 3], [16, 6]]
          }
        }
      }
    }, {
      layer: {
        id: 'nysenatedistricts-line',
        type: 'line',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        paint: paint.lines,
        layout: layout.lines
      }
    }, {
      layer: {
        id: 'nysenatedistricts-label',
        type: 'symbol',
        source: 'admin-boundaries',
        'source-layer': 'ny-senate-districts',
        minzoom: 10,
        paint: paint.labels,
        layout: labelLayout('stsendist')
      }
    }]
  };
});
define('labs-zola/layer-groups/pluto', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'pluto',
    title: 'Tax Lots',
    titleTooltip: 'A tax lot is a parcel of land identified with a unique borough, block and lot number for property tax purposes.',
    meta: {
      description: 'MapPLUTO™ v17v1.1, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: '5 March 2018'
    },
    layers: [{
      layer: {
        id: 'pluto-fill',
        type: 'fill',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'pluto',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-color': {
            property: 'landuse',
            type: 'categorical',
            stops: [['01', '#FEFFA8'], ['02', '#FCB842'], ['03', '#B16E00'], ['04', '#ff8341'], ['05', '#fc2929'], ['06', '#E362FB'], ['07', '#E0BEEB'], ['08', '#44A3D5'], ['09', '#78D271'], ['10', '#BAB8B6'], ['11', '#555555']],
            default: '#EEEEEE'
          },
          'fill-opacity': 0
        }
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{address}}'
    }, {
      layer: {
        id: 'pluto-line',
        type: 'line',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'pluto',
        paint: {
          'line-width': 0.5,
          'line-color': 'rgba(130, 130, 130, 1)',
          'line-opacity': {
            stops: [[15, 0], [16, 1]]
          }
        }
      }
    }, {
      layer: {
        id: 'pluto-labels',
        type: 'symbol',
        source: 'pluto',
        'source-layer': 'pluto',
        minzoom: 15,
        layout: {
          'text-field': '{lot}',
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 11
        },
        paint: {
          'text-opacity': {
            stops: [[16.5, 0], [17.5, 1]]
          },
          'icon-color': 'rgba(193, 193, 193, 1)',
          'text-color': 'rgba(154, 154, 154, 1)',
          'text-halo-color': 'rgba(152, 152, 152, 0)'
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/preliminary-flood-insurance-rate', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'preliminary-flood-insurance-rate',
    title: 'Preliminary Flood Insurance Rate Maps 2015',
    titleTooltip: 'Released in 2015 as part of a citywide flood map update, the Preliminary FIRMs establish the 1% annual chance floodplain. For building code and zoning purposes, the more expansive of the either the 2015 or 2007 maps is used.',
    visible: false,
    meta: {
      description: 'Flood Insurance Rate Data provided by FEMA',
      url: ['http://www.region2coastal.com/view-flood-maps-data/view-preliminary-flood-map-data/'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: {
        id: 'preliminary-flood-insurance-rate',
        type: 'fill',
        source: 'preliminary-flood-insurance-rate',
        'source-layer': 'preliminary-flood-insurance-rate',
        paint: {
          'fill-color': {
            property: 'fld_zone',
            type: 'categorical',
            stops: [['V', '#0084a8'], ['A', '#00a9e6']]
          },
          'fill-opacity': 0.7
        }
      },
      highlightable: true,
      tooltipTemplate: '2015 {{fld_zone}} Zone'
    }]
  };
});
define('labs-zola/layer-groups/sidewalkcafes', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'sidewalkcafes',
    title: 'Sidewalk Cafes',
    titleTooltip: 'Areas where different types of sidewalk cafes are permitted on public sidewalks',
    visible: false,
    meta: {
      description: 'Sidewalk Cafes release March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: {
        id: 'sidewalkcafes-line-all',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [[11, 0.5], [13, 1], [15, 5]]
          },
          'line-color': '#28AD15'
        },
        filter: ['all', ['==', 'cafetype', 'All Cafes']]
      }
    }, {
      layer: {
        id: 'sidewalkcafes-line-small',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [[11, 0.5], [13, 1], [15, 5]]
          },
          'line-color': '#CC3DCA'
        },
        filter: ['all', ['==', 'cafetype', 'Small Only']],
        layout: {
          visibility: 'visible'
        }
      }
    }, {
      layer: {
        id: 'sidewalkcafes-line-unenclosed',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'sidewalk-cafes',
        paint: {
          'line-width': {
            stops: [[11, 0.5], [13, 1], [15, 5]]
          },
          'line-color': '#216BC6'
        },
        filter: ['all', ['==', 'cafetype', 'Unenclosed Only']],
        layout: {
          visibility: 'visible'
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/special-purpose-districts', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#5E6633';

  exports.default = {
    id: 'special-purpose-districts',
    title: 'Special Purpose Districts',
    titleTooltip: 'The regulations for special purpose districts are designed to supplement and modify the underlying zoning in order to respond to distinctive neighborhoods with particular issues and goals',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('zoning-sp-line', 'supporting-zoning', 'special-purpose-districts', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('zoning-sp-fill', 'supporting-zoning', 'special-purpose-districts', legendColor),
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{sdname}}'
    }]
  };
});
define('labs-zola/layer-groups/special-purpose-subdistricts', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#8DA610';

  exports.default = {
    id: 'special-purpose-subdistricts',
    title: 'Special Purpose Subdistricts',
    titleTooltip: 'Areas within Special Purpose Districts where unique rules apply',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('zoning-sp-sd-line', 'supporting-zoning', 'special-purpose-subdistricts', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('zoning-sp-sd-fill', 'supporting-zoning', 'special-purpose-subdistricts', legendColor),
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{spname}} - {{subdist}}'
    }]
  };
});
define('labs-zola/layer-groups/subway', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'subway',
    title: 'Subways',
    visible: true,
    meta: {
      description: 'NYC Subway Lines and Stops - Originally Sourced from NYC DoITT GIS, combined with SI Railway data from Baruch College NYC Mass Transit Spatial Layers | Subway entrances from NYC Open Data',
      url: ['https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mta_subway_stops_v0&format=SHP', 'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mta_subway_routes_v0&format=SHP', 'https://data.cityofnewyork.us/Transportation/Subway-Entrances/drex-xx56', 'https://www.baruch.cuny.edu/confluence/display/geoportal/NYC+Mass+Transit+Spatial+Layers'],
      updated_at: '21 November 2017'
    },
    layers: [{
      layer: {
        id: 'subway_green',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', '4']],
        paint: {
          'line-color': 'rgba(0, 147, 60, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_yellow',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', 'N']],
        paint: {
          'line-color': 'rgba(252, 204, 10, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_gray',
        source: 'transportation',
        'source-layer': 'subway-routes',
        filter: ['all', ['==', 'rt_symbol', 'L']],
        paint: {
          'line-color': 'rgba(167, 169, 172, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_brown',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', 'J']],
        paint: {
          'line-color': 'rgba(153, 102, 51, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_light_green',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', 'G']],
        paint: {
          'line-color': 'rgba(108, 190, 69, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_orange',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', 'B']],
        paint: {
          'line-color': 'rgba(255, 99, 25, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_blue',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['any', ['==', 'rt_symbol', 'A'], ['==', 'rt_symbol', 'SI']],
        paint: {
          'line-color': 'rgba(0, 57, 166, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_purple',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', '7']],
        paint: {
          'line-color': 'rgba(185, 51, 173, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_red',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: ['all', ['==', 'rt_symbol', '1']],
        paint: {
          'line-color': 'rgba(238, 53, 46, 1)',
          'line-width': {
            stops: [[10, 1], [15, 4]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_stations',
        minzoom: 11,
        source: 'transportation',
        'source-layer': 'subway-stops',
        type: 'circle',
        paint: {
          'circle-color': 'rgba(255, 255, 255, 1)',
          'circle-opacity': {
            stops: [[11, 0], [12, 1]]
          },
          'circle-stroke-opacity': {
            stops: [[11, 0], [12, 1]]
          },
          'circle-radius': {
            stops: [[10, 2], [14, 5]]
          },
          'circle-stroke-width': 1,
          'circle-pitch-scale': 'map'
        }
      }
    }, {
      layer: {
        id: 'subway_stations_labels',
        minzoom: 13,
        source: 'transportation',
        'source-layer': 'subway-stops',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'symbol-placement': 'point',
          'symbol-spacing': 250,
          'symbol-avoid-edges': false,
          'text-size': 14,
          'text-anchor': 'center'
        },
        paint: {
          'text-halo-color': 'rgba(255, 255, 255, 1)',
          'text-halo-width': 1,
          'text-translate': [1, 20],
          'text-opacity': {
            stops: [[13, 0], [14, 1]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_entrances',
        minzoom: 15,
        source: 'transportation',
        'source-layer': 'subway-entrances',
        type: 'symbol',
        layout: {
          'icon-image': 'rail-15',
          'icon-allow-overlap': true,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-anchor': 'top'
        },
        paint: {
          'icon-opacity': {
            stops: [[15.5, 0], [16.5, 1]]
          }
        }
      }
    }, {
      layer: {
        id: 'subway_entrances_labels',
        minzoom: 15,
        source: 'transportation',
        'source-layer': 'subway-entrances',
        type: 'symbol',
        layout: {
          'text-field': 'Entrance',
          'symbol-placement': 'point',
          'symbol-spacing': 250,
          'symbol-avoid-edges': false,
          'text-size': 8,
          'text-offset': [0, 2],
          'text-anchor': 'center'
        },
        paint: {
          'text-halo-color': 'rgba(255, 255, 255, 1)',
          'text-halo-width': 1,
          'text-opacity': {
            stops: [[15.5, 0], [16.5, 1]]
          }
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/threed-buildings', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'threed-buildings',
    title: '3D Buildings',
    titleTooltip: 'Extruded building height from OpenStreetMap data',
    visible: false,
    meta: {
      description: 'OpenStreetMap Building Footprints via Mapbox Vector Tile Service',
      url: ['https://www.openstreetmap.org/'],
      updated_at: null
    },
    layers: [{
      layer: {
        id: 'threed-buildings',
        type: 'fill-extrusion',
        source: 'openmaptiles',
        'source-layer': 'building',
        minzoom: 0,
        paint: {
          'fill-extrusion-color': 'rgba(203, 203, 203, 1)',
          'fill-extrusion-opacity': 0.95,
          'fill-extrusion-translate': [3, 0],
          'fill-extrusion-height': {
            property: 'render_height',
            type: 'identity'
          },
          'fill-extrusion-base': {
            property: 'render_min_height',
            type: 'identity'
          }
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/transit-zones', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#E6D62E';

  exports.default = {
    id: 'transit-zones',
    title: 'Transit Zones',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    titleTooltip: 'Transit-accessible areas where parking is optional for new affordable housing units and special rules apply to existing affordable units',
    meta: {
      description: 'Transit Zones release July 2016, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('transit-zones-line', 'supporting-zoning', 'transit-zones', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('transit-zones-fill', 'supporting-zoning', 'transit-zones', legendColor),
      highlightable: true,
      tooltipTemplate: 'Transit Zone'
    }]
  };
});
define('labs-zola/layer-groups/waterfront-access-plan', ['exports', 'labs-zola/utils/polygon-layer-styles'], function (exports, _polygonLayerStyles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var legendColor = '#00A4D2';

  exports.default = {
    id: 'waterfront-access-plan',
    title: 'Waterfront Access Plan',
    titleTooltip: 'These areas reflect site specific modification of waterfront public access requirements for waterfront parcels with unique conditions and opportunities',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'Waterfront Access Plan release 2011.1, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'September 2017'
    },
    layers: [{
      layer: (0, _polygonLayerStyles.lineStyle)('waterfront-access-plan-line', 'supporting-zoning', 'waterfront-access-plan', legendColor)
    }, {
      layer: (0, _polygonLayerStyles.fillStyle)('waterfront-access-plan-fill', 'supporting-zoning', 'waterfront-access-plan', legendColor),
      highlightable: true,
      tooltipTemplate: 'Waterfront Access Plan - {{{name}}}'
    }]
  };
});
define('labs-zola/layer-groups/zoning-districts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'zoning-districts',
    title: 'Zoning Districts',
    visible: true,
    titleTooltip: 'A zoning district is a residential, commercial or manufac­turing area of the city within which zoning regulations govern land use and building bulk.',
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: {
        id: 'zd-fill',
        type: 'fill',
        source: 'zoning-districts',
        'source-layer': 'zoning-districts',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [['BP', '#808080'], ['C1', '#ffa89c'], ['C2', '#fd9a8f'], ['C3', '#fa867c'], ['C4', '#f76e67'], ['C5', '#f2544e'], ['C6', '#ee3a36'], ['C7', '#ea2220'], ['C8', '#e50000'], ['M1', '#f3b3ff'], ['M2', '#e187f3'], ['M3', '#cf5ce6'], ['PA', '#78D271'], ['R1', '#fff8a6'], ['R2', '#fff7a6'], ['R3', '#fff797'], ['R4', '#fff584'], ['R5', '#fff36c'], ['R6', '#fff153'], ['R7', '#ffee39'], ['R8', '#ffec22'], ['R9', '#ffeb0e'], ['R10', '#ffea00']]
          },
          'fill-opacity': {
            stops: [[15, 0.3], [16, 0]]
          },
          'fill-antialias': true
        }
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: 'Zoning District {{zonedist}}'
    }, {
      layer: {
        id: 'zd-lines',
        type: 'line',
        source: 'zoning-districts',
        'source-layer': 'zoning-districts',
        paint: {
          'line-opacity': {
            stops: [[12, 0], [13, 0.2], [16, 0.5]]
          },
          'line-width': {
            stops: [[13, 1], [14, 3]]
          }
        }
      },
      before: 'place_other'
    }, {
      layer: {
        id: 'zd_labels',
        source: 'zoning-districts',
        type: 'symbol',
        'source-layer': 'zoning-districts',
        paint: {
          'text-color': {
            stops: [[15, '#626262'], [16, '#444']]
          },
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': {
            stops: [[12, 0], [13, 1]]
          }
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{zonedist}',
          'text-size': {
            stops: [[10, 8], [14, 16]]
          }
        }
      }
    }]
  };
});
define('labs-zola/layer-groups/zoning-map-amendments-pending', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var legendColor = '#B01F1F';

  exports.default = {
    id: 'zoning-map-amendments-pending',
    title: 'Pending Zoning Map Amendments',
    titleTooltip: 'Changes to the Zoning Map that are currently undergoing public review',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: {
        id: 'zmacert-line',
        type: 'line',
        source: 'supporting-zoning',
        'source-layer': 'zoning-map-amendments-pending',
        paint: {
          'line-width': {
            stops: [[11, 1], [12, 3]]
          },
          'line-color': legendColor,
          'line-dasharray': [1, 1],
          'line-opacity': 0.6
        }
      }
    }, {
      layer: {
        id: 'zmacert-fill',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'zoning-map-amendments-pending',
        paint: {
          'fill-color': legendColor,
          'fill-opacity': 0.6
        }
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{{project_na}}}'
    }]
  };
});
define('labs-zola/layer-groups/zoning-map-amendments', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var legendColor = '#9FC73E';

  exports.default = {
    id: 'zoning-map-amendments',
    title: 'Zoning Map Amendments',
    titleTooltip: 'Changes to the Zoning Map that have been adopted since 2002',
    visible: false,
    legendIcon: 'polygon',
    legendColor: legendColor,
    meta: {
      description: 'NYC GIS Zoning Features March 2018, Bytes of the Big Apple',
      url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
      updated_at: 'April 5th, 2018'
    },
    layers: [{
      layer: {
        id: 'zma-line',
        type: 'line',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'line-width': {
            stops: [[11, 1], [12, 3]]
          },
          'line-color': legendColor,
          'line-dasharray': [1, 1],
          'line-opacity': 0.6
        }
      }
    }, {
      layer: {
        id: 'zma-fill',
        type: 'fill',
        source: 'zoning-map-amendments',
        'source-layer': 'zoning-map-amendments',
        paint: {
          'fill-color': legendColor,
          'fill-opacity': 0.6
        }
      },
      highlightable: true,
      clickable: true,
      tooltipTemplate: '{{{project_na}}} - Effective {{{effectiveformatted}}}'
    }]
  };
});
define('labs-zola/layers/bookmarked-lots', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'bookmarked-lots',
    type: 'fill',
    source: 'pluto',
    'source-layer': 'pluto',
    paint: {
      'fill-opacity': 0.2,
      'fill-color': '#FF0000'
    }
  };
});
define('labs-zola/layers/draw-styles', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [
  // ACTIVE (being drawn)
  // line stroke
  {
    id: 'gl-draw-line',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#D96B27',
      'line-dasharray': [0.2, 2],
      'line-width': 4
    }
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': '#D20C0C',
      'fill-outline-color': '#D20C0C',
      'fill-opacity': 0.1
    }
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#D96B27',
      'line-dasharray': [0.2, 2],
      'line-width': 4
    }
  },
  // vertex point halos
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 7,
      'circle-color': '#FFF'
    }
  },
  // vertex points
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 6,
      'circle-color': '#D96B27'
    }
  },

  // INACTIVE (static, already drawn)
  // line stroke
  {
    id: 'gl-draw-line-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-width': 3
    }
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill-static',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    paint: {
      'fill-color': '#000',
      'fill-outline-color': '#000',
      'fill-opacity': 0.1
    }
  },
  // polygon outline
  {
    id: 'gl-draw-polygon-stroke-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#000',
      'line-width': 3
    }
  }];
});
define('labs-zola/layers/drawn-feature', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    line: {
      id: 'drawn-feature-line',
      type: 'line',
      source: 'drawn-feature',
      paint: {
        'line-color': 'rgba(62, 35, 234, 1)',
        'line-opacity': 0.7,
        'line-width': 2,
        'line-dasharray': [5, 2]
      }
    },
    fill: {
      id: 'drawn-feature-fill',
      type: 'fill',
      source: 'drawn-feature',
      paint: {
        'fill-opacity': 0.1,
        'fill-color': 'rgba(84, 68, 210, 1)'
      },
      layout: {}
    }
  };
});
define('labs-zola/layers/highlighted-lot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'highlighted-lot',
    type: 'fill',
    source: 'highlighted-lot',
    paint: {
      'fill-opacity': 0.4,
      'fill-color': '#999999'
    }
  };
});
define('labs-zola/layers/point-layer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'cd-circle',
    type: 'circle',
    source: 'currentAddress',
    paint: {
      'circle-radius': 8,
      'circle-color': '#00A1F9',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#FFFFFF'
    }
  };
});
define('labs-zola/layers/selected-lot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var selectedLayers = {
    fill: {
      id: 'selected-fill',
      type: 'fill',
      source: 'selected-lot',
      paint: {
        'fill-opacity': 0.6,
        'fill-color': 'rgba(0, 20, 130, 1)'
      }
    },
    line: {
      id: 'selected-line',
      type: 'line',
      source: 'selected-lot',
      layout: {
        'line-cap': 'round'
      },
      paint: {
        'line-opacity': 0.9,
        'line-color': 'rgba(0, 10, 90, 1)',
        'line-width': {
          stops: [[13, 1.5], [15, 8]]
        },
        'line-dasharray': [2, 1.5]
      }
    }
  };

  exports.default = selectedLayers;
});
define('labs-zola/mixins/adapter-fetch', ['exports', 'ember-fetch/mixins/adapter-fetch'], function (exports, _adapterFetch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _adapterFetch.default;
    }
  });
});
define('labs-zola/mixins/bookmarkable', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin;
  exports.default = Mixin.create({
    actions: {
      createBookmark: function createBookmark() {
        var bookmark = this.get('model.value');
        this.store.createRecord('bookmark', { bookmark: bookmark }).save();
      }
    }
  });
});
define('labs-zola/mixins/geometric', ['exports', 'ember-decorators/object', 'npm:@turf/bbox', 'ember-data'], function (exports, _object, _bbox, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var Mixin = Ember.Mixin;
  exports.default = Mixin.create((_dec = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),

    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'bounds', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/mixins/query-param-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin;
  var alias = Ember.computed.alias;
  exports.default = Mixin.create({
    init: function init() {
      this._super.apply(this, arguments);

      var qps = this.get('qps');
      var queryParam = this.get('query-param');
      var queryParamBoundKey = this.get('queryParamBoundKey');

      if (qps) {
        this.set(queryParamBoundKey, alias('qps.' + queryParam));
      }
    }
  });
});
define('labs-zola/mixins/track-page', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var service = Ember.inject.service;
  var Mixin = Ember.Mixin;
  var get = Ember.get;
  var scheduleOnce = Ember.run.scheduleOnce;
  exports.default = Mixin.create({
    metrics: service(),

    didTransition: function didTransition() {
      this._super.apply(this, arguments);
      this._trackPage();
    },
    _trackPage: function _trackPage() {
      var _this = this;

      scheduleOnce('afterRender', this, function () {
        var page = _this.get('url');
        var title = _this.getWithDefault('currentRouteName', 'unknown');
        get(_this, 'metrics').trackPage({ page: page, title: title });
      });
    }
  });
});
define('labs-zola/mixins/update-selection', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin;
  exports.default = Mixin.create({
    afterModel: function afterModel(_ref) {
      var taskInstance = _ref.taskInstance;

      this.get('setSelectedTask').perform(taskInstance);
    },


    setSelectedTask: (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(taskInstance) {
      var model;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return taskInstance;

            case 2:
              model = _context.sent;

              this.set('mainMap.selected', model);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable().cancelOn('deactivate')
  });
});
define('labs-zola/models/bookmark', ['exports', 'ember-data', 'ember-decorators/object'], function (exports, _emberData, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  var PromiseObject = _emberData.default.PromiseObject;
  exports.default = _emberData.default.Model.extend((_dec = (0, _object.computed)('bookmark'), (_obj = {
    bookmark: _emberData.default.belongsTo('bookmark', { inverse: 'bookmark' }),

    address: _emberData.default.attr('string'),
    coordinates: _emberData.default.attr(),

    recordType: function recordType(bookmark) {
      return PromiseObject.create({
        promise: bookmark.then(function (bmark) {
          if (bmark) {
            return bmark.get('constructor.modelName');
          }

          return 'address';
        })
      });
    }
  }, (_applyDecoratedDescriptor(_obj, 'recordType', [_dec], Object.getOwnPropertyDescriptor(_obj, 'recordType'), _obj)), _obj)));
});
define('labs-zola/models/commercial-overlay', ['exports', 'ember-data', 'ember-decorators/object', 'npm:@turf/bbox', 'labs-zola/models/bookmark'], function (exports, _emberData, _object, _bbox, _bookmark) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = _bookmark.default.extend((_dec = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),
    overlay: _emberData.default.attr('string'),

    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'bounds', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/models/lot', ['exports', 'ember-data', 'labs-zola/models/bookmark', 'labs-zola/mixins/geometric'], function (exports, _emberData, _bookmark, _geometric) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LotColumnsSQL = undefined;
  var computed = Ember.computed;
  var alias = Ember.computed.alias;


  // columns requested from server
  // update to add more
  // 'firm_flag'
  // 'pfirm15'

  var LotColumnsSQL = ['address', 'bbl', 'bldgarea', 'resarea', 'officearea', 'retailarea', 'comarea', 'garagearea', 'strgearea', 'factryarea', 'otherarea', 'areasource', 'builtfar', 'residfar', 'commfar', 'facilfar', 'bldgclass', 'block', 'borough', 'cd', 'condono', 'council', 'xcoord', 'ycoord', 'plutomapid', 'sanborn', 'taxmap', 'appbbl', 'appdate', 'proxcode', 'edesignum', 'firecomp', 'healthcent', 'healtharea', 'histdist', 'landmark', 'ct2010', 'tract2010', 'cb2010', 'assessland', 'assesstot', 'exemptland', 'exempttot', 'easements', 'irrlotcode', 'lottype', 'landuse', 'lot', 'lotarea', 'lotdepth', 'lotfront', 'numbldgs', 'numfloors', 'ownername', 'ownertype', 'overlay1', 'overlay2', 'policeprct', 'sanitboro', 'sanitdistr', 'sanitsub', 'schooldist', 'spdist1', 'spdist2', 'spdist3', 'ltdheight', 'splitzone', 'unitsres', 'unitstotal', 'bldgfront', 'bldgdepth', 'ext', 'bsmtcode', 'yearbuilt', 'yearalter1', 'yearalter2', 'zipcode', 'zonedist1', 'zonedist2', 'zonedist3', 'zonedist4', 'zonemap', 'zmcode'];

  var SplitZoneDes = {
    N: 'Lot is not split',
    Y: 'Lot is split'
  };

  var LotTypeDes = {
    0: 'Mixed or Unknown',
    1: 'Block Assemblage',
    2: 'Waterfront',
    3: 'Corner',
    4: 'Through',
    5: 'Inside',
    6: 'Interior Lot',
    7: 'Island Lot',
    8: 'Alley Lot',
    9: 'Submerged Land Lot'
  };

  var BsmtCodeDes = {
    0: 'None/No Basement',
    1: 'Full Basement that is Above Grade',
    2: 'Full Basement that is Below Grade',
    3: 'Partial Basement that is Above Grade',
    4: 'Partial Basement that is Below Grade',
    5: 'Unknown'
  };

  var bldgclassLookup = {
    A0: 'One Family Dwellings - Cape Cod',
    A1: 'One Family Dwellings - Two Stories Detached (Small or Moderate Size, With or Without Attic)',
    A2: 'One Family Dwellings - One Story (Permanent Living Quarters)',
    A3: 'One Family Dwellings - Large Suburban Residence',
    A4: 'One Family Dwellings - City Residence',
    A5: 'One Family Dwellings - Attached or Semi-Detached',
    A6: 'One Family Dwellings - Summer Cottages',
    A7: 'One Family Dwellings - Mansion Type or Town House',
    A8: 'One Family Dwellings - Bungalow Colony/Land Coop Owned',
    A9: 'One Family Dwellings - Miscellaneous',

    B1: 'Two Family Dwellings - Brick',
    B2: 'Frame',
    B3: 'Converted From One Family',
    B9: 'Miscellaneous',

    C0: 'Walk-up Apartments - Three Families',
    C1: 'Walk-up Apartments - Over Six Families Without Stores',
    C2: 'Walk-up Apartments - Five to Six Families',
    C3: 'Walk-up Apartments - Four Families',
    C4: 'Walk-up Apartments - Old Law Tenements',
    C5: 'Walk-up Apartments - Converted Dwelling or Rooming House',
    C6: 'Walk-up Apartments - Cooperative',
    C7: 'Walk-up Apartments - Over Six Families With Stores',
    C8: 'Walk-up Apartments - Co-Op Conversion From Loft/Warehouse',
    C9: 'Walk-up Apartments - Garden Apartments',
    CM: 'Mobile Homes/Trailer Parks',

    D0: 'Elevator Apartments - Co-op Conversion from Loft/Warehouse',
    D1: 'Elevator Apartments - Semi-fireproof (Without Stores)',
    D2: 'Elevator Apartments - Artists in Residence',
    D3: 'Elevator Apartments - Fireproof (Without Stores)',
    D4: 'Elevator Apartments - Cooperatives (Other Than Condominiums)',
    D5: 'Elevator Apartments - Converted',
    D6: 'Elevator Apartments - Fireproof With Stores',
    D7: 'Elevator Apartments - Semi-Fireproof With Stores',
    D8: 'Elevator Apartments - Luxury Type',
    D9: 'Elevator Apartments - Miscellaneous',

    E1: 'Warehouses - Fireproof',
    E2: 'Warehouses - Contractor’s Warehouse',
    E3: 'Warehouses - Semi-Fireproof',
    E4: 'Warehouses - Frame, Metal',
    E7: 'Warehouses - Warehouse, Self Storage',
    E9: 'Warehouses - Miscellaneous',

    F1: 'Factory and Industrial Buildings - Heavy Manufacturing - Fireproof',
    F2: 'Factory and Industrial Buildings - Special Construction - Fireproof',
    F4: 'Factory and Industrial Buildings - Semi-Fireproof',
    F5: 'Factory and Industrial Buildings - Light Manufacturing',
    F8: 'Factory and Industrial Buildings - Tank Farms',
    F9: 'Factory and Industrial Buildings - Miscellaneous',

    G: 'GARAGES AND GASOLINE STATIONS',
    0: 'Residential Tax Class 1 Garage',
    1: 'All Parking Garages',
    2: 'Auto Body/Collision or Auto Repair',
    3: 'Gas Station with Retail Store',
    4: 'Gas Station with Service/Auto Repair',
    5: 'Gas Station only with/without Small Kiosk',
    6: 'Licensed Parking Lot',
    7: 'Unlicensed Parking Lot',
    8: 'Car Sales/Rental with Showroom',
    9: 'Miscellaneous Garage or Gas Station',
    U: 'Car Sales/Rental without Showroom',
    W: 'Car Wash or Lubritorium Facility',

    H1: 'Hotels - Luxury Type',
    H2: 'Hotels - Full Service Hotel',
    H3: 'Hotels - Limited Service – Many Affiliated with National Chain',
    H4: 'Hotels - Motels',
    H5: 'Hotels - Private Club, Luxury Type',
    H6: 'Hotels - Apartment Hotels',
    H7: 'Hotels - Apartment Hotels-Co-op Owned',
    H8: 'Hotels - Dormitories',
    H9: 'Hotels - Miscellaneous',
    HB: 'Hotels - Boutique 10-100 Rooms, with Luxury Facilities, Themed, Stylish, with Full Service Accommodations',
    HH: 'Hotels - Hostel-Bed Rental in Dorm Like Setting with Shared Rooms & Bathrooms',
    HR: 'Hotels - SRO- 1 or 2 People Housed in Individual Rooms in Multiple Dwelling Affordable Housing',
    HS: 'Hotels - Extended Stay/Suite Amenities Similar to Apt., Typically Charge Weekly Rates & Less Expensive than Full Service Hotel',

    I1: 'Hospitals and Health - Hospitals, Sanitariums, Mental Institutions',
    I2: 'Hospitals and Health - Infirmary',
    I3: 'Hospitals and Health - Dispensary',
    I4: 'Hospitals and Health - Staff Facilities',
    I5: 'Hospitals and Health - Health Center, Child Center, Clinic',
    I6: 'Hospitals and Health - Nursing Home',
    I7: 'Hospitals and Health - Adult Care Facility',
    I9: 'Hospitals and Health - Miscellaneous',

    J1: 'Theatres - Art Type (Seating Capacity under 400 Seats)',
    J2: 'Theatres - Art Type (Seating Capacity Over 400 Seats)',
    J3: 'Theatres - Motion Picture Theatre with Balcony',
    J4: 'Theatres - Legitimate Theatres (Theatre Sole Use of Building)',
    J5: 'Theatres - Theatre in Mixed Use Building',
    J6: 'Theatres - T.V. Studios',
    J7: 'Theatres - Off-Broadway Type',
    J8: 'Theatres - Multiplex Picture Theatre',
    J9: 'Theatres - Miscellaneous',

    K1: 'Store Buildings (Taxpayers Included) - One Story Retail Building',
    K2: 'Store Buildings (Taxpayers Included) - Multi-Story Retail Building',
    K3: 'Store Buildings (Taxpayers Included) - Multi-Story Department Store',
    K4: 'Store Buildings (Taxpayers Included) - Predominant Retail with Other Uses',
    K5: 'Store Buildings (Taxpayers Included) - Stand Alone Food Establishment',
    K6: 'Store Buildings (Taxpayers Included) - Shopping Centers With or Without Parking',
    K7: 'Store Buildings (Taxpayers Included) - Banking Facilities with or Without Parking',
    K8: 'Store Buildings (Taxpayers Included) - Big Box Retail Not Affixed & Standing On Own Lot with Parking',
    K9: 'Store Buildings (Taxpayers Included) - Miscellaneous',

    L1: 'Loft Buildinghs - Over Eight Stores (Mid-Manhattan Type)',
    L2: 'Loft Buildinghs - Fireproof and Storage Type (Without Stores)',
    L3: 'Loft Buildinghs - Semi-Fireproof',
    L8: 'Loft Buildinghs - With Retail Stores Other Than Type 1',
    L9: 'Loft Buildinghs - Miscellaneous',

    M1: 'Churches, Synagogues, etc. - Church, Synagogue, Chapel',
    M2: 'Churches, Synagogues, etc. - Mission House (Non-Residential)',
    M3: 'Churches, Synagogues, etc. - Parsonage, Rectory',
    M4: 'Churches, Synagogues, etc. - Convents',
    M9: 'Churches, Synagogues, etc. - Miscellaneous',

    N1: 'Asylums and Homes - Asylums',
    N2: 'Asylums and Homes - Homes for Indigent Children, Aged, Homeless',
    N3: 'Asylums and Homes - Orphanages',
    N4: 'Asylums and Homes - Detention House For Wayward Girls',
    N9: 'Asylums and Homes - Miscellaneous',

    O1: 'Office Buildings - Office Only – 1 Story',
    O2: 'Office Buildings - Office Only – 2-6 Stories',
    O3: 'Office Buildings - Office Only – 7-19 Stories',
    O4: 'Office Buildings - Office Only or Office with Comm – 20 Stories or More',
    O5: 'Office Buildings - Office with Comm – 1 to 6 Stories',
    O6: 'Office Buildings - Office with Comm – 7 to 19 Stories',
    O7: 'Office Buildings - Professional Buildings/Stand Alone Funeral Homes',
    O8: 'Office Buildings - Office with Apartments Only (No Comm)',
    O9: 'Office Buildings - Miscellaneous and Old Style Bank Bldgs',

    P1: 'Places of Public Assembly (indoor) and Cultural - Concert Halls',
    P2: 'Places of Public Assembly (indoor) and Cultural - Lodge Rooms',
    P3: 'Places of Public Assembly (indoor) and Cultural - YWCA, YMCA, YWHA, YMHA, PAL',
    P4: 'Places of Public Assembly (indoor) and Cultural - Beach Club',
    P5: 'Places of Public Assembly (indoor) and Cultural - Community Center',
    P6: 'Places of Public Assembly (indoor) and Cultural - Amusement Place, Bathhouse, Boat House',
    P7: 'Places of Public Assembly (indoor) and Cultural - Museum',
    P8: 'Places of Public Assembly (indoor) and Cultural - Library',
    P9: 'Places of Public Assembly (indoor) and Cultural - Miscellaneous',

    Q0: 'Outdoor Recreation Facilities - Open Space',
    Q1: 'Outdoor Recreation Facilities - Parks/Recreation Facilities',
    Q2: 'Outdoor Recreation Facilities - Playground',
    Q3: 'Outdoor Recreation Facilities - Outdoor Pool',
    Q4: 'Outdoor Recreation Facilities - Beach',
    Q5: 'Outdoor Recreation Facilities - Golf Course',
    Q6: 'Outdoor Recreation Facilities - Stadium, Race Track, Baseball Field',
    Q7: 'Outdoor Recreation Facilities - Tennis Court',
    Q8: 'Outdoor Recreation Facilities - Marina, Yacht Club',
    Q9: 'Outdoor Recreation Facilities - Miscellaneous',

    R0: 'Condominiums - Condo Billing Lot',
    R1: 'Condominiums - Residential Unit in 2-10 Unit Bldg',
    R2: 'Condominiums - Residential Unit in Walk-Up Bldg',
    R3: 'Condominiums - Residential Unit in 1-3 Story Bldg',
    R4: 'Condominiums - Residential Unit in Elevator Bldg',
    R5: 'Condominiums - Miscellaneous Commercial',
    R6: 'Condominiums - Residential Unit of 1-3 Unit Bldg-Orig Class 1',
    R7: 'Condominiums - Commercial Unit of 1-3 Units Bldg- Orig Class 1',
    R8: 'Condominiums - Commercial Unit of 2-10 Unit Bldg',
    R9: 'Condominiums - Co-op within a Condominium',
    RA: 'Condominiums - Cultural, Medical, Educational, etc.',
    RB: 'Condominiums - Office Space',
    RC: 'Condominiums - Commercial Building (Mixed Commercial Condo Building Classification Codes)',
    RD: 'Condominiums - Residential Building (Mixed Residential Condo Building Classification Codes)',
    RG: 'Condominiums - Indoor Parking',
    RH: 'Condominiums - Hotel/Boatel',
    RI: 'Condominiums - Mixed Warehouse/Factory/Industrial & Commercial',
    RK: 'Condominiums - Retail Space',
    RM: 'Condominiums - Mixed Residential & Commercial Building (Mixed Residential & Commercial)',
    RP: 'Condominiums - Outdoor Parking',
    RR: 'Condominiums - Condominium Rentals',
    RS: 'Condominiums - Non-Business Storage Space',
    RT: 'Condominiums - Terraces/Gardens/Cabanas',
    RW: 'Condominiums - Warehouse/Factory/Industrial',
    RX: 'Condominiums - Mixed Residential, Commercial & Industrial',
    RZ: 'Condominiums - Mixed Residential & Warehouse',

    S0: 'Residence (Multiple Use) - Primarily One Family with Two Stores or Offices',
    S1: 'Residence (Multiple Use) - Primarily One Family with One Store or Office',
    S2: 'Residence (Multiple Use) - Primarily Two Family with One Store or Office',
    S3: 'Residence (Multiple Use) - Primarily Three Family with One Store or Office',
    S4: 'Residence (Multiple Use) - Primarily Four Family with One Store or Office',
    S5: 'Residence (Multiple Use) - Primarily Five to Six Family with One Store or Office',
    S9: 'Residence (Multiple Use) - Single or Multiple Dwelling with Stores or Offices',

    T1: 'Transportation Facilities (Assessed in ORE) - Airport, Air Field, Terminal',
    T2: 'Transportation Facilities (Assessed in ORE) - Pier, Dock, Bulkhead',
    T9: 'Transportation Facilities (Assessed in ORE) - Miscellaneous',

    U0: 'Utility Bureau Properties - Utility Company Land and Building',
    U1: 'Utility Bureau Properties - Bridge, Tunnel, Highway',
    U2: 'Utility Bureau Properties - Gas or Electric Utility',
    U3: 'Utility Bureau Properties - Ceiling Railroad',
    U4: 'Utility Bureau Properties - Telephone Utility',
    U5: 'Utility Bureau Properties - Communications Facilities Other Than Telephone',
    U6: 'Utility Bureau Properties - Railroad - Private Ownership',
    U7: 'Utility Bureau Properties - Transportation - Public Ownership',
    U8: 'Utility Bureau Properties - Revocable Consent',
    U9: 'Utility Bureau Properties - Miscellaneous',

    V0: 'Vacant Land - Zoned Residential; Not Manhattan',
    V1: 'Vacant Land - Zoned Commercial or Manhattan Residential',
    V2: 'Vacant Land - Zoned Commercial Adjacent to Class 1 Dwelling; Not Manhattan',
    V3: 'Vacant Land - Zoned Primarily Residential; Not Manhattan',
    V4: 'Vacant Land - Police or Fire Department',
    V5: 'Vacant Land - School Site or Yard',
    V6: 'Vacant Land - Library, Hospital or Museum',
    V7: 'Vacant Land - Port Authority of NY and NJ',
    V8: 'Vacant Land - New York State & U.S. Government',
    V9: 'Vacant Land - Miscellaneous',

    W1: 'Educational Structures - Public Elementary, Junior or Senior High',
    W2: 'Educational Structures - Parochial School, Yeshiva',
    W3: 'Educational Structures - School or Academy',
    W4: 'Educational Structures - Training School',
    W5: 'Educational Structures - City University',
    W6: 'Educational Structures - Other College and University',
    W7: 'Educational Structures - Theological Seminary',
    W8: 'Educational Structures - Other Private School',
    W9: 'Educational Structures - Miscellaneous',

    Y1: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Fire Department',
    Y2: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Police Department',
    Y3: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Prison, Jail, House of Detention',
    Y4: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Military and Naval Installation',
    Y5: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Real Estate',
    Y6: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Sanitation',
    Y7: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Ports and Terminals',
    Y8: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Public Works',
    Y9: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Environmental Protection',

    Z0: 'Miscellaneous - Tennis Court, Pool, Shed, etc.',
    Z1: 'Miscellaneous - Court House',
    Z2: 'Miscellaneous - Public Parking Area',
    Z3: 'Miscellaneous - Post Office',
    Z4: 'Miscellaneous - Foreign Government',
    Z5: 'Miscellaneous - United Nations',
    Z7: 'Miscellaneous - Easement',
    Z8: 'Miscellaneous - Cemetery',
    Z9: 'Miscellaneous - Other'
  };

  var SpDist = {
    125: '125th Street District',
    BPC: 'Battery Park City District',
    BR: 'Bay Ridge District',
    CD: 'City Island District',
    CI: 'Coney Island',
    CL: 'Clinton District',
    CP: 'College Point',
    CO: 'Coney Island Mixed Use District',
    DB: 'Downtown Brooklyn District',
    DJ: 'Downtown Jamaica',
    FH: 'Forest Hills District',
    GC: 'Garment Center District',
    C: 'Grand Concourse Preservation District',
    HS: 'Hillsides Preservation District',
    HSQ: 'Hudson Square District',
    HRP: 'Hudson River Park',
    HY: 'Hudson Yards District',
    HP: 'Hunts Point Special District',
    HRW: 'Harlem River Waterfront District',
    LC: 'Limited Commercial District',
    L: 'Lincoln Square District',
    LI: 'Little Italy District',
    LIC: 'Long Island City Mixed Use District',
    LM: 'Lower Manhattan District',
    MP: 'Madison Avenue Preservation District',
    MID: 'Midtown District',
    MMU: 'Manhattanville Mixed Use District',
    OP: 'Ocean Parkway District',
    PI: 'Park Improvement District',
    PC: 'Planned Community Preservation District',
    SB: 'Sheepshead Bay District',
    SHP: 'Southern Hunters Point District',
    SG: 'St. George District',
    SRD: 'South Richmond Development District',
    SRI: 'Southern Roosevelt Island District',
    TA: 'Transit Land Use District',
    TMU: 'Tribeca Mixed Use District',
    US: 'Union Square District',
    U: 'United Nations Development District',
    WCH: 'West Chelsea',
    WP: 'Willets Point District',

    'CR-1': 'Special Coastal Risk District 1 Broad Channel at Queens',
    'CR-2': 'Special Coastal Risk District 2 Hamilton Beach at Queens',
    'CR-3': 'Special Coastal Risk District 3 Buyout Areas at Staten Island',
    'EC-1': 'Enhanced Commercial District 1 (Fourth Avenue, BK)',
    'EC-2': 'Enhanced Commercial District 2 (Columbus and Amsterdam Avenue)',
    'EC-3': 'Enhanced Commercial District 3 (Broadway, MN)',
    'EC-4': 'Enhanced Commercial District 4 (Bedford Stuyvesant)',
    'EC-5': 'Enhanced Commercial District 5 (BK)',
    'EC-6': 'Enhanced Commercial District 6 (BK)',
    'MX-1': 'Mixed Use District-1 Port Morris (BX)',
    'MX-2': 'Mixed Use District-2 Dumbo (BK)',
    'MX-4': 'Mixed Use District-4 Flushing/Bedford (BK)',
    'MX-5': 'Mixed Use District-5 Red Hook (BK)',
    'MX-6': 'Mixed Use District-6 Hudson Square (MN)',
    'MX-7': 'Mixed Use District-7 Morrisania (BX)',
    'MX-8': 'Mixed Use District-8 Greenpoint Williamsburg(BK)',
    'MX-9': 'Mixed Use District-9 Northern Hunters Point Waterfront (QN)',
    'MX-10': 'Mixed Use District-10 Atlantic and Howard Avenues (BK)',
    'MX-11': 'Mixed Use District - 11 Gowanus (BK)',
    'MX-12': 'Mixed Use District-12 Borough Park (BK)',
    'MX-13': 'Mixed Use District-13 Lower Concourse (BX)',
    'MX-14': 'Mixed Use District-14 Third Avenue /Tremont Avenue (BX)',
    'MX-15': 'Mixed Use District - 15 West Harlem (MN)',
    'MX-16': 'Mixed Use District - 16 Ocean Hill/East New York (BK)',
    'NA-1': 'Natural Area District-1',
    'NA-2': 'Natural Area District-2',
    'NA-3': 'Natural Area District-3',
    'NA-4': 'Natural Area District-4',
    'SV-1': 'Scenic View District'
  };

  var boroughLookup = {
    BX: 'Bronx',
    BK: 'Brooklyn',
    MN: 'Manhattan',
    QN: 'Queens',
    SI: 'Staten Island'
  };

  var boroLookup = {
    1: 'Manhattan',
    2: 'Bronx',
    3: 'Brooklyn',
    4: 'Queens',
    5: 'Staten Island'
  };

  var ownertypeLookup = {
    C: 'City',
    M: 'Mixed City & Private',
    O: 'Public Authority, State, or Federal',
    P: 'Private',
    X: 'Mixed'
  };

  var landuseLookup = {
    '01': 'One & Two Family Buildings',
    '02': 'Multi-Family Walk-Up Buildings',
    '03': 'Multi-Family Elevator Buildings',
    '04': 'Mixed Residential & Commercial Buildings',
    '05': 'Commercial & Office Buildings',
    '06': 'Industrial & Manufacturing',
    '07': 'Transportation & Utility',
    '08': 'Public Facilities & Institutions',
    '09': 'Open Space & Outdoor Recreation',
    10: 'Parking Facilities',
    11: 'Vacant Land'
  };

  var HealthInfoDes = {
    1: 'Manhattan',
    2: 'Bronx',
    3: 'Queens',
    4: 'Brooklyn',
    5: 'Staten Island'
  };

  var AreaSourceDes = {
    0: 'Not Available',
    2: "Department of Finance's RPAD File",
    3: 'One or more Building Dimensions are non-numeric. Total Building Floor Area is 0',
    4: "Building Class is 'V' and Number of Buildings is 0. Total Building Floor Area is 0",
    5: 'Total Building Floor Area is calculated from RPAD Building Dimensions and Number of Stories for largest building only',
    6: 'Unknown',
    7: "Department of Finance's Mass Appraisal System",
    9: 'User'
  };

  var PlutoMapDes = {
    1: 'In PLUTO Data File and DOF Modified DTM Tax Block and Lot Clipped to the Shoreline File',
    2: 'In PLUTO Data File Only',
    3: 'In DOF Modified DTM Tax Block and Lot Clipped to the Shoreline File but NOT in PLUTO',
    4: 'In PLUTO Data File and in DOF Modified DTM File but NOT in DOF Modified DTM Tax Block and Lot Clipped to the Shoreline File, therefore the tax lot is totally under water',
    5: 'In PLUTO Data File and in DOF Modified DTM File but NOT in DOF Modified DTM Tax Block and Lot Clipped to the Shoreline File, therefore the tax lot is totally under water'
  };

  var ProxCodeDes = {
    0: 'Not Available',
    1: 'Detatched',
    2: 'Semi-Attached',
    3: 'Attached'
  };

  var IrrlotCodeDes = {
    N: 'Not a Irregularly Shaped Lot',
    Y: 'Irregularly Shaped Lot'
  };

  var LtdHeightDes = {
    'LH-1': 'Limited Height District No. 1',
    'LH-1A': 'Limited Height District No. 1A',
    'LH-2': 'Limited Height District No. 2',
    'LH-3': 'Limited Height District No. 3'
  };

  exports.default = _bookmark.default.extend(_geometric.default, {
    address: _emberData.default.attr('string'),
    bbl: _emberData.default.attr('number'),
    bldgarea: _emberData.default.attr('number'),
    resarea: _emberData.default.attr('number'),
    officearea: _emberData.default.attr('number'),
    retailarea: _emberData.default.attr('number'),
    comarea: _emberData.default.attr('number'),
    garagearea: _emberData.default.attr('number'),
    strgearea: _emberData.default.attr('number'),
    factryarea: _emberData.default.attr('number'),
    otherarea: _emberData.default.attr('number'),
    areasource: _emberData.default.attr('string'),
    areasourcedes: computed('areasource', function () {
      return AreaSourceDes[this.get('areasource')];
    }),
    builtfar: _emberData.default.attr('number'),
    residfar: _emberData.default.attr('number'),
    commfar: _emberData.default.attr('number'),
    facilfar: _emberData.default.attr('number'),
    bldgclass: _emberData.default.attr('string'),
    bldgclassname: computed('bldgclass', function () {
      return bldgclassLookup[this.get('bldgclass')];
    }),
    lat: _emberData.default.attr('number'),
    lon: _emberData.default.attr('number'),
    block: _emberData.default.attr('number'),
    borocode: computed('cd', function () {
      var borocd = this.get('cd');
      return borocd.substring(0, 1);
    }),
    boro: alias('borocode'),
    borough: _emberData.default.attr('string'),
    boroname: computed('borough', function () {
      return boroughLookup[this.get('borough')];
    }),
    cd: _emberData.default.attr('string'),
    cdName: computed('cd', function () {
      var borocd = this.get('cd');
      var boro = borocd.substring(0, 1);
      var cd = parseInt(borocd.substring(1, 3), 10).toString();
      return boroLookup[boro] + ' Community District ' + cd;
    }),
    cdURLSegment: computed('cd', function () {
      var borocd = this.get('cd');
      var boro = borocd.substring(0, 1);
      var cleanBorough = boroLookup[boro].toLowerCase().replace(/\s/g, '-');
      var cd = parseInt(borocd.substring(1, 3), 10).toString();
      return cleanBorough + '/' + cd;
    }),
    condono: _emberData.default.attr('number'),
    council: _emberData.default.attr('string'),
    xcoord: _emberData.default.attr('number'),
    ycoord: _emberData.default.attr('number'),
    plutomapid: _emberData.default.attr('string'),
    plutomapdes: computed('plutomapid', function () {
      return PlutoMapDes[this.get('plutomapid')];
    }),
    sanborn: _emberData.default.attr('string'),
    taxmap: _emberData.default.attr('string'),
    appbbl: _emberData.default.attr('number'),
    appdate: _emberData.default.attr('string'),
    proxcode: _emberData.default.attr('string'),
    proxcodedes: computed('proxcode', function () {
      return ProxCodeDes[this.get('proxcode')];
    }),
    edesignum: _emberData.default.attr('string'),
    firecomp: _emberData.default.attr('string'),
    histdist: _emberData.default.attr('string'),
    landmark: _emberData.default.attr('string'),
    landuse: _emberData.default.attr('string'),
    landusename: computed('landuse', function () {
      return landuseLookup[this.get('landuse')];
    }),
    lot: _emberData.default.attr('number'),
    lotarea: _emberData.default.attr('number'),
    lotdepth: _emberData.default.attr('number'),
    lotfront: _emberData.default.attr('number'),
    numbldgs: _emberData.default.attr('number'),
    numfloors: _emberData.default.attr('number'),
    ownername: _emberData.default.attr('string'),
    ownertype: _emberData.default.attr('string'),
    ownertypename: computed('ownertype', function () {
      return ownertypeLookup[this.get('ownertype')];
    }),
    ct2010: _emberData.default.attr('string'),
    tract2010: _emberData.default.attr('string'),
    cb2010: _emberData.default.attr('string'),
    assessland: _emberData.default.attr('number'),
    assesstot: _emberData.default.attr('number'),
    exemptland: _emberData.default.attr('number'),
    exempttot: _emberData.default.attr('number'),
    easements: _emberData.default.attr('number'),
    irrlotcode: _emberData.default.attr('string'),
    irrlotcodedes: computed('irrlotcode', function () {
      return IrrlotCodeDes[this.get('irrlotcode')];
    }),
    healthcent: _emberData.default.attr('number'),
    healthcentdist: computed('healthcent', function () {
      var hc = this.get('healthcent');
      if (hc >= 11 && hc <= 17) {
        return HealthInfoDes['1'];
      } else if (hc >= 21 && hc <= 26) {
        return HealthInfoDes['2'];
      } else if (hc >= 30 && hc <= 39) {
        return HealthInfoDes['4'];
      } else if (hc >= 41 && hc <= 46) {
        return HealthInfoDes['3'];
      } else if (hc === 51) {
        return HealthInfoDes['5'];
      }
      return null;
    }),
    healtharea: _emberData.default.attr('number'),
    lottype: _emberData.default.attr('string'),
    lottypedes: computed('lottype', function () {
      return LotTypeDes[this.get('lottype')];
    }),
    overlay1: _emberData.default.attr('string'),
    overlay2: _emberData.default.attr('string'),
    policeprct: _emberData.default.attr('string'),
    sanitboro: _emberData.default.attr('string'),
    sanitborodist: computed('sanitboro', function () {
      return HealthInfoDes[this.get('sanitboro')];
    }),
    sanitdistr: _emberData.default.attr('string'),
    sanitsub: _emberData.default.attr('number'),
    schooldist: _emberData.default.attr('string'),
    schooldistdes: computed('schooldist', function () {
      var sd = this.get('schooldist');
      var result = ' School District';
      if (sd >= 1 && sd <= 6 || sd === 10) {
        result = HealthInfoDes['1'] + result;
      } else if (sd >= 7 && sd <= 12) {
        result = HealthInfoDes['2'] + result;
      } else if (sd >= 13 && sd <= 23 || sd === 32) {
        result = HealthInfoDes['3'] + result;
      } else if (sd >= 24 && sd <= 30) {
        result = HealthInfoDes['4'] + result;
      } else if (sd === 31) {
        result = HealthInfoDes['5'] + result;
      }
      return result;
    }),
    spdist1: _emberData.default.attr('string'),
    spdistdes1: computed('spdist1', function () {
      return SpDist[this.get('spdist1')];
    }),
    spdist2: _emberData.default.attr('string'),
    spdistdes2: computed('spdist2', function () {
      return SpDist[this.get('spdist2')];
    }),
    spdist3: _emberData.default.attr('string'),
    spdistdes3: computed('spdist3', function () {
      return SpDist[this.get('spdist3')];
    }),
    ltdheight: _emberData.default.attr('string'),
    ltdheightdes: computed('ltdheight', function () {
      return LtdHeightDes[this.get('ltdheight')];
    }),
    splitzone: _emberData.default.attr('string'),
    splitzonedes: computed('splitzone', function () {
      return SplitZoneDes[this.get('splitzone')];
    }),
    unitsres: _emberData.default.attr('number'),
    unitstotal: _emberData.default.attr('number'),
    bldgfront: _emberData.default.attr('number'),
    bldgdepth: _emberData.default.attr('number'),
    ext: _emberData.default.attr('string'),
    bsmtcode: _emberData.default.attr('string'),
    bsmtcodedes: computed('bsmtcode', function () {
      return BsmtCodeDes[this.get('bsmtcode')];
    }),
    yearbuilt: _emberData.default.attr('number'),
    yearalter1: _emberData.default.attr('number'),
    yearalter2: _emberData.default.attr('number'),
    zipcode: _emberData.default.attr('number'),
    zonedist1: _emberData.default.attr('string'),
    zonedist2: _emberData.default.attr('string'),
    zonedist3: _emberData.default.attr('string'),
    zonedist4: _emberData.default.attr('string'),
    zonemap: _emberData.default.attr('string'),
    zmcode: _emberData.default.attr('string')
  });
  exports.LotColumnsSQL = LotColumnsSQL;
});
define('labs-zola/models/scraped-part', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    link_info: _emberData.default.attr('string'),
    cache_info: _emberData.default.attr('string')
  });
});
define('labs-zola/models/special-purpose-district', ['exports', 'ember-data', 'ember-decorators/object', 'npm:@turf/bbox', 'labs-zola/models/bookmark'], function (exports, _emberData, _object, _bbox, _bookmark) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = _bookmark.default.extend((_dec = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),
    sdlbl: _emberData.default.attr('string'),
    sdname: _emberData.default.attr('string'),

    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'bounds', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/models/special-purpose-subdistrict', ['exports', 'ember-data', 'ember-decorators/object', 'npm:@turf/bbox', 'labs-zola/models/bookmark'], function (exports, _emberData, _object, _bbox, _bookmark) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _desc, _value, _obj;

  exports.default = _bookmark.default.extend((_dec = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),
    splbl: _emberData.default.attr('string'),
    spname: _emberData.default.attr('string'),

    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'bounds', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/models/zma', ['exports', 'ember-data', 'ember-decorators/object', 'npm:@turf/bbox', 'moment', 'labs-zola/models/bookmark'], function (exports, _emberData, _object, _bbox, _moment, _bookmark) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _desc, _value, _obj;

  exports.default = _bookmark.default.extend((_dec = (0, _object.computed)('effective'), _dec2 = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),
    ulurpno: _emberData.default.attr('string'),
    project_na: _emberData.default.attr('string'),
    effective: _emberData.default.attr('string'),
    status: _emberData.default.attr('string'),
    lucats: _emberData.default.attr('string'),

    effectiveDisplay: function effectiveDisplay(effective) {
      if (effective) {
        return (0, _moment.default)(effective).utc().format('LL');
      }
      return 'To be determined';
    },
    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'effectiveDisplay', [_dec], Object.getOwnPropertyDescriptor(_obj, 'effectiveDisplay'), _obj), _applyDecoratedDescriptor(_obj, 'bounds', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/models/zoning-district', ['exports', 'ember-data', 'ember-decorators/object', 'npm:@turf/bbox'], function (exports, _emberData, _object, _bbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  var zoningDescriptions = {
    m1: 'M1 districts are designated for areas with light industries.',
    m2: 'M2 districts occupy the middle ground between light and heavy industrial areas.',
    m3: 'M3 districts are designated for areas with heavy industries that generate noise, traffic or pollutants.',
    c1: 'C1 districts are mapped along streets that serve local retail needs within residential neighborhoods.',
    c2: 'C2 districts are mapped along streets that serve local retail needs within residential neighborhoods.',
    c3: 'C3 districts permit waterfront recreational activities, primarily boating and fishing, in areas along the waterfront.',
    c4: 'C4 districts are mapped in regional centers where larger stores, theaters and office uses serve a wider region and generate more traffic than neighborhood shopping areas.',
    c5: 'C5 districts are intended for commercial areas that require central locations or serve the entire metropolitan region.',
    c6: 'C6 districts are intended for commercial areas that require central locations or serve the entire metropolitan region.',
    c7: 'C7 districts are specifically designated for large open amusement parks.',
    c8: 'C8 districts, bridging commercial and manufacturing uses, provide for automotive and other heavy commercial services that often require large amounts of land.',
    p: 'A public park is any park, playground, beach, parkway, or roadway within the jurisdiction and control of the New York City Commissioner of Parks & Recreation. Typically, public parks are not subject to zoning regulations.',
    r1: 'R1 districts are leafy, low-density neighborhoods of large, single-family detached homes on spacious lots.',
    r2: 'Residential development in R2 districts is limited exclusively to single-family detached houses.',
    r2a: 'R2A is a contextual district intended to preserve low-rise neighborhoods characterized by single-family detached homes on lots with a minimum width of 40 feet',
    r2x: 'R2X districts allow large single-family detached houses on lots with a minimum width of 30 feet.',
    r31: 'R3-1 contextual districts are the lowest density districts that allow semi-detached one- and two-family residences, as well as detached homes',
    r32: 'R3-2 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
    r3a: 'Characteristic of many of the city’s older neighborhoods, R3A contextual districts feature modest single- and two-family detached residences on zoning lots as narrow as 25 feet in width.',
    r3x: 'R3X contextual districts, mapped extensively in lower-density neighborhoods permit only one- and two-family detached homes on lots that must be at least 35 feet wide.',
    r4: 'R4 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
    r41: 'R4-1 contextual districts permit only one- and two-family detached and semi-detached houses.',
    r4a: 'R4A contextual districts permit only one- and two-family detached residences characterized by houses with two stories and an attic beneath a pitched roof.',
    r4b: 'Primarily a contextual rowhouse district limited to low-rise, one- and two-family attached residences, R4B districts also permit detached and semi-detached buildings.',
    r5: 'R5 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
    r5a: 'R5A contextual districts permit only one- and two-family detached residences characterized by houses with two stories and an attic beneath a pitched roof.',
    r5b: 'Primarily a contextual rowhouse district limited to low-rise, one- and two-family attached residences, R4B districts also permit detached and semi-detached buildings.',
    r5d: 'R5D contextual districts are designed to encourage residential growth along major corridors in auto-dependent areas of the city.',
    r6: 'R6 zoning districts are widely mapped in built-up, medium-density areas of the city whose character can range from neighborhoods with a diverse mix of building types and heights to large-scale “tower in the park” developments.',
    r6a: 'R6A contextual districts produce high lot coverage, six- to eight-story apartment buildings set at or near the street line designed to be compatible with older buildings in medium-density neighborhoods.',
    r6b: 'R6B contextual districts are often traditional row house districts, which preserve the scale and harmonious streetscape of medium-density neighborhoods of four-story attached buildings developed during the 19th century.',
    r7: 'R7 zoning districts are medium-density apartment house districts that encourage lower apartment buildings on smaller lots and, on larger lots, taller buildings with less lot coverage.',
    r7a: 'R7A contextual districts produce high lot coverage, seven- to nine-story apartment buildings set at or near the street line designed to be compatible with older buildings in medium-density neighborhoods.',
    r7b: 'R7B contextual districts generally produce six- to seven-story apartment buildings in medium-density neighborhoods.',
    r7d: 'R7D contextual districts promote new medium-density contextual development along transit corridors that range between 10 and 11 stories.',
    r7x: 'R7X contextual districts are flexible medium-density districts that generally produce 12- to 14-story buildings.',
    r8: 'R8 zoning districts are high-density apartment house districts that encourage mid-rise apartment buildings on smaller lots and, on larger lots, taller buildings with less lot coverage.',
    r8a: 'R8A contextual districts are high-density districts designed to produce apartment buildings at heights of roughly twelve to fourteen stories.',
    r8b: 'R8B contextual districts are designed to preserve the character and scale of taller rowhouse neighborhoods.',
    r8x: 'R8X contextual districts are flexible high-density districts that generally produce 15- to 17-story buildings.',
    r9: 'R9 districts are high-density districts that permit a wide range of building types including towers.',
    r9a: 'R9A contextual districts are high-density districts designed to produce new buildings between 13 and 17 stories that mimics older, high street wall buildings in high-density neighborhoods.',
    r9d: 'R9D contextual districts are high-density districts that permit towers that sit on a contextual base.',
    r9x: 'R9X contextual districts are high-density districts designed to produce new buildings between 16 and 20 stories that mimics older, high street wall buildings in high-density neighborhoods.',
    r10: 'R10 districts are high-density districts that permit a wide range of building types including towers.',
    r10a: 'R10-A contextual districts are high-density districts designed to produce new buildings between 21 and 23 stories that mimics older, high street wall buildings in high-density neighborhoods.',
    r10x: 'R10X contextual districts are high-density districts that permit towers that sit on a contextual base.',
    bpc: 'The Special Battery Park City District (BPC) was created, in accordance with a master plan, to govern extensive residential and commercial development in an area on the Hudson River close to the business core of Lower Manhattan. The district regulates permitted uses and bulk within three specified areas and establishes special design controls with respect to front building walls, building heights, waterfront design and parking.'
  };

  var zoningAbbr = {
    R2A: 'r2a',
    R2X: 'r2x',
    'R3-1': 'r31',
    'R3-2': 'r32',
    R3A: 'r3a',
    R3X: 'r3x',
    'R4-1': 'r41',
    R4A: 'r4a',
    R4B: 'r4b',
    R5A: 'r5a',
    R5B: 'r5b',
    R5D: 'r5d',
    R6A: 'r6a',
    R6B: 'r6b',
    R7A: 'r7a',
    R7B: 'r7b',
    R7D: 'r7d',
    R7X: 'r7x',
    R8A: 'r8a',
    R8B: 'r8b',
    R8X: 'r8x',
    R9A: 'r9a',
    R9D: 'r9d', // R9D does not have a route
    R9X: 'r9x',
    R10A: 'r10a',
    R10X: 'r10x', // R10X does not have a route
    BPC: 'bpc'
  };

  exports.default = _emberData.default.Model.extend((_dec = (0, _object.computed)('id'), _dec2 = (0, _object.computed)('id'), _dec3 = (0, _object.computed)('zoneabbr'), _dec4 = (0, _object.computed)('geometry'), (_obj = {
    geometry: _emberData.default.attr(),

    primaryzone: function primaryzone(id) {
      // convert R6A to r6
      var primary = id.match(/\w\d*/)[0].toLowerCase();
      return primary;
    },
    zoneabbr: function zoneabbr(id) {
      var abbr = id.match(/\w\d*/)[0].toLowerCase();

      if (id in zoningAbbr) {
        return zoningAbbr[id];
      }

      return abbr;
    },
    description: function description(zoneabbr) {
      return zoningDescriptions[zoneabbr];
    },
    bounds: function bounds(geometry) {
      return (0, _bbox.default)(geometry);
    }
  }, (_applyDecoratedDescriptor(_obj, 'primaryzone', [_dec], Object.getOwnPropertyDescriptor(_obj, 'primaryzone'), _obj), _applyDecoratedDescriptor(_obj, 'zoneabbr', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'zoneabbr'), _obj), _applyDecoratedDescriptor(_obj, 'description', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'description'), _obj), _applyDecoratedDescriptor(_obj, 'bounds', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj)), _obj)));
});
define('labs-zola/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('labs-zola/router', ['exports', 'labs-zola/config/environment', 'labs-zola/mixins/track-page'], function (exports, _environment, _trackPage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend(_trackPage.default, {
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    // eslint-disable-line
    this.route('lot', { path: 'lot/:boro/:block/:lot' });
    this.route('zma', { path: 'zma/:ulurpno' });
    this.route('bbl', { path: 'bbl/:bbl' });
    this.route('zoning-district', { path: 'zoning-district/:zonedist' });
    this.route('special-purpose-district', { path: 'special-purpose-district/:id' });
    this.route('special-purpose-subdistricts', { path: 'special-purpose-subdistrict/:id' });
    this.route('commercial-overlay', { path: 'commercial-overlay/:id' });
    this.route('about');
    this.route('bookmarks');
    this.route('data');
    this.route('features');
  });

  exports.default = Router;
});
define('labs-zola/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('labs-zola/routes/application', ['exports', 'labs-zola/sources', 'labs-zola/utils/carto'], function (exports, _sources, _carto) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  var $ = Ember.$;
  var service = Ember.inject.service;
  var RSVP = Ember.RSVP;
  exports.default = Route.extend({
    mainMap: service(),

    beforeModel: function beforeModel(transition) {
      // only transition to about if index is loaded and there is no hash
      if (transition.intent.url === '/' && window.location.href.split('#').length < 2) {
        this.transitionTo('about');
      }
    },
    model: function model() {
      var cartoSourcePromises = Object.keys(_sources.default).filter(function (key) {
        return _sources.default[key].type === 'cartovector';
      }).map(function (key) {
        var source = _sources.default[key];
        var _source$minzoom = source.minzoom,
            minzoom = _source$minzoom === undefined ? 0 : _source$minzoom;


        return _carto.default.getVectorTileTemplate(source['source-layers']).then(function (template) {
          return {
            id: source.id,
            type: 'vector',
            tiles: [template],
            minzoom: minzoom
          };
        });
      });

      return RSVP.hash({
        cartoSources: Promise.all(cartoSourcePromises),
        bookmarks: this.store.findAll('bookmark').then(function (bookmarks) {
          bookmarks.invoke('get', 'bookmark');
          return bookmarks;
        })
      });
    },
    afterModel: function afterModel() {
      this.get('mainMap').resetBounds();
    }
  });


  Route.reopen({
    activate: function activate() {
      var cssClass = this.toCssClass();
      if (cssClass !== 'application') {
        $('body').addClass(cssClass);
      }
    },
    deactivate: function deactivate() {
      $('body').removeClass(this.toCssClass());
    },
    toCssClass: function toCssClass() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
});
define('labs-zola/routes/bbl', ['exports', 'labs-zola/utils/bbl-demux'], function (exports, _bblDemux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    model: function model(params) {
      var bbl = (0, _bblDemux.default)(params.bbl);
      this.transitionTo('lot', bbl.boro, bbl.block, bbl.lot);
    }
  });
});
define('labs-zola/routes/bookmarks', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  var service = Ember.inject.service;
  exports.default = Route.extend({
    mainMap: service(),

    model: function model() {
      return this.store.findAll('bookmark');
    },


    actions: {
      didTransition: function didTransition() {
        this.get('mainMap').setProperties({
          selected: null,
          shouldFitBounds: false
        });
      }
    }
  });
});
define('labs-zola/routes/commercial-overlay', ['exports', 'ember-decorators/object', 'labs-zola/mixins/update-selection'], function (exports, _object, _updateSelection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Route = Ember.Route;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Route.extend(_updateSelection.default, {
    mainMap: service(),
    model: function model(params) {
      return {
        taskInstance: this.store.findRecord('commercial-overlay', params.id)
      };
    },


    bounds: alias('mainMap.bounds'),

    setupController: function setupController(controller, _ref) {
      var _dec, _desc, _value, _obj;

      var taskInstance = _ref.taskInstance;

      this._super(controller, taskInstance);

      controller.setProperties((_dec = (0, _object.computed)('model.value'), (_obj = {
        model: taskInstance,
        overlay: function overlay() {
          return taskInstance.get('value');
        }
      }, (_applyDecoratedDescriptor(_obj, 'overlay', [_dec], Object.getOwnPropertyDescriptor(_obj, 'overlay'), _obj)), _obj)));
    },


    actions: {
      fitBounds: function fitBounds() {
        var mainMap = this.get('mainMap');
        var map = mainMap.mapInstance;
        var fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
        map.fitBounds(this.get('bounds'), fitBoundsOptions);
      }
    }
  });
});
define('labs-zola/routes/data', ['exports', 'labs-zola/layer-groups'], function (exports, _layerGroups) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    model: function model() {
      return Object.keys(_layerGroups.default).map(function (key) {
        return _layerGroups.default[key];
      });
    }
  });
});
define('labs-zola/routes/features', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('labs-zola/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  var service = Ember.inject.service;
  exports.default = Route.extend({
    mainMap: service(),

    actions: {
      didTransition: function didTransition() {
        var mainMap = this.get('mainMap');
        mainMap.setProperties({
          selected: null,
          shouldFitBounds: false
        });
        if (mainMap.mapInstance) mainMap.mapInstance.resize();
      }
    }
  });
});
define('labs-zola/routes/lot', ['exports', 'ember-concurrency', 'labs-zola/utils/bbl-demux', 'ember-decorators/object', 'labs-zola/mixins/update-selection'], function (exports, _emberConcurrency, _bblDemux, _object, _updateSelection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Route = Ember.Route;
  var service = Ember.inject.service;
  var next = Ember.run.next;


  // convert 'R6A' to 'r6'
  var getPrimaryZone = function getPrimaryZone(zonedist) {
    return zonedist.match(/\w\d*/)[0].toLowerCase();
  };

  exports.default = Route.extend(_updateSelection.default, {
    mainMap: service(),

    model: function model(params) {
      var id = (0, _bblDemux.default)(params);

      return {
        taskInstance: this.store.findRecord('lot', id)
      };
    },
    setupController: function setupController(controller, _ref) {
      var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

      var taskInstance = _ref.taskInstance;

      this._super(controller, taskInstance);
      this.get('waitToFitBounds').perform(taskInstance);

      controller.setProperties((_dec = (0, _object.computed)('model.value'), _dec2 = (0, _object.computed)('lot.zonedist1'), _dec3 = (0, _object.computed)('lot.zonedist2'), _dec4 = (0, _object.computed)('lot.zonedist3'), _dec5 = (0, _object.computed)('lot.zonedist4'), (_obj = {
        model: taskInstance,
        lot: function lot() {
          return taskInstance.get('value');
        },
        primaryzone1: function primaryzone1(zonedist) {
          return getPrimaryZone(zonedist);
        },
        primaryzone2: function primaryzone2(zonedist) {
          return getPrimaryZone(zonedist);
        },
        primaryzone3: function primaryzone3(zonedist) {
          return getPrimaryZone(zonedist);
        },
        primaryzone4: function primaryzone4(zonedist) {
          return getPrimaryZone(zonedist);
        }
      }, (_applyDecoratedDescriptor(_obj, 'lot', [_dec], Object.getOwnPropertyDescriptor(_obj, 'lot'), _obj), _applyDecoratedDescriptor(_obj, 'primaryzone1', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'primaryzone1'), _obj), _applyDecoratedDescriptor(_obj, 'primaryzone2', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'primaryzone2'), _obj), _applyDecoratedDescriptor(_obj, 'primaryzone3', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'primaryzone3'), _obj), _applyDecoratedDescriptor(_obj, 'primaryzone4', [_dec5], Object.getOwnPropertyDescriptor(_obj, 'primaryzone4'), _obj)), _obj)));
    },


    waitToFitBounds: (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(taskInstance) {
      var _this = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _emberConcurrency.waitForProperty)(taskInstance, 'state', 'finished');

            case 2:

              next(function () {
                _this.set('mainMap.shouldFitBounds', true);
              });

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable()
  });
});
define('labs-zola/routes/special-purpose-district', ['exports', 'labs-zola/mixins/update-selection', 'ember-decorators/object'], function (exports, _updateSelection, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Route = Ember.Route;
  var service = Ember.inject.service;
  exports.default = Route.extend(_updateSelection.default, {
    mainMap: service(),
    model: function model(params) {
      return {
        taskInstance: this.store.findRecord('special-purpose-district', params.id)
      };
    },
    setupController: function setupController(controller, _ref) {
      var _dec, _desc, _value, _obj;

      var taskInstance = _ref.taskInstance;

      this._super(controller, taskInstance);
      controller.setProperties((_dec = (0, _object.computed)('model.value'), (_obj = {
        model: taskInstance,
        district: function district() {
          return taskInstance.get('value');
        }
      }, (_applyDecoratedDescriptor(_obj, 'district', [_dec], Object.getOwnPropertyDescriptor(_obj, 'district'), _obj)), _obj)));
    },


    actions: {
      didTransition: function didTransition() {
        this.set('mainMap.shouldFitBounds', true);
      }
    }
  });
});
define('labs-zola/routes/special-purpose-subdistricts', ['exports', 'labs-zola/mixins/update-selection', 'ember-decorators/object'], function (exports, _updateSelection, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Route = Ember.Route;
  var service = Ember.inject.service;
  exports.default = Route.extend(_updateSelection.default, {
    mainMap: service(),
    model: function model(params) {
      return {
        taskInstance: this.store.findRecord('special-purpose-subdistrict', params.id)
      };
    },
    setupController: function setupController(controller, _ref) {
      var _dec, _desc, _value, _obj;

      var taskInstance = _ref.taskInstance;

      this._super(controller, taskInstance);

      controller.setProperties((_dec = (0, _object.computed)('model.value'), (_obj = {
        model: taskInstance,
        subdistrict: function subdistrict() {
          return taskInstance.get('value');
        }
      }, (_applyDecoratedDescriptor(_obj, 'subdistrict', [_dec], Object.getOwnPropertyDescriptor(_obj, 'subdistrict'), _obj)), _obj)));
    },


    actions: {
      didTransition: function didTransition() {
        this.set('mainMap.shouldFitBounds', true);
      }
    }
  });
});
define('labs-zola/routes/zma', ['exports', 'ember-decorators/object', 'labs-zola/mixins/update-selection'], function (exports, _object, _updateSelection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var Route = Ember.Route;
  var service = Ember.inject.service;
  exports.default = Route.extend(_updateSelection.default, {
    mainMap: service(),

    model: function model(params) {
      return {
        taskInstance: this.store.findRecord('zma', params.ulurpno)
      };
    },
    setupController: function setupController(controller, _ref) {
      var _dec, _desc, _value, _obj;

      var taskInstance = _ref.taskInstance;

      this._super(controller, taskInstance);

      controller.setProperties((_dec = (0, _object.computed)('model.value'), (_obj = {
        model: taskInstance,
        zma: function zma() {
          return taskInstance.get('value');
        }
      }, (_applyDecoratedDescriptor(_obj, 'zma', [_dec], Object.getOwnPropertyDescriptor(_obj, 'zma'), _obj)), _obj)));
    },


    actions: {
      didTransition: function didTransition() {
        this.set('mainMap.shouldFitBounds', true);
      }
    }
  });
});
define('labs-zola/routes/zoning-district', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Route.extend({
    mainMap: service(),

    model: function model(params) {
      return this.store.findRecord('zoning-district', params.zonedist);
    },
    afterModel: function afterModel(model) {
      this.set('mainMap.selected', model);
    },


    bounds: alias('mainMap.bounds'),

    actions: {
      fitBounds: function fitBounds() {
        var mainMap = this.get('mainMap');
        var map = mainMap.mapInstance;
        var fitBoundsOptions = mainMap.get('isSelectedBoundsOptions');
        map.fitBounds(this.get('bounds'), fitBoundsOptions);
      }
    }
  });
});
define('labs-zola/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var merge = Ember.merge;
  exports.default = _emberData.default.JSONSerializer.extend({
    normalizeFindRecordResponse: function normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
      var _payload$features = _slicedToArray(payload.features, 1),
          feature = _payload$features[0];

      var id = feature.properties.id;
      var geometry = feature.geometry;

      var json = merge(feature.properties, { id: id, geometry: geometry });

      return this._super(store, primaryModelClass, json, id, requestType);
    }
  });
});
define('labs-zola/serializers/bookmark', ['exports', 'ember-local-storage/serializers/serializer'], function (exports, _serializer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _serializer.default;
    }
  });
});
define('labs-zola/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ajax.default.extend({
    isSuccess: function isSuccess(status, headers, payload) {
      var isSuccess = true;
      if (isSuccess && payload.status) {
        // when status === 200 and payload has status property,
        // check that payload.status is also considered a success request
        console.log('00000--------00000');
        return this._super(payload.status);
      }
      return isSuccess;
    }
  });
});
define('labs-zola/services/main-map', ['exports', 'labs-zola/layers/point-layer', 'ember-decorators/object'], function (exports, _pointLayer, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _desc, _value, _obj;

  var Service = Ember.Service;
  // eslint-disable-line

  var DEFAULT_BOUNDS = [-73.9, 40.690913, -73.832692, 40.856654];

  exports.default = Service.extend((_dec = (0, _object.computed)('selected'), _dec2 = (0, _object.computed)('drawnFeature'), _dec3 = (0, _object.computed)('currentAddress'), _dec4 = (0, _object.computed)('selected'), (_obj = {
    mapInstance: null,

    // currently selected lot, usually a Lot model
    selected: null,
    currentZoom: null,
    currentMeasurement: null,
    drawMode: null,
    shouldFitBounds: false,

    bounds: function bounds(selected) {
      var mapInstance = this.get('mapInstance');
      if (mapInstance) {
        mapInstance.resize();
      }

      if (selected) {
        return selected.get('bounds');
      }
      return DEFAULT_BOUNDS;
    },


    pointLayer: _pointLayer.default,
    currentAddress: null,

    drawnFeature: null,

    drawnFeatureSource: function drawnFeatureSource(feature) {
      return {
        type: 'geojson',
        data: feature
      };
    },
    addressSource: function addressSource(currentAddress) {
      return {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: currentAddress
        }
      };
    },
    isSelectedBoundsOptions: function isSelectedBoundsOptions(selected) {
      var el = $('.map-container');
      var height = el.height();
      var width = el.width();

      var fullWidth = window.innerWidth;
      // width of content area on large screens is 5/12 of full
      var contentWidth = fullWidth / 12 * 5;
      // on small screens, no offset
      var offset = fullWidth < 1024 ? 0 : -((width - contentWidth) / 2);
      var padding = Math.min(height, width - contentWidth) / 2.5;

      // get type of selected feature so we can do dynamic padding
      var type = selected ? selected.constructor.modelName : null;

      return {
        padding: selected && type !== 'zoning-district' && type !== 'commercial-overlay' ? padding : 0,
        offset: [offset, 0]
      };
    },
    resetBounds: function resetBounds() {
      var mapInstance = this.get('mapInstance');
      if (mapInstance) {
        mapInstance.resize();
      }
      this.set('selected', null);
    }
  }, (_applyDecoratedDescriptor(_obj, 'bounds', [_dec], Object.getOwnPropertyDescriptor(_obj, 'bounds'), _obj), _applyDecoratedDescriptor(_obj, 'drawnFeatureSource', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'drawnFeatureSource'), _obj), _applyDecoratedDescriptor(_obj, 'addressSource', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'addressSource'), _obj), _applyDecoratedDescriptor(_obj, 'isSelectedBoundsOptions', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'isSelectedBoundsOptions'), _obj)), _obj)));
});
define('labs-zola/services/map-mouseover', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

  var Service = Ember.Service;
  var service = Ember.inject.service;
  var get = Ember.get;
  exports.default = Service.extend((_dec = (0, _object.computed)('currentEvent'), _dec2 = (0, _object.computed)('mousePosition.x', 'mousePosition.y'), _dec3 = (0, _object.computed)('registeredLayers.visibleLayerIds.@each', 'currentEvent', 'mousePosition'), _dec4 = (0, _object.computed)('hoveredFeature'), _dec5 = (0, _object.computed)('highlightedLotFeatures'), (_obj = {
    registeredLayers: service(),

    currentEvent: null,

    tooltipTemplate: '',
    highlightedLayer: null,

    mousePosition: function mousePosition(event) {
      if (event) {
        var _event$point = event.point,
            x = _event$point.x,
            y = _event$point.y;


        return {
          x: x,
          y: y
        };
      }

      return null;
    },
    hasMousePosition: function hasMousePosition(x, y) {
      return !!(x && y);
    },
    hoveredFeature: function hoveredFeature(layers, currentEvent) {
      if (currentEvent) {
        var map = currentEvent.target;

        return map.queryRenderedFeatures(currentEvent.point, { layers: layers }).objectAt(0) || {};
      }
      return {};
    },
    tooltipText: function tooltipText(feature) {
      return get(feature, 'properties.bbl');
    },


    highlightedLotFeatures: [],

    highlightedLotSource: function highlightedLotSource(features) {
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      };
    },
    highlighter: function highlighter(e) {
      var map = e.target;
      this.set('currentEvent', e);

      // of all registered layers, we only want to query the ones
      // that exist on the map AND are highlightable

      var layers = this.get('registeredLayers.highlightableAndVisibleLayerIds');
      var clickable = this.get('registeredLayers.clickableAndVisibleLayerIds');
      var features = map.queryRenderedFeatures(e.point, { layers: layers });
      if (features.length > 0) {
        var thisFeature = features[0];

        var prevFeature = this.get('highlightedLotFeatures')[0];
        if (!prevFeature || thisFeature.id !== prevFeature.id) {
          this.set('highlightedLotFeatures', [thisFeature]);
          // move the layer
          var layerId = thisFeature.layer.id;
          this.set('highlightedLayer', layerId);

          // set to pointer if the layer-group is also clickable
          map.getCanvas().style.cursor = clickable.indexOf(layerId) > -1 ? 'pointer' : '';

          var beforeLayerId = map.getStyle().layers.reduce(function (acc, curr) {
            if (curr.id === layerId) return 'hit';
            if (acc === 'hit') return curr;
            return acc;
          }).id;

          if (map.getLayer('highlighted-lot')) {
            map.moveLayer('highlighted-lot', beforeLayerId);
          }
        }

        this.set('tooltipTemplate', this.get('registeredLayers').getTooltipTemplate(thisFeature.layer.id));
      } else {
        map.getCanvas().style.cursor = '';

        this.set('highlightedLotFeatures', []);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, 'mousePosition', [_dec], Object.getOwnPropertyDescriptor(_obj, 'mousePosition'), _obj), _applyDecoratedDescriptor(_obj, 'hasMousePosition', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'hasMousePosition'), _obj), _applyDecoratedDescriptor(_obj, 'hoveredFeature', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'hoveredFeature'), _obj), _applyDecoratedDescriptor(_obj, 'tooltipText', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'tooltipText'), _obj), _applyDecoratedDescriptor(_obj, 'highlightedLotSource', [_dec5], Object.getOwnPropertyDescriptor(_obj, 'highlightedLotSource'), _obj)), _obj)));
});
define('labs-zola/services/metrics', ['exports', 'ember-metrics/services/metrics'], function (exports, _metrics) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _metrics.default;
    }
  });
});
define('labs-zola/services/qp', ['exports', 'ember-parachute/services/qp'], function (exports, _qp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _qp.default;
    }
  });
});
define('labs-zola/services/registered-layers', ['exports', 'ember-decorators/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _obj;

  var Service = Ember.Service;
  // eslint-disable-line

  var flattenedIds = function flattenedIds(layers) {
    return layers.map(function (layer) {
      return layer.config.layers.mapBy('layer.id');
    }).reduce(function (accumulator, curr) {
      return accumulator.concat(curr);
    }, []);
  };

  exports.default = Service.extend((_dec = (0, _object.computed)('layers.@each.visible'), _dec2 = (0, _object.computed)('layers.@each'), _dec3 = (0, _object.computed)('layers.@each'), _dec4 = (0, _object.computed)('currentlyVisible'), _dec5 = (0, _object.computed)('currentlyVisible'), _dec6 = (0, _object.computed)('currentlyVisible'), (_obj = {
    layers: [],

    currentlyVisible: function currentlyVisible(layers) {
      return layers.filterBy('visible', true);
    },
    layerGroupIds: function layerGroupIds(layers) {
      return layers.mapBy('config.id');
    },
    layerIds: function layerIds(layers) {
      return flattenedIds(layers);
    },
    visibleLayerIds: function visibleLayerIds(layers) {
      return flattenedIds(layers);
    },
    highlightableAndVisibleLayerIds: function highlightableAndVisibleLayerIds(layers) {
      // return an array of layerids that are both visible and highlightable
      return layers.map(function (layer) {
        return layer.config.layers.filter(function (l) {
          return l.highlightable;
        }).map(function (l) {
          return l.layer.id;
        });
      }).reduce(function (accumulator, curr) {
        return accumulator.concat(curr);
      }, []);
    },
    clickableAndVisibleLayerIds: function clickableAndVisibleLayerIds(layers) {
      // return an array of layerids that are both visible and clickable
      return layers.map(function (layer) {
        return layer.config.layers.filter(function (l) {
          return l.clickable;
        }).map(function (l) {
          return l.layer.id;
        });
      }).reduce(function (accumulator, curr) {
        return accumulator.concat(curr);
      }, []);
    },
    getTooltipTemplate: function getTooltipTemplate(id) {
      // find the layer with this id, return its tooltipTemplate
      var layer = this.get('layers').reduce(function (accumulator, curr) {
        var match = curr.config.layers.filter(function (l) {
          return l.layer.id === id;
        });
        return match.length > 0 ? accumulator.concat(match[0]) : accumulator;
      }, [])[0];

      return layer.tooltipTemplate;
    },
    findLayer: function findLayer(id) {
      return this.get('layers').findBy('config.id', id);
    }
  }, (_applyDecoratedDescriptor(_obj, 'currentlyVisible', [_dec], Object.getOwnPropertyDescriptor(_obj, 'currentlyVisible'), _obj), _applyDecoratedDescriptor(_obj, 'layerGroupIds', [_dec2], Object.getOwnPropertyDescriptor(_obj, 'layerGroupIds'), _obj), _applyDecoratedDescriptor(_obj, 'layerIds', [_dec3], Object.getOwnPropertyDescriptor(_obj, 'layerIds'), _obj), _applyDecoratedDescriptor(_obj, 'visibleLayerIds', [_dec4], Object.getOwnPropertyDescriptor(_obj, 'visibleLayerIds'), _obj), _applyDecoratedDescriptor(_obj, 'highlightableAndVisibleLayerIds', [_dec5], Object.getOwnPropertyDescriptor(_obj, 'highlightableAndVisibleLayerIds'), _obj), _applyDecoratedDescriptor(_obj, 'clickableAndVisibleLayerIds', [_dec6], Object.getOwnPropertyDescriptor(_obj, 'clickableAndVisibleLayerIds'), _obj)), _obj)));
});
define('labs-zola/services/resize-detector', ['exports', 'ember-element-resize-detector/services/resize-detector'], function (exports, _resizeDetector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _resizeDetector.default;
    }
  });
});
define('labs-zola/services/store', ['exports', 'ember-data', 'ember-data-tasks/mixins/task-store'], function (exports, _emberData, _taskStore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Store.extend(_taskStore.default);
});
define('labs-zola/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('labs-zola/sources/admin-boundaries', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'admin-boundaries',
    type: 'cartovector',
    'source-layers': [{
      id: 'community-districts',
      sql: '\n        SELECT the_geom_webmercator, borocd,\n          CASE\n            WHEN LEFT(borocd::text, 1) = \'1\' THEN \'Manhattan \' || borocd % 100\n            WHEN LEFT(borocd::text, 1) = \'2\' THEN \'Bronx \' || borocd % 100\n            WHEN LEFT(borocd::text, 1) = \'3\' THEN \'Brooklyn \' || borocd % 100\n            WHEN LEFT(borocd::text, 1) = \'4\' THEN \'Queens \' || borocd % 100\n            WHEN LEFT(borocd::text, 1) = \'5\' THEN \'Staten Island \' || borocd % 100\n          END as boro_district\n        FROM cd_boundaries_v0\n        WHERE borocd % 100 < 20\n      '
    }, {
      id: 'neighborhood-tabulation-areas',
      sql: 'SELECT the_geom_webmercator, ntaname FROM nta_boundaries_v0 WHERE ntaname NOT ILIKE \'park-cemetery-etc%\''
    }, {
      id: 'neighborhood-tabulation-areas-centroids',
      sql: 'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM nta_boundaries_v0 WHERE ntaname NOT ILIKE \'park-cemetery-etc%\''
    }, {
      id: 'boroughs',
      sql: 'SELECT the_geom_webmercator, boroname FROM boro_boundaries_v0'
    }, {
      id: 'nyc-council-districts',
      sql: 'SELECT the_geom_webmercator, coundist FROM nyc_council_districts_v0'
    }, {
      id: 'ny-senate-districts',
      sql: 'SELECT the_geom_webmercator, stsendist FROM ny_senate_districts_v0'
    }, {
      id: 'ny-assembly-districts',
      sql: 'SELECT the_geom_webmercator, assemdist FROM assembly_districts_v0'
    }]
  };
});
define('labs-zola/sources/aerials', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var aerials2016 = {
    id: 'aerials-2016',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2014 = {
    id: 'aerials-2014',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2012 = {
    id: 'aerials-2012',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2010 = {
    id: 'aerials-2010',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2008 = {
    id: 'aerials-2008',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2006 = {
    id: 'aerials-2006',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials2004 = {
    id: 'aerials-2004',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials20012 = {
    id: 'aerials-20012',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/2001-2/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials1996 = {
    id: 'aerials-1996',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials1951 = {
    id: 'aerials-1951',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  var aerials1924 = {
    id: 'aerials-1924',
    type: 'raster',
    tiles: ['https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8'],
    tileSize: 256
  };

  exports.default = {
    aerials2016: aerials2016,
    aerials2014: aerials2014,
    aerials2012: aerials2012,
    aerials2010: aerials2010,
    aerials2008: aerials2008,
    aerials2006: aerials2006,
    aerials2004: aerials2004,
    aerials20012: aerials20012,
    aerials1996: aerials1996,
    aerials1951: aerials1951,
    aerials1924: aerials1924
  };
});
define('labs-zola/sources/commercial-overlays', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'commercial-overlays',
    type: 'cartovector',
    'source-layers': [{
      id: 'commercial-overlays',
      sql: 'SELECT * FROM commercial_overlays_v201804'
    }]
  };
});
define('labs-zola/sources/effective-flood-insurance-rate-2007', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'effective-flood-insurance-rate-2007',
    type: 'cartovector',
    'source-layers': [{
      id: 'effective-flood-insurance-rate-2007',
      sql: '\n        SELECT the_geom_webmercator,\n        CASE\n          WHEN fld_zone IN (\'A\', \'A0\', \'AE\') THEN \'A\'\n          WHEN fld_zone = \'VE\' THEN \'V\'\n        END as fld_zone\n        FROM floodplain_firm2007_v0\n        WHERE fld_zone IN (\'A\', \'A0\', \'AE\') OR fld_zone = \'VE\'\n      '
    }]
  };
});
define('labs-zola/sources/index', ['exports', 'labs-zola/sources/aerials', 'labs-zola/sources/admin-boundaries', 'labs-zola/sources/commercial-overlays', 'labs-zola/sources/effective-flood-insurance-rate-2007', 'labs-zola/sources/landmark-historic', 'labs-zola/sources/pluto', 'labs-zola/sources/preliminary-flood-insurance-rate', 'labs-zola/sources/supporting-zoning', 'labs-zola/sources/transportation', 'labs-zola/sources/zoning-districts', 'labs-zola/sources/zoning-map-amendments'], function (exports, _aerials, _adminBoundaries, _commercialOverlays, _effectiveFloodInsuranceRate, _landmarkHistoric, _pluto, _preliminaryFloodInsuranceRate, _supportingZoning, _transportation, _zoningDistricts, _zoningMapAmendments) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var aerials2016 = _aerials.default.aerials2016,
      aerials2014 = _aerials.default.aerials2014,
      aerials2012 = _aerials.default.aerials2012,
      aerials2010 = _aerials.default.aerials2010,
      aerials2008 = _aerials.default.aerials2008,
      aerials2006 = _aerials.default.aerials2006,
      aerials2004 = _aerials.default.aerials2004,
      aerials20012 = _aerials.default.aerials20012,
      aerials1996 = _aerials.default.aerials1996,
      aerials1951 = _aerials.default.aerials1951,
      aerials1924 = _aerials.default.aerials1924;
  exports.default = {
    aerials2016: aerials2016,
    aerials2014: aerials2014,
    aerials2012: aerials2012,
    aerials2010: aerials2010,
    aerials2008: aerials2008,
    aerials2006: aerials2006,
    aerials2004: aerials2004,
    aerials20012: aerials20012,
    aerials1996: aerials1996,
    aerials1951: aerials1951,
    aerials1924: aerials1924,
    adminBoundaries: _adminBoundaries.default,
    commercialOverlays: _commercialOverlays.default,
    effectiveFloodInsuranceRate2007: _effectiveFloodInsuranceRate.default,
    landmarkHistoric: _landmarkHistoric.default,
    pluto: _pluto.default,
    preliminaryFloodInsuranceRate: _preliminaryFloodInsuranceRate.default,
    supportingZoning: _supportingZoning.default,
    transportation: _transportation.default,
    zoningDistricts: _zoningDistricts.default,
    zoningMapAmendments: _zoningMapAmendments.default
  };
});
define('labs-zola/sources/landmark-historic', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'landmark-historic',
    type: 'cartovector',
    'source-layers': [{
      id: 'historic-districts',
      sql: 'SELECT the_geom_webmercator, area_name FROM historic_districts_v201711 WHERE status_of_ = \'DESIGNATED\''
    }, {
      id: 'landmarks',
      sql: 'SELECT the_geom_webmercator, lm_name, lm_type FROM landmarks_v0 WHERE lm_type = \'Individual Landmark\' OR lm_type = \'Interior Landmark\''
    }, {
      id: 'scenic-landmarks',
      sql: 'SELECT the_geom_webmercator, scen_lm_na FROM scenic_landmarks_v0'
    }]
  };
});
define('labs-zola/sources/pluto', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'pluto',
    type: 'cartovector',
    minzoom: 12,
    'source-layers': [{
      id: 'pluto',
      sql: 'SELECT the_geom_webmercator, bbl, lot, landuse, address FROM mappluto_v1711'
    }]
  };
});
define('labs-zola/sources/preliminary-flood-insurance-rate', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'preliminary-flood-insurance-rate',
    type: 'cartovector',
    'source-layers': [{
      id: 'preliminary-flood-insurance-rate',
      sql: '\n        SELECT the_geom_webmercator,\n        CASE\n          WHEN fld_zone IN (\'A\', \'A0\', \'AE\') THEN \'A\'\n          WHEN fld_zone = \'VE\' THEN \'V\'\n          WHEN fld_zone = \'0.2 PCT ANNUAL CHANCE FLOOD HAZARD\' THEN \'Shaded X\'\n        END as fld_zone\n        FROM floodplain_pfirm2015_v0\n        WHERE fld_zone IN (\'A\', \'A0\', \'AE\') OR fld_zone = \'VE\'\n      '
    }]
  };
});
define('labs-zola/sources/supporting-zoning', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'supporting-zoning',
    type: 'cartovector',
    'source-layers': [{
      id: 'special-purpose-districts',
      sql: 'SELECT the_geom_webmercator, cartodb_id, sdlbl, sdname FROM special_purpose_districts_v201804'
    }, {
      id: 'special-purpose-subdistricts',
      sql: 'SELECT the_geom_webmercator, splbl, cartodb_id, spname, subdist FROM special_purpose_subdistricts_v201804'
    }, {
      id: 'mandatory-inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam, mih_option FROM mandatory_inclusionary_housing_v20180425'
    }, {
      id: 'inclusionary-housing',
      sql: 'SELECT the_geom_webmercator, projectnam FROM inclusionary_housing_v201804'
    }, {
      id: 'transit-zones',
      sql: 'SELECT the_geom_webmercator FROM transitzones_v201607'
    }, {
      id: 'fresh',
      sql: 'SELECT the_geom_webmercator, name FROM fresh_zones_v201611'
    }, {
      id: 'sidewalk-cafes',
      sql: 'SELECT the_geom_webmercator, cafetype FROM sidewalk_cafes_v201804'
    }, {
      id: 'low-density-growth-mgmt-areas',
      sql: 'SELECT the_geom_webmercator FROM lower_density_growth_management_areas_v201709'
    }, {
      id: 'coastal-zone-boundary',
      sql: 'SELECT the_geom_webmercator FROM coastal_zone_boundary_v201601'
    }, {
      id: 'waterfront-access-plan',
      sql: 'SELECT the_geom_webmercator, name FROM waterfront_access_plan_v201109'
    }, {
      id: 'zoning-map-amendments-pending',
      sql: 'SELECT the_geom_webmercator, ulurpno, status, project_na FROM zoning_map_amendments_v201804 WHERE status = \'Certified\''
    }, {
      id: 'limited-height-districts',
      sql: 'SELECT the_geom_webmercator, lhlbl FROM limited_height_districts_v201804'
    }, {
      id: 'business-improvement-districts',
      sql: 'SELECT the_geom_webmercator, bid FROM business_improvement_districts_v0'
    }, {
      id: 'e-designations',
      sql: 'SELECT the_geom_webmercator, bbl, ceqr_num, enumber, ulurp_num FROM e_designations_v20180417'
    }]
  };
});
define('labs-zola/sources/transportation', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'transportation',
    type: 'cartovector',
    'source-layers': [{
      id: 'subway-routes',
      sql: 'SELECT the_geom_webmercator, rt_symbol FROM mta_subway_routes_v0'
    }, {
      id: 'subway-stops',
      sql: 'SELECT the_geom_webmercator, name FROM mta_subway_stops_v0'
    }, {
      id: 'subway-entrances',
      sql: 'SELECT the_geom_webmercator FROM mta_subway_entrances_v0'
    }]
  };
});
define('labs-zola/sources/zoning-districts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'zoning-districts',
    type: 'cartovector',
    'source-layers': [{
      id: 'zoning-districts',
      sql: 'SELECT * FROM (\n              SELECT *, CASE \n                WHEN SUBSTRING(zonedist, 3, 1) = \'-\' THEN LEFT(zonedist, 2)\n                WHEN SUBSTRING(zonedist, 3, 1) ~ E\'[A-Z]\' THEN LEFT(zonedist, 2)\n                WHEN SUBSTRING(zonedist, 3, 1) ~ E\'[0-9]\' THEN LEFT(zonedist, 3)\n                ELSE zonedist\n              END as primaryzone FROM zoning_districts_v201804\n            ) a'
    }]
  };
});
define('labs-zola/sources/zoning-map-amendments', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    id: 'zoning-map-amendments',
    type: 'cartovector',
    'source-layers': [{
      id: 'zoning-map-amendments',
      sql: 'SELECT * FROM (SELECT the_geom_webmercator, to_char(effective, \'MM/DD/YYYY\') as effectiveformatted, effective, ulurpno, status, project_na FROM zoning_map_amendments_v201804 WHERE status = \'Adopted\') a'
    }]
  };
});
define('labs-zola/storages/bookmarks', ['exports', 'ember-local-storage/local/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Storage = _array.default.extend();

  // Uncomment if you would like to set initialState
  Storage.reopenClass({
    initialState: function initialState() {
      return [{
        type: 'lot',
        recordId: '5012230001'
      }];
    }
  });

  exports.default = Storage;
});
define("labs-zola/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "T9umsFMM", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n  \"],[11,\"h1\",[]],[15,\"class\",\"header-xlarge\"],[13],[0,\"Welcome to New York City's zoning & land use map.\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[15,\"class\",\"lead\"],[13],[0,\"ZoLa provides a simple way to research zoning regulations. Find the zoning for your property, discover new proposals for your neighborhood, and learn where City Planning initiatives are happening throughout the City.\"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[15,\"class\",\"header-medium small-margin-bottom\"],[13],[0,\"Zoning Questions\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"For general zoning questions, read the \"],[11,\"a\",[]],[15,\"href\",\"https://www1.nyc.gov/site/planning/zoning/zoning-faq.page\"],[15,\"target\",\"_blank\"],[13],[11,\"strong\",[]],[13],[0,\"Zoning Help Desk FAQ\"],[14],[14],[0,\". If your question isn't answered there, call \"],[11,\"a\",[]],[15,\"href\",\"tel:212-720-3291\"],[13],[11,\"strong\",[]],[13],[0,\"212-720-3291\"],[14],[14],[0,\" during business hours (8:30AM–5:30PM, Monday–Friday, closed on legal holidays). Leave a detailed message with your block and lot information, and a zoning specialist will get back to you within two business days. Or fill out the \"],[11,\"a\",[]],[15,\"href\",\"https://www1.nyc.gov/site/planning/zoning/zoning-inquiry.page\"],[15,\"target\",\"_blank\"],[13],[11,\"strong\",[]],[13],[0,\"Zoning Information Inquiry Form\"],[14],[14],[0,\".\"],[14],[0,\"\\n\\n  \"],[11,\"h3\",[]],[15,\"class\",\"header-medium small-margin-bottom\"],[13],[0,\"Application Feedback\"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"To let \"],[11,\"a\",[]],[15,\"href\",\"https://twitter.com/nycplanninglabs\"],[15,\"target\",\"_blank\"],[13],[11,\"strong\",[]],[13],[0,\"@NYCPlanningLabs\"],[14],[14],[0,\" know how this app could be better, \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/NYCPlanning/labs-zola/issues/\"],[15,\"target\",\"_blank\"],[13],[11,\"strong\",[]],[13],[0,\"add a GitHub Issue\"],[14],[14],[0,\", Tweet \"],[11,\"a\",[]],[15,\"href\",\"https://twitter.com/intent/tweet?text=%40NYCPlanningLabs%20%23ReimagineZoLa\"],[15,\"target\",\"_blank\"],[13],[11,\"strong\",[]],[13],[0,\"#ReimagineZoLa\"],[14],[14],[0,\", or send an email to \"],[11,\"a\",[]],[15,\"href\",\"mailto:zolagis@planning.nyc.gov\"],[13],[11,\"strong\",[]],[13],[0,\"zolagis@planning.nyc.gov\"],[14],[14],[0,\".\"],[14],[0,\"\\n\\n  \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[15,\"class\",\"text-small\"],[13],[11,\"em\",[]],[13],[0,\"ZoLa was developed by the City of New York using NYC open data and other public data sources and is provided solely for informational purposes. The City makes no representation as to the accuracy of the information or to its suitability for any purpose. The City disclaims any liability for errors that may be contained herein and shall not be responsible for any damages consequential or actual, arising out of or in connection with the use of this information. The City makes no warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose as to the quality, content, accuracy, or completeness of the information, text graphics, links and other items contained in ZoLa. The text of the Zoning Resolution can be accessed \"],[11,\"a\",[]],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/access-text.page\"],[13],[0,\"here\"],[14],[0,\" and the zoning maps can be accessed \"],[11,\"a\",[]],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/index-map.page\"],[13],[0,\"here\"],[14],[0,\".\"],[14],[14],[0,\"\\n\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/about.hbs" } });
});
define("labs-zola/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wVH1arij", "block": "{\"statements\":[[1,[33,[\"site-header\"],null,[[\"count\",\"resetAll\"],[[28,[\"model\",\"bookmarks\",\"length\"]],[33,[\"action\"],[[28,[null]],\"resetQueryParams\"],null]]]],false],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"site-main grid-x\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"navigation-area cell large-auto\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"search-container hide-for-print\"],[13],[0,\"\\n      \"],[1,[33,[\"map-search\"],null,[[\"transitionTo\",\"saveAddress\"],[[33,[\"action\"],[[28,[null]],\"transitionTo\"],null],[33,[\"action\"],[[28,[null]],\"saveAddress\"],null]]]],false],[0,\"\\n      \"],[1,[33,[\"bbl-lookup\"],null,[[\"transitionTo\"],[[33,[\"action\"],[[28,[null]],\"transitionTo\"],null]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"map-grid\"],[13],[0,\"\\n      \"],[1,[33,[\"main-map\"],null,[[\"cartoSources\",\"routeToLot\",\"transitionTo\",\"bookmarks\",\"qps\"],[[28,[\"model\",\"cartoSources\"]],[33,[\"action\"],[[28,[null]],\"routeToLot\"],null],[33,[\"action\"],[[28,[null]],\"transitionTo\"],null],[28,[\"model\",\"bookmarks\"]],[28,[\"qps\"]]]]],false],[0,\"\\n\\n      \"],[1,[33,[\"layer-palette\"],null,[[\"qps\",\"isDefault\",\"resetQueryParams\"],[[28,[\"qps\"]],[28,[\"isDefault\"]],[33,[\"action\"],[[28,[null]],\"resetQueryParams\"],null]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/application.hbs" } });
});
define("labs-zola/templates/bookmarks", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BVmzDvAe", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4 bookmarks\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"await\"],[[28,[\"bookmarksSettled\"]]],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"-each-in\"],[[33,[\"group-by\"],[\"recordType.content\",[28,[\"model\"]]],null]],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"key\"]],\"lot\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[13],[0,\"Tax Lots\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"lot-bookmark-item\"],null,[[\"lot\",\"deleteBookmark\"],[[28,[\"lot\"]],[33,[\"action\"],[[28,[null]],\"deleteBookmark\"],null]]]],false],[0,\"\\n\"]],\"locals\":[\"lot\"]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"text-small dark-gray\"],[15,\"style\",\"padding-left:1.5rem;\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"float-left\"],[15,\"style\",\"line-height:2;\"],[13],[0,\"Download saved Tax Lots (PLUTO) as: \"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"nowrap\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[15,\"class\",\"button gray tiny\"],[16,\"href\",[33,[\"carto-download-link\"],[\"mappluto_v1711\",\"bbl\",[33,[\"map-by\"],[\"bookmark.id\",[28,[\"values\"]]],null],\"csv\"],null],null],[13],[0,\"CSV\"],[14],[0,\"\\n            \"],[11,\"a\",[]],[15,\"class\",\"button gray tiny\"],[16,\"href\",[33,[\"carto-download-link\"],[\"mappluto_v1711\",\"bbl\",[33,[\"map-by\"],[\"bookmark.id\",[28,[\"values\"]]],null],\"shp\"],null],null],[13],[0,\"Shapefile\"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"key\"]],\"zma\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[13],[0,\"Zoning Map Amendments\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"zma-bookmark\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"zma\",[28,[\"zma\",\"bookmark\",\"id\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\"\\n                \"],[1,[28,[\"zma\",\"bookmark\",\"project_na\"]],false],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"dark-gray\"],[13],[1,[28,[\"zma\",\"bookmark\",\"lucats\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"              \"],[11,\"button\",[]],[15,\"class\",\"float-right lu-red delete-bookmark-button\"],[5,[\"action\"],[[28,[null]],\"deleteBookmark\",[28,[\"zma\"]]]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"zma\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"key\"]],\"special-purpose-district\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[13],[0,\"Special Purpose Districts\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"spd-bookmark\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"special-purpose-district\",[28,[\"spd\",\"bookmark\",\"id\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\"\\n                \"],[1,[28,[\"spd\",\"bookmark\",\"sdname\"]],false],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"dark-gray\"],[13],[1,[28,[\"spd\",\"bookmark\",\"sdlbl\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"              \"],[11,\"button\",[]],[15,\"class\",\"float-right lu-red delete-bookmark-button\"],[5,[\"action\"],[[28,[null]],\"deleteBookmark\",[28,[\"spd\"]]]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"spd\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"key\"]],\"special-purpose-subdistrict\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[13],[0,\"Special Purpose Subdistricts\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"spd-bookmark\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"special-purpose-subdistricts\",[28,[\"spd\",\"bookmark\",\"id\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\"\\n                \"],[1,[28,[\"spd\",\"bookmark\",\"spname\"]],false],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"dark-gray\"],[13],[1,[28,[\"spd\",\"bookmark\",\"splbl\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"              \"],[11,\"button\",[]],[15,\"class\",\"float-right lu-red delete-bookmark-button\"],[5,[\"action\"],[[28,[null]],\"deleteBookmark\",[28,[\"spd\"]]]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"spd\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[13],[0,\"Map Pins\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"values\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"map-bookmark\"],[5,[\"action\"],[[28,[null]],\"flyTo\",[28,[\"pin\",\"coordinates\"]]]],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"map-bookmark link\"],[13],[0,\"\\n                \"],[11,\"i\",[]],[15,\"class\",\"fa fa-map-pin\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"pin\",\"address\"]],false],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"button\",[]],[15,\"class\",\"float-right lu-red delete-bookmark-button\"],[5,[\"action\"],[[28,[null]],\"deleteBookmark\",[28,[\"pin\"]]]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"pin\"]},null],[0,\"        \"],[14],[0,\"\\n      \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[\"key\",\"values\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"no-bookmarks\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"align-self-middle large-text-center\"],[13],[0,\"\\n        \"],[11,\"h1\",[]],[15,\"class\",\"header-large\"],[13],[0,\"You haven't bookmarked anything.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"You can add bookmarks to this page by clicking the \"],[11,\"i\",[]],[15,\"class\",\"fa fa-bookmark\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" icon on other pages—like Tax Lots and Zoning Map Amendments.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"From this page you can quickly navigate to all of your bookmarked information.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/bookmarks.hbs" } });
});
define("labs-zola/templates/commercial-overlay", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eLGpAL/2", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"isRunning\"]]],null,{\"statements\":[[6,[\"content-placeholders\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[1]]],false],[0,\"\\n      \"],[1,[28,[\"placeholder\",\"nav\"]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[10]]],false],[0,\"\\n\"]],\"locals\":[\"placeholder\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"label\",[]],[15,\"class\",\"header-label clearfix\"],[13],[0,\"\\n      Commercial Overlay \"],[11,\"span\",[]],[15,\"class\",\"medium-gray\"],[13],[0,\"|\"],[14],[0,\" \"],[1,[28,[\"overlay\",\"id\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h1\",[]],[15,\"class\",\"content-header\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"spd-header\"],[13],[1,[28,[\"overlay\",\"id\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs (grocery stores, dry cleaners, restaurants, for example). Commercial overlay districts, designated by the letters C1-1 through C1-5 and C2-1 through C2-5, are shown on the zoning maps as a pattern superimposed on a residential district.\"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"Unless otherwise specified on the zoning maps, the depth of C1 overlay districts, measured from the nearest street, is 200 feet for C1-1 districts, 150 feet for C1-2, C1-3, C2-1, C2-2 and C2-3 districts, and 100 feet for C1-4, C1-5, C2-4 and C2-5 districts. When mapped on the long dimension of a block, commercial overlays extend to the midpoint of that block.\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[11,\"a\",[]],[15,\"href\",\"https://www1.nyc.gov/site/planning/zoning/districts-tools/c1-c2-overlays.page\"],[15,\"target\",\"_blank\"],[13],[0,\"Learn More\"],[14],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"button tiny hollow\"],[5,[\"action\"],[[28,[null]],\"fitBounds\"]],[13],[0,\"Fit map to all \"],[1,[28,[\"overlay\",\"id\"]],false],[0,\" districts\"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/commercial-overlay.hbs" } });
});
define("labs-zola/templates/components/bbl-lookup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+ORxTJdP", "block": "{\"statements\":[[11,\"span\",[]],[15,\"class\",\"bbl-lookup-toggle button tiny gray text-orange expanded no-margin\"],[5,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null],[33,[\"not\"],[[28,[\"closed\"]]],null]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"closed\"]]],null,{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-chevron-down\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-chevron-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  BBL Lookup\\n\"],[14],[0,\"\\n\\n\"],[6,[\"unless\"],[[28,[\"closed\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"bbl-lookup-form\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"bbl-power-select\"],[13],[0,\"\\n    \"],[11,\"label\",[]],[13],[0,\"Borough\"],[14],[0,\"\\n\"],[6,[\"power-select\"],null,[[\"options\",\"searchEnabled\",\"selected\",\"searchField\",\"onchange\"],[[28,[\"boroOptions\"]],false,[28,[\"boro\"]],\"name\",[33,[\"action\"],[[28,[null]],\"setBorocode\"],null]]],{\"statements\":[[0,\"      \"],[1,[28,[\"boro\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[\"boro\"]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell auto block-container\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"Block\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"number\",[28,[\"block\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell auto lot-container\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"Lot\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"number\",[28,[\"lot\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[11,\"p\",[]],[15,\"class\",\"lu-red text-center text-small\"],[13],[1,[26,[\"errorMessage\"]],false],[14]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"input\",[]],[15,\"type\",\"submit\"],[15,\"value\",\"Go to BBL\"],[15,\"class\",\"button small expanded no-margin\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"checkBBL\"],null],null],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/bbl-lookup.hbs" } });
});
define("labs-zola/templates/components/bookmark-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IMdj8t+T", "block": "{\"statements\":[[11,\"button\",[]],[16,\"class\",[34,[\"save-button bookmark-save-button hide-for-print \",[33,[\"if\"],[[28,[\"saved\"]],\"saved\"],null]]]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"toggleSaved\"],null],null],[13],[0,\"\\n  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-bookmark\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"state\"],[13],[6,[\"if\"],[[28,[\"saved\"]]],null,{\"statements\":[[0,\"SAVED\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/bookmark-button.hbs" } });
});
define("labs-zola/templates/components/cascading-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tbnBjACl", "block": "{\"statements\":[[18,\"default\",[[33,[\"hash\"],null,[[\"allSelected\",\"group\"],[[28,[\"allSelected\"]],[28,[\"group\"]]]]]]],[0,\"\\n\"],[1,[33,[\"input\"],null,[[\"type\",\"checked\",\"indeterminate\",\"click\"],[\"checkbox\",[28,[\"selected\"]],[28,[\"indeterminate\"]],[33,[\"action\"],[[28,[null]],\"toggleChildren\"],null]]]],false],[0,\" \\nSelect All\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/cascading-checkbox.hbs" } });
});
define("labs-zola/templates/components/content-area", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qR6UmWtT", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/content-area.hbs" } });
});
define("labs-zola/templates/components/group-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aBCC2qmi", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/group-checkbox.hbs" } });
});
define("labs-zola/templates/components/hover-tooltip", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Vq5On5pK", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"map-popup\"],[16,\"style\",[26,[\"style\"]],null],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"visible\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"map-popup--box\"],[13],[0,\"\\n        \"],[1,[26,[\"text\"]],true],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/hover-tooltip.hbs" } });
});
define("labs-zola/templates/components/info-tooltip", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5CuBRkZd", "block": "{\"statements\":[[11,\"span\",[]],[13],[0,\"\\n  \"],[11,\"i\",[]],[16,\"class\",[34,[\"fa fa-\",[26,[\"iconName\"]]]]],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"],[6,[\"tooltip-on-element\"],null,[[\"keepInWindow\",\"side\",\"duration\",\"event\",\"class\"],[false,[28,[\"side\"]],50000,\"hover\",[28,[\"tooltipClass\"]]]],{\"statements\":[[0,\"    \"],[1,[26,[\"tip\"]],false],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/info-tooltip.hbs" } });
});
define("labs-zola/templates/components/interactive-layers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qzD0xq4u", "block": "{\"statements\":[[11,\"ul\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"config\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"config\",\"qps\"],[[28,[\"group\"]],[28,[\"qps\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"group\"]},null],[14],[0,\"\\n\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/interactive-layers.hbs" } });
});
define("labs-zola/templates/components/intersecting-layers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nkYkUINS", "block": "{\"statements\":[[6,[\"if\"],[[33,[\"await\"],[[28,[\"intersectingLayers\"]]],null]],null,{\"statements\":[[0,\"  \"],[18,\"default\",[[28,[\"layers\"]],[28,[\"numberIntersecting\"]]]],[0,\"\\n\"]],\"locals\":[\"layers\"]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"sk-circle\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle1 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle2 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle3 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle4 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle5 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle6 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle7 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle8 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle9 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle10 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle11 sk-child\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sk-circle12 sk-child\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/intersecting-layers.hbs" } });
});
define("labs-zola/templates/components/layer-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UQLNeGak", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-checkbox.hbs" } });
});
define("labs-zola/templates/components/layer-control-timeline", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8QuyEXdo", "block": "{\"statements\":[[1,[33,[\"range-slider\"],null,[[\"start\",\"min\",\"max\",\"tooltips\",\"connect\",\"step\",\"behaviour\",\"on-change\"],[[28,[\"start\"]],[28,[\"min\"]],[28,[\"max\"]],[33,[\"array\"],[[28,[\"format\"]],[28,[\"format\"]]],null],true,1,\"drag\",\"sliderChanged\"]]],false],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-control-timeline.hbs" } });
});
define("labs-zola/templates/components/layer-group", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "In0uq9CG", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"visible\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"config\",\"layers\"]]],[[\"key\"],[\"layer.id\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer\"]]],[[\"layer\",\"didUpdateLayers\",\"before\"],[[28,[\"layerConfig\",\"layer\"]],[28,[\"didUpdateLayers\"]],[28,[\"before\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"layerConfig\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-group.hbs" } });
});
define("labs-zola/templates/components/layer-menu-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "A7uTdbtM", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"layer\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"layer-menu-item\"],[5,[\"action\"],[[28,[null]],\"toggleVisibility\"]],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"or\"],[[28,[\"warning\"]],[28,[\"titleTooltip\"]]],null]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"layer-tooltips-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"warning\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"info-tooltip\"],null,[[\"iconName\",\"tip\",\"classNames\",\"tooltipClass\"],[\"warning\",\"Some information may not visible at this zoom level.\",\"layer-warning\",\"tooltip--layer-warning\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"titleTooltip\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"info-tooltip\"],null,[[\"tip\",\"classNames\",\"tooltipClass\"],[[28,[\"titleTooltip\"]],\"layer-info\",\"tooltip--layer-info\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[1,[33,[\"switch-toggle\"],null,[[\"checked\"],[[28,[\"visible\"]]]]],false],[0,\"\\n\\n    \"],[1,[26,[\"title\"]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"visible\"]]],null,{\"statements\":[[6,[\"with\"],[[28,[\"legendIcon\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"legendIcon\"]],\"admin-line\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"layer-group-legend\"],[16,\"style\",[34,[\"border-color:\",[26,[\"legendColor\"]],\";\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"legendIcon\"]],\"polygon\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"icon polygon legend-icon\"],[16,\"style\",[34,[\"background-color:\",[26,[\"legendColor\"]],\";\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"legendIcon\"]},null]],\"locals\":[]},null],[0,\"\\n\\n  \"],[14],[0,\"\\n  \"],[18,\"default\",[[33,[\"hash\"],null,[[\"layer\",\"updateSql\",\"updatePaintFor\",\"multi-select\",\"range-slider\",\"radio-selector\"],[[28,[\"layer\"]],[33,[\"action\"],[[28,[null]],\"updateSql\"],null],[33,[\"action\"],[[28,[null]],\"updatePaintFor\"],null],[33,[\"component\"],[\"layer-multi-select-control\"],[[\"parentComponent\"],[[28,[null,\"layer\"]]]]],[33,[\"component\"],[\"layer-control-timeline\"],[[\"parentComponent\"],[[28,[null,\"layer\"]]]]],[33,[\"component\"],[\"radio-selector\"],[[\"layers\"],[[28,[null,\"layer\",\"config\",\"layers\"]]]]]]]]]],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-menu-item.hbs" } });
});
define("labs-zola/templates/components/layer-multi-select-control", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DNKy/eAd", "block": "{\"statements\":[[18,\"default\",[[33,[\"hash\"],null,[[\"checkbox\",\"selectionChanged\",\"allChecked\"],[[33,[\"component\"],[\"layer-checkbox\"],[[\"selectionChanged\",\"parentComponent\"],[[33,[\"action\"],[[28,[null]],\"selectionChanged\"],null],[28,[null]]]]],[33,[\"action\"],[[28,[null]],\"selectionChanged\"],null],[28,[\"allChecked\"]]]]]]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-multi-select-control.hbs" } });
});
define("labs-zola/templates/components/layer-palette-accordion", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0dbg+0r7", "block": "{\"statements\":[[11,\"h5\",[]],[16,\"class\",[34,[\"layer-palette-accordion-title \",[33,[\"if\"],[[28,[\"closed\"]],\"closed\"],null]]]],[5,[\"action\"],[[28,[null]],\"toggleClosed\"]],[13],[0,\"\\n  \"],[1,[26,[\"title\"]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"numberVisible\"]]],null,{\"statements\":[[0,\"    \"],[11,\"span\",[]],[15,\"class\",\"badge\"],[13],[1,[26,[\"numberVisible\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"ul\",[]],[16,\"class\",[34,[\"layers-collection \",[33,[\"if\"],[[28,[\"closed\"]],\"hide\"],null]]]],[13],[0,\"\\n  \"],[18,\"default\"],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-palette-accordion.hbs" } });
});
define("labs-zola/templates/components/layer-palette", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hqnGRGfU", "block": "{\"statements\":[[11,\"button\",[]],[16,\"class\",[34,[\"button hollow expanded hide-for-medium hide-for-print\",[33,[\"if\"],[[28,[\"closed\"]],\" no-margin\"],null]]]],[5,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null],[33,[\"not\"],[[28,[\"closed\"]]],null]]],[13],[0,\"\\n  \"],[6,[\"if\"],[[28,[\"closed\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-chevron-down\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Edit Map Layers\"]],\"locals\":[]},{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-chevron-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Close Map Layers\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"id\",\"layers-menu\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"closed\"]],\"show-for-medium\"],null],\" hide-for-print\"]]],[13],[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,[[\"closed\",\"title\"],[false,\"Zoning and Land Use\"]],{\"statements\":[[6,[\"layer-menu-item\"],null,[[\"for\"],[\"pluto\"]],{\"statements\":[[6,[\"if\"],[[33,[\"lt\"],[[28,[\"mainMap\",\"currentZoom\"]],[28,[\"item\",\"layer\",\"minzoom\"]]],null]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"info-tooltip\"],null,[[\"iconName\",\"tip\"],[\"warning\",\"Zoom in more to see\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"checkbox-wrapper\"],[16,\"onclick\",[33,[\"queue\"],[[33,[\"action\"],[[28,[null]],\"toggleFill\"],null],[33,[\"action\"],[[28,[null]],[28,[\"item\",\"updatePaintFor\"]],\"pluto-fill\",[33,[\"if\"],[[28,[\"plutoFill\"]],[33,[\"hash\"],null,[[\"fill-opacity\"],[0.7]]],[33,[\"hash\"],null,[[\"fill-opacity\"],[0]]]],null]],null]],null],null],[13],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"type\",\"checked\"],[\"checkbox\",[28,[\"plutoFill\"]]]]],false],[0,\"\\n          Show Land Use Colors\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"plutoFill\"]]],null,{\"statements\":[[0,\"          \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#FEFFA8;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"One & Two Family Buildings\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#FCB842;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Multi-Family Walk-Up Buildings\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#B16E00;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Multi-Family Elevator Buildings\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#ff8341;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Mixed Residential & Commercial Buildings\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#fc2929;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Commercial & Office Buildings\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#E362FB;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Industrial & Manufacturing\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#E0BEEB;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Transportation & Utility\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#44A3D5;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Public Facilities & Institutions\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#78D271;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Open Space & Outdoor Recreation\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#BAB8B6;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Parking Facilities\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#555555;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Vacant Land\"],[14],[0,\"\\n            \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#E7E7E7;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Other\"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"zoning-districts\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[6,[\"layer-multi-select-control\"],null,[[\"column\",\"source\",\"parentComponent\"],[\"primaryzone\",\"zoning-districts\",[28,[\"item\",\"layer\"]]]],{\"statements\":[[0,\"            \"],[11,\"ul\",[]],[15,\"class\",\"layer-menu-item--group-checkboxes\"],[13],[0,\"\\n              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[1,[33,[\"group-checkbox\"],null,[[\"refs\",\"values\",\"scope\"],[[33,[\"array\"],[\"qps.C1\",\"qps.C2\",\"qps.C3\",\"qps.C4\",\"qps.C5\",\"qps.C6\",\"qps.C7\",\"qps.C8\"],null],[33,[\"array\"],[[28,[\"qps\",\"C1\"]],[28,[\"qps\",\"C2\"]],[28,[\"qps\",\"C3\"]],[28,[\"qps\",\"C4\"]],[28,[\"qps\",\"C5\"]],[28,[\"qps\",\"C6\"]],[28,[\"qps\",\"C7\"]],[28,[\"qps\",\"C8\"]]],null],[28,[\"qps\"]]]]],false],[0,\"Commercial Districts \"],[11,\"span\",[]],[15,\"style\",\"background-color:#ff0000;\"],[15,\"class\",\"icon polygon legend-icon\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"input\",[]],[15,\"id\",\"nested-commercial\"],[15,\"class\",\"checkbox-hide-sibling\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"nested-commercial\"],[15,\"class\",\"hidable-sibling-toggle top-right\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-angle-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"ul\",[]],[15,\"class\",\"nested columns-3 hidable-sibling\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1\",[28,[\"qps\",\"C1\"]]]]],false],[0,\"C1\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2\",[28,[\"qps\",\"C2\"]]]]],false],[0,\"C2\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C3\",[28,[\"qps\",\"C3\"]]]]],false],[0,\"C3\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C4\",[28,[\"qps\",\"C4\"]]]]],false],[0,\"C4\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C5\",[28,[\"qps\",\"C5\"]]]]],false],[0,\"C5\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C6\",[28,[\"qps\",\"C6\"]]]]],false],[0,\"C6\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C7\",[28,[\"qps\",\"C7\"]]]]],false],[0,\"C7\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C8\",[28,[\"qps\",\"C8\"]]]]],false],[0,\"C8\"],[14],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[1,[33,[\"group-checkbox\"],null,[[\"refs\",\"values\",\"scope\"],[[33,[\"array\"],[\"qps.M1\",\"qps.M2\",\"qps.M3\"],null],[33,[\"array\"],[[28,[\"qps\",\"M1\"]],[28,[\"qps\",\"M2\"]],[28,[\"qps\",\"M3\"]]],null],[28,[\"qps\"]]]]],false],[0,\"Manufacturing Districts \"],[11,\"span\",[]],[15,\"style\",\"background-color:#e362fb;\"],[15,\"class\",\"icon polygon legend-icon\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"input\",[]],[15,\"id\",\"nested-manufacturing\"],[15,\"class\",\"checkbox-hide-sibling\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"nested-manufacturing\"],[15,\"class\",\"hidable-sibling-toggle top-right\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-angle-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"ul\",[]],[15,\"class\",\"nested columns-3 hidable-sibling\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"M1\",[28,[\"qps\",\"M1\"]]]]],false],[0,\"M1\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"M2\",[28,[\"qps\",\"M2\"]]]]],false],[0,\"M2\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"M3\",[28,[\"qps\",\"M3\"]]]]],false],[0,\"M3\"],[14],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[1,[33,[\"group-checkbox\"],null,[[\"refs\",\"values\",\"scope\"],[[33,[\"array\"],[\"qps.R1\",\"qps.R2\",\"qps.R3\",\"qps.R4\",\"qps.R5\",\"qps.R6\",\"qps.R7\",\"qps.R8\",\"qps.R9\",\"qps.R10\"],null],[33,[\"array\"],[[28,[\"qps\",\"R1\"]],[28,[\"qps\",\"R2\"]],[28,[\"qps\",\"R3\"]],[28,[\"qps\",\"R4\"]],[28,[\"qps\",\"R5\"]],[28,[\"qps\",\"R6\"]],[28,[\"qps\",\"R7\"]],[28,[\"qps\",\"R8\"]],[28,[\"qps\",\"R9\"]],[28,[\"qps\",\"R10\"]]],null],[28,[\"qps\"]]]]],false],[0,\"Residential Districts  \"],[11,\"span\",[]],[15,\"style\",\"background-color:#f2f618;\"],[15,\"class\",\"icon polygon legend-icon\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"input\",[]],[15,\"id\",\"nested-residential\"],[15,\"class\",\"checkbox-hide-sibling\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"nested-residential\"],[15,\"class\",\"hidable-sibling-toggle top-right\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-angle-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"ul\",[]],[15,\"class\",\"nested columns-3 hidable-sibling\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R1\",[28,[\"qps\",\"R1\"]]]]],false],[0,\"R1\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R2\",[28,[\"qps\",\"R2\"]]]]],false],[0,\"R2\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R3\",[28,[\"qps\",\"R3\"]]]]],false],[0,\"R3\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R4\",[28,[\"qps\",\"R4\"]]]]],false],[0,\"R4\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R5\",[28,[\"qps\",\"R5\"]]]]],false],[0,\"R5\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R6\",[28,[\"qps\",\"R6\"]]]]],false],[0,\"R6\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R7\",[28,[\"qps\",\"R7\"]]]]],false],[0,\"R7\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R8\",[28,[\"qps\",\"R8\"]]]]],false],[0,\"R8\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R9\",[28,[\"qps\",\"R9\"]]]]],false],[0,\"R9\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"R10\",[28,[\"qps\",\"R10\"]]]]],false],[0,\"R10\"],[14],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"PA\",[28,[\"qps\",\"PA\"]]]]],false],[0,\"Parks \"],[11,\"span\",[]],[15,\"style\",\"background-color:#78D271;\"],[15,\"class\",\"icon polygon legend-icon\"],[13],[14],[14],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"BP\",[28,[\"qps\",\"BP\"]]]]],false],[0,\"Battery Park City \"],[11,\"span\",[]],[15,\"style\",\"background-color:#666666;\"],[15,\"class\",\"icon polygon legend-icon\"],[13],[14],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"multiSelect\"]},null]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"commercial-overlays\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[6,[\"layer-multi-select-control\"],null,[[\"source\",\"column\",\"parentComponent\"],[\"commercial-overlays\",\"overlay\",[28,[\"item\",\"layer\"]]]],{\"statements\":[[0,\"            \"],[11,\"ul\",[]],[15,\"class\",\"layer-menu-item--group-checkboxes\"],[13],[0,\"\\n              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[1,[33,[\"group-checkbox\"],null,[[\"refs\",\"values\",\"scope\"],[[33,[\"array\"],[\"qps.c11\",\"qps.c12\",\"qps.c13\",\"qps.c14\",\"qps.c15\"],null],[33,[\"array\"],[[28,[\"qps\",\"c11\"]],[28,[\"qps\",\"c12\"]],[28,[\"qps\",\"c13\"]],[28,[\"qps\",\"c14\"]],[28,[\"qps\",\"c15\"]]],null],[28,[\"qps\"]]]]],false],[0,\"C1-1 through C1-5\"],[14],[0,\"\\n\\n                \"],[11,\"input\",[]],[15,\"id\",\"nested-c1\"],[15,\"class\",\"checkbox-hide-sibling\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"nested-c1\"],[15,\"class\",\"hidable-sibling-toggle top-right\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-angle-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"ul\",[]],[15,\"class\",\"nested columns-2 hidable-sibling\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1-1\",[28,[\"qps\",\"c11\"]]]]],false],[0,\"C1-1\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1-2\",[28,[\"qps\",\"c12\"]]]]],false],[0,\"C1-2\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1-3\",[28,[\"qps\",\"c13\"]]]]],false],[0,\"C1-3\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1-4\",[28,[\"qps\",\"c14\"]]]]],false],[0,\"C1-4\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C1-5\",[28,[\"qps\",\"c15\"]]]]],false],[0,\"C1-5\"],[14],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[1,[33,[\"group-checkbox\"],null,[[\"refs\",\"values\",\"scope\"],[[33,[\"array\"],[\"qps.c21\",\"qps.c22\",\"qps.c23\",\"qps.c24\",\"qps.c25\"],null],[33,[\"array\"],[[28,[\"qps\",\"c21\"]],[28,[\"qps\",\"c22\"]],[28,[\"qps\",\"c23\"]],[28,[\"qps\",\"c24\"]],[28,[\"qps\",\"c25\"]]],null],[28,[\"qps\"]]]]],false],[0,\"C2-1 through C2-5\"],[14],[0,\"\\n\\n                \"],[11,\"input\",[]],[15,\"id\",\"nested-c2\"],[15,\"class\",\"checkbox-hide-sibling\"],[15,\"type\",\"checkbox\"],[15,\"checked\",\"\"],[13],[14],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"nested-c2\"],[15,\"class\",\"hidable-sibling-toggle top-right\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-angle-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\\n                \"],[11,\"ul\",[]],[15,\"class\",\"nested columns-2 hidable-sibling\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2-1\",[28,[\"qps\",\"c21\"]]]]],false],[0,\"C2-1\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2-2\",[28,[\"qps\",\"c22\"]]]]],false],[0,\"C2-2\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2-3\",[28,[\"qps\",\"c23\"]]]]],false],[0,\"C2-3\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2-4\",[28,[\"qps\",\"c24\"]]]]],false],[0,\"C2-4\"],[14],[14],[0,\"\\n                  \"],[11,\"li\",[]],[13],[11,\"label\",[]],[13],[1,[33,[\"component\"],[[28,[\"multiSelect\",\"checkbox\"]]],[[\"value\",\"checked\"],[\"C2-5\",[28,[\"qps\",\"c25\"]]]]],false],[0,\"C2-5\"],[14],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"multiSelect\"]},null]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"zoning-map-amendments\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[[28,[\"item\",\"range-slider\"]]],[[\"source\",\"column\"],[\"zoning-map-amendments\",\"effective\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"zoning-map-amendments-pending\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"special-purpose-districts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"special-purpose-subdistricts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"limited-height-districts\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,[[\"closed\",\"title\"],[true,\"Supporting Zoning Layers\"]],{\"statements\":[[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"mandatory-inclusionary-housing\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"inclusionary-housing\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"transit-zones\"]]],false],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"fresh\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"      \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#0B9390;opacity:0.4;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Zoning incentives\"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#30BF4E;opacity:0.4;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Zoning and discretionary tax incentives\"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#8FE339;opacity:0.4;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Discretionary tax incentives\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"sidewalkcafes\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#28AD15;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-minus\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"All Cafes Permitted\"],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#CC3DCA;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-minus\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Small Cafes Permitted\"],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#216BC6;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-minus\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Unenclosed and Small Cafes Permitted\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"low-density-growth-mgmt-areas\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"coastal-zone-boundary\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"waterfront-access-plan\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"historic-districts\"]]],false],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"landmarks\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:rgba(147, 245, 201, 1);\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Individual Landmarks\"],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:rgba(152, 152, 247, 1);\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Interior Landmarks\"],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:purple;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-square\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"Scenic Landmarks\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"effective-flood-insurance-rate-2007\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#0084a8;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"V Zone \"],[1,[33,[\"info-tooltip\"],null,[[\"side\",\"tip\"],[\"right\",\"Portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger). V Zones are subject to more stringent building requirements than other zones because of the damaging force of waves.\"]]],false],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#00a9e6;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"A Zone \"],[1,[33,[\"info-tooltip\"],null,[[\"side\",\"tip\"],[\"right\",\"A portion of the area subject to flooding from the 1% annual chance flood. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.\"]]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"preliminary-flood-insurance-rate\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#0084a8;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"V Zone \"],[1,[33,[\"info-tooltip\"],null,[[\"side\",\"tip\"],[\"right\",\"Portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger). V Zones are subject to more stringent building requirements than other zones because of the damaging force of waves.\"]]],false],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#00a9e6;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"A Zone \"],[1,[33,[\"info-tooltip\"],null,[[\"side\",\"tip\"],[\"right\",\"A portion of the area subject to flooding from the 1% annual chance flood. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.\"]]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"business-improvement-districts\"]]],false],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"e-designations\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[11,\"span\",[]],[15,\"style\",\"color:#3a28dd;\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-circle-o\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"E-designation\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,[[\"closed\",\"title\"],[true,\"Administrative Boundaries\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"boroughs\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"community-districts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"nyccouncildistricts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"nysenatedistricts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"assemblydistricts\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"neighborhood-tabulation-areas\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,[[\"closed\",\"title\"],[true,\"Basemaps\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"subway\"]]],false],[0,\"\\n    \"],[1,[33,[\"layer-menu-item\"],null,[[\"for\"],[\"building-footprints\"]]],false],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"threed-buildings\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"      \"],[11,\"ul\",[]],[15,\"class\",\"layer-key\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"Drag the compass arrow (\"],[11,\"span\",[]],[15,\"style\",\"padding: 0; margin-right: -5px; margin-left: -5px;\"],[15,\"class\",\"mapboxgl-ctrl-icon mapboxgl-ctrl-compass\"],[13],[11,\"span\",[]],[15,\"style\",\"transform: rotate(0deg) scale(0.7); margin: 0; transform-origin: 50% 100%; position: relative; top: 0.25rem; margin-top: -8px;\"],[15,\"class\",\"mapboxgl-ctrl-compass-arrow\"],[13],[14],[14],[0,\") to adjust the bearing of the map. Click to reset north.\"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"CTRL + drag the map (or CTRL + arrow keys) to adjust both pitch and bearing.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"],[6,[\"layer-menu-item\"],null,[[\"for\"],[\"aerials\"]],{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"layer\",\"visible\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[[28,[\"item\",\"radio-selector\"]]],[[\"qps\",\"classNames\"],[[28,[\"qps\"]],\"list-float-3\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"item\"]},null],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"a\",[]],[15,\"class\",\"button gray small reset-map-button\"],[16,\"disabled\",[26,[\"isDefault\"]],null],[5,[\"action\"],[[28,[null]],[28,[\"resetQueryParams\"]]]],[13],[0,\"\\n    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-undo\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Reset Map Layers\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-palette.hbs" } });
});
define("labs-zola/templates/components/layer-static-legend", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xxRFWm8n", "block": "{\"statements\":[[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"legend\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-lg fa-square\"],[15,\"aria-hidden\",\"true\"],[16,\"style\",[33,[\"if\"],[[33,[\"object-at\"],[1,[28,[\"key\"]]],null],[33,[\"concat\"],[\"color:\",[33,[\"object-at\"],[1,[28,[\"key\"]]],null]],null]],null],null],[13],[14],[0,\" \"],[1,[33,[\"object-at\"],[0,[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-static-legend.hbs" } });
});
define("labs-zola/templates/components/layer-tooltip", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YDsHCt7B", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/layer-tooltip.hbs" } });
});
define("labs-zola/templates/components/link-to-intersecting", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KRuPNZBm", "block": "{\"statements\":[[6,[\"if\"],[[29,\"default\"]],null,{\"statements\":[[6,[\"if\"],[[33,[\"await\"],[[28,[\"resultingFeature\"]]],null]],null,{\"statements\":[[0,\"    \"],[18,\"default\",[[33,[\"hash\"],null,[[\"resultingFeature\"],[[28,[\"id\"]]]]]]],[0,\"\\n\"]],\"locals\":[\"id\"]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"await\"],[[28,[\"resultingFeature\"]]],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"id\"]]],null,{\"statements\":[[0,\"      \"],[6,[\"link-to\"],[[28,[\"route\"]],[28,[\"id\"]]],[[\"classNames\"],[[28,[\"classNames\"]]]],{\"statements\":[[1,[26,[\"string\"]],false]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"id\"]},null]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/link-to-intersecting.hbs" } });
});
define("labs-zola/templates/components/lot-bookmark-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pBHXztg2", "block": "{\"statements\":[[11,\"li\",[]],[15,\"class\",\"lot-bookmark\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"icon tax-lot\"],[13],[14],[0,\"\\n\"],[6,[\"link-to\"],[\"lot\",[28,[\"lot\",\"bookmark\",\"boro\"]],[28,[\"lot\",\"bookmark\",\"block\"]],[28,[\"lot\",\"bookmark\",\"lot\"]]],null,{\"statements\":[[0,\"      \"],[1,[28,[\"lot\",\"bookmark\",\"address\"]],false],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"dark-gray\"],[13],[0,\"\\n        \"],[1,[28,[\"lot\",\"bookmark\",\"bbl\"]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"button\",[]],[15,\"class\",\"float-right lu-red delete-bookmark-button\"],[5,[\"action\"],[[28,[null]],\"deleteBookmark\",[28,[\"lot\"]]]],[13],[0,\"\\n    ×\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/lot-bookmark-item.hbs" } });
});
define("labs-zola/templates/components/main-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mt0cj/7+", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"loading\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"spinner\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"double-bounce1\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"double-bounce2\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"mapbox-gl\"],null,[[\"id\",\"initOptions\",\"mapLoaded\"],[\"main-map\",[33,[\"hash\"],null,[[\"style\",\"zoom\",\"center\",\"hash\"],[\"//raw.githubusercontent.com/NYCPlanning/labs-gl-style/master/data/style.json\",[28,[\"zoom\"]],[33,[\"array\"],[[28,[\"lng\"]],[28,[\"lat\"]]],null],true]]],[33,[\"action\"],[[28,[null]],\"handleMapLoad\"],null]]],{\"statements\":[[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"neighborhood-tabulation-areas\",[28,[\"qps\",\"neighborhood-tabulation-areas\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\",\"didToggleVisibility\"],[\"threed-buildings\",[28,[\"qps\",\"threed-buildings\"]],[33,[\"action\"],[[28,[null]],\"adjustBuildingsLayer\"],null]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"assemblydistricts\",[28,[\"qps\",\"assemblydistricts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"nysenatedistricts\",[28,[\"qps\",\"nysenatedistricts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"nyccouncildistricts\",[28,[\"qps\",\"nyccouncildistricts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"community-districts\",[28,[\"qps\",\"community-districts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"boroughs\",[28,[\"qps\",\"boroughs\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"subway\",[28,[\"qps\",\"subway\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"building-footprints\",[28,[\"qps\",\"building-footprints\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"landmarks\",[28,[\"qps\",\"landmarks\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"e-designations\",[28,[\"qps\",\"e-designations\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"pluto\",[28,[\"qps\",\"pluto\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"commercial-overlays\",[28,[\"qps\",\"commercial-overlays\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"historic-districts\",[28,[\"qps\",\"historic-districts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"waterfront-access-plan\",[28,[\"qps\",\"waterfront-access-plan\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"coastal-zone-boundary\",[28,[\"qps\",\"coastal-zone-boundary\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"low-density-growth-mgmt-areas\",[28,[\"qps\",\"low-density-growth-mgmt-areas\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"sidewalkcafes\",[28,[\"qps\",\"sidewalkcafes\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"effective-flood-insurance-rate-2007\",[28,[\"qps\",\"effective-flood-insurance-rate-2007\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"preliminary-flood-insurance-rate\",[28,[\"qps\",\"preliminary-flood-insurance-rate\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"fresh\",[28,[\"qps\",\"fresh\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"transit-zones\",[28,[\"qps\",\"transit-zones\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"inclusionary-housing\",[28,[\"qps\",\"inclusionary-housing\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"mandatory-inclusionary-housing\",[28,[\"qps\",\"mandatory-inclusionary-housing\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"business-improvement-districts\",[28,[\"qps\",\"business-improvement-districts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"limited-height-districts\",[28,[\"qps\",\"limited-height-districts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"special-purpose-subdistricts\",[28,[\"qps\",\"special-purpose-subdistricts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"special-purpose-districts\",[28,[\"qps\",\"special-purpose-districts\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"zoning-map-amendments-pending\",[28,[\"qps\",\"zoning-map-amendments-pending\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"zoning-map-amendments\",[28,[\"qps\",\"zoning-map-amendments\"]]]]],false],[0,\"\\n\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"zoning-districts\",[28,[\"qps\",\"zoning-districts\"]]]]],false],[0,\"\\n\\n\"],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer-group\"]]],[[\"for\",\"visible\"],[\"aerials\",[28,[\"qps\",\"aerials\"]]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"mapMouseover\",\"highlightedLotFeatures\"]]],null,{\"statements\":[[6,[\"component\"],[[28,[\"map\",\"source\"]]],[[\"sourceId\",\"options\"],[\"highlighted-lot\",[28,[\"mapMouseover\",\"highlightedLotSource\"]]]],{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"highlightedLotLayer\"]],\"place_other\"]]],false],[0,\"\\n\"]],\"locals\":[\"source\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"bookmarkedLotsLayer\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"component\"],[[28,[\"map\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"bookmarkedLotsLayer\"]],\"place_other\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[1,[26,[\"hover-tooltip\"]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"mainMap\",\"selected\"]]],null,{\"statements\":[[6,[\"component\"],[[28,[\"map\",\"source\"]]],[[\"sourceId\",\"options\"],[\"selected-lot\",[28,[\"selectedLotSource\"]]]],{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"selectedFillLayer\"]],\"place_other\"]]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"selectedLineLayer\"]],\"place_other\"]]],false],[0,\"\\n\"]],\"locals\":[\"source\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mainMap\",\"drawnFeature\"]]],null,{\"statements\":[[6,[\"component\"],[[28,[\"map\",\"source\"]]],[[\"sourceId\",\"options\"],[\"drawn-feature\",[28,[\"mainMap\",\"drawnFeatureSource\"]]]],{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"drawnFeatureLayers\",\"line\"]],\"place_other\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"mainMap\",\"drawnFeature\",\"type\"]],\"Polygon\"],null]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\",\"before\"],[[28,[\"drawnFeatureLayers\",\"fill\"]],\"place_other\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"source\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mainMap\",\"currentAddress\"]]],null,{\"statements\":[[6,[\"component\"],[[28,[\"map\",\"source\"]]],[[\"sourceId\",\"options\"],[\"currentAddress\",[28,[\"mainMap\",\"addressSource\"]]]],{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"source\",\"layer\"]]],[[\"layer\"],[[28,[\"mainMap\",\"pointLayer\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"source\"]},null]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"shouldFitBounds\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"component\"],[[28,[\"map\",\"call\"]],\"fitBounds\",[28,[\"mainMap\",\"bounds\"]],[28,[\"mainMap\",\"isSelectedBoundsOptions\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"click\",[33,[\"action\"],[[28,[null]],[28,[\"routeToLot\"]]],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"data\",[33,[\"action\"],[[28,[null]],\"mapLoading\"],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"zoomend\",[33,[\"action\"],[[28,[null]],\"handleZoomend\"],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"mousemove\",[33,[\"action\"],[[28,[null]],\"handleMousemove\"],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"mouseout\",[33,[\"action\"],[[28,[null]],\"handleMouseleave\"],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"draw.create\",[33,[\"action\"],[[28,[null]],\"handleDrawCreate\"],null]],null],false],[0,\"\\n  \"],[1,[33,[\"component\"],[[28,[\"map\",\"on\"]],\"draw.render\",[33,[\"action\"],[[28,[null]],\"handleMeasurement\"],null]],null],false],[0,\"\\n\\n\"]],\"locals\":[\"map\"]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"draw-tools\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"hide-for-large\"],[5,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"drawToolsOpen\"]]],null],[33,[\"not\"],[[28,[\"drawToolsOpen\"]]],null]]],[13],[0,\"\\n      \"],[6,[\"if\"],[[28,[\"drawToolsOpen\"]]],null,{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-chevron-left\"],[15,\"aria-hidden\",\"true\"],[13],[14]],\"locals\":[]},{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-pencil\"],[15,\"aria-hidden\",\"true\"],[13],[14]],\"locals\":[]}],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"show-for-large\"],[13],[0,\"Measure\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"class\",[34,[\"draw-tool draw-tool--line \",[33,[\"unless\"],[[28,[\"drawToolsOpen\"]],\"show-for-large\"],null],\" \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"mainMap\",\"drawMode\"]],\"draw_line_string\"],null],\"active\"],null]]]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"startDraw\",\"line\"],null],null],[13],[11,\"span\",[]],[15,\"class\",\"icon distance\"],[13],[14],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"class\",[34,[\"draw-tool draw-tool--polygon \",[33,[\"unless\"],[[28,[\"drawToolsOpen\"]],\"show-for-large\"],null],\" \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"mainMap\",\"drawMode\"]],\"draw_polygon\"],null],\"active\"],null]]]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"startDraw\",\"polygon\"],null],null],[13],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"drawnMeasurements\"]]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[15,\"class\",\"draw-tool draw-tool--clear\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"clearDraw\"],null],null],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-times\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"drawnMeasurements\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"draw-measurement\"],[13],[0,\"\\n    \"],[1,[33,[\"if\"],[[33,[\"eq\"],[[28,[\"measurementUnitType\"]],\"standard\"],null],[28,[\"drawnMeasurements\",\"standard\"]],[28,[\"drawnMeasurements\",\"metric\"]]],null],false],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"draw-measurement-menu-button\"],[5,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"measurementMenuOpen\"]]],null],[33,[\"not\"],[[28,[\"measurementMenuOpen\"]]],null]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"measurementMenuOpen\"]]],null,{\"statements\":[[0,\"        \"],[11,\"i\",[]],[15,\"class\",\"fa fa-caret-down\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"i\",[]],[15,\"class\",\"fa fa-caret-up\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[6,[\"if\"],[[28,[\"measurementMenuOpen\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"draw-measurement-menu\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"button tiny gray\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"handleUnitsToggle\",\"standard\"],null],null],[13],[0,\"\\n            \"],[11,\"i\",[]],[16,\"class\",[34,[\"fa fa-\",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"measurementUnitType\"]],\"standard\"],null],\"dot-circle-o\",\"circle-thin\"],null],\" \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"measurementUnitType\"]],\"metric\"],null],\"medium-gray\"],null]]]],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Standard\\n          \"],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"button tiny gray\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"handleUnitsToggle\",\"metric\"],null],null],[13],[0,\"\\n            \"],[11,\"i\",[]],[16,\"class\",[34,[\"fa fa-\",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"measurementUnitType\"]],\"metric\"],null],\"dot-circle-o\",\"circle-thin\"],null],\" \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"measurementUnitType\"]],\"standard\"],null],\"medium-gray\"],null]]]],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Metric\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"findMeDismissed\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"find-me\"],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"button hide-for-medium hide-for-print no-margin\"],[5,[\"action\"],[[28,[null]],\"locateMe\"]],[13],[0,\"Locate Me\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"button hide-for-medium hide-for-print no-margin\"],[5,[\"action\"],[[28,[null]],\"dismissFindMe\"]],[13],[0,\"×\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/main-map.hbs" } });
});
define("labs-zola/templates/components/map-search", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6y0ssPze", "block": "{\"statements\":[[1,[33,[\"input\"],null,[[\"type\",\"placeholder\",\"class\",\"value\",\"focus-in\",\"focus-out\"],[\"text\",\"Search...\",\"map-search-input\",[28,[\"searchTerms\"]],[33,[\"action\"],[[28,[null]],\"handleFocusIn\"],null],[33,[\"action\"],[[28,[null]],\"handleFocusOut\"],null]]]],false],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"searchTerms\"]]],null,{\"statements\":[[0,\"  \"],[11,\"button\",[]],[15,\"class\",\"clear-button\"],[15,\"aria-label\",\"Clear Search\"],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"clear\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"and\"],[[28,[\"loading\"]],[33,[\"is-fulfilled\"],[[28,[\"loading\"]]],null]],null]],null,{\"statements\":[[0,\"      \"],[11,\"i\",[]],[15,\"class\",\"fa fa-spinner fa-spin dark-gray\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"i\",[]],[15,\"class\",\"fa fa-times dark-gray\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"search-icon\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-search\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[11,\"ul\",[]],[16,\"class\",[34,[\"search-results no-bullet\",[33,[\"if\"],[[33,[\"or\"],[[28,[\"resultsCount\"]],[28,[\"prevResults\"]]],null],\" has-results\"],null],[33,[\"if\"],[[28,[\"focused\"]],\" focused\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-fulfilled\"],[[28,[\"results\"]]],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"-each-in\"],[[33,[\"group-by\"],[\"type\",[28,[\"results\",\"value\"]]],null]],null]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"lot\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Tax Lot Information\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zma\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Zoning Change Information\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"neighborhood\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"Go to Neighborhood\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zoning-district\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Zoning Districts\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"commercial-overlay\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Commerical Overlay\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"special-purpose-district\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Special Purpose District\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"Add Map Pin\"],[14],[0,\"\\n        \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"rows\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[16,\"class\",[34,[\"result \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"selected\"]],[28,[\"result\",\"id\"]]],null],\"highlighted-result\"],null]]]],[5,[\"action\"],[[28,[null]],\"goTo\",[28,[\"result\"]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"lot\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"icon tax-lot\"],[13],[14],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"subdued\"],[13],[1,[28,[\"result\",\"label\"]],false],[0,\", Block \"],[1,[28,[\"result\",\"demuxedBbl\",\"block\"]],false],[0,\", Lot \"],[1,[28,[\"result\",\"demuxedBbl\",\"lot\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zma\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"ulurpno\"]],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"subdued\"],[13],[1,[28,[\"result\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"neighborhood\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"i\",[]],[15,\"class\",\"fa fa-home\"],[15,\"aria-hidden\",\"true\"],[13],[14],[11,\"i\",[]],[15,\"class\",\"fa fa-building\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zoning-district\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"special-purpose-district\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"i\",[]],[15,\"class\",\"fa fa-map-pin\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n          \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[\"result\"]},null]],\"locals\":[\"type\",\"rows\"]},null]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"is-pending\"],[[28,[\"results\"]]],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"prevResults\"]]],null,{\"statements\":[[6,[\"each\"],[[33,[\"-each-in\"],[[33,[\"group-by\"],[\"type\",[28,[\"prevResults\"]]],null]],null]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"lot\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Tax Lot Information\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zma\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Zoning Change Information\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"neighborhood\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"Go to Neighborhood\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zoning-district\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Zoning Districts\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"commercial-overlay\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Commerical Overlay\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"special-purpose-district\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"View Special Purpose District\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"h4\",[]],[15,\"class\",\"header-small results-header\"],[13],[0,\"Add Map Pin\"],[14],[0,\"\\n          \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"rows\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[16,\"class\",[34,[\"result \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"selected\"]],[28,[\"result\",\"id\"]]],null],\"highlighted-result\"],null]]]],[5,[\"action\"],[[28,[null]],\"goTo\",[28,[\"result\"]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"lot\"],null]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"icon tax-lot\"],[13],[14],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"subdued\"],[13],[1,[28,[\"result\",\"label\"]],false],[0,\", Block \"],[1,[28,[\"result\",\"demuxedBbl\",\"block\"]],false],[0,\", Lot \"],[1,[28,[\"result\",\"demuxedBbl\",\"lot\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zma\"],null]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"ulurpno\"]],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"subdued\"],[13],[1,[28,[\"result\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"neighborhood\"],null]],null,{\"statements\":[[0,\"              \"],[11,\"i\",[]],[15,\"class\",\"fa fa-home\"],[15,\"aria-hidden\",\"true\"],[13],[14],[11,\"i\",[]],[15,\"class\",\"fa fa-building\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"zoning-district\"],null]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"type\"]],\"special-purpose-district\"],null]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"icon polygon\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"i\",[]],[15,\"class\",\"fa fa-map-pin\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"result\",\"label\"]],false],[0,\"\\n            \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[\"result\"]},null]],\"locals\":[\"type\",\"rows\"]},null]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"search-results--loading\"],[13],[0,\"Loading...\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"and\"],[[28,[\"searchTerms\"]],[33,[\"not\"],[[28,[\"resultsCount\"]]],null],[33,[\"is-fulfilled\"],[[28,[\"results\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"search-results--loading\"],[13],[0,\"No Results Found\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/map-search.hbs" } });
});
define("labs-zola/templates/components/mapbox-gl", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ACOOuzYe", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"glSupported\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"map\"]]],null,{\"statements\":[[0,\"    \"],[18,\"default\",[[33,[\"hash\"],null,[[\"call\",\"control\",\"layer\",\"marker\",\"on\",\"popup\",\"source\",\"layer-group\",\"interactive-layers\"],[[33,[\"component\"],[\"mapbox-gl-call\"],[[\"obj\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-control\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-layer\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-marker\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-on\"],[[\"eventSource\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-popup\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-source\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"layer-group\"],[[\"parentComponent\",\"map\"],[[28,[null]],[33,[\"hash\"],null,[[\"layer\",\"source\"],[[33,[\"component\"],[\"mapbox-gl-layer\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-source\"],[[\"map\"],[[28,[\"map\"]]]]]]]]]]],[33,[\"component\"],[\"interactive-layers\"],[[\"map\"],[[33,[\"hash\"],null,[[\"layer-group\"],[[33,[\"component\"],[\"layer-group\"],[[\"map\"],[[33,[\"hash\"],null,[[\"layer\",\"source\"],[[33,[\"component\"],[\"mapbox-gl-layer\"],[[\"map\"],[[28,[\"map\"]]]]],[33,[\"component\"],[\"mapbox-gl-source\"],[[\"map\"],[[28,[\"map\"]]]]]]]]]]]]]]]]]]]]]],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[0,\"  \"],[18,\"inverse\"],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"inverse\",\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/mapbox-gl.hbs" } });
});
define("labs-zola/templates/components/radio-selector", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5AdtAi6v", "block": "{\"statements\":[[11,\"ul\",[]],[16,\"class\",[34,[\"layer-menu-item--group-checkboxes \",[26,[\"classNames\"]]]]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"layers\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[5,[\"action\"],[[28,[null]],\"switchLayer\",[28,[\"layer\",\"layer\",\"id\"]]]],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"\\n        \"],[11,\"span\",[]],[16,\"class\",[34,[[33,[\"if\"],[[33,[\"mut\"],[[33,[\"get\"],[[28,[\"qps\"]],[28,[\"layer\",\"layer\",\"id\"]]],null]],null],\"\",\"medium-gray\"],null]]]],[13],[0,\"\\n          \"],[11,\"i\",[]],[16,\"class\",[34,[\"fa fa-\",[33,[\"if\"],[[33,[\"mut\"],[[33,[\"get\"],[[28,[\"qps\"]],[28,[\"layer\",\"layer\",\"id\"]]],null]],null],\"dot-circle-o\",\"circle-o\"],null]]]],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[28,[\"layer\",\"displayName\"]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"layer\"]},null],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/radio-selector.hbs" } });
});
define("labs-zola/templates/components/scraped-part", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9LnKC3Ba", "block": "{\"statements\":[[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[15,\"id\",\"new-Page1\"],[15,\"target\",\"_blank\"],[5,[\"action\"],[[28,[null]],\"NYCsearchBBL\"],[[\"preventDefault\"],[false]]],[13],[11,\"i\",[]],[15,\"aria-hidden\",\"true\"],[15,\"class\",\"fa fa-external-link\"],[13],[14],[0,\" NYC Buildings BIS, Property Profile Overview \"],[14],[14],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[15,\"id\",\"new-Page2\"],[16,\"href\",[34,[[28,[\"nyc_ppo\",\"cUrl\"]]]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"aria-hidden\",\"true\"],[15,\"class\",\"fa fa-external-link\"],[13],[14],[0,\" NYC Buildings BIS, Certificate(s) of Occupancy \"],[14],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum tbav_header\"],[15,\"style\",\"width:51%;\"],[13],[14],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_header\"],[13],[0,\"Total\"],[14],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_header\"],[13],[0,\"Open\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"nyc_ppo\",\"tb1\",\"link\"]]],null,{\"statements\":[[0,\"    \\t\\t\"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"nyc_ppo\",\"tb1\",\"link\"]]]]],[15,\"target\",\"_blank\"],[13],[1,[28,[\"nyc_ppo\",\"tb1\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \\t\\t\"],[1,[28,[\"nyc_ppo\",\"tb1\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"nyc_ppo\",\"tb1\",\"value\"]]],null,{\"statements\":[[0,\"\\t    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\\t\\t\\t\"],[1,[28,[\"item\"]],false],[0,\"\\n\\t    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"nyc_ppo\",\"tb2\",\"link\"]]],null,{\"statements\":[[0,\"    \\t\\t\"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"nyc_ppo\",\"tb2\",\"link\"]]]]],[15,\"target\",\"_blank\"],[13],[1,[28,[\"nyc_ppo\",\"tb2\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \\t\\t\"],[1,[28,[\"nyc_ppo\",\"tb2\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"nyc_ppo\",\"tb2\",\"value\"]]],null,{\"statements\":[[0,\"\\t    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\\t\\t\\t\"],[1,[28,[\"item\"]],false],[0,\"\\n\\t    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"nyc_ppo\",\"tb3\",\"link\"]]],null,{\"statements\":[[0,\"    \\t\\t\"],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"nyc_ppo\",\"tb3\",\"link\"]]]]],[15,\"target\",\"_blank\"],[13],[1,[28,[\"nyc_ppo\",\"tb3\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \\t\\t\"],[1,[28,[\"nyc_ppo\",\"tb3\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"nyc_ppo\",\"tb3\",\"value\"]]],null,{\"statements\":[[0,\"\\t    \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[0,\"\\n\\t\\t\\t\"],[1,[28,[\"item\"]],false],[0,\"\\n\\t    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/scraped-part.hbs" } });
});
define("labs-zola/templates/components/site-header", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/v4WJaKM", "block": "{\"statements\":[[11,\"header\",[]],[15,\"role\",\"banner\"],[13],[0,\"\\n  \"],[11,\"a\",[]],[15,\"href\",\"https://planninglabs.nyc/\"],[15,\"class\",\"labs-beta-notice hide-for-print\"],[13],[0,\"A beta project of NYC Planning Labs\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x grid-padding-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"branding cell shrink large-auto\"],[13],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"dcp-link\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/index.page\"],[13],[11,\"img\",[]],[15,\"class\",\"dcp-logo\"],[15,\"src\",\"https://raw.githubusercontent.com/NYCPlanning/logo/master/dcp_logo_772.png\"],[15,\"alt\",\"NYC Planning\"],[13],[14],[14],[0,\"\\n      \"],[6,[\"link-to\"],[\"index\"],[[\"classNames\",\"click\"],[\"site-name\",[33,[\"action\"],[[28,[null]],[28,[\"resetAll\"]]],null]]],{\"statements\":[[0,\"ZoLa \"],[11,\"small\",[]],[15,\"class\",\"site-subtitle show-for-medium\"],[13],[0,\"N\"],[11,\"span\",[]],[15,\"class\",\"show-for-large\"],[13],[0,\"ew \"],[14],[0,\"Y\"],[11,\"span\",[]],[15,\"class\",\"show-for-large\"],[13],[0,\"ork \"],[14],[0,\"C\"],[11,\"span\",[]],[15,\"class\",\"show-for-large\"],[13],[0,\"ity\"],[14],[0,\"’s Zoning & Land Use Map\"],[14]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell auto hide-for-large text-right\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"responsive-nav-toggler hide-for-print\"],[15,\"data-toggle\",\"responsive-menu\"],[5,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null],[33,[\"not\"],[[28,[\"closed\"]]],null]]],[13],[0,\"Menu\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"responsive-menu\"],[16,\"class\",[34,[\"cell large-shrink \",[33,[\"if\"],[[28,[\"closed\"]],\"show-for-large\"],null],\" hide-for-print\"]]],[15,\"data-toggler\",\".show-for-large\"],[13],[0,\"\\n      \"],[11,\"nav\",[]],[15,\"role\",\"navigation\"],[13],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"vertical large-horizontal menu\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"about\"],[[\"click\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null]],null]]],{\"statements\":[[0,\"About\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"features\"],[[\"click\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null]],null]]],{\"statements\":[[0,\"Features\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"data\"],[[\"click\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null]],null]]],{\"statements\":[[0,\"Data\"]],\"locals\":[]},null],[14],[0,\"\\n       \\n\\n          \"],[11,\"li\",[]],[15,\"class\",\"saved-bookmarks-counter\"],[13],[0,\"\\n            \"],[6,[\"link-to\"],[\"bookmarks\"],[[\"click\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"closed\"]]],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fa fa-bookmark\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\"\\n              Saved\\n\"],[6,[\"if\"],[[28,[\"count\"]]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"badge sup\"],[13],[1,[26,[\"count\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/site-header.hbs" } });
});
define("labs-zola/templates/components/switch-toggle", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gmgkDU2a", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"switch tiny float-left\"],[13],[0,\"\\n  \"],[11,\"input\",[]],[15,\"class\",\"switch-input\"],[15,\"type\",\"checkbox\"],[15,\"name\",\"exampleSwitch\"],[16,\"checked\",[26,[\"checked\"]],null],[13],[14],[0,\"\\n  \"],[11,\"label\",[]],[15,\"class\",\"switch-paddle\"],[15,\"for\",\"exampleSwitch\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"show-for-sr\"],[13],[0,\"Toggle Layer Group\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/components/switch-toggle.hbs" } });
});
define("labs-zola/templates/data", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JY8EK77B", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n  \"],[11,\"h1\",[]],[13],[0,\"Data Sources\"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[0,\"\\n      \"],[11,\"h2\",[]],[15,\"class\",\"header-medium no-margin\"],[13],[1,[28,[\"layerGroup\",\"title\"]],false],[14],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layerGroup\",\"meta\",\"description\"]]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"style\",\"display:block;\"],[15,\"class\",\"dark-gray\"],[13],[11,\"strong\",[]],[13],[1,[28,[\"layerGroup\",\"meta\",\"description\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"layerGroup\",\"meta\",\"url\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"layerGroup\",\"meta\",\"url\"]]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"style\",\"display:block;\"],[15,\"class\",\"no-margin\"],[13],[11,\"a\",[]],[16,\"href\",[34,[[28,[\"url\"]]]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"url\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"url\"]},null]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"layerGroup\",\"meta\",\"updated_at\"]]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"style\",\"display:block;\"],[15,\"class\",\"dark-gray text-small\"],[13],[0,\"Updated in ZoLa: \"],[1,[28,[\"layerGroup\",\"meta\",\"updated_at\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"layerGroup\"]},null],[0,\"  \"],[14],[0,\"\\n\\n  \"],[11,\"p\",[]],[13],[0,\"For more information on the licenses which govern OpenStreetMap, please refer to \"],[11,\"a\",[]],[15,\"href\",\"www.openstreetmap.org/copyright\"],[13],[0,\"www.openstreetmap.org/copyright\"],[14],[14],[0,\"\\n\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/data.hbs" } });
});
define("labs-zola/templates/features", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "M7vH7pod", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4 text-center medium-text-left\"],[13],[0,\"\\n\\n  \"],[11,\"h1\",[]],[13],[0,\"Features\"],[14],[0,\"\\n\\n  \"],[11,\"h2\",[]],[15,\"class\",\"header-medium\"],[13],[0,\"Search\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-search.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"The search input provide various types of results as you type.  Search for known addresses, tax lots (by BBL or address), zoning districts, zoning map amendments (by ULURP number or name), neighborhoods, and special purpose districts.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Shareable Routes\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-url.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Each tax lot, zoning district, special purpose district, and zoning map amendment  lives at its own URL, so you can easily share links.  The currently selected map layers are also included in the URL, so you can customize your view and share it with a friend.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Layer Controls\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-palette.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"The default view includes zoning districts, tax lots, commercial overlays, and subways. But many other layers are available, some with additional filtering controls.  Explore zoning map amendments, aerial imagery, historic districts, landmarks, and more.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Advanced Map Controls\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-map-controls.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Next-generation web mapping technology used in ZoLa allows you to fine tune the map's zoom, tilt, and rotation. Use the scrollwheel to zoom, hold Ctrl while dragging the map to adjust pitch and bearing.  Click the compass icon to reset north.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Find my Location\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-find-my-location.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Click the locator control and ZoLa will zoom in on your current location (you may need to give permission via your web browser).  This feature works great on mobile, so you can quickly lookup property and zoning data on the go.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"BBL Lookup\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-bbl-lookup.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"For users who want to enter a borough, block, and lot as separate fields, the BBL lookup allows you to choose a borough from the dropdown, and enter the block and lot as separate numbers.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Bookmarks\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-save.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Tax lots and other routes can be added to your \\\"Saved\\\" list, so you can quickly reference them later. Just click the bookmark icon. Address search results are automatically added so you can retrace your steps as you explore the map. Your bookmarks are cached in your web browser, so they're only available if you visit ZoLa again using the same device & browser.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"3D Buildings\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"grid-x\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-3 feature-image-cell\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"feature-image\"],[15,\"src\",\"/img/feature-3d-buildings.png\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cell medium-9\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Turn on the 3D Buildings layer (data sourced from OpenStreetMap) to view current building masses, streetwalls, and setbacks along with your other layers.  Be sure to try different pitch and bearing settings as you explore.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Open Data\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"ZoLa is built entirely on open data. The data page provides dataset descriptions, source links, and a timestamp of the last update.\"],[14],[0,\"\\n\\n  \"],[11,\"h4\",[]],[13],[0,\"Open Source\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"As with most NYC Planning Labs projects, ZoLa is 100% open source and developed in the open. You can \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/NYCPlanning/labs-zola\"],[13],[0,\"follow along on GitHub\"],[14],[0,\", and help improve ZoLa by opening issues to report bugs or request features. If you’re a developer and want to contribute to ZoLa, we will gladly accept pull requests.\"],[14],[0,\"\\n\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/features.hbs" } });
});
define("labs-zola/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aQDw+d0S", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/index.hbs" } });
});
define("labs-zola/templates/lot", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aCe+fLu0", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"isRunning\"]]],null,{\"statements\":[[6,[\"content-placeholders\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[1]]],false],[0,\"\\n      \"],[1,[28,[\"placeholder\",\"nav\"]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[10]]],false],[0,\"\\n\"]],\"locals\":[\"placeholder\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"bookmark-button\"],null,[[\"bookmark\",\"createBookmark\"],[[28,[\"lot\",\"bookmark\"]],[33,[\"action\"],[[28,[null]],\"createBookmark\"],null]]]],false],[0,\"\\n\\n    \"],[11,\"label\",[]],[15,\"class\",\"header-label clearfix\"],[13],[0,\"\\n      TAX LOT \"],[11,\"span\",[]],[15,\"class\",\"medium-gray\"],[13],[0,\"|\"],[14],[0,\" BBL \"],[1,[28,[\"lot\",\"bbl\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"h1\",[]],[15,\"class\",\"content-header\"],[13],[0,\"\\n      \"],[6,[\"if\"],[[28,[\"lot\",\"landmark\"]]],null,{\"statements\":[[11,\"span\",[]],[15,\"class\",\"landmark\"],[13],[1,[28,[\"lot\",\"landmark\"]],false],[14]],\"locals\":[]},null],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"address\"],[13],[1,[28,[\"lot\",\"address\"]],false],[0,\", \"],[1,[28,[\"lot\",\"zipcode\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[15,\"class\",\"text-small dark-gray\"],[13],[1,[28,[\"lot\",\"boroname\"]],false],[0,\" (Borough \"],[1,[28,[\"lot\",\"borocode\"]],false],[0,\") \"],[11,\"span\",[]],[15,\"class\",\"pipe\"],[13],[0,\"|\"],[14],[0,\" Block \"],[1,[28,[\"lot\",\"block\"]],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"pipe\"],[13],[0,\"|\"],[14],[0,\" Lot \"],[1,[28,[\"lot\",\"lot\"]],false],[14],[0,\"\\n\\n    \"],[1,[26,[\"crawledFunc\"]],false],[0,\"\\n    \"],[1,[26,[\"crawledFunc1\"]],false],[0,\"\\n    \"],[1,[26,[\"NYC_func\"]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[\"lot\",\"zonedist1\"]]],null,{\"statements\":[[0,\"      \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"menu-text\"],[13],[0,\"Zoning District\"],[1,[33,[\"if\"],[[33,[\"or\"],[[28,[\"lot\",\"zonedist2\"]],[28,[\"lot\",\"spdist1\"]]],null],\"s\"],null],false],[0,\":\"],[14],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist1\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/\",[26,[\"primaryzone1\"]],\".page\"]]],[15,\"class\",\"button\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"lot\",\"zonedist1\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist2\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/\",[26,[\"primaryzone2\"]],\".page\"]]],[15,\"class\",\"button\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"lot\",\"zonedist2\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist3\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/\",[26,[\"primaryzone3\"]],\".page\"]]],[15,\"class\",\"button\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"lot\",\"zonedist3\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n        \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist4\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/\",[26,[\"primaryzone4\"]],\".page\"]]],[15,\"class\",\"button\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"lot\",\"zonedist4\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"each\"],[[33,[\"await\"],[[28,[\"parentSpecialPurposeDistricts\"]]],null]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-\",[28,[\"specialDistrict\",\"boroName\"]],\".page#\",[28,[\"specialDistrict\",\"anchorName\"]]]]],[15,\"class\",\"button\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"specialDistrict\",\"label\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"specialDistrict\"]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"lot\",\"overlay1\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[0,\"\\n            \"],[1,[33,[\"link-to-intersecting\"],[[28,[\"lot\",\"overlay1\"]],\"commercial-overlay\",\"commercial_overlays_v201804\",[28,[\"lot\",\"geometry\"]]],[[\"responseIdentifier\",\"classNames\"],[\"overlay\",\"button\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"lot\",\"overlay2\"]]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[13],[0,\"\\n            \"],[1,[33,[\"link-to-intersecting\"],[[28,[\"lot\",\"overlay2\"]],\"commercial-overlay\",\"commercial_overlays_v201804\",[28,[\"lot\",\"geometry\"]]],[[\"responseIdentifier\",\"classNames\"],[\"overlay\",\"button\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"grid-x grid-margin-x\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cell medium-shrink\"],[13],[0,\"\\n        \"],[11,\"h6\",[]],[15,\"class\",\"no-margin-\"],[13],[0,\"Intersecting Map Layers \"],[1,[33,[\"info-tooltip\"],null,[[\"tip\"],[\"These intersections should be independently verified and should not be relied upon to determine the zoning rules applicable to a property.\"]]],false],[0,\":\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet text-small\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"lot\",\"histdist\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/lpc/about/landmark-designation.page\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Historic District\"],[14],[0,\" \"],[11,\"small\",[]],[15,\"class\",\"dark-gray\"],[13],[1,[28,[\"lot\",\"histdist\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"intersecting-layers\"],null,[[\"tables\",\"bbl\"],[[33,[\"array\"],[\"inclusionary_housing_v201804\",\"transitzones_v201607\",\"fresh_zones_v201611\",\"waterfront_access_plan_v201109\",\"coastal_zone_boundary_v201601\",\"lower_density_growth_management_areas_v201709\",\"floodplain_pfirm2015_v0\",\"floodplain_firm2007_v0\",\"mandatory_inclusionary_housing_v20180425\",\"e_designations_v20180417\"],null],[28,[\"lot\",\"bbl\"]]]],{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"inclusionary_housing_v201804\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/inclusionary-housing.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Inclusionary Housing Zone\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"transitzones_v201607\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/glossary.page#transit_zone\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Transit Zone\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"fresh_zones_v201611\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/fresh-food-stores.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Fresh Zone\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"waterfront_access_plan_v201109\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/waterfront-zoning.page#waterfront_access_plan\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Waterfront Access Plan\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"coastal_zone_boundary_v201601\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/applicants/wrp/wrp.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Coastal Zone\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"lower_density_growth_management_areas_v201709\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/lower-density-growth-mngmt.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Lower Density Growth Management Zone\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"floodplain_firm2007_v0\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/flood-text.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Flood Zone\\n                \"],[14],[0,\" \"],[11,\"small\",[]],[15,\"class\",\"dark-gray\"],[13],[0,\"Effective Flood Insurance Rate Maps 2007\"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"floodplain_pfirm2015_v0\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www1.nyc.gov/site/planning/zoning/districts-tools/flood-text.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Flood Zone\\n                \"],[14],[0,\" \"],[11,\"small\",[]],[15,\"class\",\"dark-gray\"],[13],[0,\"Preliminary Flood Insurance Rate Maps 2015\"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"mandatory_inclusionary_housing_v20180425\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://www1.nyc.gov/site/planning/plans/mih/mandatory-inclusionary-housing.page\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Mandatory Inclusionary Housing Area\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"layers\",\"e_designations_v20180417\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"http://www.nyc.gov/html/oer/html/e-designation/e-designation.shtml\"],[13],[0,\"\\n                  \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Environmental Designation\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"unless\"],[[33,[\"or\"],[[28,[\"numberIntersecting\"]],[28,[\"lot\",\"histdist\"]]],null]],null,{\"statements\":[[0,\"              None found\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[\"layers\",\"numberIntersecting\"]},null],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cell medium-shrink\"],[13],[0,\"\\n        \"],[11,\"h6\",[]],[15,\"class\",\"no-margin-\"],[13],[0,\"Zoning Details:\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"no-bullet text-small\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"lot\",\"bbl\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"http://maps.nyc.gov/taxmap/map.htm?searchType=BblSearch&featureTypeName=EVERY_BBL&featureName=\",[28,[\"lot\",\"bbl\"]]]]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Digital Tax Map\"],[14],[14]],\"locals\":[]},null],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"lot\",\"zonemap\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/map\",[28,[\"lot\",\"zonemap\"]],\".pdf\"]]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Zoning Map \"],[11,\"small\",[]],[13],[0,\"(PDF)\"],[14],[14],[14]],\"locals\":[]},null],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"lot\",\"zonemap\"]]],null,{\"statements\":[[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/historical-zoning-maps/maps\",[26,[\"paddedZonemap\"]],\".pdf\"]]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Historical Zoning Maps \"],[11,\"small\",[]],[13],[0,\"(PDF)\"],[14],[14],[14]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n    \"],[1,[33,[\"scraped-part\"],null,[[\"lot\",\"nyc_ppo\"],[[28,[\"lot\"]],[28,[\"ppo\"]]]]],false],[0,\"\\n    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"title\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header tent-style\"],[13],[1,[28,[\"item\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[1,[28,[\"crawl\",\"tsDate\",\"0\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"crawl\",\"tsDate\",\"1\"]],false],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[1,[28,[\"crawl\",\"txClass\",\"0\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"crawl\",\"txClass\",\"1\"]],false],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[1,[28,[\"crawl\",\"bdClass\",\"0\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"crawl\",\"bdClass\",\"1\"]],false],[14],[14],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Assessment Information\"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"asInfo_head\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_header\"],[13],[1,[28,[\"item\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"asInfo_body\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"item\"]]],null,{\"statements\":[[0,\"                \"],[11,\"li\",[]],[15,\"class\",\"datum crawl_body\"],[13],[1,[28,[\"item1\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item1\"]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Taxable/Billable Assessed Value\"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"tbav_head\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"datum tbav_header\"],[13],[1,[28,[\"item\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"tbav_body\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"item\"]]],null,{\"statements\":[[0,\"                \"],[11,\"li\",[]],[15,\"class\",\"datum tbav_body\"],[13],[1,[28,[\"item1\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item1\"]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"crawl\",\"eI_head\",\"0\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Exemption Information\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"eI_head\"]]],null,{\"statements\":[[0,\"                \"],[11,\"li\",[]],[15,\"class\",\"datum eI_header\"],[13],[1,[28,[\"item\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"class\",\"lot-zoning-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"crawl\",\"eI_body\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"item\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"li\",[]],[15,\"class\",\"datum eI_body\"],[13],[1,[28,[\"item1\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"item1\"]},null]],\"locals\":[\"item\"]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \\n    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[1,[28,[\"crawl_pty\",\"title1\"]],false],[14],[0,\"\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header sub-header-small\"],[13],[1,[26,[\"main_title\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"main_array\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[1,[28,[\"item\",\"0\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"item\",\"1\"]],false],[14],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[1,[28,[\"crawl_pty\",\"title2\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"sub_array1\"]]],null,{\"statements\":[[0,\"      \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header sub-header-small\"],[13],[1,[28,[\"item\",\"sub_title\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"item\",\"sub_array\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"\\n            \"],[1,[28,[\"item1\",\"0\"]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[0,\"\\n            \"],[1,[28,[\"item1\",\"1\"]],false],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"item1\",\"2\"]]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"datum_detail\"],[13],[1,[28,[\"item1\",\"2\"]],false],[14]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"item1\"]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[1,[28,[\"crawl_pty\",\"title3\"]],false],[14],[0,\"\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header sub-header-small\"],[13],[1,[26,[\"sub_title2\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"sub_array2\"]]],null,{\"statements\":[[0,\"      \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header sub-header-small\"],[13],[1,[28,[\"item\",\"sub_title\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"item\",\"sub_array\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"\\n            \"],[1,[28,[\"item1\",\"0\"]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[0,\"\\n            \"],[1,[28,[\"item1\",\"1\"]],false],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"item1\",\"2\"]]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"datum_detail\"],[13],[1,[28,[\"item1\",\"2\"]],false],[14]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"item1\"]},null]],\"locals\":[\"item\"]},null],[0,\"    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Location #1\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"block\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Tax Block\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"block\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"lot\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Tax Lot\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"lot\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"borough\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Borough\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"boroname\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"borocode\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Boro Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"boro\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bbl\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Borough, Tax Block & Lot\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bbl\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"address\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Address\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"address\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zipcode\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zip Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zipcode\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"cdURLSegment\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Community District\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[16,\"href\",[34,[\"https://communityprofiles.planning.nyc.gov/\",[28,[\"lot\",\"cdURLSegment\"]]]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"lot\",\"cdName\"]],false],[14],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"histdist\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Historic District Name\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"histdist\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"landmark\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Landmark Name\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"landmark\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ct2010\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Census Tract\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"ct2010\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"tract2010\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Census Tract 2\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"tract2010\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"cb2010\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Census Block\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"cb2010\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Building Info \"],[1,[33,[\"info-tooltip\"],null,[[\"tip\"],[\"View this lot's building listing on the NYC Department of Buildings' Building Information System (BISWEB) Application\"]]],false],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[16,\"href\",[34,[\"http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet?allborough=\",[28,[\"lot\",\"borocode\"]],\"&allblock=\",[28,[\"lot\",\"block\"]],\"&alllot=\",[28,[\"lot\",\"lot\"]],\"&go5=+GO+&requestid=0\"]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" BISWEB \"],[14],[14],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"lot\",\"borocode\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Property Records\"],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[16,\"href\",[34,[\"http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=\",[28,[\"lot\",\"borocode\"]],\"&block=\",[28,[\"lot\",\"block\"]],\"&lot=\",[28,[\"lot\",\"lot\"]]]]],[15,\"target\",\"_blank\"],[13],[0,\"\\n            \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" View ACRIS\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Owner\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ownertypename\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Ownership, Type Of Ownership Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"ownertypename\"]],[28,[\"lot\",\"ownertypename\"]],\"Unknown/Private\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ownername\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Ownership, Owner Name\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"ownername\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Assessment/ Tax Analysis\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"assessland\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Assessed Value, Land\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"assessland\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"assesstot\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Assessed Value, Total\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"assesstot\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"exemptland\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Exempt Value, Land\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"exemptland\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"exempttot\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Exempt Value, Total\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"exempttot\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Land Use\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bldgclassname\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Building Class\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bldgclassname\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"landusename\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Land Use Category\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"landusename\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"easements\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Easements, Number Of\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"easements\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Lot Description\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"lotarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Lot Area\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"lotarea\"]],[33,[\"concat\"],[[33,[\"numeral-format\"],[[28,[\"lot\",\"lotarea\"]],\"0,0\"],null],\" sq ft\"],null],\"\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"lotfront\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Lot Frontage\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"lotfront\"]],[33,[\"concat\"],[[28,[\"lot\",\"lotfront\"]],\" ft\"],null],\"\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"lotdepth\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Lot Depth\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"lotdepth\"]],[33,[\"concat\"],[[28,[\"lot\",\"lotdepth\"]],\" ft\"],null],\"\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"irrlotcode\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Irregular Lot Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"irrlotcode\"]],[28,[\"lot\",\"irrlotcodedes\"]],\"Unknown\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"lottype\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Lot Type\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"lottypedes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Improvement Description\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"yearbuilt\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Year Built\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"yearbuilt\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"yearalter1\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Year Altered 1\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"yearalter1\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"yearalter2\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Year Altered 2\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"yearalter2\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"numbldgs\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Number of Buildings\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"numbldgs\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"numfloors\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Number of Floors\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"numfloors\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"unitsres\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Units, Residential\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"unitsres\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"unitstotal\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Units, Residential And Non-Residential \"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"unitstotal\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bldgfront\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Building Frontage\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bldgfront\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bldgdepth\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Building Depth\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bldgdepth\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ext\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Extension Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"ext\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bsmtcodedes\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Basement Type/Grade\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bsmtcodedes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"condono\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Condominium Number\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"condono\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"FAR Analysis\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"bldgarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Total Building\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"bldgarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"resarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Residential\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"resarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"officearea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Office\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"officearea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"retailarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Retail\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"retailarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"comarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Commercial\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"comarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"garagearea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Garage\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"garagearea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"strgearea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Storage\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"strgearea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"factryarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Factory\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"factryarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"otherarea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Other\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"otherarea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"areasource\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Floor Area, Total Building Source Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"areasourcedes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"builtfar\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Built Floor Area Ratio - FAR\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"builtfar\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"residfar\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Maximum Allowable Residential FAR\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"residfar\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"commfar\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Maximum Allowable Commercial FAR\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"commfar\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"facilfar\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Maximum Allowable Facility FAR\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"facilfar\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Zoning\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist1\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Zoning District 1\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zonedist1\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist2\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Zoning District 2\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zonedist2\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist3\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Zoning District 3\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zonedist3\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zonedist4\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Zoning District 4\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zonedist4\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"overlay1\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Commercial Overlay 1\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"overlay1\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"overlay2\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Commercial Overlay 2\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"overlay2\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"spdist1\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Special Purpose District 1\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"spdistdes1\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"spdist2\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Special Purpose District 2\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"spdistdes2\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"spdist3\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Special Purpose District 3\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"spdistdes3\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ltdheight\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Limited Height District\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"ltdheightdes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"splitzone\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning, Split Boundary Indicator\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[33,[\"if\"],[[28,[\"lot\",\"splitzonedes\"]],[28,[\"lot\",\"splitzonedes\"]],\"Unknown\"],null],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zonemap\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning Map #\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zonemap\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"zmcode\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning Map Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"zmcode\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Location #2\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"schooldist\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"School District\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"schooldistdes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"council\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"City Council District\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[16,\"href\",[34,[\"https://council.nyc.gov/district-\",[28,[\"lot\",\"council\"]],\"/\"]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Council District \"],[1,[28,[\"lot\",\"council\"]],false],[14],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"xcoord\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"X Coordinate\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"xcoord\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"ycoord\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Y Coordinate\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"ycoord\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"plutomapid\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"PLUTO – DTM Base Map Indicator\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"plutomapdes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"sanborn\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Sanborn Map #\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"sanborn\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"taxmap\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Tax Map #\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"taxmap\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"appbbl\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Apportionment BBL\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"appbbl\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"appdate\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Apportionment Date\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"appdate\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"proxcode\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Proximity Code\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"proxcodedes\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"edesignum\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"E-Designation Number\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"edesignum\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"h3\",[]],[15,\"class\",\"header-small lot-section-header\"],[13],[0,\"Public utility\"],[14],[0,\"\\n\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"policeprct\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Police Precinct\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"policeprct\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"firecomp\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Fire Company\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"firecomp\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"healthcent\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Health Center District\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"healthcentdist\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"healtharea\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Health Area\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"healtharea\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"sanitboro\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Sanitation District Boro\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"sanitborodist\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"sanitdistr\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Sanitation District Number \"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"sanitdistr\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n    \"],[6,[\"if\"],[[28,[\"lot\",\"sanitsub\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Sanitation Subsection\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"lot\",\"sanitsub\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n\\n    \"],[11,\"hr\",[]],[13],[14],[0,\"\\n    \"],[11,\"iframe\",[]],[16,\"src\",[34,[\"https://roadview.planninglabs.nyc/view/\",[28,[\"lot\",\"lon\"]],\"/\",[28,[\"lot\",\"lat\"]]]]],[15,\"class\",\"cyclomedia\"],[15,\"allowfullscreen\",\"\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/lot.hbs" } });
});
define("labs-zola/templates/special-purpose-district", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lLD5LbpR", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"isRunning\"]]],null,{\"statements\":[[6,[\"content-placeholders\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[1]]],false],[0,\"\\n      \"],[1,[28,[\"placeholder\",\"nav\"]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[10]]],false],[0,\"\\n\"]],\"locals\":[\"placeholder\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"bookmark-button\"],null,[[\"bookmark\",\"createBookmark\"],[[28,[\"district\",\"bookmark\"]],[33,[\"action\"],[[28,[null]],\"createBookmark\"],null]]]],false],[0,\"\\n\\n    \"],[11,\"label\",[]],[15,\"class\",\"header-label clearfix\"],[13],[0,\"\\n      Special Purpose District \"],[11,\"span\",[]],[15,\"class\",\"medium-gray\"],[13],[0,\"|\"],[14],[0,\" \"],[1,[28,[\"district\",\"sdlbl\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h1\",[]],[15,\"class\",\"content-header\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"spd-header\"],[13],[1,[28,[\"district\",\"sdname\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"Since 1969, the City Planning Commission has designated special zoning districts in response to areas of the City with unique characteristics. Each special district stipulates zoning requirements and incentives tailored to specific conditions that may not lend themselves to generalized zoning and standard development.\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[26,[\"readMoreLink\"]],null],[15,\"target\",\"_blank\"],[13],[0,\"Learn More \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/special-purpose-district.hbs" } });
});
define("labs-zola/templates/special-purpose-subdistricts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GHZ1v+Bj", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"isRunning\"]]],null,{\"statements\":[[6,[\"content-placeholders\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[1]]],false],[0,\"\\n      \"],[1,[28,[\"placeholder\",\"nav\"]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[10]]],false],[0,\"\\n\"]],\"locals\":[\"placeholder\"]},null]],\"locals\":[]},{\"statements\":[[0,\"\\n    \"],[1,[33,[\"bookmark-button\"],null,[[\"bookmark\",\"createBookmark\"],[[28,[\"subdistrict\",\"bookmark\"]],[33,[\"action\"],[[28,[null]],\"createBookmark\"],null]]]],false],[0,\"\\n\\n    \"],[11,\"label\",[]],[15,\"class\",\"header-label clearfix\"],[13],[0,\"\\n      Special Purpose Subdistrict \"],[11,\"span\",[]],[15,\"class\",\"medium-gray\"],[13],[0,\"|\"],[14],[0,\" \"],[1,[28,[\"subdistrict\",\"sdlbl\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"h1\",[]],[15,\"class\",\"content-header\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"spd-header\"],[13],[1,[28,[\"subdistrict\",\"spname\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"p\",[]],[13],[0,\"Since 1969, the City Planning Commission has designated special zoning districts in response to areas of the City with unique characteristics. Each special district stipulates zoning requirements and incentives tailored to specific conditions that may not lend themselves to generalized zoning and standard development.\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[11,\"a\",[]],[15,\"href\",\"https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-citywide.page\"],[15,\"target\",\"_blank\"],[13],[0,\"Learn More \"],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/special-purpose-subdistricts.hbs" } });
});
define("labs-zola/templates/zma", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "20mWfjdM", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"isRunning\"]]],null,{\"statements\":[[6,[\"content-placeholders\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[1]]],false],[0,\"\\n      \"],[1,[28,[\"placeholder\",\"nav\"]],false],[0,\"\\n      \"],[1,[33,[\"component\"],[[28,[\"placeholder\",\"text\"]]],[[\"lines\"],[10]]],false],[0,\"\\n\"]],\"locals\":[\"placeholder\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"bookmark-button\"],null,[[\"bookmark\",\"createBookmark\"],[[28,[\"zma\",\"bookmark\"]],[33,[\"action\"],[[28,[null]],\"createBookmark\"],null]]]],false],[0,\"\\n\\n    \"],[11,\"label\",[]],[15,\"class\",\"header-label\"],[13],[0,\"ZONING MAP AMENDMENT\"],[14],[0,\"\\n    \"],[11,\"h1\",[]],[15,\"class\",\"header-large\"],[13],[1,[28,[\"zma\",\"project_na\"]],false],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"ULURP Number\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"zma\",\"id\"]],false],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Effective\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"zma\",\"effectiveDisplay\"]],false],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Status\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[1,[28,[\"zma\",\"status\"]],false],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Land Use Application / CPC Report\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"http://a030-lucats.nyc.gov/lucats/DirectAccess.aspx?ULURPNO=\",[28,[\"zma\",\"lucats\"]]]]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"zma\",\"lucats\"]],false],[0,\" \"],[11,\"small\",[]],[13],[0,\"(LUCATS)\"],[14],[14],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"data-grid\"],[13],[11,\"label\",[]],[15,\"class\",\"data-label\"],[13],[0,\"Zoning Sketch Map\"],[14],[11,\"span\",[]],[15,\"class\",\"datum\"],[13],[11,\"a\",[]],[15,\"target\",\"_blank\"],[16,\"href\",[34,[\"http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/sketchmaps/skz\",[28,[\"zma\",\"id\"]],\".pdf\"]]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-file-pdf-o\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" \"],[1,[28,[\"zma\",\"id\"]],false],[0,\" \"],[11,\"small\",[]],[13],[0,\"(PDF)\"],[14],[14],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/zma.hbs" } });
});
define("labs-zola/templates/zoning-district", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2zyvPYtp", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"content-close-button-container\"],[13],[6,[\"link-to\"],[\"index\"],[[\"classNames\"],[\"close-button\"]],{\"statements\":[[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"content-area cell large-5 large-cell-block-y xxlarge-4\"],[13],[0,\"\\n\\n  \"],[11,\"label\",[]],[15,\"class\",\"header-type\"],[13],[0,\"ZONING DISTRICT\"],[14],[0,\"\\n  \"],[11,\"h1\",[]],[15,\"class\",\"header-large\"],[13],[1,[28,[\"model\",\"id\"]],false],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[1,[28,[\"model\",\"description\"]],false],[14],[0,\"\\n\"],[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"model\",\"id\"]],\"BPC\"],null]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"https://www1.nyc.gov/site/planning/zoning/districts-tools/\",[26,[\"primaryzoneURL\"]],\".page\"]]],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Learn more about \"],[1,[28,[\"model\",\"id\"]],false],[0,\" districts…\"],[14],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"button tiny hollow\"],[5,[\"action\"],[[28,[null]],\"fitBounds\"]],[13],[0,\"Fit map to all \"],[1,[28,[\"model\",\"id\"]],false],[0,\" districts\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[11,\"a\",[]],[15,\"href\",\"https://www1.nyc.gov/site/planning/zoning/districts-tools/special-purpose-districts-manhattan.page#battery_park\"],[15,\"target\",\"_blank\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-external-link\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Learn more about the Special Battery Park City District…\"],[14],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "labs-zola/templates/zoning-district.hbs" } });
});
define('labs-zola/utils/admin-boundary-styles', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var adminBoundaryStyles = {
    paint: {
      lines: {
        'line-color': '#444',
        'line-opacity': 0.3,
        'line-width': {
          stops: [[11, 1], [16, 3]]
        }
      },
      labels: {
        'text-color': '#626262',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
        'text-halo-blur': 2
      }
    },

    layout: {
      lines: {
        'line-join': 'round',
        'line-cap': 'round'
      }
    },
    labelLayout: function labelLayout(field) {
      return {
        'text-field': '{' + field + '}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-size': {
          stops: [[11, 12], [14, 16]]
        }
      };
    }
  };

  exports.default = adminBoundaryStyles;
});
define('labs-zola/utils/bbl-demux', ['exports', 'npm:numeral'], function (exports, _npmNumeral) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = bblDemux;
  function bblDemux() {
    var bbl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (typeof bbl === 'string' || typeof bbl === 'number') {
      var bblString = bbl.toString();
      var _boro = bblString.substring(0, 1);
      var _block = parseInt(bblString.substring(1, 6), 10);
      var _lot = parseInt(bblString.substring(6), 10);

      return { boro: _boro, block: _block, lot: _lot };
    }

    var boro = bbl.boro,
        block = bbl.block,
        lot = bbl.lot;

    if (boro && block && lot) {
      boro = (0, _npmNumeral.default)(boro).format('0');
      block = (0, _npmNumeral.default)(block).format('00000');
      lot = (0, _npmNumeral.default)(lot).format('0000');
      return '' + boro + block + lot;
    }

    return false;
  }
});
define('labs-zola/utils/can-use-dom', ['exports', 'ember-metrics/utils/can-use-dom'], function (exports, _canUseDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _canUseDom.default;
    }
  });
});
define('labs-zola/utils/carto', ['exports', 'fetch'], function (exports, _fetch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.buildSqlUrl = undefined;
  var Promise = Ember.RSVP.Promise;


  var cartoUsername = 'planninglabs';
  var cartoDomain = cartoUsername + '.carto.com';

  var buildTemplate = function buildTemplate(cartoResponse, type) {
    var layergroupid = cartoResponse.layergroupid,
        cdn_url = cartoResponse.cdn_url;
    var subdomains = cdn_url.templates.https.subdomains;


    // choose a subdomain at random
    var subdomain = subdomains[Math.floor(Math.random() * subdomains.length)];

    return cdn_url.templates.https.url.replace('{s}', subdomain) + '/' + cartoUsername + '/api/v1/map/' + layergroupid + '/{z}/{x}/{y}.' + type;
  };

  var buildSqlUrl = function buildSqlUrl(cleanedQuery) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';
    // eslint-disable-line
    return 'https://' + cartoDomain + '/api/v2/sql?q=' + cleanedQuery + '&format=' + type;
  };

  var carto = {
    SQL: function SQL(query) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

      var cleanedQuery = query.replace('\n', '');
      var url = buildSqlUrl(cleanedQuery, type);
      return (0, _fetch.default)(url).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not found');
      }).then(function (d) {
        // eslint-disable-line
        return type === 'json' ? d.rows : d;
      });
    },
    getVectorTileTemplate: function getVectorTileTemplate(sourceLayers) {
      var CartoCSS = '#layer { polygon-fill: #FFF; }';
      var layers = sourceLayers.map(function (sourceLayer) {
        var id = sourceLayer.id,
            sql = sourceLayer.sql;

        return {
          id: id,
          type: 'mapnik',
          options: {
            cartocss_version: '2.3.0',
            cartocss: CartoCSS,
            sql: sql
          }
        };
      });

      var params = {
        version: '1.3.0',
        layers: layers
      };

      return new Promise(function (resolve, reject) {
        (0, _fetch.default)('https://' + cartoDomain + '/api/v1/map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        }).catch(function (err) {
          return reject(err);
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          resolve(buildTemplate(json, 'mvt'));
        });
      });
    }
  };

  exports.buildSqlUrl = buildSqlUrl;
  exports.default = carto;
});
define('labs-zola/utils/object-transforms', ['exports', 'ember-metrics/utils/object-transforms'], function (exports, _objectTransforms) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _objectTransforms.default;
    }
  });
});
define('labs-zola/utils/polygon-layer-styles', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var lineStyle = function lineStyle(id, source, sourceLayer, color) {
    return {
      id: id,
      type: 'line',
      source: source,
      'source-layer': sourceLayer,
      paint: {
        'line-width': {
          stops: [[11, 1], [12, 3]]
        },
        'line-color': color,
        'line-dasharray': [1, 1],
        'line-opacity': 0.6
      }
    };
  };

  var fillStyle = function fillStyle(id, source, sourceLayer, color) {
    return {
      id: id,
      type: 'fill',
      source: source,
      'source-layer': sourceLayer,
      paint: {
        'fill-color': color,
        'fill-opacity': 0.2
      },
      layout: {}
    };
  };

  exports.lineStyle = lineStyle;
  exports.fillStyle = fillStyle;
});
define('labs-zola/utils/special-purpose-crosswalk', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var specialPurposeCrosswalk = [['Special City Island District', ['city_island', 'bronx']], ['Special Fort Totten Natural Area District-4', ['natural_area', 'bronx']], ['Special Natural Area District', ['natural_area', 'citywide']], ['Special Hudson River Park District', ['hudson_river_park', 'manhattan']], ['Special Mixed Use District (MX-10)', ['mixed_use', 'citywide']], ['Special Southern Hunters Point District', ['hunters_point', 'queens']], ['Special Scenic View District', ['scenic_view', 'citywide']], ['Special Southern Roosevelt Island District', ['sri', 'manhattan']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special Hunts Point District', ['hunts_point', 'bronx']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special 125th Street District', ['125th', 'manhattan']], ['Special Planned Community Preservation District', ['planned_community', 'citywide']], ['Special Planned Community Preservation District', ['planned_community', 'citywide']], ['Special Coney Island Mixed Use District', ['coney_island', 'brooklyn']], ['Special Hudson River Park District', ['hudson_river_park', 'manhattan']], ['Special Garment Center District', ['garment_center', 'manhattan']], ['Special Little Italy District', ['little_italy', 'manhattan']], ['Special Coastal Risk District', ['special_coastal_risk', 'citywide']], ['Special Mixed Use District (MX-11)', ['mixed_use', 'citywide']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Enhanced Commercial District 4', ['special_enhanced', 'citywide']], ['Special Hudson Square District', ['hudson_square', 'manhattan']], ['Special Enhanced Commercial District- 2', ['special_enhanced', 'citywide']], ['Special Enhanced Commercial District- 2', ['special_enhanced', 'citywide']], ['Special Battery Park City District', ['battery_park', 'manhattan']], ['Special Limited Commercial District', ['limited_commercial', 'citywide']], ['Special Lincoln Square District', ['lincoln_square', 'manhattan']], ['Special Manhattanville Mixed Use District', ['manhattanville', 'manhattan']], ['Special Mixed Use District (MX-6)', ['mixed_use', 'citywide']], ['Special Natural Area District', ['natural_area', 'citywide']], ['Special Union Square District', ['union_square', 'manhattan']], ['Special West Chelsea District', ['west_chelsea', 'manhattan']], ['Special Willets Point District', ['willets_point', 'queens']], ['Special Clinton District', ['clinton', 'manhattan']], ['Special Mixed Use District (MX-12)', ['mixed_use', 'citywide']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Enhanced Commercial District- 2', ['special_enhanced', 'citywide']], ['Special Enhanced Commercial District- 2', ['special_enhanced', 'citywide']], ['Special Enhanced Commercial District 5', ['special_enhanced', 'citywide']], ['Special Mixed Use District (MX-13)', ['mixed_use', 'citywide']], ['Special Planned Community Preservation District', ['planned_community', 'citywide']], ['Special Planned Community Preservation District', ['planned_community', 'citywide']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special Coastal Risk District', ['special_coastal_risk', 'citywide']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-2)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-14)', ['mixed_use', 'citywide']], ['Special Coney Island District', ['coney_island', 'brooklyn']], ['Special Mixed Use District (MX-7)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-9)', ['mixed_use', 'citywide']], ['Special Natural Area District', ['natural_area', 'bronx']], ['Special Mixed Use District (MX-1)', ['mixed_use', 'citywide']], ['Special Grand Concourse Preservation District', ['grand_concourse', 'bronx']], ['Special Harlem River Waterfront District', ['harlem_river', 'bronx']], ['Special Hillsides Preservation District', ['hillsides', 'staten-island']], ['Special Hudson Yards District', ['hudson_yards', 'manhattan']], ['Special Madison Avenue Preservation District', ['madison', 'citywide']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Mixed Use District (MX-4)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-5)', ['mixed_use', 'citywide']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Enhanced Commercial District 6', ['special_enhanced', 'citywide']], ['Special St. George District', ['st_george', 'staten-island']], ['Special Stapleton Waterfront District', ['stapleton', 'staten-island']], ['Special South Richmond Development District', ['south_richmond', 'staten-island']], ['Special Tribeca Mixed Use District', ['mixed_use', 'citywide']], ['Special Downtown Brooklyn District', ['downtown_brooklyn', 'brooklyn']], ['Special Ocean Parkway District', ['ocean_parkway', 'brooklyn']], ['Special Enhanced Commercial District- 1', ['special_enhanced', 'citywide']], ['Special Sheepshead Bay District', ['sheepshead_bay', 'brooklyn']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special College Point District', ['college_point', 'queens']], ['Special Forest Hills District', ['forest_hills', 'queens']], ['Special Long Island City Mixed Use District', ['long_island_city', 'queens']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Bay Ridge District', ['bay_ridge', 'brooklyn']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Mixed Use District (MX-14)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-14)', ['mixed_use', 'citywide']], ['Special Enhanced Commercial District- 3', ['special_enhanced', 'citywide']], ['Special Mixed Use District (MX-15)', ['mixed_use', 'citywide']], ['Special Governors Island District', ['governors_island', 'manhattan']], ['Special Lower Manhattan District', ['lower_manhattan', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special Transit Land Use District', ['transit_land_use', 'manhattan']], ['Special United Nations Development District', ['un_development', 'manhattan']], ['Special Park Improvement District', ['park', 'manhattan']], ['Special Park Improvement District', ['park', 'manhattan']], ['Special Mixed Use District (MX-13)', ['mixed_use', 'citywide']], ['Special Planned Community Preservation District', ['planned_community', 'manhattan']], ['Special Coastal Risk District', ['special_coastal_risk', 'citywide']], ['Special Midtown District', ['midtown', 'manhattan']], ['Special Enhanced Commercial District 5', ['special_enhanced', 'citywide']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special Downtown Jamaica District', ['jamaica', 'queens']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']], ['Special United Nations Development District', ['un_development', 'manhattan']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special South Richmond Development District', ['south_richmond', 'staten-island']], ['Special Enhanced Commercial District 5', ['special_enhanced', 'citywide']], ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']], ['Special Coastal Risk District', ['special_coastal_risk', 'citywide']], ['Special Downtown Far Rockaway District', ['far_rockaway', 'queens']]];

  exports.default = specialPurposeCrosswalk;
});
define('labs-zola/utils/sql-builder', ['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SqlBuilder = function () {
    function SqlBuilder(columns, tablename) {
      _classCallCheck(this, SqlBuilder);

      this.columns = columns;
      this.tablename = tablename;
    }

    // creates a SQL statement from a filterDimensions object


    _createClass(SqlBuilder, [{
      key: 'buildSql',
      value: function buildSql(filters) {
        var _this = this;

        var chunks = [];
        // iterate over all filters, building WHERE clause chunks for each
        Object.keys(filters).forEach(function (dimension) {
          var filter = filters[dimension];

          // iterate over all enabled filterDimensions
          if (!filter.disabled) {
            if (filter.type === undefined) throw new Error('filterDimension ' + dimension + ' does not have a type property');
            if (_this[filter.type] === undefined) throw new Error('Can\'t parse filterDimension of type \'' + filter.type + '\'');

            var chunker = _this[filter.type].bind(_this);
            // pass the current dimension AND the entire filters object to each chunker
            chunks.push(chunker(dimension, filters));
          }
        });

        // build the final sql string
        var sqlTemplate = 'SELECT ' + this.columns + ' FROM ' + this.tablename + ' WHERE ';
        // if there are no chunks, use 'WHERE TRUE' to select all
        var chunksString = chunks.length > 0 ? chunks.join(' AND ') : 'TRUE';
        var sql = sqlTemplate + chunksString;

        return sql;
      }
    }, {
      key: 'multiSelect',
      value: function multiSelect(dimension, filters) {
        // eslint-disable-line
        var values = filters[dimension].values;

        var checkedValues = values.filter(function (value) {
          return value.checked === true;
        });
        var subChunks = checkedValues.map(function (value) {
          return dimension + ' = \'' + value.value + '\'';
        });

        if (subChunks.length > 0) {
          // don't set sqlChunks if nothing is selected
          var chunk = '(' + subChunks.join(' OR ') + ')';

          return chunk;
        }

        return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
      }
    }, {
      key: 'fuzzyMultiSelect',
      value: function fuzzyMultiSelect(dimension, filters) {
        // eslint-disable-line
        var values = filters[dimension].values;

        var checkedValues = values.filter(function (value) {
          return value.checked === true;
        });
        var subChunks = checkedValues.map(function (value) {
          return dimension + ' LIKE \'%' + value.value + '%\'';
        });

        if (subChunks.length > 0) {
          // don't set sqlChunks if nothing is selected
          var chunk = '(' + subChunks.join(' OR ') + ')';

          return chunk;
        }

        return 'FALSE'; // if no options are checked, make the resulting SQL return no rows
      }
    }, {
      key: 'dateRange',
      value: function dateRange(dimension, filters) {
        // eslint-disable-line
        var range = filters[dimension].values;

        var dateRangeFormatted = {
          from: (0, _moment.default)(range[0], 'X').format('YYYY-MM-DD'), // eslint-disable-line no-undef
          to: (0, _moment.default)(range[1], 'X').format('YYYY-MM-DD') // eslint-disable-line no-undef
        };

        return '(dob_qdate >= \'' + dateRangeFormatted.from + '\' AND dob_qdate <= \'' + dateRangeFormatted.to + '\')';
      }
    }, {
      key: 'numberRange',
      value: function numberRange(dimension, filters) {
        // eslint-disable-line
        var range = filters[dimension].values;
        return '(' + dimension + ' >= \'' + range[0] + '\' AND ' + dimension + ' <= \'' + range[1] + '\')';
      }
    }]);

    return SqlBuilder;
  }();

  exports.default = SqlBuilder;
});
define('labs-zola/utils/track-event', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = trackEvent;
  var isEmpty = Ember.isEmpty;
  var service = Ember.inject.service;
  function trackEvent(eventCategory, incAction, incLabel, eventValue) {
    return function (target, name, desc) {
      var descriptor = desc;
      var originalValue = descriptor.value;

      descriptor.value = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        originalValue.call.apply(originalValue, [this].concat(args));

        if (!this.get('metrics')) {
          this.set('metrics', service());
        }

        var eventAction = incAction;
        var eventLabel = incLabel;

        // allow getting prop names for values
        if (eventAction) {
          var actionIdentifier = this.get(eventAction);

          if (!isEmpty(actionIdentifier)) {
            eventAction = actionIdentifier;
          }
        }

        if (eventLabel) {
          var labelIdentifier = this.get(eventLabel);
          if (!isEmpty(labelIdentifier)) {
            eventLabel = labelIdentifier;
          }
        }

        this.get('metrics').trackEvent('GoogleAnalytics', { eventCategory: eventCategory, eventAction: eventAction, eventLabel: eventLabel, eventValue: eventValue });
      };

      return descriptor;
    };
  }
});


define('labs-zola/config/environment', ['ember'], function(Ember) {
  var prefix = 'labs-zola';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("labs-zola/app")["default"].create({"name":"labs-zola","version":"0.0.0+01816e7d"});
}
//# sourceMappingURL=labs-zola.map
