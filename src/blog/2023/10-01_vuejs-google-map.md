---
title: Controlling Google Map API with VueJS  
date: 2023-10-01
tags: [vuejs, googlemap]
---

The GoogleMap provides an excellent JS API that you may use to manipulate and add rich content to the Map. I have created a standalone example of how you can get started with VueJS (version 3 in OptionAPI).  

{% verbatim %}
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My GoogleMap</title>
    <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.4/css/bulma.min.css">
    <script src="https://unpkg.com/vue@3.2.37/dist/vue.global.prod.js"></script>
    <script defer src="https://maps.googleapis.com/maps/api/js?callback=initMyGoogleMap&key=REPLACE_GOOGLE_API_KEY"></script>
</head>
<body>

<style>
    #app {
        width: 100%;
        height: 100%;
    }
    #my-google-map {
        border: 1px maroon solid;
        width: 100%;
        height: 600px;
    }
</style>

<div id="app" class="section">
    <h1 class="title">Google Map</h1>
    <div class="columns">
        <div class="column is-7">
            <div id="my-google-map"></div>
        </div>
        <div class="column is-5">
            <div v-if="mapIsReady">
                <h2 class="subtitle">Map Info</h2>
                <ul>
                    <li>Zoom: {{uiMap.zoom}}</li>
                    <li>Center: {{uiMap.center}}</li>
                    <li>Bounds NE: {{uiMap.getBounds()?.getNorthEast()}}</li>
                    <li>Bounds SW: {{uiMap.getBounds()?.getSouthWest()}}</li>
                </ul>
            </div>
        </div>
    </div>
</div>
<script>
    const MyApp = {
        map: null, // This must be here, it can not be a reactive object!
        data() {
            return {
                mapIsReady: false,
                mapUpdateTs: Date.now(),
            }
        },
        computed: {
            uiMap() {
                // Note that we need this reactive uiMap to be updated based on mapUpdateTs so that
                // the UI can update whenever we have one of the callback event from the map!
                return this.mapUpdateTs > 0 ? this.$options.map : null;
            }
        },
        methods: {
            mapDisplayed() {
                console.log("Map is ready");
                this.mapIsReady = true;
                this.mapUpdateTs = Date.now();
            },
            mapZoomChanged() {
                console.log("Map zoom changed", this.$options.map.getZoom());
                this.mapUpdateTs = Date.now();
            },
            mapDragged() {
                console.log("Map dragged", this.$options.map.getBounds());
                this.mapUpdateTs = Date.now();
            }
        }
    };
    const app = Vue.createApp(MyApp).mount("#app");

    function initMyGoogleMap () {
        console.log("Initializing GoogleMap");
        app.$options.map = new google.maps.Map(document.getElementById('my-google-map'), {
            center: {lat: 28.5383355, lng: -81.3792365}, // Orlando, FL
            zoom: 11,
        });

        let map = app.$options.map;
        google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
            app.mapDisplayed();
        });
        google.maps.event.addListener(map, 'zoom_changed', () => {
            app.mapZoomChanged();
        });
        google.maps.event.addListener(map, 'dragend', () => {
            app.mapDragged();
        });
        google.maps.event.addListener(map, 'resize', () => {
            app.mapResize();
        });
    }
</script>

</body>
</html>
```
{% endverbatim %}

To make above example work, you would need to first register with [Google Platform Account](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com) and get an API key. (They will give you a free trial that you may use to test on localhost.)
Once you have that, go and replace the `REPLACE_GOOGLE_API_KEY` string in above example with your Google API Key. Then the example should work, and you will see something similar to the below screenshot. You may drag and move the map, and the map info on the right will automatically update.

![](/posts-images/2022/06-20_vuejs-google-map.png)

What I have done in the example is let GoogleMap API to call a global JS function and initialize the `map` object. Once I have that, I stored it inside a VueJS's `$options` variable in the Vue's `app` instance. Note that we can not make this `map` object reactive inside Vue, since it's controlled by GoogleMap API itself. We can however, use it as read only object. To ensure our UI will update after map has new information, we used a reactive `mapUpdateTs` property to track changes from GoogleMap callback, and whenever that is changed, we use a computed `uiMap` object to refresh the UI.

There are a lot of advance features from [Google Map API](https://developers.google.com/maps/documentation/javascript) that you can explore further. I hope above example can serve you as a starter template that help you jump start your curious mind. Enjoy!
