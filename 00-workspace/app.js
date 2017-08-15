// SET UP THE MAP

var mapProjection = new ol.proj.Projection({
    code: 'EPSG:3857',
    extent: [-20037508, -20037508, 20037508, 20037508.34]
});
var geoProjection = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: [-180, -180, 180, 180]
});

var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbC1icmVpdGtyZXV0eiIsImEiOiItMTJGWEF3In0.HEvuRMMVxBVR5-oDYvudxw'
            })
        })
    ],
    target: 'map',
    view: new ol.View({
        center: ol.proj.transform([-96, 39], geoProjection, mapProjection),
        zoom: 5
    })
});

var app = {
    mapzenKey: 'mapzen-moAoHZd',
    activeSearch: 'from',

    typeAhead: function (e)
    {
        let el = e.target;
        let val = el.value;
        app.queryAutocomplete(val, (err, data) =>
        {
            console.log('Got:', data);
        });
    },

    queryAutocomplete: throttle((text, callback) =>
    {
        $.ajax({
            url: 'https://search.mapzen.com/v1/autocomplete?text=' + text + '&api_key=' + app.mapzenKey,
            success: (data, status, req) =>
            {
                callback(null, data);
            },
        })
    }, 150),

    renderResultsList: () =>
    {
        let resultsList = $('#results-list');
        resultsList.empty();

        let results = app.options.map((feature) =>
        {
            let li = $('<li class="results-list-item">' + feature.properties.label + '</li>');
        });

        resultsList.append(results);

        if(app.options.length > 0)
        {
            resultsList.removeClass('hidden');
        }
        else
        {
            resultsList.addClass('hidden');
        }
    }
};

$('#search-from-input').on('keyup', {input: 'from'}, app.typeAhead);
$('#search-from-input').on('keyup', {input: 'from'}, app.typeAhead);
