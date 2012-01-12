JTABLE.Backbone.Views.jtable = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');
    this.el = this.options.el;
    this.settings = this.options.settings;
    this.template = this.settings.templates.jtable || JTABLE.Backbone.Templates.jtable;
    $(this.el).addClass('jtable-container');
    this.items = new JTABLE.Backbone.Collections.items(this.settings.items, {settings: this.settings});
  },
  
  render: function() {
    $(this.el).html(this.template({view: this}));
    this.header_view = new JTABLE.Backbone.Views.header({mainView: this, settings: this.settings});
    this.header_view.render();
    this.table_view = new JTABLE.Backbone.Views.table({mainView: this, settings: this.settings});
    this.table_view.render();
    this.footer_view = new JTABLE.Backbone.Views.footer({mainView: this, settings: this.settings});
    this.footer_view.render();
    return this;
  }
});