/* global angular, Modernizr, localStorage */
(function () {
    'use strict';
    angular.module('shuttle', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'partials/main_menu.html'})
        .when('/planner', {templateUrl: 'partials/planner.html', controller: 'planController'})
        .when('/planner/:fromPlace/:toPlace/:when/:time/:date', {templateUrl: 'partials/planner.html', controller: 'planController'})
        .otherwise({redirectTo: '/'});
    }])
    .controller(
        'planController',
        ['$scope', '$filter', '$http', '$location', '$routeParams', function ($scope, $filter, $http, $location, $routeParams) {
            var apikey = 'c631ef46e918c82cf81ef4869f0029d4';

            if ($routeParams.fromPlace && $routeParams.toPlace && $routeParams.when && $routeParams.time && $routeParams.date) {
                var planXhrParams = {
                    apikey: apikey,
                    fromPlace: $routeParams.fromPlace,
                    toPlace: $routeParams.toPlace
                };

                $scope.when = $routeParams.when;
                $scope.time = $routeParams.time;
                $scope.date = $routeParams.date;

                if ($routeParams.when !== 'now') {
                    planXhrParams.arriveBy = $routeParams.when === 'arrive';
                    planXhrParams.time = $routeParams.time;
                    var date = new Date();
                    date.setDate(date.getDate() + parseInt($routeParams.date, 10));
                    planXhrParams.date = $filter('date')(date, 'M/d/yyyy');
                }

                $scope.isLoading = true;

                $http({
                    method: 'GET',
                    url: 'http://apis.ucsf.edu/shuttle/plan',
                    params: planXhrParams
                }).success(function (data) {
                    $scope.isLoading = false;
                    $scope.planLoaded = true;
                    var plan = data.plan || {};
                    if (plan.itineraries) {
                        // Used to check that the plan is within four hours of the target time.
                        var datestamp = plan.date ? plan.date : Date.now();
                        var fourHours = 4 * 60 * 60 * 1000;
                        var index = 1;
                        var itinerariesCount = plan.itineraries.length;
                        var removalQueue = [];
                        var massagedLeg;
                        var tripSteps;
                        var thisItinerary;
                        // Decrement with while rather than increment with for so that splice() doesn't mess up the loop
                        for (var i = 0; i < itinerariesCount; i++) {
                            thisItinerary = plan.itineraries[i];
                            // Only use itineraries that are less than 2 hours (e.g., not overnight)
                            // This check should probably be happening on the server side.
                            // Then check that the time is within four hours of what was chosen
                            // so the user doesn't get a trip for the next day.
                            if ((thisItinerary.duration < 2 * 60 * 60 * 1000) && (thisItinerary.endTime >= datestamp - fourHours) && (thisItinerary.endTime <= datestamp + fourHours)) {
                                thisItinerary.index = index;
                                index++;
                                thisItinerary.startTimeFormatted = $filter('date')(thisItinerary.startTime, 'shortTime');
                                thisItinerary.endTimeFormatted = $filter('date')(thisItinerary.endTime, 'shortTime');
                                thisItinerary.durationFormatted = Math.round(thisItinerary.duration / (60 * 1000));
                                if (thisItinerary.hasOwnProperty('legs')) {
                                    tripSteps = thisItinerary.legs.length;
                                    for (var j = 0; j < tripSteps; j++) {
                                        massagedLeg = {};
                                        massagedLeg.toName = thisItinerary.legs[j].to.name;

                                        if (thisItinerary.legs[j].mode === 'BUS') {
                                            massagedLeg.fromName = thisItinerary.legs[j].from.name;
                                            massagedLeg.route = thisItinerary.legs[j].route;
                                            massagedLeg.routeId = thisItinerary.legs[j].routeId;
                                            massagedLeg.startTime = $filter('date')(thisItinerary.legs[j].startTime, 'shortTime');
                                            massagedLeg.endTime = $filter('date')(thisItinerary.legs[j].endTime, 'shortTime');
                                            thisItinerary.legs[j].bus = massagedLeg;
                                        }

                                        if (thisItinerary.legs[j].mode === 'WALK') {
                                            thisItinerary.legs[j].walk = massagedLeg;
                                        }
                                    }
                                }
                            } else {
                                removalQueue.push(i);
                            }
                        }
                        // Start from end so splice() doesn't mess up
                        i = removalQueue.length;
                        while (i--) {
                            plan.itineraries.splice(removalQueue[i], 1);
                        }
                        $scope.itineraries = plan.itineraries;
                    }
                    //TODO: resultsElement.scrollIntoView();
                }).error(function () {
                    //TODO: uh, yeah, this
                });
            }

            if (! $scope.time) {
                var now = Date.now(),
                minutes = Math.floor(parseInt($filter('date')(now, 'mm'), 10) / 15) * 15;
                if (minutes === 0) {
                    minutes = '00';
                }
                $scope.time = $filter('date')(now, 'h:' + minutes + ' a');
            }
            $scope.when = $scope.when || 'now';
            $scope.date = $scope.date || 0;

            $scope.isLoading = true;
            $scope.stopsLoadError = false;
            $scope.stopsLoaded = false;
            $scope.planLoaded = false;
            $scope.planLoadError = false;

            $http({
                method: 'GET',
                url: 'http://apis.ucsf.edu/shuttle/stops',
                params: {apikey: apikey}
            }).success(function (data) {
                $scope.isLoading = false;
                if (data.stops) {
                    $scope.stops = $filter('orderBy')(data.stops, 'stopName');

                    $scope.begin = $filter('filter')($scope.stops,
                        function (elem) {
                            return elem.stopName === 'Parnassus Campus';
                        }
                        )[0];
                    $scope.end = $filter('filter')($scope.stops,
                        function (elem) {
                            return elem.stopName === 'Mission Bay Campus';
                        }
                        )[0];
                    if (Modernizr.localstorage) {
                        if (localStorage.shuttleStart) {
                            $scope.begin = $scope.stops[localStorage.shuttleStart] || $scope.begin;
                        }
                        if (localStorage.shuttleEnd) {
                            $scope.end = $scope.stops[localStorage.shuttleEnd] || $scope.end;
                        }
                    }
                    $scope.stopsLoaded = true;
                } else {
                    $scope.stopsLoadError = true;
                }
            }).error(function () {
                $scope.isLoading = false;
                $scope.stopsLoadError = true;
            });

            $scope.plan = function () {
                var fromPlace = $scope.begin.id.agencyId + '_' + $scope.begin.id.id,
                toPlace = $scope.end.id.agencyId + '_' + $scope.end.id.id;

                if (Modernizr.localstorage) {
                    localStorage.shuttleStart = $scope.stops.indexOf($scope.begin);
                    localStorage.shuttleEnd = $scope.stops.indexOf($scope.end);
                }

                $location.url('/planner/' + [fromPlace, toPlace, $scope.when, $scope.time, $scope.date].join('/'));
            };
        }]
    );
}());