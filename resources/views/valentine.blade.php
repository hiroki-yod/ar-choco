<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>AR letters</title>
  </head>
  <body style="margin: 0px; overflow: hidden">
    <script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>

    <!-- A-Frame の VR空間に AR.js を紐づける（デバッグUIは非表示） -->
    <a-scene
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
    >
        <a-assets>
            <!-- 画像をプリロード -->
            <img id="image" src={{ $letter->image_url }} />
            <a-asset-item id="box-obj" src={{ asset('/box.obj') }}></a-asset-item>
            <a-asset-item id="box-mtl" src={{ asset('/box.mtl') }}></a-asset-item>
            <a-asset-item id="lid-obj" src={{ asset('/lid.obj') }}></a-asset-item>
            <a-asset-item id="lid-mtl" src={{ asset('/lid.mtl') }}></a-asset-item>
        </a-assets>

        <!-- ローディング画面のスタイル -->
        <style>
            .arjs-loader {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            }

            .arjs-loader div {
            text-align: center;
            font-size: 1.25em;
            color: white;
            }
        </style>

        <!-- ローディング画面 -->
        <div class="arjs-loader">
            <div>Loading, please wait...</div>
        </div>

        <!-- マーカーを登録（アイコン） -->
        <a-marker type="pattern" url={{ asset('/pattern-ar.patt') }}>
        
            <!-- 手紙 -->
            <a-entity>
                <a-image
                    src="#image"
                    scale="0.7 0.7 0.7"
                    rotation="-90 0 0"
                    animation    = "property: rotation; to: -20 0 0; dur: 3000; delay: 6000"
                    animation__2 = "property: position; to: 0 2 0; dur: 2700; delay: 6000"
                    animation__3 = "property: scale; to: 0.9 0.9 0.9; dur: 2000; delay: 6000"
                    animation__4 = "property: scale; from: 0.9 0.9 0.9; to: 1.5 1.5 1.5; dur: 999; delay: 8001"
                ></a-image>
            </a-entity>

            <!-- 箱 -->
            <a-entity>
                <a-obj-model
                    id="box"
                    position="0 0 0"
                    scale="0.01 0.01 0.01"
                    rotation="-90 0 0"
                    src="#box-obj"
                    mtl="#box-mtl"
                ></a-obj-model>
            </a-entity>

            <!-- ふた -->
            <a-entity>
                <a-obj-model 
                    id="lid"
                    position="0 0 0"
                    scale="0.01 0.01 0.01"
                    rotation="90 0 0"
                    src="#lid-obj"
                    mtl="#lid-mtl"
                    animation    = "property: rotation; to: -90 -20 0; dur: 3000; delay:6000"
                    animation__2 = "property: position; from: 0 0 0; to: 0.3 0.6 -0.4; dur: 2000; delay: 6000"
                    animation__3 = "property: position; from: 0.3 0.6 -0.4; to: 1 0.7 -1.3; dur: 999; delay: 8001"
                ></a-obj-model>
            </a-entity>

        </a-marker>

        <!-- マーカーを登録（パッケージ） -->
        <a-nft
          type="nft"
          url="almond"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
          >

            <!-- 手紙 -->
            <a-entity>
                <a-image
                    src="#image"
                    position="70 0 -150"
                    scale="80 80 80"
                    rotation="-90 0 0"
                    animation    = "property: rotation; to: -20 0 0; dur: 3000; delay: 6000"
                    animation__2 = "property: position; to: 70 200 -150; dur: 3000; delay: 6000"
                    animation__3 = "property: scale; to: 100 100 100; dur: 2200; delay: 6000"
                    animation__4 = "property: scale; from: 100 100 100 ; to: 170 170 170; dur: 999; delay: 8201"
                ></a-image>
            </a-entity>

            <!-- 箱 -->
            <a-entity>
                <a-obj-model
                    id="box"
                    position="70 0 -150"
                    scale="1.2 1.2 1.2"
                    rotation="90 0 0"
                    src="#box-obj"
                    mtl="#box-mtl"
                ></a-obj-model>
            </a-entity>

            <!-- ふた -->
            <a-obj-model
                id="lid"
                position="70 0 -150"
                scale="1.2 1.2 1.2"
                rotation="90 0 0"
                src="#lid-obj"
                mtl="#lid-mtl"
                animation    = "property: rotation; to: -90 -20 0; dur: 3000; delay:6000"
                animation__2 = "property: position; from: 70 0 -150; to: 80 30 -200; dur: 2000; delay: 6000"
                animation__3 = "property: position; from: 80 30 -200; to: 100 60 -300; dur: 999; delay: 8001"
            ></a-obj-model>
        </a-nft>

        <!-- AR用のカメラを置く -->
        <a-entity camera></a-entity>

    </a-scene>

  </body>
</html>
