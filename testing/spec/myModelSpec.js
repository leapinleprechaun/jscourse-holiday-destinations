describe("myModel", function() {
  var myModel;

  beforeEach(function() {
    myModel = new MyModel();
  });

  describe('should have defaults', function () {
    it('should have a default name', function () {
      expect(myModel.defaults.name).toEqual('this is my default name');
    })
  })

});
