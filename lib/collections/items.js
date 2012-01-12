JTABLE.Backbone.Collections.items = Backbone.Collection.extend({
  model: JTABLE.Backbone.Models.item,
  
  initialize: function(models, options) {
    _.bindAll(this, 'getPage');
    this.settings = options.settings;
    this.url = this.settings.indexUrl;
    this.currentPage = 1;
  },
  
  getPage: function() {
    if (this.settings.clientSide) {
      
    } else {
      
    }
  }
});