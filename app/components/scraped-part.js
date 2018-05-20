import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = (name + '=' + (value || '') + expires + ';domain=.nyc.gov;path=/');
  // document.cookie = (name + '=' + (value || '') + expires + 'nycprop.nyc.gov;path=/');
}

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  scrape_link: '',

  @computed('lot.borough', 'lot.lot', 'lot.block')
  get lotdata() {
    const data = [6];

    data[0] = this.get('lot.borocode');
    data[1] = this.get('lot.block');
    data[2] = this.get('lot.lot');

    return data;
  },

  actions: {
    NYCsearchBBL() {
      const dataparam = this.get('lotdata');
      var addStr = 'boro=' + dataparam[0] + '&';
      addStr += 'block=' + dataparam[1] + '&';
      addStr += 'lot=' + dataparam[2];
      $.scrape_link = 'http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?' + addStr + '&go3=+GO+&requestid=0';
      console.log($.scrape_link);
      document.getElementById('new-Page1').href = $.scrape_link;
    },
  },
});
