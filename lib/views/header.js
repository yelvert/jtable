JTABLE.Backbone.Views.header = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this);
    this.mainView = this.options.mainView;
    this.el = this.mainView.$('.jtable-header');
  }
});