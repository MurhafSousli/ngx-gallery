import { Injectable, Optional } from '@angular/core';
import { defaultState, defaultConfig } from '../config/gallery.default';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
var GalleryService = (function () {
    function GalleryService(config) {
        var _this = this;
        /** Gallery config */
        this.config = defaultConfig;
        /** Initialize the state */
        this.state = new BehaviorSubject(defaultState);
        /** Initialize the config */
        this.config = Object.assign({}, defaultConfig, config);
        /** Initialize the player for play/pause commands */
        this.player = new Subject();
        this.player.switchMap(function (interval) { return (interval) ? _this.playerEngine(interval) : Observable.of(null); }).subscribe();
    }
    /** Load images and reset the state */
    GalleryService.prototype.load = function (images) {
        this.state.next({
            images: images,
            currIndex: 0,
            hasNext: images.length > 1,
            hasPrev: false,
            active: false
        });
    };
    /** Set current image and update the state */
    GalleryService.prototype.set = function (index) {
        var state = this.state.getValue();
        this.state.next(Object.assign({}, state, {
            prevIndex: state.currIndex,
            currIndex: index,
            hasNext: index < state.images.length - 1,
            hasPrev: index > 0,
            active: true
        }));
    };
    /** Go to next image and update the state */
    GalleryService.prototype.next = function () {
        var state = this.state.getValue();
        if (state.hasNext) {
            var index = state.currIndex + 1;
            this.set(index);
        }
        else {
            this.set(0);
        }
    };
    /** Go to previous image and update the state */
    GalleryService.prototype.prev = function () {
        var state = this.state.getValue();
        if (state.hasPrev) {
            var index = state.currIndex - 1;
            this.set(index);
        }
        else {
            this.set(state.images.length - 1);
        }
    };
    /** Close gallery modal if open */
    GalleryService.prototype.close = function () {
        var state = this.state.getValue();
        this.state.next(Object.assign({}, state, {
            active: false,
            play: false
        }));
        this.stop();
    };
    /** Reset gallery with initial state */
    GalleryService.prototype.reset = function () {
        this.state.next(defaultState);
        this.stop();
    };
    /** Play slide show */
    GalleryService.prototype.play = function (interval) {
        var speed = interval || this.config.player.speed || 2000;
        var state = this.state.getValue();
        /** Open and play the gallery, 'active' opens gallery modal */
        this.state.next(Object.assign({}, state, { play: true, active: true }));
        this.player.next(speed);
    };
    /** End slide show */
    GalleryService.prototype.stop = function () {
        this.player.next(0);
    };
    GalleryService.prototype.playerEngine = function (interval) {
        var _this = this;
        return Observable.interval(interval)
            .takeWhile(function () { return _this.state.getValue().play; })
            .do(function () {
            _this.next();
        })
            .finally(function () {
            _this.state.next(Object.assign({}, _this.state.getValue(), { play: false }));
        });
    };
    return GalleryService;
}());
export { GalleryService };
GalleryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GalleryService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional },] },
]; };
//# sourceMappingURL=gallery.service.js.map