<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>A-Frame で超簡単 AR</title>
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
      </a-assets>
      <!-- マーカーを登録（プリセットされている「hiro」マーカー） -->
      <a-marker preset="hiro">
        <a-entity>
          <!-- idを指定して画像を表示、x軸回りで-90度回転 -->
          <a-image
            src="#levtech"
            width="2"
            height="2"
            rotation="-90 0 0"
          ></a-image>
          <!-- a-imageを内包するa-entityをy軸周りで360度回転するアニメーション -->
          <!-- dur(間隔):4000(ms), repeat(繰り返し):止めない限り無限, easing(イージング):線形(イージングしない)-->
          <a-animation
            attribute="rotation"
            to="0 360 0"
            dur="4000"
            repeat="indefinite"
            easing="linear"
          ></a-animation>
        </a-entity>
      </a-marker>

      <!-- AR用のカメラを置く -->
      <a-entity camera></a-entity>
    </a-scene>
  </body>
</html>
