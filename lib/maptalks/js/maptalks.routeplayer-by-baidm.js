/*!
 * maptalks.routeplayer v0.1.0
 * LICENSE : MIT
 * (c) 2016-2020 maptalks.org
 *
 * updated by baidm
 * 2021-05-30
 */
/*!
 * requires maptalks@^0.23.0
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
        typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
            (factory((global.maptalks = global.maptalks || {}), global.maptalks));
}(this, (function (exports, maptalks) {
    'use strict';

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Route = function () {
        function Route(r) {
            _classCallCheck(this, Route);

            this.route = r;
            this.path = r.path;
        }

        Route.prototype.getCoordinates = function getCoordinates(t, map) {
            if (t < this.getStart() || t > this.getEnd()) {
                return null;
            }
            var idx = null;
            var payload = null;
            for (var i = 0, l = this.path.length; i < l; i++) {
                if (t < this.path[i][2]) {
                    idx = i;
                    payload = this.path[i][3];
                    break;
                }
            }
            if (idx === null) {
                idx = this.path.length - 1;
            }

            var p1 = this.path[idx - 1],
                p2 = this.path[idx],
                span = t - p1[2],
                r = span / (p2[2] - p1[2]);
            var x = p1[0] + (p2[0] - p1[0]) * r,
                y = p1[1] + (p2[1] - p1[1]) * r,
                coord = new maptalks.Coordinate(x, y),
                vp = map.coordinateToViewPoint(coord);
            var degree = maptalks.Util.computeDegree(map.coordinateToViewPoint(new maptalks.Coordinate(p1)), vp);
            return {
                coordinate: coord,
                viewPoint: vp,
                degree: degree,
                index: idx,
                payload: payload
            };
        };

        Route.prototype.getStart = function getStart() {
            return this.path[0][2];
        };

        Route.prototype.getEnd = function getEnd() {
            return this.path[this.getCount() - 1][2];
        };

        Route.prototype.getCount = function getCount() {
            return this.path.length;
        };

        _createClass(Route, [{
            key: 'walkingMarkerOptions',
            get: function get() {
                return this.route.walkingMarkerOptions;
            },
            set: function set(options) {
                this.route.walkingMarkerOptions = options;
                if (this._painter && this._painter.walkingMarker) {
                    this._painter.walkingMarker.setOptions(options);
                }
            }
        }, {
            key: 'markerOptions',
            get: function get() {
                return this.route.markerOptions;
            },
            set: function set(options) {
                this.route.markerOptions = options;
                if (this._painter && this._painter.markerList) {
                    this._painter.markerList.forEach(marker => {
                        marker.setOptions(options);
                    });
                }
            }
        }, {
            key: 'lineOptions',
            get: function get() {
                return this.route.lineOptions;
            },
            set: function set(options) {
                this.route.lineOptions = options;
                if (this._painter && this._painter.line) {
                    this._painter.line.setOptions(options)
                }
            }
        }, {
            key: 'walkedLineOptions',
            get: function get() {
                return this.route.walkedLineOptions;
            },
            set: function set(options) {
                this.route.walkedLineOptions = options;
                if (this._painter && this._painter.walkedLineOptions) {
                    this._painter.walkedLineOptions.setOptions(options)
                }
            }
        }, {
            key: 'trailLineOptions',
            get: function get() {
                return this.route.trailLineOptions;
            },
            set: function set(options) {
                this.route.trailLineOptions = options;
                if (this._painter && this._painter.trailLine) {
                    this._painter.trailLine.setOptions(options);
                }
            }
        }]);

        return Route;
    }();

    var options = {
        unitTime: 1 * 1000,
        // 未走过的轨迹相关属性
        showRoutes: true,
        lineOptions: {
            symbol: {
                lineWidth: 2,
                lineColor: '#0dea0f'
            }
        },
        // 走过的轨迹相关属性
        showWalked: true,
        walkedLineOptions: {
            symbol: {
                lineWidth: 2,
                lineColor: "#ff0000"
            }
        },
        // 轨迹上的marker，包括起点、终点
        showMarker: true,
        markerOptions: {
            symbol: {
                markerType: 'ellipse',
                markerWidth: 10,
                markerHeight: 10,
                markerFill: '#08a4e9',
            }
        },
        // 正在行走的marker相关属性
        walkingMarkerOptions: {
            symbol: {
                markerType: 'ellipse',
                markerWidth: 20,
                markerHeight: 20,
                markerFill: '#e91e63',
                markerLineColor: '#000',
                markerLineWidth: 2
            }
        },
        // 小尾巴相关属性
        showTrail: true,
        maxTrailLine: 0,
        trailLineOptions: {
            symbol: {
                lineColor: '#0400fa',
                lineWidth: 4,
                lineJoin: 'round', //miter, round, bevel
                lineCap: 'round', //butt, round, square
                lineDasharray: null, //dasharray, e.g. [10, 5, 5]
                lineOpacity: 1
            }
        }
    };

    var RoutePlayer = function (_maptalks$Eventable) {
        _inherits(RoutePlayer, _maptalks$Eventable);

        function RoutePlayer(routes, map, opts) {
            _classCallCheck(this, RoutePlayer);

            var _this = _possibleConstructorReturn(this, _maptalks$Eventable.call(this, opts));

            if (!Array.isArray(routes)) {
                routes = [routes];
            }
            _this.id = maptalks.Util.UID();
            _this._map = map;
            _this._setup(routes);
            return _this;
        }

        RoutePlayer.prototype.remove = function remove() {
            if (!this.walkingMarkerLayer) {
                return this;
            }
            this.finish();
            this.lineLayer.remove();
            this.walkedLineLayer.remove();
            this.walkingMarkerLayer.remove();
            this.markerLayer.remove();

            this.trailLineLayer.remove();
            delete this.lineLayer;
            delete this.walkedLineLayer;
            delete this.walkingMarkerLayer;
            delete this.markerLayer;
            delete this.trailLineLayer;
            delete this._map;
            return this;
        };

        RoutePlayer.prototype.play = function play() {
            if (this.player.playState === 'running') {
                return this;
            }
            this.showWalked();
            this.player.play();
            this.fire('playstart');
            return this;
        };

        RoutePlayer.prototype.pause = function pause() {
            if (this.player.playState === 'paused') {
                return this;
            }
            this.player.pause();
            this.fire('playpause');
            return this;
        };

        RoutePlayer.prototype.cancel = function cancel() {
            this.player.cancel();
            this.played = 0;
            // 清空walkedLineLayer相关属性以及图层
            this.walkedLinePoints = [];
            this.hideWalked();

            this.trailLinePoints = [];
            var line = this.trailLineLayer.getGeometries()[0];
            if (line !== undefined) line.setCoordinates(this.trailLinePoints);
            this._createPlayer();
            this._step({styles: {t: 0}});
            this.fire('playcancel');
            return this;
        };

        RoutePlayer.prototype.finish = function finish() {
            if (this.player.playState === 'finished') {
                return this;
            }

            this.hideWalked();

            // complete trail line
            var line = this.trailLineLayer.getGeometries()[0];
            var coors = this.routes[0].path.map(function (item) {
                return [item[0], item[1]];
            });
            this.trailLinePoints = coors;
            line.setCoordinates(this.trailLinePoints);

            this.player.finish();
            this._step({styles: {t: 1}});
            this.fire('playfinish');
            return this;
        };

        RoutePlayer.prototype.getStartTime = function getStartTime() {
            return this.startTime || 0;
        };

        RoutePlayer.prototype.getEndTime = function getEndTime() {
            return this.endTime || 0;
        };

        RoutePlayer.prototype.getCurrentTime = function getCurrentTime() {
            if (!this.played) {
                return this.startTime;
            }
            return this.startTime + this.played;
        };

        RoutePlayer.prototype.setTime = function setTime(t) {
            this.played = t - this.startTime;
            if (this.played < 0) {
                this.played = 0;
            }
            this._resetPlayer();
            return this;
        };

        RoutePlayer.prototype.getUnitTime = function getUnitTime() {
            return this.options['unitTime'];
        };

        RoutePlayer.prototype.setUnitTime = function setUnitTime(ut) {
            this.options['unitTime'] = +ut;
            this._resetPlayer();
        };

        RoutePlayer.prototype.getCurrentProperties = function getCurrentProperties(index) {
            if (!index) {
                index = 0;
            }
            if (!this.routes[index] || !this.routes[index]._painter) {
                return null;
            }

            return this.routes[index]._painter.walkingMarker.getProperties();
        };

        RoutePlayer.prototype.getCurrentCoordinates = function getCurrentCoordinates(index) {
            if (!index) {
                index = 0;
            }
            if (!this.routes[index] || !this.routes[index]._painter) {
                return null;
            }
            return this.routes[index]._painter.walkingMarker.getCoordinates();
        };

        RoutePlayer.prototype.getLineOptions = function getLineOptions(idx) {
            if (this.routes && this.routes[idx]) {
                return this.routes[idx].lineOptions;
            }
            return null;
        };

        RoutePlayer.prototype.setLineOptions = function setLineOptions(idx, options) {
            if (this.routes && this.routes[idx]) {
                this.routes[idx].lineOptions = options;
            }
            return this;
        };

        RoutePlayer.prototype.getWalkedLineOptions = function getWalkedLineOptions(idx) {
            if (this.routes && this.routes[idx]) {
                return this.routes[idx].walkedLineOptions;
            }
            return null;
        };

        RoutePlayer.prototype.setWalkedLineOptions = function setWalkedLineOptions(idx, options) {
            if (this.routes && this.routes[idx]) {
                this.routes[idx].walkedLineOptions = options;
            }
            return this;
        };

        RoutePlayer.prototype.getWalkingMarkerOptions = function getWalkingMarkerOptions(idx) {
            if (this.routes && this.routes[idx]) {
                return this.routes[idx].walkingMarkerOptions;
            }
            return null;
        };

        RoutePlayer.prototype.setWalkingMarkerOptions = function setWalkingMarkerOptions(idx, options) {
            if (this.routes && this.routes[idx]) {
                this.routes[idx].walkingMarkerOptions = options;
            }
            return this;
        };

        RoutePlayer.prototype.getMarkerOptions = function getMarkerOptions(idx) {
            if (this.routes && this.routes[idx]) {
                return this.routes[idx].markerOptions;
            }
            return null;
        };

        RoutePlayer.prototype.setMarkerOptions = function setMarkerOptions(idx, options) {
            if (this.routes && this.routes[idx]) {
                this.routes[idx].markerOptions = options;
            }
            return this;
        };

        RoutePlayer.prototype.showRoute = function showRoute() {
            this.lineLayer.show();
        };

        RoutePlayer.prototype.showWalked = function showWalked() {
            this.walkedLineLayer.show();
        };

        RoutePlayer.prototype.showTrail = function showTrail() {
            this.trailLineLayer.show();
        };

        RoutePlayer.prototype.hideRoute = function hideRoute() {
            this.lineLayer.hide();
        };

        RoutePlayer.prototype.hideWalked = function hideWalked() {
            this.walkedLineLayer.hide();
        };

        RoutePlayer.prototype.hideTrail = function hideTrail() {
            this.trailLineLayer.hide();
        };

        RoutePlayer.prototype._resetPlayer = function _resetPlayer() {
            var playing = this.player && this.player.playState === 'running';
            if (playing) {
                this.player.finish();
            }
            this._createPlayer();
            if (playing) {
                this.player.play();
            }
        };

        RoutePlayer.prototype._step = function _step(frame) {
            if (frame.state && frame.state.playState !== 'running') {
                if (frame.state.playState === 'finished') {
                    this.fire('playfinish');
                }
                return;
            }
            this.played = this.duration * frame.styles.t;
            for (var i = 0, l = this.routes.length; i < l; i++) {
                this._drawRoute(this.routes[i], this.startTime + this.played);
            }
            this.fire('playing');
        };

        RoutePlayer.prototype._drawRoute = function _drawRoute(route, t) {
            if (!this._map) {
                return;
            }
            var coordinates = route.getCoordinates(t, this._map);

            if (!coordinates) {
                if (route._painter && route._painter.walkingMarker) {
                    route._painter.walkingMarker.remove();
                    delete route._painter.walkingMarker;
                }
                return;
            }
            if (!route._painter) {
                route._painter = {};
            }

            // 未走过的轨迹
            if (!route._painter.line) {
                var line = new maptalks.LineString(route.path, route.lineOptions || this.options["lineOptions"]).addTo(this.lineLayer);
                route._painter.line = line;
            }

            // 走过的轨迹
            if (!route._painter.walkedLine) {
                this.walkedLinePoints = [coordinates.coordinate];
                var walkedLine = new maptalks.LineString([], route.walkedLineOptions || this.options["walkedLineOptions"]).addTo(this.walkedLineLayer);
                route._painter.walkedLine = walkedLine;
            } else {
                // 在 route.path 中寻找当前行走的marker的经纬度，截取走过的轨迹
                this.walkedLinePoints.push(coordinates.coordinate);
                if (this.walkedLinePoints.length > 1) {
                    route._painter.walkedLine.setCoordinates(this.walkedLinePoints);
                }
            }

            // 轨迹上的marker
            if (!route._painter.markerList) {
                var markerList = route.path.map(point => {
                    return new maptalks.Marker([point[0], point[1]], route.markerOptions || this.options["markerOptions"])
                });
                this.markerLayer.addGeometry(markerList);
                route._painter.markerList = markerList;
            }

            // 正在行走的marker的小尾巴
            if (!route._painter.trailLine) {
                this.trailLinePoints = [coordinates.coordinate];
                var trailLine = new maptalks.LineString([], route.trailLineOptions || this.options["trailLineOptions"]).addTo(this.trailLineLayer);
                route._painter.trailLine = trailLine;
            } else {
                // remove extra trail point by maxTrailLine, 0 => disable
                var maxLineCount = this.options['maxTrailLine'];
                if (maxLineCount !== 0 && this.trailLinePoints.length > maxLineCount) {
                    this.trailLinePoints.shift();
                }

                this.trailLinePoints.push(coordinates.coordinate);
                if (this.trailLinePoints.length > 1) {
                    route._painter.trailLine.setCoordinates(this.trailLinePoints);
                }
            }

            // 正在行走的marker
            if (!route._painter.walkingMarker) {
                var walkingMarker = new maptalks.Marker(coordinates.coordinate, route.walkingMarkerOptions || this.options["walkingMarkerOptions"]).addTo(this.walkingMarkerLayer);
                route._painter.walkingMarker = walkingMarker;
            } else {
                route._painter.walkingMarker.setProperties(coordinates.payload);
                route._painter.walkingMarker.setCoordinates(coordinates.coordinate);
            }
        };

        RoutePlayer.prototype._setup = function _setup(rs) {
            var routes = rs.map(function (r) {
                return new Route(r);
            });
            var start = routes[0].getStart(),
                end = routes[0].getEnd();
            for (var i = 1; i < routes.length; i++) {
                var route = routes[i];
                if (route.getStart() < start) {
                    start = route.getStart();
                }
                if (route.getEnd() > end) {
                    end = route.getEnd();
                }
            }
            this.walkedLinePoints = [];
            this.trailLinePoints = [];
            this.routes = routes;
            this.startTime = start;
            this.endTime = end;
            this.played = 0;
            this.duration = end - start;
            this._createLayers();
            this._createOtherLayers();
            this._createPlayer();
        };

        RoutePlayer.prototype._createPlayer = function _createPlayer() {
            var duration = (this.duration - this.played) / this.options['unitTime'];
            var framer = void 0;
            var renderer = this._map._getRenderer();
            if (renderer.callInFrameLoop) {
                framer = function framer(fn) {
                    renderer.callInFrameLoop(fn);
                };
            }
            this.player = maptalks.animation.Animation.animate({
                t: [this.played / this.duration, 1]
            }, {
                framer: framer,
                speed: duration,
                easing: 'linear'
            }, this._step.bind(this));
        };

        RoutePlayer.prototype._createLayers = function _createLayers() {
            // 未走过的轨迹
            this.lineLayer = new maptalks.VectorLayer(maptalks.INTERNAL_LAYER_PREFIX + '_routeplay_route_' + this.id, [], {
                visible: this.options['showRoutes'],
                enableSimplify: false
            }).addTo(this._map).setZIndex(1);

            // 起点和中点marker
            this.markerLayer = new maptalks.VectorLayer(maptalks.INTERNAL_LAYER_PREFIX + '_routeplay_route_marker_' + this.id, [], {
                visible: this.options['showMarker'],
                enableSimplify: false
            }).addTo(this._map).setZIndex(98);

            // 正在行走的marker的小尾巴
            this.trailLineLayer = new maptalks.VectorLayer(maptalks.INTERNAL_LAYER_PREFIX + '_routeplay_trail_' + this.id, [], {
                visible: this.options['showTrail'],
                enableSimplify: false
            }).addTo(this._map).setZIndex(99);

            // 正在行走的marker
            this.walkingMarkerLayer = new maptalks.VectorLayer(maptalks.INTERNAL_LAYER_PREFIX + '_routeplay_walking_' + this.id).addTo(this._map).setZIndex(100);
        };

        RoutePlayer.prototype._createOtherLayers = function _createdOtherLayers() {
            // 走过的轨迹
            this.walkedLineLayer = new maptalks.VectorLayer(maptalks.INTERNAL_LAYER_PREFIX + '_routeplay_walked_' + this.id, [], {
                visible: this.options['showWalked'],
                enableSimplify: false
            }).addTo(this._map).setZIndex(2);
        };

        return RoutePlayer;
    }(maptalks.Eventable(maptalks.Class));

    RoutePlayer.mergeOptions(options);

    exports.Route = Route;
    exports.RoutePlayer = RoutePlayer;

    Object.defineProperty(exports, '__esModule', {value: true});

    typeof console !== 'undefined' && console.log('maptalks.routeplayer v0.1.0 by baidm changed, requires maptalks@^0.23.0.');

})));