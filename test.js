import {useRef} from 'react';
import * as mapvthree from 'mapv-three';
import {randomPoints} from '../common/utils';

const ref = useRef();

async function initMap() {
    const center = [105.9151758905, 29.32990056012];
    const engine = new mapvthree.Engine(ref.current, {
        rendering: {
            enableAnimationLoop: true,
        },
    });
    engine.map.setCenter(center);
    engine.map.setZoom(18);
    engine.map.setPitch(80);
    engine.add(new mapvthree.StaticSky());

    const lightSphere = engine.add(new mapvthree.LightSphere({
        color: [20, 60, 167, 0.8],
        radius: 20, // 球体半径
        animationEffectPeriod: 3000, // 动画周期
        animationEffect: true, // 是否开启动画
        widthSegments: 50, //水平分段数
        heightSegments: 50, // 垂直分段数
        phiStart: 0, // 水平起始角度
        phiLength: 2 * Math.PI, //水平扫描角度大小
        thetaStart: 0, // 垂直起始角度
        thetaLength: Math.PI * 2, // 垂直扫描角度大小
    }));
    let data = await mapvthree.GeoJSONDataSource.fromGeoJSON(randomPoints(center, 0.01, 100));
    lightSphere.dataSource = data;
    console.log(lightSphere);

    return engine;
}
