JTABLE.Backbone.Views.header = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.header,
  
  initialize: function() {
    _.bindAll(this);
    this.mainView = this.options.mainView;
    this.el = this.mainView.$('.jtable-header');
  },

  render: function() {
    $(this.el).html(this.template({view: this}));
    return this;
  }
});