/**
 * Created by 86185 in 2020/8/1 on 16:16
 */
for (let index = 0; index < routeList.length; index++) {
    if (!routeList[index].player) {
        routeList[index].player = new maptalks.RoutePlayer(routeList[index], map, {
            unitTime: 500,
            maxTrailLine: 10,
        });
    }
}

play();

function play() {
    for (let index = 0; index < routeList.length; index++) {
        routeList[index].player.play();
    }
}

function pause() {
    for (let index = 0; index < routeList.length; index++) {
        routeList[index].player.pause();
    }
}

function finish() {
    for (let index = 0; index < routeList.length; index++) {
        routeList[index].player.finish();
    }
}

function cancel() {
    for (let index = 0; index < routeList.length; index++) {
        routeList[index].player.cancel();
    }
}