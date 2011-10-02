JTABLE.Backbone.Views.footer = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this);
    this.mainView = this.options.mainView;
    this.el = this.mainView.$('.jtable-footer');
  }
});