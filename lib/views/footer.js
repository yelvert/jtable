JTABLE.Backbone.Views.footer = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.footer,
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.mainView = this.options.mainView;
    this.settings = this.options.settings;
    this.template = this.settings.templates.footer || JTABLE.Backbone.Templates.footer
    this.el = this.mainView.$('.jtable-footer');
  },
  
  render: function() {
    $(this.el).html(this.template({view: this}));
    return this;
  }
});