/**
 * Created by 86185 in 2020/5/24 on 14:48
 */
let line = new maptalks.LineString([
    [121.475031060928, 31.2611187865471],
    [121.47940842604, 31.263466566376],
    [121.481768769973, 31.2649338991092],
    [121.483871621841, 31.2638700851521],
], {
    symbol: {
        "lineColor": "#f00",
        "lineWidth": 8
    }
});

map.getLayer(MapLayerConst.MAP_LINE_LAYER).addGeometry(line).addTo(map);
