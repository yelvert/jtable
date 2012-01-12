(function($) {
  $.fn.jtable = function(settings_or_call) {
    if (typeof settings_or_call == "string") {
      switch(settings_or_call) {
        default:
          throw(""+settings_or_call+" is not a valid api call on jtable.");
      }
    } else {
      if (!$(this).data('jtable')) {
        var settings = $.extend(true, (settings_or_call || {}), JTABLE.DefaultSettings);
        var jtable = new JTABLE.Backbone.Views.jtable({el: $(this), settings: settings});
        $(this).data('jtable', jtable);
        jtable.render();
      }
    }
    return $(this)
  }
})(jQuery);