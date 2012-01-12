JTABLE.Backbone.Views.table = Backbone.View.extend({
  template: JTABLE.Backbone.Templates.table,
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.mainView = this.options.mainView;
    this.settings = this.options.settings;
    this.template = this.settings.templates.table || JTABLE.Backbone.Templates.table
    this.el = this.mainView.$('.jtable-table');
  },
  
  render: function() {
    $(this.el).html(this.template({view: this}));
    return this;
  }
});