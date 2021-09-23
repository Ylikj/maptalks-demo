/**
 * Created by 86185 in 2020/8/1 on 16:16
 */
let player = new maptalks.RoutePlayer(route, map, {
    unitTime: 500,
    maxTrailLine: 10,
    lineOptions: {
        symbol: {
            lineWidth: 4,
            lineColor: '#0dea0f',
            // "markerFile": relative2path("6.png"),
            // "markerPlacement": "point", //vertex, point, vertex-first, vertex-last, center
            // "markerWidth": 33,
            // "markerHeight": 43,
        },
        smoothness: 0.5,
    },
    walkedLineOptions: {
        symbol: {
            lineWidth: 4,
            lineColor: '#ff0000',
        },
        smoothness: 0.5,
    }
});
let unitTime = player.getUnitTime();

// player.hideRoute();
// player.hideTrail();

player.on("playing", function (params) {
    if (player.getCurrentProperties(0) !== undefined && player.getCurrentProperties(0) !== null) {
        $("#info").text(
            "current info: " + player.getCurrentProperties(0).info
        );
    }
    // 视野跟随当前marker移动
    // map.setCenterAndZoom(player.getCurrentCoordinates(), 14);
});

player.on("playfinish", function (params) {
    // MaptalksCommonService.setView(params.target.trailLinePoints)
});

player.play();

function play() {
    player.play();
}

function pause() {
    player.pause();
}

function finish() {
    player.finish();
}

function cancel() {
    player.cancel();
}

function speed(t) {
    player.setUnitTime(unitTime * t);
}