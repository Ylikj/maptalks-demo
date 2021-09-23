/**
 * Created by baidm in 2021/5/23 on 17:39
 */
let MaptalksCommonService = {

    setView: (pointList) => {
        let xList = [], yList = [], xmin = 0, ymin = 0, xmax = 0, ymax = 0;
        pointList.forEach(point => {
            xList.push(point.x);
            yList.push(point.y);
        });
        xmin = Math.min(...xList);
        ymin = Math.min(...yList);
        xmax = Math.max(...xList);
        ymax = Math.max(...yList);
        map.fitExtent(new maptalks.Extent({xmin, ymin, xmax, ymax}), 0);
    }
};
