/**
 * Created by 86185 in 2020/8/15 on 15:48
 */
let linePath = [
    [-0.131049, 51.498568],
    [-0.107049, 51.498568],
    [-0.107049, 51.491568]
];
let line = new maptalks.LineString(linePath, {
    visible: false,
    arrowStyle: "classic",
    arrowPlacement: "vertex-last",
    symbol: {
        "lineColor": "#1bbc9b",
        "lineWidth": 6
    }
});

let start = linePath[0];
let marker = new maptalks.Marker(start);

let offset = [
    [linePath[1][0] - linePath[0][0], linePath[1][1] - linePath[0][1]],
    [linePath[2][0] - linePath[1][0], linePath[2][1] - linePath[1][1]],
];


map.getLayer(MapLayerConst.MAP_LINE_ANIMATION_LAYER).addGeometry(line, marker).addTo(map);

lineReplay();

/**
 * 播放line动画
 */
function lineReplay() {
    line.hide();
    //line"s animateShow
    line.animateShow({
        duration: 1500,
        easing: "out"
    }, function (frame) {
        if (frame.state.playState === "finished") {
            console.log("line finished");
        }
    });
}

/**
 * 播放marker动画
 */
function markerReplay() {
    marker.setCoordinates(start);
    marker.bringToFront().animate({
        //animation translate distance
        translate: offset[0]
    }, {
        duration: 2000,
        //let map focus on the marker
        focus: true
    }, function (frame) {
        if (frame.state.playState === "finished") {
            console.log("marker 2 frame start");
            // 这有点回调地狱的样子了呀，不好玩了
            marker.bringToFront().animate({
                translate: offset[1]
            }, {
                duration: 2000,
                focus: true
            },function (frame) {
                if (frame.state.playState === "finished") {
                    console.log("marker 2 frame finished");
                }
            })
        }
    });


}