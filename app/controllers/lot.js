import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import Bookmarkable from '../mixins/bookmarkable';
import carto from '../utils/carto';

import specialPurposeCrosswalk from '../utils/special-purpose-crosswalk';

const SQL = function(table, geometry) {
  return `SELECT * FROM ${table}
          WHERE
            ST_Intersects(
              ST_SetSRID(
                ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326),
                ${table}.the_geom);`;
};

const intializeDatas = function(self) {
  self.set('main_title', '');
  self.set('main_array', null);
  self.set('sub_array1', null);
  self.set('sub_array2', null);
};

export default Controller.extend(Bookmarkable, {
  sub_title1: '',
  sub_title2: '',
  main_title: '',
  sub_array1: [],
  sub_array2: [],
  main_array: [],

  @computed('lot.zonemap')
  paddedZonemap(zonemap) {
    return (`0${zonemap}`).slice(-3);
  },

  @computed('lot.borocode', 'lot.lot', 'lot.block', 'lot.address', 'lot.zipcode', 'lot.ownername')
  crawledFunc() {
    const data = [6];

    data[0] = this.get('lot.borocode');
    data[1] = this.get('lot.block');
    data[2] = this.get('lot.lot');
    data[3] = this.get('lot.address');
    data[4] = this.get('lot.zipcode');
    data[5] = this.get('lot.ownername');

    const param = {
      borocode: data[0],
      block: data[1],
      lot: data[2],
      address: data[3],
      zipcode: data[4],
      ownername: data[5],
    };

    var self = this;
    const result = {};
    
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/api/crawl-data',
      async: false,
      data: JSON.stringify(param),
      success: function(response) {
        console.log(result);
        self.set('crawl', response);
      },
    });
  },

  @computed('lot.borocode', 'lot.lot', 'lot.block')
  NYC_func() {
    const param = {
      borocode: this.get('lot.borocode'),
      block: this.get('lot.block'),
      lot: this.get('lot.lot'),
    };

    var self = this;

    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/api/getCertUrl',
      async: false,
      data: JSON.stringify(param),
      success: function(response) {
        console.log(response);
        self.set('ppo', response)
        $.scrape_link = response.cUrl;
        console.log($.scrape_link);
      },
    });
    // el.onclick = true;
  },
  @computed('lot.borocode', 'lot.lot', 'lot.block')
  crawledFunc1() {
    const param = {
      borocode: this.get('lot.borocode'),
      block: this.get('lot.block'),
      lot: this.get('lot.lot'),
    };

    var self = this;
    
    intializeDatas(this);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/api/crawl-propertyportal',
      async: false,
      data: JSON.stringify(param),
      success: function(response) {
        console.log(response);
        self.set('main_title', response[response.title1][0]['sub_title']);
        self.set('main_array', response[response.title1][0][self.main_title]);
        if(response[response.title2].length !== 0) {
          self.set('sub_array1', response[response.title2]);
        }
        if(response[response.title3].length !== 0) {
          self.set('sub_array2', response[response.title3]);
        }
        self.set('crawl_pty', response);
        console.log(self.get('crawl_pty'));
      },
    });
  },

  @computed('lot.geometry')
  parentSpecialPurposeDistricts(geometry) {
    return carto.SQL(SQL('special_purpose_districts_v201804', geometry))
      .then(response => response.map(
        (item) => {
          const [, [anchorName, boroName]] = specialPurposeCrosswalk
            .find(([dist]) => dist === item.sdname);

          return {
            id: item.cartodb_id,
            label: item.sdlbl.toUpperCase(),
            name: item.sdname,
            anchorName,
            boroName,
          };
        }),
      );
  },

});
