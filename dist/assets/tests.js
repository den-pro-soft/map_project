'use strict';

define('labs-zola/tests/acceptance/bookmarks-test', ['qunit', 'labs-zola/tests/helpers/module-for-acceptance', 'ember-native-dom-helpers'], function (_qunit, _moduleForAcceptance, _emberNativeDomHelpers) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var SEARCH_INPUT_SELECTOR = '.search input';
  var SEARCH_TERM_ADDRESS = '210 Humboldt';
  var SEARCH_TERM_LOT = '1000477501';

  (0, _moduleForAcceptance.default)('Acceptance | bookmarks', {
    beforeEach: function beforeEach() {
      window.localStorage.clear();
    }
  });

  (0, _qunit.test)('visiting /bookmarks', function (assert) {
    visit('/bookmarks');

    andThen(function () {
      assert.equal(currentURL(), '/bookmarks');
    });
  });

  (0, _qunit.test)('visiting /bookmarks, see empty message', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return visit('/bookmarks');

            case 2:
              _context.next = 4;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.content-area');
              });

            case 4:

              assert.ok((0, _emberNativeDomHelpers.find)('.no-bookmarks'));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  (0, _qunit.test)('search lot, save, find result in bookmarks, delete it', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assert) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return visit('/');

            case 2:
              _context2.next = 4;
              return (0, _emberNativeDomHelpers.fillIn)(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

            case 4:
              _context2.next = 6;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.has-results');
              });

            case 6:
              _context2.next = 8;
              return (0, _emberNativeDomHelpers.keyEvent)('.tax-lot', 'click');

            case 8:
              _context2.next = 10;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return currentURL().indexOf('/lot') >= 0;
              });

            case 10:
              _context2.next = 12;
              return (0, _emberNativeDomHelpers.keyEvent)('.bookmark-save-button', 'click');

            case 12:
              _context2.next = 14;
              return visit('/bookmarks');

            case 14:
              _context2.next = 16;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.content-area');
              });

            case 16:
              _context2.next = 18;
              return (0, _emberNativeDomHelpers.keyEvent)('.delete-bookmark-button', 'click');

            case 18:
              assert.ok((0, _emberNativeDomHelpers.find)('.no-bookmarks'));

            case 19:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  (0, _qunit.test)('bookmark lot, see count increase, un-bookmark', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assert) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return visit('/');

            case 2:
              _context3.next = 4;
              return (0, _emberNativeDomHelpers.fillIn)(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

            case 4:
              _context3.next = 6;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.has-results');
              });

            case 6:
              _context3.next = 8;
              return (0, _emberNativeDomHelpers.keyEvent)('.tax-lot', 'click');

            case 8:
              _context3.next = 10;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return currentURL().indexOf('/lot') >= 0;
              });

            case 10:
              _context3.next = 12;
              return (0, _emberNativeDomHelpers.keyEvent)('.bookmark-save-button', 'click');

            case 12:

              assert.equal((0, _emberNativeDomHelpers.find)('.saved-bookmarks-counter .badge').textContent, "1");
              _context3.next = 15;
              return (0, _emberNativeDomHelpers.keyEvent)('.bookmark-save-button', 'click');

            case 15:
              assert.equal((0, _emberNativeDomHelpers.find)('.saved-bookmarks-counter .badge'), null);

            case 16:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
});
define('labs-zola/tests/acceptance/index-test', ['qunit', 'labs-zola/tests/helpers/module-for-acceptance', 'ember-native-dom-helpers'], function (_qunit, _moduleForAcceptance, _emberNativeDomHelpers) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var SEARCH_INPUT_SELECTOR = '.search input';
  var SEARCH_RESULTS_SELECTOR = '.search-results';
  var LOT_URL_ROOT = '/lot';
  var SEARCH_TERM_LOT = '1000477501';
  var SEARCH_TERM_ADDRESS = '210 Humboldt Street, Brooklyn, New York, NY, USA';
  var SEARCH_RESULT_LABEL = '210 HUMBOLDT STREET, Brooklyn, New York, NY, USA';
  var SEARCH_RESULTS_LOADING_CLASS = '.search-results--loading';
  var FONT_AWESOME_MAP_PIN = '.fa-map-pin';
  var timeout = 15000;
  var resultAt = function resultAt(x) {
    return SEARCH_RESULTS_SELECTOR + ' li:nth-child(' + (x + 1) + ')';
  };

  (0, _moduleForAcceptance.default)('Acceptance | index');

  (0, _qunit.test)('map-search enter on first search result', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return visit('/');

            case 2:
              _context.next = 4;
              return (0, _emberNativeDomHelpers.fillIn)(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

            case 4:
              _context.next = 6;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.has-results');
              }, { timeout: timeout });

            case 6:
              _context.next = 8;
              return (0, _emberNativeDomHelpers.keyEvent)('.tax-lot', 'click');

            case 8:
              // await keyEvent(SEARCH_INPUT_SELECTOR, 'keypress', 13);

              assert.equal(currentURL().indexOf('/') > -1, true);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  (0, _qunit.test)('map-search keydown, keyup, keyup -> first result highlighted', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assert) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return visit('/');

            case 2:
              _context2.next = 4;
              return (0, _emberNativeDomHelpers.fillIn)(SEARCH_INPUT_SELECTOR, SEARCH_TERM_LOT);

            case 4:
              _context2.next = 6;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.has-results');
              }, { timeout: timeout });

            case 6:
              _context2.next = 8;
              return (0, _emberNativeDomHelpers.keyEvent)(SEARCH_INPUT_SELECTOR, 'keyup', 40);

            case 8:
              _context2.next = 10;
              return (0, _emberNativeDomHelpers.keyEvent)(SEARCH_INPUT_SELECTOR, 'keyup', 38);

            case 10:
              _context2.next = 12;
              return (0, _emberNativeDomHelpers.keyEvent)(SEARCH_INPUT_SELECTOR, 'keyup', 38);

            case 12:

              assert.equal((0, _emberNativeDomHelpers.find)(resultAt(1)).className.indexOf('highlighted-result') > -1, true);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  (0, _qunit.test)('Map search: hide result list on focus out, persist search result label', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assert) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return visit('/');

            case 2:
              _context3.next = 4;
              return (0, _emberNativeDomHelpers.fillIn)(SEARCH_INPUT_SELECTOR, SEARCH_TERM_ADDRESS);

            case 4:
              _context3.next = 6;
              return (0, _emberNativeDomHelpers.keyEvent)(SEARCH_INPUT_SELECTOR, 'click');

            case 6:
              _context3.next = 8;
              return (0, _emberNativeDomHelpers.waitUntil)(function () {
                return (0, _emberNativeDomHelpers.find)('.has-results');
              }, { timeout: timeout });

            case 8:

              assert.ok((0, _emberNativeDomHelpers.find)('.focused'));

              _context3.next = 11;
              return (0, _emberNativeDomHelpers.keyEvent)((0, _emberNativeDomHelpers.find)(resultAt(1)), 'click');

            case 11:

              assert.notOk((0, _emberNativeDomHelpers.find)('.focused'));

              assert.equal((0, _emberNativeDomHelpers.find)(SEARCH_INPUT_SELECTOR).value, SEARCH_RESULT_LABEL);

            case 13:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
});
define('labs-zola/tests/acceptance/visit-lot-test', ['qunit', 'labs-zola/tests/helpers/module-for-acceptance'], function (_qunit, _moduleForAcceptance) {
  'use strict';

  (0, _moduleForAcceptance.default)('Acceptance | visit lot');

  (0, _qunit.test)('visiting a lot', function (assert) {
    visit('/lot/1/1632/1');

    andThen(function () {
      assert.notEqual(find('.content-area').text().length, 0);
    });
  });

  (0, _qunit.test)('visiting a bbl', function (assert) {
    visit('/bbl/1001870021');

    andThen(function () {
      assert.equal(currentURL(), '/lot/1/187/21');
      assert.notEqual(find('.content-area').text().length, 0);
    });
  });
});
define('labs-zola/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/bookmark.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/bookmark.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/commercial-overlay.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/commercial-overlay.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/lot.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/lot.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/scraped-part.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/scraped-part.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/special-purpose-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/special-purpose-district.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/special-purpose-subdistrict.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/special-purpose-subdistrict.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/zma.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/zma.js should pass ESLint\n\n');
  });

  QUnit.test('adapters/zoning-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/zoning-district.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/bbl-lookup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bbl-lookup.js should pass ESLint\n\n');
  });

  QUnit.test('components/bookmark-button.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bookmark-button.js should pass ESLint\n\n');
  });

  QUnit.test('components/cascading-checkbox.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/cascading-checkbox.js should pass ESLint\n\n');
  });

  QUnit.test('components/content-area.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-area.js should pass ESLint\n\n');
  });

  QUnit.test('components/group-checkbox.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/group-checkbox.js should pass ESLint\n\n');
  });

  QUnit.test('components/hover-tooltip.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hover-tooltip.js should pass ESLint\n\n');
  });

  QUnit.test('components/info-tooltip.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/info-tooltip.js should pass ESLint\n\n');
  });

  QUnit.test('components/interactive-layers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/interactive-layers.js should pass ESLint\n\n');
  });

  QUnit.test('components/intersecting-layers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/intersecting-layers.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-checkbox.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-checkbox.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-control-timeline.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-control-timeline.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-group.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-group.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-menu-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-menu-item.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-multi-select-control.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-multi-select-control.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-palette-accordion.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-palette-accordion.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-palette.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-palette.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-static-legend.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-static-legend.js should pass ESLint\n\n');
  });

  QUnit.test('components/layer-tooltip.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/layer-tooltip.js should pass ESLint\n\n');
  });

  QUnit.test('components/link-to-intersecting.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/link-to-intersecting.js should pass ESLint\n\n');
  });

  QUnit.test('components/lot-bookmark-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/lot-bookmark-item.js should pass ESLint\n\n');
  });

  QUnit.test('components/main-map.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/main-map.js should pass ESLint\n\n');
  });

  QUnit.test('components/map-search.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/map-search.js should pass ESLint\n\n');
  });

  QUnit.test('components/mapbox-gl-call.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mapbox-gl-call.js should pass ESLint\n\n');
  });

  QUnit.test('components/mapbox-gl.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mapbox-gl.js should pass ESLint\n\n');
  });

  QUnit.test('components/radio-selector.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/radio-selector.js should pass ESLint\n\n');
  });

  QUnit.test('components/scraped-part.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/scraped-part.js should pass ESLint\n\n4:10 - \'setCookie\' is defined but never used. (no-unused-vars)\n9:15 - Unexpected string concatenation. (prefer-template)\n11:22 - Unexpected string concatenation. (prefer-template)\n33:7 - Unexpected var, use let or const instead. (no-var)\n33:20 - Unexpected string concatenation. (prefer-template)\n34:17 - Unexpected string concatenation. (prefer-template)\n35:17 - Unexpected string concatenation. (prefer-template)\n36:23 - Unexpected string concatenation. (prefer-template)\n37:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('components/site-header.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/site-header.js should pass ESLint\n\n');
  });

  QUnit.test('components/switch-toggle.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/switch-toggle.js should pass ESLint\n\n');
  });

  QUnit.test('components/tooltip-on-element.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/tooltip-on-element.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/bookmarks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/bookmarks.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/lot.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/lot.js should pass ESLint\n\n57:5 - Unexpected var, use let or const instead. (no-var)\n57:5 - All \'var\' declarations must be at the top of the function scope. (vars-on-top)\n59:1 - Trailing spaces not allowed. (no-trailing-spaces)\n65:7 - Expected method shorthand. (object-shorthand)\n66:9 - Unexpected console statement. (no-console)\n80:5 - Unexpected var, use let or const instead. (no-var)\n87:7 - Expected method shorthand. (object-shorthand)\n88:9 - Unexpected console statement. (no-console)\n89:34 - Missing semicolon. (semi)\n91:9 - Unexpected console statement. (no-console)\n104:5 - Unexpected var, use let or const instead. (no-var)\n105:1 - Trailing spaces not allowed. (no-trailing-spaces)\n113:7 - Expected method shorthand. (object-shorthand)\n114:9 - Unexpected console statement. (no-console)\n115:61 - ["sub_title"] is better written in dot notation. (dot-notation)\n117:9 - Expected space(s) after "if". (keyword-spacing)\n120:9 - Expected space(s) after "if". (keyword-spacing)\n124:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/special-purpose-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/special-purpose-district.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/special-purpose-subdistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/special-purpose-subdistricts.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/zma.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/zma.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/zoning-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/zoning-district.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/bbl-demux.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/bbl-demux.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/carto-download-link.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/carto-download-link.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/extract-layer-stops-for.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/extract-layer-stops-for.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/get-unique-options-for.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-unique-options-for.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/make-special-purpose-district-link.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/make-special-purpose-district-link.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/numeral-format.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/numeral-format.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/to-title-case.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/to-title-case.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/aerials.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/aerials.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/assemblydistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/assemblydistricts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/boroughs.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/boroughs.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/building-footprints.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/building-footprints.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/business-improvement-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/business-improvement-districts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/coastal-zone-boundary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/coastal-zone-boundary.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/commercial-overlays.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/commercial-overlays.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/communitydistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/communitydistricts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/e-designations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/e-designations.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/effective-flood-insurance-rate-2007.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/effective-flood-insurance-rate-2007.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/fresh.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/fresh.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/historic-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/historic-districts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/inclusionary-housing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/inclusionary-housing.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/index.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/landmarks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/landmarks.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/limited-height-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/limited-height-districts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/low-density-growth-mgmt-areas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/low-density-growth-mgmt-areas.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/mandatory-inclusionary-housing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/mandatory-inclusionary-housing.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/neighborhood-tabulation-areas.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/neighborhood-tabulation-areas.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/nyccouncildistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/nyccouncildistricts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/nysenatedistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/nysenatedistricts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/pluto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/pluto.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/preliminary-flood-insurance-rate.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/preliminary-flood-insurance-rate.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/sidewalkcafes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/sidewalkcafes.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/special-purpose-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/special-purpose-districts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/special-purpose-subdistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/special-purpose-subdistricts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/subway.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/subway.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/threed-buildings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/threed-buildings.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/transit-zones.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/transit-zones.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/waterfront-access-plan.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/waterfront-access-plan.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/zoning-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/zoning-districts.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/zoning-map-amendments-pending.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/zoning-map-amendments-pending.js should pass ESLint\n\n');
  });

  QUnit.test('layer-groups/zoning-map-amendments.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layer-groups/zoning-map-amendments.js should pass ESLint\n\n');
  });

  QUnit.test('layers/bookmarked-lots.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/bookmarked-lots.js should pass ESLint\n\n');
  });

  QUnit.test('layers/draw-styles.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/draw-styles.js should pass ESLint\n\n');
  });

  QUnit.test('layers/drawn-feature.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/drawn-feature.js should pass ESLint\n\n');
  });

  QUnit.test('layers/highlighted-lot.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/highlighted-lot.js should pass ESLint\n\n');
  });

  QUnit.test('layers/point-layer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/point-layer.js should pass ESLint\n\n');
  });

  QUnit.test('layers/selected-lot.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'layers/selected-lot.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/bookmarkable.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/bookmarkable.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/geometric.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/geometric.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/query-param-map.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/query-param-map.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/track-page.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/track-page.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/update-selection.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/update-selection.js should pass ESLint\n\n');
  });

  QUnit.test('models/bookmark.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/bookmark.js should pass ESLint\n\n');
  });

  QUnit.test('models/commercial-overlay.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/commercial-overlay.js should pass ESLint\n\n');
  });

  QUnit.test('models/lot.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/lot.js should pass ESLint\n\n');
  });

  QUnit.test('models/scraped-part.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/scraped-part.js should pass ESLint\n\n');
  });

  QUnit.test('models/special-purpose-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/special-purpose-district.js should pass ESLint\n\n');
  });

  QUnit.test('models/special-purpose-subdistrict.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/special-purpose-subdistrict.js should pass ESLint\n\n');
  });

  QUnit.test('models/zma.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/zma.js should pass ESLint\n\n');
  });

  QUnit.test('models/zoning-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/zoning-district.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/bbl.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/bbl.js should pass ESLint\n\n');
  });

  QUnit.test('routes/bookmarks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/bookmarks.js should pass ESLint\n\n');
  });

  QUnit.test('routes/commercial-overlay.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/commercial-overlay.js should pass ESLint\n\n');
  });

  QUnit.test('routes/data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/data.js should pass ESLint\n\n');
  });

  QUnit.test('routes/features.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/features.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/lot.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/lot.js should pass ESLint\n\n');
  });

  QUnit.test('routes/special-purpose-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/special-purpose-district.js should pass ESLint\n\n');
  });

  QUnit.test('routes/special-purpose-subdistricts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/special-purpose-subdistricts.js should pass ESLint\n\n');
  });

  QUnit.test('routes/zma.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/zma.js should pass ESLint\n\n');
  });

  QUnit.test('routes/zoning-district.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/zoning-district.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/bookmark.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/bookmark.js should pass ESLint\n\n');
  });

  QUnit.test('services/ajax.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/ajax.js should pass ESLint\n\n9:7 - Unexpected console statement. (no-console)');
  });

  QUnit.test('services/main-map.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/main-map.js should pass ESLint\n\n');
  });

  QUnit.test('services/map-mouseover.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/map-mouseover.js should pass ESLint\n\n');
  });

  QUnit.test('services/registered-layers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/registered-layers.js should pass ESLint\n\n');
  });

  QUnit.test('services/store.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/store.js should pass ESLint\n\n');
  });

  QUnit.test('sources/admin-boundaries.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/admin-boundaries.js should pass ESLint\n\n');
  });

  QUnit.test('sources/aerials.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/aerials.js should pass ESLint\n\n');
  });

  QUnit.test('sources/commercial-overlays.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/commercial-overlays.js should pass ESLint\n\n');
  });

  QUnit.test('sources/effective-flood-insurance-rate-2007.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/effective-flood-insurance-rate-2007.js should pass ESLint\n\n');
  });

  QUnit.test('sources/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/index.js should pass ESLint\n\n');
  });

  QUnit.test('sources/landmark-historic.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/landmark-historic.js should pass ESLint\n\n');
  });

  QUnit.test('sources/pluto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/pluto.js should pass ESLint\n\n');
  });

  QUnit.test('sources/preliminary-flood-insurance-rate.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/preliminary-flood-insurance-rate.js should pass ESLint\n\n');
  });

  QUnit.test('sources/supporting-zoning.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/supporting-zoning.js should pass ESLint\n\n');
  });

  QUnit.test('sources/transportation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/transportation.js should pass ESLint\n\n');
  });

  QUnit.test('sources/zoning-districts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/zoning-districts.js should pass ESLint\n\n');
  });

  QUnit.test('sources/zoning-map-amendments.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sources/zoning-map-amendments.js should pass ESLint\n\n');
  });

  QUnit.test('storages/bookmarks.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'storages/bookmarks.js should pass ESLint\n\n');
  });

  QUnit.test('utils/admin-boundary-styles.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/admin-boundary-styles.js should pass ESLint\n\n');
  });

  QUnit.test('utils/bbl-demux.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/bbl-demux.js should pass ESLint\n\n');
  });

  QUnit.test('utils/carto.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/carto.js should pass ESLint\n\n');
  });

  QUnit.test('utils/polygon-layer-styles.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/polygon-layer-styles.js should pass ESLint\n\n');
  });

  QUnit.test('utils/special-purpose-crosswalk.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/special-purpose-crosswalk.js should pass ESLint\n\n');
  });

  QUnit.test('utils/sql-builder.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/sql-builder.js should pass ESLint\n\n');
  });

  QUnit.test('utils/track-event.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/track-event.js should pass ESLint\n\n');
  });
});
define('labs-zola/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = Ember.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('labs-zola/tests/helpers/ember-basic-dropdown', ['exports', 'ember-basic-dropdown/test-support/helpers', 'ember-native-dom-helpers'], function (exports, _helpers, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = exports.fireKeydown = exports.tapTrigger = exports.clickTrigger = exports.nativeTap = undefined;
  Object.defineProperty(exports, 'nativeTap', {
    enumerable: true,
    get: function () {
      return _helpers.nativeTap;
    }
  });
  Object.defineProperty(exports, 'clickTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.clickTrigger;
    }
  });
  Object.defineProperty(exports, 'tapTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.tapTrigger;
    }
  });
  Object.defineProperty(exports, 'fireKeydown', {
    enumerable: true,
    get: function () {
      return _helpers.fireKeydown;
    }
  });
  exports.default = _helpers.default;
  var nativeClick = exports.nativeClick = _emberNativeDomHelpers.click;
});
define('labs-zola/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  Object.defineProperty(exports, 'findContains', {
    enumerable: true,
    get: function () {
      return _helpers.findContains;
    }
  });
  Object.defineProperty(exports, 'nativeMouseDown', {
    enumerable: true,
    get: function () {
      return _helpers.nativeMouseDown;
    }
  });
  Object.defineProperty(exports, 'nativeMouseUp', {
    enumerable: true,
    get: function () {
      return _helpers.nativeMouseUp;
    }
  });
  Object.defineProperty(exports, 'triggerKeydown', {
    enumerable: true,
    get: function () {
      return _helpers.triggerKeydown;
    }
  });
  Object.defineProperty(exports, 'typeInSearch', {
    enumerable: true,
    get: function () {
      return _helpers.typeInSearch;
    }
  });
  Object.defineProperty(exports, 'clickTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.clickTrigger;
    }
  });
  Object.defineProperty(exports, 'nativeTouch', {
    enumerable: true,
    get: function () {
      return _helpers.nativeTouch;
    }
  });
  Object.defineProperty(exports, 'touchTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.touchTrigger;
    }
  });
  Object.defineProperty(exports, 'selectChoose', {
    enumerable: true,
    get: function () {
      return _helpers.selectChoose;
    }
  });
  exports.default = _helpers.default;
});
define('labs-zola/tests/helpers/ember-tooltips', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.findTooltip = findTooltip;
  exports.findTooltipTarget = findTooltipTarget;
  exports.triggerTooltipTargetEvent = triggerTooltipTargetEvent;
  exports.assertTooltipNotRendered = assertTooltipNotRendered;
  exports.assertTooltipRendered = assertTooltipRendered;
  exports.assertTooltipNotVisible = assertTooltipNotVisible;
  exports.assertTooltipVisible = assertTooltipVisible;
  exports.assertTooltipSide = assertTooltipSide;
  exports.assertTooltipSpacing = assertTooltipSpacing;
  exports.assertTooltipContent = assertTooltipContent;
  var $ = Ember.$,
      run = Ember.run;


  var tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';
  var tooltipOrPopoverTargetSelector = '.ember-tooltip-or-popover-target';

  /**
  @method getPositionDifferences
  @param String side The side the tooltip should be on relative to the target
  
  Given a side, which represents the side of the target that
  the tooltip should render, this method identifies whether
  the tooltip or the target should be further away from the
  top left of the window.
  
  For example, if the side is 'top' then the target should
  be further away from the top left of the window than the
  tooltip because the tooltip should render above the target.
  
  If the side is 'right' then the tooltip should be further
  away from the top left of the window than the target
  because the tooltip should render to the right of the
  target.
  
  This method then returns an object with two numbers:
  
  - `expectedGreaterDistance` (expected greater number given the side)
  - `expectedLesserDistance` (expected lesser number given the side)
  
  These numbers can be used for calculations like determining
  whether a tooltip is on the correct side of the target or
  determining whether a tooltip is the correct distance from
  the target on the given side.
  */

  function getPositionDifferences() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _getTooltipAndTargetP = getTooltipAndTargetPosition(options),
        targetPosition = _getTooltipAndTargetP.targetPosition,
        tooltipPosition = _getTooltipAndTargetP.tooltipPosition;

    var side = options.side;


    var distanceToTarget = targetPosition[side];
    var distanceToTooltip = tooltipPosition[getOppositeSide(side)];
    var shouldTooltipBeCloserThanTarget = side === 'top' || side === 'left';
    var expectedGreaterDistance = shouldTooltipBeCloserThanTarget ? distanceToTarget : distanceToTooltip;
    var expectedLesserDistance = shouldTooltipBeCloserThanTarget ? distanceToTooltip : distanceToTarget;

    return { expectedGreaterDistance: expectedGreaterDistance, expectedLesserDistance: expectedLesserDistance };
  }

  function getTooltipFromBody() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tooltipOrPopoverSelector;

    // we have to .find() tooltips from $body because sometimes
    // tooltips and popovers are rendered as children of <body>
    // instead of children of the $targetElement

    var $body = $(document.body);
    var $tooltip = $body.find(selector);

    if (!$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
      throw Error('getTooltipFromBody(): returned an element that is not a tooltip');
    } else if ($tooltip.length === 0) {
      throw Error('getTooltipFromBody(): No tooltips were found.');
    } else if ($tooltip.length > 1) {
      throw Error('getTooltipFromBody(): Multiple tooltips were found. Please provide an {option.selector = ".specific-tooltip-class"}');
    }

    return $tooltip;
  }

  function getTooltipTargetFromBody() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tooltipOrPopoverTargetSelector;

    var $body = $(document.body);
    var $tooltipTarget = $body.find(selector);

    if ($tooltipTarget.length === 0) {
      throw Error('getTooltipTargetFromBody(): No tooltip targets were found.');
    } else if ($tooltipTarget.length > 1) {
      throw Error('getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}');
    }

    return $tooltipTarget;
  }

  function getOppositeSide(side) {
    switch (side) {
      case 'top':
        return 'bottom';break;
      case 'right':
        return 'left';break;
      case 'bottom':
        return 'top';break;
      case 'left':
        return 'right';break;
    }
  }

  function validateSide(side) {
    var testHelper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'assertTooltipSide';

    var sideIsValid = side === 'top' || side === 'right' || side === 'bottom' || side === 'left';

    /* We make sure the side being tested is valid. We
    use Ember.assert because assert is passed in from QUnit */

    if (!sideIsValid) {
      Ember.assert('You must pass side like ' + testHelper + '(assert, { side: \'top\' }); Valid options for side are top, right, bottom, and left.');
    }
  }

  function getTooltipAndTargetPosition() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var $target = getTooltipTargetFromBody(options.targetSelector || tooltipOrPopoverTargetSelector);
    var targetPosition = $target[0].getBoundingClientRect();
    var $tooltip = getTooltipFromBody(options.selector || tooltipOrPopoverSelector);
    var tooltipPosition = $tooltip[0].getBoundingClientRect();

    return {
      targetPosition: targetPosition,
      tooltipPosition: tooltipPosition
    };
  }

  /* TODO(Duncan): Document */

  function findTooltip() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tooltipOrPopoverSelector;

    return getTooltipFromBody(selector);
  }

  /* TODO(Duncan): Document */

  function findTooltipTarget() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tooltipOrPopoverTargetSelector;

    return getTooltipTargetFromBody(selector);
  }

  /* TODO(Duncan):
  
  Update triggerTooltipTargetEvent() to use getTooltipTargetFromBody
  and move side into the options hash */

  function triggerTooltipTargetEvent($element, type) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    // TODO why do we allow focusin? why not just focus?
    var approvedEventTypes = ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur'];
    if (approvedEventTypes.indexOf(type) == -1) {
      throw Error('only ' + approvedEventTypes.join(', ') + ' will trigger a tooltip event. You used ' + type + '.');
    }

    var wasEventTriggered = false;

    if (options.selector) {
      $element = getTooltipTargetFromBody(options.selector);
    }

    // we need to need to wrap any code with asynchronous side-effects in a run
    // $tooltipTarget.trigger('someEvent') has asynchronous side-effects
    run(function () {
      // if the $tooltip is hidden then the user can't interact with it
      if ($element.attr('aria-hidden') === 'true') {
        return;
      }
      if (type === 'focus' || type === 'blur') {

        // we don't know why but this is necessary when type is 'focus' or 'blur'
        $element[0].dispatchEvent(new window.Event(type));
      } else {
        $element.trigger(type);
      }

      wasEventTriggered = true;
    });

    return wasEventTriggered;
  }

  function assertTooltipNotRendered(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $body = $(document.body);
    var $tooltip = $body.find(options.selector || tooltipOrPopoverSelector);

    assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
  }

  function assertTooltipRendered(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $tooltip = getTooltipFromBody(options.selector);

    assert.equal($tooltip.length, 1, 'assertTooltipRendered(): the ember-tooltip should be rendered');
  }

  function assertTooltipNotVisible(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $tooltip = getTooltipFromBody(options.selector);
    var isTooltipNotVisible = $tooltip.attr('aria-hidden') == 'true';
    var isTooltipTetherDisabled = $tooltip.attr('data-tether-enabled') == 'false';

    assert.ok(isTooltipNotVisible && isTooltipTetherDisabled, 'assertTooltipNotVisible(): the ember-tooltip shouldn\'t be visible and the tether should be disabled:\n        isTooltipNotVisible -> ' + isTooltipNotVisible + ' ;\n        isTooltipTetherDisabled -> ' + isTooltipTetherDisabled);
  }

  function assertTooltipVisible(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $tooltip = getTooltipFromBody(options.selector);
    var isTooltipVisible = $tooltip.attr('aria-hidden') == 'false';
    var isTooltipTetherEnabled = $tooltip.attr('data-tether-enabled') == 'true';

    assert.ok(isTooltipVisible && isTooltipTetherEnabled, 'assertTooltipVisible(): the ember-tooltip should be visible and the tether should be enabled:\n        isTooltipVisible -> ' + isTooltipVisible + ' ;\n        isTooltipTetherEnabled -> ' + isTooltipTetherEnabled);
  }

  function assertTooltipSide(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var side = options.side;


    validateSide(side);

    var _getPositionDifferenc = getPositionDifferences(options),
        expectedGreaterDistance = _getPositionDifferenc.expectedGreaterDistance,
        expectedLesserDistance = _getPositionDifferenc.expectedLesserDistance;

    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    assert.ok(expectedGreaterDistance > expectedLesserDistance, 'Tooltip should be on the ' + side + ' side of the target');
  }

  function assertTooltipSpacing(assert, options) {
    var side = options.side,
        spacing = options.spacing;


    validateSide(side, 'assertTooltipSpacing');

    if (typeof spacing !== 'number') {
      Ember.assert('You must pass spacing as a number like assertTooltipSpacing(assert, { side: \'top\', spacing: 10 });');
    }

    var _getPositionDifferenc2 = getPositionDifferences(options),
        expectedGreaterDistance = _getPositionDifferenc2.expectedGreaterDistance,
        expectedLesserDistance = _getPositionDifferenc2.expectedLesserDistance;

    var actualSpacing = Math.round(expectedGreaterDistance - expectedLesserDistance);

    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    var isSideCorrect = expectedGreaterDistance > expectedLesserDistance;
    var isSpacingCorrect = actualSpacing === spacing;

    assert.ok(isSideCorrect && isSpacingCorrect, 'assertTooltipSpacing(): the tooltip should be in the correct position:\n        - Tooltip should be on the ' + side + ' side of the target: ' + isSideCorrect + '.\n        - On the ' + side + ' side of the target, the tooltip should be ' + spacing + 'px from the target but it was ' + actualSpacing + 'px');
  }

  function assertTooltipContent(assert) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var contentString = options.contentString;


    if (Ember.isNone(contentString)) {
      Ember.assert('You must specify a contentString property in the options parameter');
    }

    var $tooltip = getTooltipFromBody(options.selector);
    var tooltipContent = $tooltip.text().trim();

    assert.equal(tooltipContent, contentString, 'Content of tooltip (' + tooltipContent + ') matched expected (' + contentString + ')');
  }
});
define('labs-zola/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'labs-zola/tests/helpers/start-app', 'labs-zola/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();
        if (options.beforeEach) {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return options.beforeEach.apply(this, args);
        }
        return null;
      },
      afterEach: function afterEach() {
        var _this = this;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var afterEach = options.afterEach && options.afterEach.apply(this, args);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('labs-zola/tests/helpers/resolver', ['exports', 'labs-zola/resolver', 'labs-zola/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('labs-zola/tests/helpers/start-app', ['exports', 'labs-zola/app', 'labs-zola/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var run = Ember.run;
  var merge = Ember.merge;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('labs-zola/tests/integration/components/bbl-lookup-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('bbl-lookup', 'Integration | Component | bbl lookup', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "4WhSJfAc",
      "block": "{\"statements\":[[1,[26,[\"bbl-lookup\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'BBL Lookup');
  });
});
define('labs-zola/tests/integration/components/bookmark-button-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('bookmark-button', 'Integration | Component | bookmark button', {
    integration: true
  });

  (0, _emberQunit.skip)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wDczlOx6",
      "block": "{\"statements\":[[1,[26,[\"bookmark-button\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5IMX1Hlx",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"bookmark-button\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/cascading-checkbox-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('cascading-checkbox', 'Integration | Component | cascading checkbox', {
    integration: true
  });

  // test('it renders', function(assert) {

  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.on('myAction', function(val) { ... });

  //   this.render(hbs`{{cascading-checkbox}}`);

  //   assert.equal(this.$().text().trim(), '');

  //   // Template block usage:
  //   this.render(hbs`
  //     {{#cascading-checkbox}}
  //       template block text
  //     {{/cascading-checkbox}}
  //   `);

  //   assert.equal(this.$().text().trim(), 'template block text');
  // });
});
define('labs-zola/tests/integration/components/group-checkbox-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('group-checkbox', 'Integration | Component | group checkbox', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "H64qHVm+",
      "block": "{\"statements\":[[1,[26,[\"group-checkbox\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9bbaa5MU",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"group-checkbox\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/hover-tooltip-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hover-tooltip', 'Integration | Component | hover tooltip', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "QhI9XkcK",
      "block": "{\"statements\":[[1,[26,[\"hover-tooltip\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('labs-zola/tests/integration/components/info-tooltip-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('info-tooltip', 'Integration | Component | info tooltip', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "L+TvUAmI",
      "block": "{\"statements\":[[1,[26,[\"info-tooltip\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "gvn5yPWW",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"info-tooltip\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/interactive-layers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('interactive-layers', 'Integration | Component | interactive layers', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Fc9TogtD",
      "block": "{\"statements\":[[1,[26,[\"interactive-layers\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "nGI+b0u8",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"interactive-layers\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/intersecting-layers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('intersecting-layers', 'Integration | Component | intersecting layers', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Vz3k687U",
      "block": "{\"statements\":[[1,[26,[\"intersecting-layers\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "sPHcOpZF",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"intersecting-layers\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/layer-checkbox-test', ['ember-qunit', 'ember-native-dom-helpers'], function (_emberQunit, _emberNativeDomHelpers) {
  'use strict';

  var timeout = 5000;

  var commercialOverlays = {
    id: 'commercial-overlays',
    title: 'Commercial Overlays',
    type: 'carto',
    sql: 'SELECT * FROM commercial_overlays_v201804',
    visible: true,
    layers: [{
      layer: {
        id: 'co',
        type: 'line',
        source: 'co',
        'source-layer': 'layer0',
        paint: {
          'line-width': {
            stops: [[13, 1], [14, 3]]
          },
          'line-opacity': 0.3,
          'line-color': 'rgba(255, 0, 0, 1)'
        }
      }
    }, {
      layer: {
        id: 'co_labels',
        source: 'co',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: {
          'text-color': 'rgba(255, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': 0.6
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}'
        },
        minzoom: 14
      }
    }]
  };

  (0, _emberQunit.moduleForComponent)('layer-checkbox', 'Integration | Component | layer checkbox', {
    integration: true
  });

  // test('it renders', async function(assert) {

  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.on('myAction', function(val) { ... });

  //   this.setProperties({
  //     zoom: 10,
  //     lng: 42,
  //     lat: -71,
  //     commercialOverlays,
  //   });

  //   await this.render(hbs`
  //     {{#mapbox-gl
  //       id='main-map'
  //       initOptions=(hash style='mapbox://styles/mapbox/light-v9'
  //                         zoom=zoom
  //                         center=(array lng lat))
  //       as |map|}}

  //         {{#map.layer-group 
  //           config=commercialOverlays as |group|}}

  //             {{#group.multi-select-control 
  //               column='overlay' as |multiSelect|}}

  //               {{multiSelect.group-checkbox}}

  //             {{/group.multi-select-control}}
  //         {{/map.layer-group}}
  //     {{/mapbox-gl}}
  //   `);
  //   await waitUntil(() => find('input'), { timeout });
  //   await click('input');
  //   assert.equal(this.$().text().trim(), '');
  // });
});
define('labs-zola/tests/integration/components/layer-control-timeline-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-control-timeline', 'Integration | Component | layer control timeline', {
    integration: true
  });

  // test('it renders', function(assert) {

  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.on('myAction', function(val) { ... });

  //   this.render(hbs`{{layer-control-timeline}}`);

  //   assert.equal(this.$().text().trim(), '2010-122017-09');
  // });
});
define('labs-zola/tests/integration/components/layer-menu-item-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-menu-item', 'Integration | Component | layer menu item', {
    integration: true
  });

  (0, _emberQunit.test)('it indicates whether information may be hidden', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('fakeMap', {
      currentZoom: 8
    });

    this.set('fakeLimitedZoomLayer', {
      minzoom: 15,
      visible: true,
      config: {
        title: 'test'
      }
    });

    this.set('fakeLayer', {
      visible: true,
      config: {
        title: 'test'
      }
    });

    this.render(Ember.HTMLBars.template({
      "id": "ifl6t8x0",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"layer-menu-item\"],null,[[\"mainMap\",\"layer\"],[[28,[\"fakeMap\"]],[28,[\"fakeLimitedZoomLayer\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"layer-menu-item\"],null,[[\"mainMap\",\"layer\"],[[28,[\"fakeMap\"]],[28,[\"fakeLayer\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$('.layer-warning').length, 1);
  });
});
define('labs-zola/tests/integration/components/layer-multi-select-control-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-multi-select-control', 'Integration | Component | layer multi select control', {
    integration: true
  });

  // test('it renders', function(assert) {

  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.on('myAction', function(val) { ... });

  //   this.render(hbs`{{layer-multi-select-control}}`);

  //   assert.equal(this.$().text().trim(), '');

  //   // Template block usage:
  //   this.render(hbs`
  //     {{#layer-multi-select-control}}
  //       template block text
  //     {{/layer-multi-select-control}}
  //   `);

  //   assert.equal(this.$().text().trim(), 'template block text');
  // });
});
define('labs-zola/tests/integration/components/layer-palette-accordion-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-palette-accordion', 'Integration | Component | layer palette accordion', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "sm861rtb",
      "block": "{\"statements\":[[1,[26,[\"layer-palette-accordion\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "9f1itXJ5",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });

  (0, _emberQunit.test)('count number of visible layer-menu-item child descendents, updates', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('fakeLayerVisible', {
      visible: true
    });

    this.set('fakeLayerInvisible', {
      visible: false
    });

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "On8wSbnt",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"layer-palette-accordion\"],null,null,{\"statements\":[[0,\"      \"],[1,[33,[\"layer-menu-item\"],null,[[\"layer\"],[[28,[\"fakeLayerVisible\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"layer-menu-item\"],null,[[\"layer\"],[[28,[\"fakeLayerVisible\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"layer-menu-item\"],null,[[\"layer\"],[[28,[\"fakeLayerVisible\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"layer-menu-item\"],null,[[\"layer\"],[[28,[\"fakeLayerInvisible\"]]]]],false],[0,\"\\n      \"],[1,[33,[\"layer-menu-item\"],null,[[\"layer\"],[[28,[\"fakeLayerInvisible\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$('.badge').text().trim(), '3');

    this.set('fakeLayerInvisible.visible', true);

    assert.equal(this.$('.badge').text().trim(), '5');
  });
});
define('labs-zola/tests/integration/components/layer-static-legend-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-static-legend', 'Integration | Component | layer static legend', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "fMQn7ftk",
      "block": "{\"statements\":[[1,[26,[\"layer-static-legend\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "vOwFShCI",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"layer-static-legend\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/layer-tooltip-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('layer-tooltip', 'Integration | Component | layer tooltip', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "o65h4MSm",
      "block": "{\"statements\":[[1,[26,[\"layer-tooltip\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "JNApOh18",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"layer-tooltip\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/lot-bookmark-item-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('lot-bookmark-item', 'Integration | Component | lot bookmark item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "kT3b3RaG",
      "block": "{\"statements\":[[1,[26,[\"lot-bookmark-item\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '×');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "eAsLCol+",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"lot-bookmark-item\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '×');
  });
});
define('labs-zola/tests/integration/components/map-search-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  var TEST_DATA = [{ type: 'lot', address: '120 Broadway' }, { type: 'lot', address: '1120 Broadway' }, { type: 'address', address: '1234 Street Ave' }];
  var MOCK_TASK_STRUCTURE_DATA = { value: TEST_DATA };

  (0, _emberQunit.moduleForComponent)('map-search', 'Integration | Component | map search', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "MuoCxmfx",
      "block": "{\"statements\":[[1,[26,[\"map-search\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });

  (0, _emberQunit.test)('it shows results', function (assert) {
    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA
    });

    this.render(Ember.HTMLBars.template({
      "id": "ziq2xIv9",
      "block": "{\"statements\":[[1,[33,[\"map-search\"],null,[[\"results\",\"searchTerms\"],[[28,[\"results\"]],[28,[\"searchTerms\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.search-results .result').length, 3);
  });

  (0, _emberQunit.test)('it keys down', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA,
      selected: 0
    });

    this.render(Ember.HTMLBars.template({
      "id": "HppaLr2I",
      "block": "{\"statements\":[[1,[33,[\"map-search\"],null,[[\"results\",\"searchTerms\",\"selected\"],[[28,[\"results\"]],[28,[\"searchTerms\"]],[28,[\"selected\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.set('selected', 1);
    assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('1120 Broadway') + 2), true);
  });

  (0, _emberQunit.test)('it keys up', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA,
      selected: 0
    });

    this.render(Ember.HTMLBars.template({
      "id": "HppaLr2I",
      "block": "{\"statements\":[[1,[33,[\"map-search\"],null,[[\"results\",\"searchTerms\",\"selected\"],[[28,[\"results\"]],[28,[\"searchTerms\"]],[28,[\"selected\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.set('selected', 1);
    this.set('selected', 0);
    assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('120 Broadway') + 2), true);
  });

  (0, _emberQunit.test)('it says loading when loading', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.setProperties({
      searchTerms: '120 Broadway'
    });
    this.render(Ember.HTMLBars.template({
      "id": "mgTOerX3",
      "block": "{\"statements\":[[1,[33,[\"map-search\"],null,[[\"searchTerms\"],[[28,[\"searchTerms\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.search-results--loading').text().trim(), 'Loading...');
  });

  (0, _emberQunit.test)('it says no results when no results', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.setProperties({
      searchTerms: '120 Broadway Street, Tulsa, OK',
      results: { value: [] },
      resultsCount: 0
    });
    this.render(Ember.HTMLBars.template({
      "id": "vZ4n7V9f",
      "block": "{\"statements\":[[1,[33,[\"map-search\"],null,[[\"searchTerms\",\"results\",\"resultsCount\"],[[28,[\"searchTerms\"]],[28,[\"results\"]],[28,[\"resultsCount\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(!!(this.$().text().trim().indexOf('No Results Found') + 1), true);
  });
});
define('labs-zola/tests/integration/components/mapbox-gl-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('mapbox-gl', 'Integration | Component | mapbox gl', {
    integration: true
  });

  (0, _emberQunit.skip)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "l52BUmm7",
      "block": "{\"statements\":[[1,[26,[\"mapbox-gl\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');
  });
});
define('labs-zola/tests/integration/components/radio-selector-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('radio-selector', 'Integration | Component | radio selector', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "RqNLCYkQ",
      "block": "{\"statements\":[[1,[26,[\"radio-selector\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "865I6FaC",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"radio-selector\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/scraped-part-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('scraped-part', 'Integration | Component | scraped part', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "qg3Jf/kf",
      "block": "{\"statements\":[[1,[26,[\"scraped-part\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "8FD7K+32",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"scraped-part\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('labs-zola/tests/integration/components/switch-toggle-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('switch-toggle', 'Integration | Component | switch toggle', {
    integration: true
  });

  // test('it renders', function(assert) {

  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.on('myAction', function(val) { ... });

  //   this.render(hbs`{{switch-toggle}}`);

  //   assert.equal(this.$().text().trim(), '');

  //   // Template block usage:
  //   this.render(hbs`
  //     {{#switch-toggle}}
  //       template block text
  //     {{/switch-toggle}}
  //   `);

  //   assert.equal(this.$().text().trim(), 'template block text');
  // });
});
define('labs-zola/tests/integration/helpers/bbl-demux-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('bbl-demux', 'helper:bbl-demux', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', { boro: 4, block: 4381, lot: 1 });

    this.render(Ember.HTMLBars.template({
      "id": "+Xp+0zoY",
      "block": "{\"statements\":[[1,[33,[\"bbl-demux\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '4043810001');
  });
});
define('labs-zola/tests/integration/helpers/carto-download-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('carto-download-link', 'helper:carto-download-link', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.setProperties({
      table: 'mappluto_v1711',
      identifier: 'bbl',
      ids: [1014970028, 1015280036, 1015280038],
      format: 'csv'
    });

    this.render(Ember.HTMLBars.template({
      "id": "sBuBr7Tg",
      "block": "{\"statements\":[[1,[33,[\"carto-download-link\"],[[28,[\"table\"]],[28,[\"identifier\"]],[28,[\"ids\"]],[28,[\"format\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mappluto_v1711 WHERE bbl IN (1014970028,1015280036,1015280038)&format=csv&filename=mappluto_v1711');
  });
});
define('labs-zola/tests/integration/helpers/extract-layer-stops-for-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var inputValue = {
    id: 'zoning',
    title: 'Zoning Districts',
    sql: 'SELECT * FROM (SELECT *, LEFT(zonedist, 2) as primaryzone FROM zoning_districts_v201804) a',
    type: 'carto',
    layers: [{
      layer: {
        id: 'zd',
        type: 'fill',
        source: 'zoning',
        'source-layer': 'layer0',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [['BP', '#666666'], ['C1', '#ffa89c'], ['C2', '#ff9086'], ['C3', '#ff786f'], ['C4', '#ff6059'], ['C5', '#ff4843'], ['C6', '#ff302d'], ['C7', '#ff1816'], ['C8', '#ff0000'], ['M1', '#f3b7fb'], ['M2', '#eb8dfb'], ['M3', '#e362fb'], ['PA', '#78D271'], ['R1', '#f6f4b1'], ['R2', '#f6f49e'], ['R3', '#f5f58b'], ['R4', '#f5f578'], ['R5', '#f4f565'], ['R6', '#f4f551'], ['R7', '#f3f63e'], ['R8', '#f3f62b'], ['R9', '#f2f618'], ['R10', '#F0F614']]
          },
          'fill-opacity': 0.3,
          'fill-antialias': true
        }
      },
      before: 'place_other'
    }]
  };

  (0, _emberQunit.moduleForComponent)('extract-layer-stops-for', 'helper:extract-layer-stops-for', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', inputValue);

    this.render(Ember.HTMLBars.template({
      "id": "wNb8Xkno",
      "block": "{\"statements\":[[1,[33,[\"extract-layer-stops-for\"],[\"zd\",[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(_typeof(this), 'object');
  });
});
define('labs-zola/tests/integration/helpers/get-unique-options-for-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  (0, _emberQunit.moduleForComponent)('get-unique-options-for', 'helper:get-unique-options-for', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('sql', 'SELECT * FROM commercial_overlays_v201804');

    this.render(Ember.HTMLBars.template({
      "id": "yoMpcaId",
      "block": "{\"statements\":[[1,[33,[\"get-unique-options-for\"],[\"overlay\",[28,[\"sql\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(_typeof(this), 'object');
  });
});
define('labs-zola/tests/integration/helpers/make-special-purpose-district-link-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('make-special-purpose-district-link', 'helper:make-special-purpose-district-link', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.skip)('it renders', function (assert) {
    this.set('inputValue', ['1234']);

    this.render(Ember.HTMLBars.template({
      "id": "lu4B4k20",
      "block": "{\"statements\":[[1,[33,[\"make-special-purpose-district-link\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('labs-zola/tests/integration/helpers/numeral-format-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('numeral-format', 'helper:numeral-format', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "oifJE7Q2",
      "block": "{\"statements\":[[1,[33,[\"numeral-format\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1,234');
  });
});
define('labs-zola/tests/integration/helpers/to-title-case-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('to-title-case', 'helper:to-title-case', {
    integration: true
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it renders', function (assert) {
    this.set('inputValue', '1234');

    this.render(Ember.HTMLBars.template({
      "id": "kMbtkvGX",
      "block": "{\"statements\":[[1,[33,[\"to-title-case\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '1234');
  });
});
define('labs-zola/tests/test-helper', ['ember-qunit', 'ember-cli-qunit', 'labs-zola/tests/helpers/resolver'], function (_emberQunit, _emberCliQunit, _resolver) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define("labs-zola/tests/tests.lint-test", [], function () {
  "use strict";
});
define('labs-zola/tests/unit/adapters/bookmark-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:bookmark', 'Unit | Adapter | bookmark', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/adapters/commercial-overlay-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:commercial-overlay', 'Unit | Adapter | commercial overlay', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/adapters/scraped-part-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:scraped-part', 'Unit | Adapter | scraped part', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/adapters/special-purpose-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:special-purpose-district', 'Unit | Adapter | special purpose district', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/adapters/special-purpose-subdistrict-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:special-purpose-subdistrict', 'Unit | Adapter | special purpose subdistrict', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/adapters/zma-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:zma', 'Unit | Adapter | zma', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('labs-zola/tests/unit/controllers/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:mapMouseover', 'service:registeredLayers', 'service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/bookmarks-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:bookmarks', 'Unit | Controller | bookmarks', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/commercial-overlay', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:commercial-overlay', 'Unit | Controller | commercial overlay', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/lot-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:lot', 'Unit | Controller | lot', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/special-purpose-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:special-purpose-district', 'Unit | Controller | special purpose district', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/special-purpose-subdistricts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:special-purpose-subdistricts', 'Unit | Controller | special purpose subdistricts', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/zma-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:zma', 'Unit | Controller | zma', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/controllers/zoning-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:zoning-district', 'Unit | Controller | zoning district', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('labs-zola/tests/unit/mixins/bookmarkable-test', ['labs-zola/mixins/bookmarkable', 'qunit'], function (_bookmarkable, _qunit) {
  'use strict';

  var EmberObject = Ember.Object;


  (0, _qunit.module)('Unit | Mixin | bookmarkable');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var BookmarkableObject = EmberObject.extend(_bookmarkable.default);
    var subject = BookmarkableObject.create();
    assert.ok(subject);
  });
});
define('labs-zola/tests/unit/mixins/geometric-test', ['labs-zola/mixins/geometric', 'qunit'], function (_geometric, _qunit) {
  'use strict';

  var EmberObject = Ember.Object;


  (0, _qunit.module)('Unit | Mixin | geometric');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var GeometricObject = EmberObject.extend(_geometric.default);
    var subject = GeometricObject.create();
    assert.ok(subject);
  });
});
define('labs-zola/tests/unit/mixins/query-param-map-test', ['labs-zola/mixins/query-param-map', 'qunit'], function (_queryParamMap, _qunit) {
  'use strict';

  var EmberObject = Ember.Object;


  (0, _qunit.module)('Unit | Mixin | query param map');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var QueryParamMapObject = EmberObject.extend(_queryParamMap.default);
    var subject = QueryParamMapObject.create();
    assert.ok(subject);
  });
});
define('labs-zola/tests/unit/mixins/track-page-test', ['labs-zola/mixins/track-page', 'qunit'], function (_trackPage, _qunit) {
  'use strict';

  var EmberObject = Ember.Object;


  (0, _qunit.module)('Unit | Mixin | track page');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var TrackPageObject = EmberObject.extend(_trackPage.default);
    var subject = TrackPageObject.create();
    assert.ok(subject);
  });
});
define('labs-zola/tests/unit/mixins/update-selection-test', ['labs-zola/mixins/update-selection', 'qunit'], function (_updateSelection, _qunit) {
  'use strict';

  var EmberObject = Ember.Object;


  (0, _qunit.module)('Unit | Mixin | update selection');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var UpdateSelectionObject = EmberObject.extend(_updateSelection.default);
    var subject = UpdateSelectionObject.create();
    assert.ok(subject);
  });
});
define('labs-zola/tests/unit/models/bookmark-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('bookmark', 'Unit | Model | bookmark', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/commercial-overlay-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('commercial-overlay', 'Unit | Model | commercial overlay', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/lot-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('lot', 'Unit | Model | lot', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/scraped-part-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('scraped-part', 'Unit | Model | scraped part', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/special-purpose-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('special-purpose-district', 'Unit | Model | special purpose district', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/special-purpose-subdistrict-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('special-purpose-subdistrict', 'Unit | Model | special purpose subdistrict', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/models/zma-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('zma', 'Unit | Model | zma', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('labs-zola/tests/unit/routes/about-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/bbl-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:bbl', 'Unit | Route | bbl', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/bookmarks-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:bookmarks', 'Unit | Route | bookmarks', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/commercial-overlay-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:commercial-overlay', 'Unit | Route | commercial overlay', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics', 'service:mainMap']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/data-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:data', 'Unit | Route | data', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/features-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:features', 'Unit | Route | features', {
    // Specify the other units that are required for this test.
    needs: ['service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/lot-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:lot', 'Unit | Route | lot', {
    // Specify the other units that are required for this test.
    needs: ['service:main-map', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/special-purpose-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:special-purpose-district', 'Unit | Route | special purpose district', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/special-purpose-subdistricts-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:special-purpose-subdistricts', 'Unit | Route | special purpose subdistricts', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/zma-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:zma', 'Unit | Route | zma', {
    // Specify the other units that are required for this test.
    needs: ['service:mainMap', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/routes/zoning-district-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:zoning-district', 'Unit | Route | zoning-district', {
    // Specify the other units that are required for this test.
    needs: ['service:main-map', 'service:metrics']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('labs-zola/tests/unit/serializers/bookmark-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('bookmark', 'Unit | Serializer | bookmark', {
    // Specify the other units that are required for this test.
    needs: ['serializer:bookmark', 'adapter:bookmark', 'model:bookmark']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('labs-zola/tests/unit/services/ajax-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:ajax', 'Unit | Service | ajax', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('labs-zola/tests/unit/services/main-map-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:main-map', 'Unit | Service | main map', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('labs-zola/tests/unit/services/map-mouseover-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:map-mouseover', 'Unit | Service | map mouseover', {
    // Specify the other units that are required for this test.
    needs: ['service:registeredLayers']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('labs-zola/tests/unit/services/registered-layers-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:registered-layers', 'Unit | Service | registered layers', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('labs-zola/tests/unit/services/store-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:store', 'Unit | Service | store', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('labs-zola/tests/unit/utils/bbl-demux-test', ['labs-zola/utils/bbl-demux', 'qunit'], function (_bblDemux, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | bbl demux');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _bblDemux.default)();
    assert.ok(result);
  });
});
define('labs-zola/tests/unit/utils/sql-builder-test', ['labs-zola/utils/sql-builder', 'qunit'], function (_sqlBuilder, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | sql builder');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = new _sqlBuilder.default('id', 'table');
    assert.ok(result);
  });
});
define('labs-zola/tests/unit/utils/track-event-test', ['labs-zola/utils/track-event', 'qunit'], function (_trackEvent, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | track event');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _trackEvent.default)();
    assert.ok(result);
  });
});
require('labs-zola/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
