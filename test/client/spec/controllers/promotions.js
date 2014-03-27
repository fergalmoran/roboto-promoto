'use strict';

describe('Controller: PromotionsCtrl', function () {

    // load the controller's module
    beforeEach(module('robotoPromotoApp'));

    var PromotionsCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PromotionsCtrl = $controller('PromotionsCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of promotions to the scope', function () {
        expect(scope.promotions.length).toBe(3);
    });
});
