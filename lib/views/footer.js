JTABLE.Backbone.Views.footer = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.footer,
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.mainView = this.options.mainView;
    this.el = this.mainView.$('.jtable-footer');
  },
  
  render: function() {
    $(this.el).html(this.template({view: this}));
    return this;
  }
});