JTABLE.Backbone.Views.header = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.header,
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.mainView = this.options.mainView;
    this.settings = this.options.settings;
    this.template = this.settings.templates.header || JTABLE.Backbone.Templates.header
    this.el = this.mainView.$('.jtable-header');
  },

  render: function() {
    $(this.el).html(this.template({view: this}));
    return this;
  }
});