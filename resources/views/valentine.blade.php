<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>AR letters</title>
  </head>
  <body style="margin: 0px; overflow: hidden">
    <!-- A-Frame ライブラリの読み込み -->
    <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
    <!-- AR.js ライブラリの読み込み -->
    <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
    <script src="https://cdn.rawgit.com/donmccurdy/aframe-extras/v5.0.0/dist/aframe-extras.min.js"></script>

    <!-- A-Frame の VR空間に AR.js を紐づける（デバッグUIは非表示） -->
    <a-scene embedded arjs="debugUIEnabled:false;">
      <a-assets>
        <!-- 画像をプリロード -->
        <img id="levtech" src={{ $image->image_url }} />
        <a-asset-item id="ribbon" src={{ asset('/ribbon.obj') }}></a-asset-item>
        <a-asset-item id="mtl" src={{ asset('/ribbon.mtl') }}></a-asset-item>
      </a-assets>
      <!-- マーカーを登録（プリセットされている「hiro」マーカー） -->
      <a-marker type="pattern" url={{ asset('/pattern-ar.patt') }}>
        
      <a-entity>
          <!-- 手紙 -->
          <a-image
            src="#levtech"
            rotation="-90 0 0"
          ></a-image>
          <a-animation
            attribute="rotation"
            to="30 0 0"
            dur="4000"
            delay="3000"
          ></a-animation>
          <a-animation
            attribute="position"
            to="0 2 0"
            dur="4000"
            delay="3000"
          ></a-animation>
          <a-animation
            attribute="scale"
            from="1 1 1"
            to="1.5 1.5 1.5"
            dur="4000"
            delay="3000"
          ></a-animation>
        </a-entity>

        <!-- 箱 -->
        <a-entity>
        <a-entity>
          <a-box
            position="0 -0.74 0"
            color="#ffffff"
            width="1.5"
            height="0.2"
            depth="1.5"
          ></a-box>
          <a-box
            position="0 0 0.7"
            color="#ffffff"
            width="1.5"
            height="1.3"
            depth="0.1"
          ></a-box>
          <a-box
            position="0 0 -0.7"
            color="#ffffff"
            width="1.5"
            height="1.3"
            depth="0.1"
          ></a-box>
          <a-box
            position="0.7 0 0"
            color="#ffffff"
            width="0.1"
            height="1.3"
            depth="1.5"
          ></a-box>
          <a-box
            position="-0.7 0 0"
            color="#ffffff"
            width="0.1"
            height="1.3"
            depth="1.5"
          ></a-box>
          <a-box
            position="0 -0.1 0.78"
            color="#ff0000"
            width="0.3"
            height="1.5"
            depth="0.02"
          ></a-box>
          <a-box
            position="0 -0.1 -0.78"
            color="#ff0000"
            width="0.3"
            height="1.5"
            depth="0.02"
          ></a-box>
          <a-box
            position="0.78 -0.1 0"
            color="#ff0000"
            width="0.02"
            height="1.5"
            depth="0.3"
          ></a-box>
          <a-box
            position="-0.78 -0.1 0"
            color="#ff0000"
            width="0.02"
            height="1.5"
            depth="0.3"
          ></a-box>
        </a-entity>

        <!-- ふた -->
        <a-entity>
          <a-obj-model position="0 0.65 -1.3" scale="0.8 1 0.8" rotation="0 180 0" src="#ribbon" mtl="#mtl" color="#ff0000"></a-obj-model>
          <a-box
            position="0 0.75 0"
            color="#ffffff"
            width="1.5"
            height="0.2"
            depth="1.5"
          ></a-box>
          <a-box
            position="0 0.9 0"
            color="#ff0000"
            width="1.59"
            height="0.05"
            depth="0.3"
          ></a-box>
          <a-box
            position="0 0.9 0"
            color="#ff0000"
            width="0.3"
            height="0.05"
            depth="1.59"
          ></a-box>
          <a-box
            position="0 0.75 0.78"
            color="#ff0000"
            width="0.3"
            height="0.3"
            depth="0.02"
          ></a-box>
          <a-box
            position="0 0.75 -0.78"
            color="#ff0000"
            width="0.3"
            height="0.3"
            depth="0.02"
          ></a-box>
          <a-box
            position="0.78 0.75 0"
            color="#ff0000"
            width="0.02"
            height="0.3"
            depth="0.3"
          ></a-box>
          <a-box
            position="-0.78 0.75 0"
            color="#ff0000"
            width="0.02"
            height="0.3"
            depth="0.3"
          ></a-box>
          <a-animation
            attribute="rotation"
            from="0 0 0"
            to="0 20 -180"
            dur="4000"
            delay="3000"
          ></a-animation>
          <a-animation
            attribute="position"
            from="0 0 0"
            to="1.2 0.3 0"
            dur="700"
            delay="3000"
          ></a-animation>
          <a-animation
            attribute="position"
            to="2.3 0.2 0"
            dur="4000"
            delay="3000"
          ></a-animation>
        </a-entity>

      </a-marker>

      <!-- AR用のカメラを置く -->
      <a-entity camera></a-entity>
    </a-scene>
  </body>
</html>
