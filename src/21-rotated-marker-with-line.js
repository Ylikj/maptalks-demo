/**
 * Created by 86185 in 2020/8/6 on 20:43
 */
let layer = map.getLayer(MapLayerConst.MAP_LINE_LAYER).addTo(map);

let line = new maptalks.LineString(
    [
        [121.486532373184, 31.261925842451],
        [121.48760525679, 31.2623660518534],
        [121.488763971084, 31.2639067685916],
        [121.489665193313, 31.2648238499456],
        [121.491939706557, 31.2642736022027],
    ],
    {
        symbol: {
            "lineColor": "#1bbc9b",
            "lineWidth": 6,
            // "lineDasharray": [10, 10],
            "markerFile": relative2path("plane.png"),
            "markerPlacement": "point", //vertex, point, vertex-first, vertex-last, center
            "markerVerticalAlignment": "middle",
            "markerWidth": 10,
            "markerHeight": 10
        }
    }
).addTo(layer);