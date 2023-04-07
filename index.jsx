import { EmptySky, Engine ,BubblePoint,GeoJSONDataSource} from 'mapv-three';
import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import * as mapvthree from 'mapv-three';
import { randomPoints } from './utils';
const rootDiv = document.getElementById('root');
const ref = { current: rootDiv }

async function initMap() {
    const center = [116.39151758905, 39.8932990056012];

    // 初始化百度地图
    const map = new BMapGL.Map(ref.current);
    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), 17);
    map.enableScrollWheelZoom();
    map.setTilt(60);

    // 初始化 mapvthree 引擎
    const engine = new Engine(map);
    engine.map.setCenter(center);
    engine.map.setPitch(80);

    // 添加天空
    const sky = engine.add(new EmptySky());
    sky.time = 3600 * 14.5;

    // 添加其他
    const geometry = new BoxGeometry(100, 100, 100);
    const material = new MeshStandardMaterial({
        color: 0xff0000,
        metalness: 0.8,
    });
    const box = new Mesh(geometry, material);
    const position = engine.map.projectPointArr(center);
    box.position.x = position[0];
    box.position.y = position[1];
    engine.add(box);

    return engine;
}


async function initMap2() {
    const center = [116.404, 39.915];
    const map = new BMapGL.Map(ref.current);
    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), 16);
    map.enableScrollWheelZoom();
    map.setMapStyleV2({styleId: '5cf48d9f9a9b4d92c0ea1a224eda92ff'});

    const engine = new mapvthree.Engine(map,{
        rendering: {
            enableAnimationLoop: true,
        },
    });
    engine.map.setCenter(center);
    engine.map.setZoom(16);
    engine.map.setPitch(60);

    


  

    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), 17);
    map.enableScrollWheelZoom();
    map.setTilt(60);
    map.setMapStyleV2({styleId: '5cf48d9f9a9b4d92c0ea1a224eda92ff'});
    map.setDisplayOptions({
        indoor: false
    });

    // const engine = new Engine(map, {
    //     rendering: {
    //         enableAnimationLoop: true,
    //     },
    // });
    engine.map.setCenter(center);
    engine.map.setPitch(40);

    // wave类型的气泡点
    const waveBubble = engine.add(new BubblePoint({
        color: 'rgba(90, 160, 117, 1.0)',
        size: 1000,
        type: 'Wave',
        duration: 2000,
    }));
    const data =   [{'properties': {}, 'geometry': {'type': 'Point', 'coordinates':center}}];
    const waveDataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON('./data/test1.json');

    waveBubble.dataSource = waveDataSource;

    // breath类型的气泡点
    const breathBubble = engine.add(new BubblePoint({
        color: 'rgba(55, 255, 70, 1.0)',
        size: 1000,
        type: 'Breath',
        duration: 2000,
    }));
    const breathDataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON('./data/test1.json');

    breathBubble.dataSource = breathDataSource;

    // 默认类型的气泡点
    const defaultBubble = engine.add(new BubblePoint({
        color: 'rgba(0, 50, 0, 1.0)',
        size: 1000,
        duration: 2000,
        // type:'Breath'
    }));
    const defaultDataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON('./data/test1.json');
    defaultBubble.dataSource = defaultDataSource;

    const pillar = engine.add(new mapvthree.Pillar({
        height: 100,
        radialSegments: 32,
        openEnded: false,
        radius: 20,
        color: '#ffff00',
        vertexHeights: true,
        gradient: {
            0.1: '#0000ff',
            0.4: '#dddccc',
            0.6: '#d15d3b',
            1.0: '#ffff00',
        },
    }));
    
 

    const dataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON('./data/test1.json');
    
    // point.dataSource = dataSource;


    // const dataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON(randomPoints(center, 0.01, 1));
    dataSource.setAttribute('height', p => 100 + 200 * Math.random());

    pillar.dataSource = dataSource;
}

async function initMap3() {
    const center = [116.414, 39.915, 10];
    const map = new BMapGL.Map(ref.current);
    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), 5);
    map.enableScrollWheelZoom();
    map.setMapStyleV2({styleId: 'c95c1f9ab40e5ba30b3b0be8fc3464d8'});

    const engine = new mapvthree.Engine(map, {
        rendering: {
            enableAnimationLoop: false,
        },
    });
    engine.map.setCenter(center);
    engine.map.setZoom(14);
    engine.map.setHeading(0);
    engine.map.setPitch(45);
    const point = engine.add(new mapvthree.SimplePoint());

    const data1 = [{'properties': {}, 'geometry': {'type': 'Point', 'coordinates':center}}];

    const dataSource = await mapvthree.GeoJSONDataSource.fromGeoJSONObject(data1);
    point.dataSource = dataSource;

    return engine;
}


async function initMap4() {
    const center = [116.404, 39.915];
  
    const map = new BMapGL.Map(ref.current);
    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), 17);
    map.enableScrollWheelZoom();
    map.setTilt(60);
    map.setMapStyleV2({styleId: '5cf48d9f9a9b4d92c0ea1a224eda92ff'});
    map.setDisplayOptions({
        indoor: false
    });

    const engine = new Engine(map, {
        rendering: {
            enableAnimationLoop: true,
        },
    });
    engine.map.setCenter(center);
    engine.map.setPitch(40);

    // wave类型的气泡点
    const waveBubble = engine.add(new BubblePoint({
        color: 'rgba(90, 160, 117, 1.0)',
        size: 50,
        type: 'Wave',
        duration: 2000,
    }));
    const data =   [{'properties': {}, 'geometry': {'type': 'Point', 'coordinates':center}}];
    const waveDataSource = await GeoJSONDataSource.fromGeoJSONObject(data);
    waveBubble.dataSource = waveDataSource;

    // breath类型的气泡点
    const breathBubble = engine.add(new BubblePoint({
        color: 'rgba(55, 255, 70, 1.0)',
        size: 50,
        type: 'Breath',
        duration: 2000,
    }));
    const breathDataSource =   await GeoJSONDataSource.fromGeoJSONObject(data);
    breathBubble.dataSource = breathDataSource;

    // 默认类型的气泡点
    const defaultBubble = engine.add(new BubblePoint({
        color: 'rgba(0, 50, 0, 1.0)',
        size: 50,
        duration: 2000,
        // type:'Breath'
    }));
    const defaultDataSource =  await GeoJSONDataSource.fromGeoJSONObject(data);
    defaultBubble.dataSource = defaultDataSource;

    return engine;
}


initMap2();