describe("jtable", function() {
  it("should be a jquery function", function() {
    expect($.fn.jtable).toBeDefined()
  })
  
  it("should have a global variable that contains the version and all backbone pieces", function() {
    expect(JTABLE).toBeDefined()
    expect(JTABLE.version).toBeDefined()
    expect(JTABLE.version.major).toBeDefined()
    expect(JTABLE.version.minor).toBeDefined()
    expect(JTABLE.version.patch).toBeDefined()
    expect(JTABLE.Backbone).toBeDefined()
    expect(JTABLE.Backbone.Models).toBeDefined()
    expect(JTABLE.Backbone.Collections).toBeDefined()
    expect(JTABLE.Backbone.Views).toBeDefined()
    expect(JTABLE.Backbone.Templates).toBeDefined()
  })
})